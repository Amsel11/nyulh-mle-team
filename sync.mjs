#!/usr/bin/env node
// sync.mjs — copies vault to content/ and pre-renders dynamic blocks for Quartz

import fs from "fs"
import path from "path"

// Local vault path — only used when running on the author's machine
const VAULT = process.env.VAULT_PATH ||
  "C:/Users/annel/Proton Drive/Annelene.Schulze/My files/OLAB MLE Team"

// content/ is always relative to this script's location
const CONTENT = new URL("content", import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1")

// If the vault doesn't exist (e.g. GitHub Actions runner), work in-place on content/
const COPY_FROM_VAULT = fs.existsSync(VAULT) && path.resolve(VAULT) !== path.resolve(CONTENT)

// ── helpers ──────────────────────────────────────────────────────────────────

function walkMd(dir) {
  const results = []
  if (!fs.existsSync(dir)) return results
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) results.push(...walkMd(full))
    else if (entry.name.endsWith(".md")) results.push(full)
  }
  return results
}

function copyDir(src, dest, ignore = []) {
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (ignore.some((p) => entry.name.match(p))) continue
    const s = path.join(src, entry.name)
    const d = path.join(dest, entry.name)
    if (entry.isDirectory()) copyDir(s, d, ignore)
    else fs.copyFileSync(s, d)
  }
}

function frontmatterDate(text, filename) {
  const m = text.match(/^date:\s*(.+)$/m)
  return m ? m[1].trim() : filename
}

// ── 1. copy vault → content/ (local only) ────────────────────────────────────

if (COPY_FROM_VAULT) {
  console.log("Copying vault…")
  copyDir(VAULT, CONTENT, [/^\.obsidian$/, /\.pdf$/, /^Welcome\.md$/])
  const readme = path.join(CONTENT, "README.md")
  if (fs.existsSync(readme)) fs.copyFileSync(readme, path.join(CONTENT, "index.md"))
} else {
  console.log("In-place mode (GitHub Actions) — skipping vault copy")
}

// ── 2. pre-render Meeting Log (DataviewJS) blocks ────────────────────────────

console.log("Rendering meeting logs…")

const allMeetings = walkMd(CONTENT)
  .filter((f) => f.includes("/meetings/") || f.includes("\\meetings\\"))
  .filter((f) => !path.basename(f).startsWith("_"))

const projectFiles = walkMd(path.join(CONTENT, "Q2-2026", "projects"))
  .filter((f) => !["_index.md", "kanban.md"].includes(path.basename(f)))

