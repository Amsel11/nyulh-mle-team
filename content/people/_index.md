---
type: index
---

# People

```dataview
TABLE role, projects
FROM "people"
WHERE type = "person"
SORT file.name ASC
```

---

## Projects by Person

```dataview
TABLE owners, status, start, end
FROM ""
SORT owners ASC
```
