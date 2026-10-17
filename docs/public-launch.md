# AEGIS Totem public launch kit

## Positioning

AEGIS Totem: multi-agent coding continuity and respectful collaboration, kept inside the repository.

Free under MIT. For developers working with multiple coding agents, across sessions or in parallel. Root and Folder Totems hold shared reference; separate lanes hold participant-specific intent, questions, and handoffs. Append-only records preserve attribution and corrections.

“Informational code” means a repository carries useful context alongside its implementation: responsibilities, decisions, known shortfalls, and verification evidence. It does not mean every source file needs a long comment or every conversation belongs in shared reference.

## Announcement

I’m releasing AEGIS Totem free for other developers.

When several coding agents work on a project, the code can survive while the context gets lost: why a decision was made, what someone is working on, what was verified, and what the next participant needs to know.

AEGIS Totem puts that continuity inside the repository. Root and Folder Totems carry shared reference. Each participant gets an append-only lane for intent, questions, review, and handoffs. Verified findings can be distilled into shared Totems without erasing the history.

The aim is to make our repositories more informational and our coding work more respectfully collaborative: read the context, recognize work already in progress, preserve attribution, and leave evidence the next developer or agent can use.

This is an early public alpha with a CLI, local MCP server, and VS Code-compatible extension. It is local-first, MIT licensed, and has no account or telemetry requirement. It does not lock source files or guarantee collision-free work.

Try it on a small repository with two agents. Tell us where continuity improved and where it still fell short.

Download: https://github.com/thelight1122/AEGIS_MULTI_AGENT_TOTEM_SYSTEM/releases/tag/v0.1.1-alpha.1
Source and feedback: https://github.com/thelight1122/AEGIS_MULTI_AGENT_TOTEM_SYSTEM

## Short X post

I’m giving AEGIS Totem to developers, free under MIT. Shared repo context + separate agent lanes + append-only handoffs. Built for multi-agent coding continuity and respectful collaboration. Public alpha: https://github.com/thelight1122/AEGIS_MULTI_AGENT_TOTEM_SYSTEM

## Demonstration sequence

1. Initialize a small repository with `aegis-totem start`.
2. Create two lanes: `aegis-totem lane create builder` and `aegis-totem lane create reviewer`.
3. Read the Root and relevant Folder Totem before work.
4. Builder states scope: `aegis-totem lane message builder --to reviewer -m "I will inspect the parser. Please review the input boundary before editing."`
5. Reviewer reads the lane and appends findings, naming uncertainty and evidence.
6. Run the project’s relevant checks. Append the actual result to the Folder Totem with `--actor`, `--kind`, and `-m`.
7. Open the repository in a fresh session and show what the next participant can recover without a chat transcript.

## Feedback to collect

- Could a fresh session identify current work and the reason for the last change?
- Were ownership and review requests clear?
- Did any work overlap unexpectedly?
- Which Totem entries were useful, stale, or noisy?
- Which client, editor, OS, Node version, and exact command exposed a shortfall?

Report observations with examples. Avoid presenting local experience as a measured universal benefit. Social posts are prepared here for manual publication; this file does not post them.
