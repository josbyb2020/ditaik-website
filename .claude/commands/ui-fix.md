---
description: "Apply UI fixes from review - requires explicit scope"
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash
---

# UI Fix Command

**Mode**: WRITE

Apply UI fixes identified in `/ui-review`. Requires explicit scope.

## Arguments

- `$ARGUMENTS` - REQUIRED: Specify what to fix
  - "fix Critical and High from last review"
  - "fix item: [specific issue]"
  - "polish: [specific file or component]"

## Procedure

### Step 1: Confirm Scope

Parse `$ARGUMENTS` to understand:
- Which issues to fix (Critical/High/specific items)
- Which files are affected

If scope is unclear, ASK for clarification before proceeding.

### Step 2: Load Agent Guidelines

Based on task type:
- **Implementing new features**: Load `.claude/agents/ui-builder.md`
- **Cleanup/polish**: Load `.claude/agents/ui-polisher.md`

### Step 3: Apply Fixes

For each approved fix:

1. Read the affected file
2. Make minimal, targeted changes
3. Follow the design system:
   - Use CSS variables for colors, spacing, radius, shadows
   - Follow existing naming conventions
   - Include responsive styles if needed

4. Document changes as you go

### Step 4: Verify Changes

After all fixes applied:

```bash
# Run linters if available
npx htmlhint "*.html" 2>/dev/null || true
npx stylelint "css/**/*.css" 2>/dev/null || true
npx eslint "js/**/*.js" 2>/dev/null || true

# Show what changed
git diff --stat
```

### Step 5: Report

```markdown
## UI Fixes Applied

### Changes Made
| File | Change | Lines |
|------|--------|-------|
| [file] | [description] | +X/-Y |

### Design Token Updates
- Replaced [N] hardcoded values with tokens

### Verification
- Linters: [pass/fail/not available]
- Manual check: [notes]

### Files Modified
\`\`\`
[git diff --stat output]
\`\`\`

### Next Steps
- Run `/verify-ui` for full verification
- Manually test in browser at breakpoints: 375px, 768px, 1200px
```

## Important Rules

1. **Explicit scope required** - Never fix "everything"
2. **Minimal diffs** - Only change what's needed
3. **Use design tokens** - No hardcoded colors/spacing
4. **Preserve functionality** - Don't break existing features
5. **Document changes** - Every fix should be traceable
