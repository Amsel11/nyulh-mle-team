---
name: Datahub Agent MVP
slug: datahub-agent
type: project
status: ongoing
owners: [Qing Wen]
start: 2026-04-01
end: 2026-06-30
quarter: Q2-2026
---

# Datahub Agent MVP

**Status:** Ongoing
**Owner:** [[qing-wen|Qing Wen]]
**Timeline:** Apr 2026 – End of Q2 2026

## Goal

Build an MVP of an AI agent for the datahub.

## Q2 Milestones

- [ ] Architecture / design complete #milestone #datahub-agent #qing 📅 2026-05-15
- [ ] MVP built and testable #milestone #datahub-agent #qing 📅 2026-06-30

## Q1 Progress

- Talked to Amol about Nori Skillset
- Constructing concept for AI agent for datahub

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

*Open tasks — static snapshot from last sync:*

**[2026-04-14-weekly-meeting](/Q2-2026/meetings/2026-04-14-weekly-meeting)**
- [ ] Draft datahub agent architecture document #qing #datahub-agent 📅 2026-04-18

**[2026-04-21-weekly-meeting](/Q2-2026/meetings/2026-04-21-weekly-meeting)**
- [ ] #qing #datahub-agent 📅 2026-04-25


## Completed Tasks

*Open tasks — static snapshot from last sync:*

**[2026-04-14-weekly-meeting](/Q2-2026/meetings/2026-04-14-weekly-meeting)**
- [ ] Draft datahub agent architecture document #qing #datahub-agent 📅 2026-04-18

**[2026-04-21-weekly-meeting](/Q2-2026/meetings/2026-04-21-weekly-meeting)**
- [ ] #qing #datahub-agent 📅 2026-04-25


## Status Log

| Date | Update |
|------|--------|
| 2026-03-24 | Q1: concept stage, discussed Nori Skillset with Amol |
