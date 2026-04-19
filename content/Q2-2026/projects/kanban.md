---
type: project-board
---

# Project Board

> Change `status:` in any project file to move it between columns automatically.
> New project? Create a file with `status: planned` → it appears here immediately.

---

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

---

## In Progress

```dataview
TABLE without ID
  link(file.link, name) as "Project",
  owners as "Owner(s)",
  end as "Due"
FROM ""
WHERE type = "project" AND status = "ongoing"
SORT end ASC
```

---

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
