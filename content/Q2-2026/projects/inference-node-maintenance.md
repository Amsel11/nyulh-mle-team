---
name: Inference Node Maintenance
slug: inference-node-maintenance
type: project
status: ongoing
owners: [Xu Han]
start: 2026-02-01
end: 2026-12-31
quarter: Q2-2026
---

# Inference Node Maintenance

**Status:** Ongoing
**Owner:** [[xu-han|Xu Han]]
**Timeline:** Feb 2026 – Ongoing

## Goal

Maintain deployed models on the inference node to ensure reliability and uptime.

## Active Models

- Llama-3-3-70b-chat
- AnP MVP
- MedGemma
- iCARE

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
tags include #node-maint
not done
sort by due
```

## Completed Tasks

```tasks
tags include #node-maint
done
sort by done date
limit 10
```

## Status Log

| Date | Update |
|------|--------|
| 2026-03-24 | Q1 review: maintaining 4 models on inference node |