for (const projFile of projectFiles) {
  let text = fs.readFileSync(projFile, "utf8")
  const slug = path.basename(projFile, ".md")

  // Find the dataviewjs meeting log block
  const marker = "```dataviewjs\nconst slug = dv.current().file.name;"
  const start = text.indexOf(marker)
  if (start === -1) continue
  const end = text.indexOf("\n```", start) + 4

  // Scan meeting files for this project's slug
  const logs = []
  for (const mf of [...allMeetings].sort().reverse()) {
    const raw = fs.readFileSync(mf, "utf8")
    if (!raw.includes(slug)) continue

    const lines = raw.split("\n")
    let on = false
    const notes = []
    for (const l of lines) {
      if (!on && /^###?\s/.test(l) && l.includes(slug)) { on = true; continue }
      if (on && /^##\s/.test(l)) break
      if (on && /^###\s/.test(l) && !l.includes(slug)) break
      if (on && l.trim().startsWith("- ") && !l.includes("- [ ]") && !l.includes("- [x]"))
        notes.push(l.trim().slice(2))
    }

    if (notes.length) {
      const mName = path.basename(mf, ".md")
      const date = frontmatterDate(raw, mName)
      // Build a relative link from projects/ to meetings/
      const rel = path.relative(path.dirname(projFile), mf).replace(/\\/g, "/").replace(/\.md$/, "")
      logs.push(`##### [${mName}](${rel}) · ${date}\n${notes.map((n) => `- ${n}`).join("\n")}`)
    }
  }

  const rendered =
    logs.length > 0
      ? `> *Auto-rendered from meeting notes.*\n\n${logs.join("\n\n")}`
      : "> *No meeting notes yet.*"

  text = text.slice(0, start) + rendered + text.slice(end)
  fs.writeFileSync(projFile, text)
}

// ── 3. replace Tasks blocks with static snapshot ─────────────────────────────

console.log("Rendering task snapshots…")

// Collect all open tasks from the vault
const taskRe = /^- \[ \] (.+)$/gm
const allTasks = []

for (const f of walkMd(CONTENT)) {
  if (path.basename(f).startsWith("_")) continue
  const raw = fs.readFileSync(f, "utf8")
  const rel = path.relative(CONTENT, f).replace(/\\/g, "/").replace(/\.md$/, "")
  for (const m of raw.matchAll(taskRe)) {
    allTasks.push({ text: m[1], file: rel })
  }
}

// Replace Tasks code blocks in all content files
for (const f of walkMd(CONTENT)) {
  let text = fs.readFileSync(f, "utf8")
  if (!text.includes("```tasks")) continue

  // Replace each ```tasks ... ``` block with a static snapshot
  text = text.replace(/```tasks\n([\s\S]*?)```/g, (_, query) => {
    const isMilestone = query.includes("#milestone")
    const personMatch = query.match(/tags include (#\w+)/)
    const isDueThisWeek = query.includes("due this week")

    let filtered = allTasks.filter((t) => {
      if (t.file.includes("_template")) return false
      if (isMilestone) return t.text.includes("#milestone")
      if (personMatch) return t.text.includes(personMatch[1])
      return true
    })

    if (isDueThisWeek) {
      // Keep tasks that have a due date emoji
      filtered = filtered.filter((t) => t.text.includes("📅"))
    }

    // Exclude milestones from non-milestone queries
    if (!isMilestone) filtered = filtered.filter((t) => !t.text.includes("#milestone"))

    if (filtered.length === 0) return "> *No open tasks.*"

    // Group by file
    const byFile = {}
    for (const t of filtered) {
      if (!byFile[t.file]) byFile[t.file] = []
      byFile[t.file].push(t.text)
    }

    const lines = ["*Open tasks — static snapshot from last sync:*\n"]
    for (const [file, tasks] of Object.entries(byFile)) {
      lines.push(`**[${path.basename(file)}](/${file})**`)
      lines.push(...tasks.map((t) => `- [ ] ${t}`))
      lines.push("")
    }
    return lines.join("\n")
  })

  fs.writeFileSync(f, text)
}

// ── 4. replace Dataview TABLE blocks with static tables ──────────────────────

console.log("Rendering dataview tables…")

const projectMeta = []
for (const f of walkMd(path.join(CONTENT))) {
  const raw = fs.readFileSync(f, "utf8")
  const typeM = raw.match(/^type:\s*project/m)
  if (!typeM) continue
  const name = (raw.match(/^name:\s*(.+)$/m) || [])[1]?.trim()
  const status = (raw.match(/^status:\s*(.+)$/m) || [])[1]?.trim()
  const owners = (raw.match(/^owners:\s*\[(.+)\]$/m) || [])[1]?.trim()
  const start = (raw.match(/^start:\s*(.+)$/m) || [])[1]?.trim()
  const end = (raw.match(/^end:\s*(.+)$/m) || [])[1]?.trim()
  const rel = path.relative(CONTENT, f).replace(/\\/g, "/").replace(/\.md$/, "")
  if (name) projectMeta.push({ name, status, owners, start, end, rel })
}

for (const f of walkMd(CONTENT)) {
  let text = fs.readFileSync(f, "utf8")
  if (!text.includes("```dataview")) continue

  text = text.replace(/```dataview\n([\s\S]*?)```/g, (_, query) => {
    const isProjectQuery = query.includes('type = "project"') || query.includes("type = 'project'")
    if (!isProjectQuery) return `> *Live query — open in Obsidian to view.*`

    const statusFilter = (query.match(/status = "(\w+)"/) || [])[1]
    const ownerFilter = (query.match(/contains\(owners, "([^"]+)"\)/) || [])[1]

    let rows = projectMeta.filter((p) => {
      if (statusFilter && p.status !== statusFilter) return false
      if (ownerFilter && !p.owners?.includes(ownerFilter)) return false
      return true
    })

    if (rows.length === 0) return "> *No projects found.*"

    const lines = [
      "| Project | Owner(s) | Start | End | Status |",
      "|---|---|---|---|---|",
      ...rows.map(
        (p) => `| [${p.name}](/${p.rel}) | ${p.owners ?? "—"} | ${p.start ?? "—"} | ${p.end ?? "—"} | ${p.status ?? "—"} |`
      ),
    ]
    return lines.join("\n")
  })

  fs.writeFileSync(f, text)
}

console.log("✓ Sync complete — run `npx quartz build` to publish")
