---
description: "Review UI/UX changes for design consistency, states, and accessibility"
allowed-tools:
  - Read
  - Glob
  - Grep
  - Bash
---

# UI Review Command

**Mode**: READ-ONLY

Review UI changes for design consistency, missing states, and code quality.

## Arguments

- `$ARGUMENTS` - Optional: specific files to review, or commit range (default: HEAD~1..HEAD)

## Procedure

### Step 1: Collect Context

First, gather information about what changed:

```bash
# Show current status
git status

# Show recent diff (default or specified range)
git diff HEAD~1..HEAD --name-only
git diff HEAD~1..HEAD -- "*.html" "*.css" "*.js"
```

### Step 2: Run Available Linters (best effort)

```bash
# HTML validation (if htmlhint installed)
npx htmlhint "*.html" 2>/dev/null || echo "htmlhint not installed"

# CSS linting (if stylelint installed)
npx stylelint "css/**/*.css" 2>/dev/null || echo "stylelint not installed"

# JS linting (if eslint installed)
npx eslint "js/**/*.js" 2>/dev/null || echo "eslint not installed"
```

### Step 3: Review Using UI Architect Agent

Load the ui-architect agent guidelines from `.claude/agents/ui-architect.md` and apply:

1. **Design Consistency Check**
   - Are design tokens used? (`var(--primary)`, `var(--spacing-md)`, etc.)
   - Do new styles match existing patterns?
   - Is responsive design maintained?

2. **State Coverage Check**
   - Default, hover, focus, active states
   - Loading, error, empty states for dynamic content

3. **Accessibility Quick Check**
   - Semantic HTML used?
   - ARIA attributes where needed?
   - Labels on form inputs?

### Step 4: Generate Report

Output structured feedback:

```markdown
## UI Review Report

### Files Reviewed
- [list files]

### Linter Results
- HTMLHint: [pass/fail/not installed]
- Stylelint: [pass/fail/not installed]
- ESLint: [pass/fail/not installed]

### Critical Issues
- [File:Line] Issue | Suggested fix

### High Priority
- [File:Line] Issue | Suggested fix

### Medium Priority
- [File:Line] Issue | Suggested fix

### Design Token Compliance
- [List any violations]

### Recommendations
- [Actionable items]

### Next Steps
- Run `/ui-fix` to apply approved fixes
- Run `/a11y-review` for detailed accessibility audit
```

## Notes

- This is a READ-ONLY command - no files will be modified
- Use `/ui-fix` to apply fixes after reviewing this report
