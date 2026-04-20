---
name: MedGemma Deployment
slug: medgemma-deployment
type: project
status: ongoing
owners: [Xu Han]
start: 2026-02-01
end: 2026-06-30
quarter: Q2-2026
---


# MedGemma Deployment

**Status:** Ongoing
**Owner:** [[xu-han|Xu Han]]
**Timeline:** Feb 2026 – Current

## Goal

Deploy and integrate MedGemma with the PAU team; scale up the inference node to support broader usage.

## Q2 Milestones

- [ ] Integrate MedGemma with PAU team #milestone #medgemma #xu 📅 2026-06-30
- [ ] Scale up inference node #milestone #medgemma #xu 📅 2026-06-30

## Q1 Progress

- Deployed MedGemma on 1 GPU
- Built Kong Authentication layer for PAU's use

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
- [ ] Complete Kong auth security review #xu #medgemma 📅 2026-04-18
- [ ] Follow up with PAU team on integration timeline #EKO #medgemma 📅 2026-04-18

**[2026-04-21-weekly-meeting](/Q2-2026/meetings/2026-04-21-weekly-meeting)**
- [ ] #xu #medgemma 📅 2026-04-25


## Completed Tasks

*Open tasks — static snapshot from last sync:*

**[2026-04-14-weekly-meeting](/Q2-2026/meetings/2026-04-14-weekly-meeting)**
- [ ] Complete Kong auth security review #xu #medgemma 📅 2026-04-18
- [ ] Follow up with PAU team on integration timeline #EKO #medgemma 📅 2026-04-18

**[2026-04-21-weekly-meeting](/Q2-2026/meetings/2026-04-21-weekly-meeting)**
- [ ] #xu #medgemma 📅 2026-04-25


## Status Log

| Date | Update |
|------|--------|
| 2026-03-24 | Q1 review: deployed on 1 GPU, Kong auth layer built for PAU |
