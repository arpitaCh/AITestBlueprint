# SOP: Link Verification Tool

## Goal
Verify that the system can perform basic file I/O operations and that our Node.js environment is correctly linked.

## Inputs
- None (Hardcoded test data)

## Tool Logic (`tools/link_verify.js`)
1. Create a dummy Selenium Java string.
2. Write this string to `.tmp/sample_input.java`.
3. Read the file back.
4. Verify the content matches.
5. Create a dummy Playwright output string.
6. Write this string to `.tmp/sample_output.js`.
7. Log success/failure.

## Edge Cases
- `.tmp/` directory not existing (Tool should handle creation).
- Permission issues for writing.

## Output
- Success message in console.
- Files created in `.tmp/`.
