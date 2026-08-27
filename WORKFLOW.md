# Development Workflow

## Required Loop

```text
PLAN
 ↓
IMPLEMENT
 ↓
TEST
 ↓
FAIL?
 ├─ YES → FIX → TEST AGAIN
 └─ NO → PASS
          ↓
      UPDATE STATUS
          ↓
         STOP
```

## Rules
- One node at a time.
- Inspect relevant code before editing.
- State the smallest implementation plan.
- Preserve working code.
- Do not do unrelated refactoring.
- Do not mark PASS without running relevant tests.

## Useful Tests
Use only those applicable:
- `npm run dev`
- `npm run lint`
- `npm run build`
- route tests
- API tests
- database tests
- auth tests
- form tests
- responsive QA

## Node Report
```text
NODE:
STATUS: PASS / FAIL
OBJECTIVE:
FILES INSPECTED:
FILES CREATED:
FILES MODIFIED:
IMPLEMENTATION:
TESTS RUN:
TEST RESULTS:
ISSUES FOUND:
FIXES APPLIED:
RISKS / NOTES:
READY FOR NEXT NODE: YES / NO
```

## Stop Condition
When the node reaches PASS, STOP and wait for approval.
