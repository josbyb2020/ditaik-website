#!/bin/bash
# Accessibility Smoke Test - Quick a11y check on all pages
# Usage: ./scripts/a11y-smoke.sh

set -e

echo "=========================================="
echo "  Accessibility Smoke Test"
echo "=========================================="
echo ""

# Check if pa11y is installed
if ! command -v pa11y &> /dev/null && ! npx pa11y --version &> /dev/null 2>&1; then
    echo "pa11y is not installed."
    echo "Install with: npm install -g pa11y"
    exit 1
fi

# Pages to test
PAGES=(
    "index.html"
    "about.html"
    "services.html"
    "pricing.html"
    "contact.html"
    "freelance.html"
    "privacy.html"
)

# Start local server
echo "Starting local server..."
npx http-server . -p 8080 -s &
SERVER_PID=$!
sleep 2

# Trap to ensure server is stopped
trap "kill $SERVER_PID 2>/dev/null || true" EXIT

PASSED=0
FAILED=0

echo "Testing pages..."
echo ""

for page in "${PAGES[@]}"; do
    echo "--- $page ---"
    if npx pa11y "http://localhost:8080/$page" --reporter cli 2>/dev/null; then
        echo -e "\033[0;32m✓ PASSED\033[0m"
        ((PASSED++))
    else
        echo -e "\033[0;31m✗ FAILED\033[0m"
        ((FAILED++))
    fi
    echo ""
done

# Summary
echo "=========================================="
echo "  Summary"
echo "=========================================="
echo "Passed: $PASSED / ${#PAGES[@]}"
echo "Failed: $FAILED / ${#PAGES[@]}"

if [ $FAILED -gt 0 ]; then
    exit 1
else
    echo ""
    echo "All pages passed accessibility smoke test!"
    exit 0
fi
