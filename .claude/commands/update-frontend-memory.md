---
description: "Add learned rule to CLAUDE.md"
allowed-tools:
  - Read
  - Edit
---

# Update Frontend Memory Command

**Mode**: READ-ONLY (proposes change, doesn't auto-apply)

Add a learned rule or pattern to CLAUDE.md for future reference.

## Arguments

- `$ARGUMENTS` - REQUIRED: The lesson or pattern to document

Examples:
- "Forms must validate email format before submission"
- "Mobile menu needs aria-expanded toggled"
- "Always use var(--spacing-md) not 2rem"

## Procedure

### Step 1: Parse Input

Extract from `$ARGUMENTS`:
- What the rule/pattern is
- Why it matters (if provided)
- Context for when it applies

### Step 2: Format Rule

Rules should be:
- 1-3 lines maximum
- Actionable and specific
- Include "when" context if not obvious

Good examples:
```markdown
- Mobile menu: always update `aria-expanded` on toggle
- Form validation: check `required` AND custom patterns (email regex)
- External links: include `rel="noopener noreferrer"` and aria-label for new tab
```

Bad examples (too vague):
```markdown
- Make sure forms work properly
- Be careful with accessibility
```

### Step 3: Locate Insertion Point

The rule should be added to CLAUDE.md under:
```markdown
## Learned Rules (add when patterns emerge)
```

### Step 4: Preview Change

```markdown
## Proposed CLAUDE.md Update

### Location
CLAUDE.md, under "Learned Rules" section

### Current Content
\`\`\`markdown
## Learned Rules (add when patterns emerge)

<!-- Add 1-3 line rules here when recurring issues are found -->
- Mobile menu: always update `aria-expanded` on toggle
- Form validation: check `required` AND custom validation (email pattern)
\`\`\`

### Proposed Addition
\`\`\`markdown
- [new rule here]
\`\`\`

### To Apply
If you approve this addition, I will update CLAUDE.md with this rule.

Reply "apply" to add this rule, or suggest modifications.
```

## Guidelines

### When to Add a Rule

- A bug was found that could have been prevented
- A pattern emerges that should be standardized
- A gotcha was discovered that others might hit
- An external API/library has specific requirements

### When NOT to Add

- One-off issues unlikely to recur
- Obvious best practices already in CLAUDE.md
- Rules that are too project-specific
- Opinions without clear justification

### Maintenance

Periodically review rules:
- Remove rules that are no longer relevant
- Combine related rules
- Update rules when project changes
