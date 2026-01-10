# Frontend Fleet - Parallel Development Workflow

This document describes how to use the Frontend Fleet system for parallel development of the Ditaik website.

## Overview

The Frontend Fleet is a set of Claude Code agents and commands designed for:
- **Parallel development** across multiple tabs/sessions
- **Deterministic workflows** with fixed checklists
- **Separation of concerns** between review and implementation
- **Verification loops** to ensure UI correctness

## Quick Start

### First Time Setup

```bash
# Install recommended tools (optional but recommended)
npm install -D htmlhint stylelint eslint prettier

# For accessibility testing
npm install -g pa11y

# For E2E testing
npm init playwright@latest

# For performance testing
npm install -g lighthouse
```

### Basic Workflow

1. Make changes to HTML/CSS/JS
2. Run `/verify-ui` to check for issues
3. Run `/ui-review` for detailed feedback
4. Run `/ui-fix` to apply approved changes

## Parallel Tab Workflow

For optimal development, run these in separate tabs:

### Tab A: Feature Development
```
# Build new features or fix bugs
# Use ui-builder agent patterns from .claude/agents/ui-builder.md
```

### Tab B: Review & Quality
```
/ui-review          # Check design consistency
/a11y-review        # Check accessibility
/verify-ui          # Run all checks
```

### Tab C: Performance & Testing
```
/perf-ui            # Performance audit
/e2e-review         # E2E test plan
/e2e-run            # Run E2E tests
```

## Available Commands

| Command | Mode | Purpose |
|---------|------|---------|
| `/ui-review` | Read | Review UI changes for design consistency |
| `/ui-fix` | Write | Apply approved UI fixes |
| `/a11y-review` | Read | Accessibility audit |
| `/a11y-fix` | Write | Apply accessibility fixes |
| `/e2e-review` | Read | Generate E2E test plan |
| `/e2e-run` | Read | Run E2E tests |
| `/perf-ui` | Read | Performance audit |
| `/verify-ui` | Read | Run all verification checks |
| `/update-frontend-memory` | Read | Add rule to CLAUDE.md |

## Command Details

### /ui-review

**When to use**: After any UI changes (HTML, CSS, JS)

**What it does**:
1. Collects git diff
2. Runs available linters
3. Checks design token usage
4. Reviews responsive design
5. Checks for missing states

**Output**: Prioritized list of issues (Critical/High/Medium/Low)

### /ui-fix

**When to use**: After reviewing `/ui-review` output

**Required**: Must specify scope
- `fix Critical and High from last review`
- `fix item: [specific issue]`
- `polish: [file or component]`

### /a11y-review

**When to use**: When changing interactive elements (forms, menus, modals)

**What it checks**:
- Keyboard navigation
- Focus management
- Semantic HTML
- ARIA usage
- Color contrast

### /verify-ui

**When to use**: Before committing changes

**What it runs** (if available):
- JavaScript syntax check (always)
- HTMLHint
- Stylelint
- ESLint
- Prettier
- pa11y

## Subagents

Located in `.claude/agents/`:

| Agent | Mode | Purpose |
|-------|------|---------|
| ui-architect | Read | High-level UI/UX review |
| ui-builder | Write | Implement components |
| ui-polisher | Write | Cleanup and alignment |
| a11y-auditor | Read | Accessibility review |
| a11y-fixer | Write | Accessibility fixes |
| e2e-auditor | Read | E2E test planning |
| e2e-fixer | Write | E2E test implementation |
| perf-ui-auditor | Read | Performance review |

## Scripts

Located in `scripts/`:

```bash
# Full verification (Unix)
./scripts/verify-ui.sh

# Quick verification (Unix)
./scripts/verify-ui.sh quick

# Full verification (Windows)
.\scripts\verify-ui.ps1

# Accessibility smoke test
./scripts/a11y-smoke.sh

# Lighthouse performance audit
./scripts/lighthouse-smoke.sh
./scripts/lighthouse-smoke.sh about.html  # specific page
```

## Design System Reference

### Colors
```css
--primary: #1a4fc0
--primary-light: #4f7ae5
--primary-dark: #0f3680
--text: #333333
--text-light: #666666
```

### Spacing
```css
--spacing-xs: 0.5rem   /* 8px */
--spacing-sm: 1rem     /* 16px */
--spacing-md: 2rem     /* 32px */
--spacing-lg: 4rem     /* 64px */
--spacing-xl: 8rem     /* 128px */
```

### Border Radius
```css
--border-radius-sm: 0.3rem
--border-radius-md: 0.6rem
--border-radius-lg: 1.2rem
```

### Responsive Breakpoints
- Desktop: > 991px
- Tablet: 768px - 991px
- Mobile: 576px - 768px
- Small Mobile: < 576px

## Typical Development Session

### Starting Work

1. Open 3 terminal tabs
2. Tab A: Navigate to project root
3. Tab B: Same location
4. Tab C: Same location

### During Development

**Tab A** (Development):
```
# Make changes to files
# Use design tokens from css/styles.css
# Follow patterns from existing pages
```

**Tab B** (Review):
```
/ui-review
# Read feedback
# Approve fixes

/ui-fix fix Critical and High
# Verify changes

/verify-ui
# Ensure all checks pass
```

**Tab C** (Testing):
```
/a11y-review
# Check accessibility

/perf-ui
# Check performance impact
```

### Before Committing

```bash
# Run full verification
./scripts/verify-ui.sh

# If using Playwright
npx playwright test

# Manual browser test
# - Check at 375px, 768px, 1200px widths
# - Tab through all interactive elements
# - Test on real mobile device if possible
```

## Troubleshooting

### Command not recognized
Ensure you're using Claude Code and the `.claude/commands/` directory exists.

### Linters not running
Install the tools:
```bash
npm install -D htmlhint stylelint eslint prettier
```

### E2E tests failing
1. Ensure server is running: `npx http-server . -p 8080`
2. Install browsers: `npx playwright install`

### Accessibility test fails
1. Check server is running
2. Wait for page to fully load
3. Run on specific page to identify issue

## Adding New Rules

When you discover a pattern that should be enforced:

```
/update-frontend-memory "Mobile menu must toggle aria-expanded"
```

This will propose an addition to CLAUDE.md's "Learned Rules" section.
