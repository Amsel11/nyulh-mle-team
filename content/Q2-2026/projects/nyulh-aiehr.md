---
name: NYULH-AIEHR (EKO)
slug: nyulh-aiehr
type: project
status: ongoing
owners: [Jessica Zhou]
start: 2026-05-01
end: 2026-06-30
quarter: Q2-2026
---

# NYULH-AIEHR (EKO)

**Status:** Ongoing
**Owner:** [[jessica-zhou|Jessica Zhou]]
**Timeline:** May 2026 – Jun 2026

## Goal

Build out the NYULH ambient AI EHR scribe app (NYULH-AIEHR) in collaboration with EKO.

## Q2 Milestones

- [ ] Complete evals: patient history generation #milestone #aiehr #jessica 📅 2026-05-31
- [ ] Complete evals: STT transcript generation #milestone #aiehr #jessica 📅 2026-05-31
- [ ] Complete evals: SOAP note generation #milestone #aiehr #jessica 📅 2026-05-31
- [ ] Complete evals: CDS/orders generation #milestone #aiehr #jessica 📅 2026-06-15
- [ ] App built out w/ EKO #milestone #aiehr #jessica 📅 2026-06-30

## Q1 Progress

- Working on evals for app functionalities (patient history, STT, SOAP notes, CDS/orders)

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
tags include #aiehr
not done
sort by due
```

## Completed Tasks

```tasks
tags include #aiehr
done
sort by done date
limit 10
```

## Status Log

| Date | Update |
|------|--------|
| 2026-03-24 | Q1: evals in progress for 4 app functionalities |
