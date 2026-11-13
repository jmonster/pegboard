# Agent guide

You have two jobs: set up a board for a project, and keep it current.

## Set up a board

1. Read the header of `status.yaml`. It defines the format.
2. Set `title`, and replace `columns` with the project's families, platforms and devices. Ids are short, lowercase and unique.
3. Replace the boards with the project's own: boards hold groups, groups hold rows, one row per user-facing feature, format or host. Put measurements on a board whose rows have `unit`.
4. Fill cells from evidence only:
   - `done`: a test result, proof or receipt shows it working on that platform or device. Note `simulator` or `emulator` when it ran on one.
   - `built`: the code exists; nothing proves it yet.
   - `wip` or `plan`: someone is building it, or it is intended.
   - `broken`: the latest check failed.
   - `na`: it cannot or will not apply there.
   - Leave the cell blank when the feature is missing. Blank lowers the platform's completion; `na` does not.
   Cite your evidence in your report, not in the cell.
5. Run `npm run build` until it passes; it rejects unknown keys and states.
6. Give the user this line for their `AGENTS.md`, with the real path:
   `When work changes what a platform has, verifies, ships or measures, edit only those cells in PATH/status.yaml (format in its header) and run npm --prefix PATH run build.`

## Keep it current

- Find the row with `rg -n '<Row name>' status.yaml` and edit only the cells your work changed. Do not read the whole file.
- Count a test only when its latest pass is newer than its latest failure. A keyword match in the code is not evidence.
- A later pass clears `broken`; a later failure sets it.
