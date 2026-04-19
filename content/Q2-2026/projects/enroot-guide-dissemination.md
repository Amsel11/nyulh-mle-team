---
name: Enroot Guide Dissemination
slug: enroot-guide-dissemination
type: project
status: ongoing
owners: [Vivian Lee, Annelene Schulze]
start: 2026-01-01
end: 2026-06-30
quarter: Q2-2026
---

# Enroot Guide Dissemination

**Status:** Ongoing
**Owners:** [[vivian-lee|Vivian Lee]], [[annelene-schulze|Annelene Schulze]]
**Timeline:** Jan 2026 – End of Q2 2026

## Goal

Finalize and disseminate formal Enroot documentation for all NYULH HPC users in collaboration with the HPC team.

## Q2 Milestones

- [ ] Finalize HPC documentation with Vivian #milestone #enroot #annelene #vivian 📅 2026-06-30
- [ ] Documentation published for all NYULH HPC users #milestone #enroot 📅 2026-06-30

## Q1 Progress

- Created and disseminated survey to current Enroot users at NYULH (Vivian)
- Aggregated survey results for integration into documentation (Vivian)
- Prepared presentation (Annelene, Vivian, Xu) for HPC and MCIT leaders
- Collaborating with HPC to write formal Enroot documentation

## Meeting Log

> Notes written under this project's heading in any weekly meeting are pulled in automatically.

```dataviewjs
const slug = dv.current().file.name;
const path = dv.current().file.path;
const meetings = dv.pages('').where(p => p.file.path.includes('/meetings/') && !p.file.name.startsWith('_'))

  .where(p => p.file.outlinks.some(l => l.path === path))
  .sort(p => p.file.day, "desc");
if (meetings.length === 0) { dv.paragraph("*No meeting notes yet.*"); }
else { for (const m of meetings) {
  const lines = (await dv.io.load(m.file.path)).split("\n");
  let on = false; const notes = [];
  for (const l of lines) {
    if (!on && l.match(/^###?\s/) && l.includes(slug)) { on = true; continue; }
    if (on && l.match(/^##\s/)) break;
    if (on && l.match(/^###\s/) && !l.includes(slug)) break;
    if (on && l.trim().startsWith("- ") && !l.includes("- [ ]") && !l.includes("- [x]"))
      notes.push(l.trim().slice(2));
  }
  if (notes.length) { dv.header(5, m.file.link + " · " + (m.date ?? "")); dv.list(notes); }
}}
```

## Open Tasks

```tasks
tags include #enroot
not done
sort by due
```

## Completed Tasks

```tasks
tags include #enroot
done
sort by done date
limit 10
```

## Status Log

| Date | Update |
|------|--------|
| 2026-03-24 | Q1 review: survey aggregated, HPC presentation prepared, collaboration with HPC started |
