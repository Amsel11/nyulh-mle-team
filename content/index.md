---
type: dashboard
---

# NYULH MLE Team

**Team:** [[eric-oermann|Eric Oermann]] · [[xu-han|Xu Han]] · [[vivian-lee|Vivian Lee]] · [[qing-wen|Qing Wen]] · [[jessica-zhou|Jessica Zhou]] · [[annelene-schulze|Annelene Schulze]]

| Quarter | Projects | Meetings | Tracker |
|---|---|---|---|
| **Q2 2026** | [[Q2-2026/projects/_index\|Projects]] · [[Q2-2026/projects/kanban\|Board]] | [[Q2-2026/meetings/_template\|Template]] | [[Q2-2026/tracker/Q2-2026\|Gantt]] |
| Q3 2026 | [[Q3-2026/projects/_index\|Projects]] | — | — |

---

## Active Projects

```dataview
TABLE without ID
  link(file.link, name) as "Project",
  owners as "Owner(s)",
  start as "Start",
  end as "End",
  status as "Status"
FROM ""
WHERE type = "project" AND status = "ongoing"
SORT start ASC
```

---

## Q2 Milestones

> Auto-pulled from all project files. Check off `[x]` in the project file to complete.

```tasks
tags include #milestone
not done
sort by due
```

---

## This Week's Tasks

```tasks
not done
due this week
path does not include _template
tag does not include #milestone
sort by due
group by filename
```

---

## All Open Tasks

```tasks
not done
path does not include _template
tag does not include #milestone
sort by due
group by filename
```

---

## Team

```dataview
TABLE without ID
  link(file.link, name) as "Person",
  role as "Role"
FROM "people"
WHERE type = "person"
SORT name ASC
```

---

## Recent Meetings

```dataview
LIST
FROM "Q2-2026/meetings"
WHERE type = "weekly-meeting" AND file.name != "_template"
SORT file.day DESC
LIMIT 5
```
