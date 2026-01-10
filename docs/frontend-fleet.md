# Frontend Review System

Streamlined review system for the Ditaik static website.

## Available Commands

| Command | Mode | Purpose |
|---------|------|---------|
| `/verify-ui` | Read | Run all verification checks |
| `/ui-review` | Read | Review UI/design consistency |
| `/ui-fix` | Write | Apply approved UI fixes |
| `/a11y-review` | Read | Accessibility audit |
| `/a11y-fix` | Write | Apply accessibility fixes |
| `/redteam` | Read | Security review |
| `/update-frontend-memory` | Read | Add rule to CLAUDE.md |

## Quick Start

```bash
# After making changes
/verify-ui          # Quick syntax/lint check
/ui-review          # Design review
/a11y-review        # Accessibility check
/redteam            # Security check
```

## When to Use Each Command

| Change Type | Command |
|-------------|---------|
| Any HTML/CSS/JS | `/verify-ui` |
| Styling, layout | `/ui-review` |
| Forms, menus, buttons | `/a11y-review` |
| JS changes, links, forms | `/redteam` |

## Parallel Workflow

**Tab A** (Development):
```
# Make changes using design tokens
# Follow patterns from existing pages
```

**Tab B** (Review):
```
/ui-review
/a11y-review
/redteam
/verify-ui
```

## Agents

Located in `.claude/agents/`:

| Agent | Purpose |
|-------|---------|
| ui-architect | UI/UX review |
| a11y-auditor | Accessibility review |
| a11y-fixer | Accessibility fixes |
| security-auditor | Security review (static sites) |
| perf-ui-auditor | Performance review |

## Scripts

```bash
./scripts/verify-ui.sh           # Full verification
./scripts/verify-ui.sh quick     # Quick check
./scripts/a11y-smoke.sh          # Accessibility test
./scripts/lighthouse-smoke.sh    # Performance audit
```

## Design Tokens

Use these CSS variables from `css/styles.css`:

```css
/* Colors */
--primary: #1a4fc0
--text: #333333
--text-light: #666666

/* Spacing */
--spacing-xs: 0.5rem
--spacing-sm: 1rem
--spacing-md: 2rem
--spacing-lg: 4rem
--spacing-xl: 8rem

/* Border Radius */
--border-radius-sm: 0.3rem
--border-radius-md: 0.6rem
--border-radius-lg: 1.2rem

/* Shadows */
--shadow-sm, --shadow-md, --shadow-lg

/* Animation */
--transition: all 0.3s ease-in-out
```

## Breakpoints

- Desktop: > 991px
- Tablet: 768px - 991px
- Mobile: 576px - 768px
- Small: < 576px
