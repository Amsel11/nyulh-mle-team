---
type: index
---

# Q2 2026 — Projects

## Ongoing

```dataview
TABLE without ID
  link(file.link, name) as "Project",
  owners as "Owner(s)",
  start as "Start",
  end as "End"
FROM ""
WHERE type = "project" AND status = "ongoing"
SORT start ASC
```

## Planned

```dataview
TABLE without ID
  link(file.link, name) as "Project",
  owners as "Owner(s)",
  start as "Start"
FROM ""
WHERE type = "project" AND status = "planned"
SORT start ASC
```

## Done

```dataview
TABLE without ID
  link(file.link, name) as "Project",
  owners as "Owner(s)",
  end as "Completed"
FROM ""
WHERE type = "project" AND status = "done"
SORT end DESC
```
