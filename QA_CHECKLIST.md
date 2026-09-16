# QA / Usability Evidence — NexaFlow

| ID | Area | Test | Expected result | Status |
|---|---|---|---|---|
| QA-01 | Auth | Submit empty form | Validation message appears | PASS |
| QA-02 | Auth | Invalid email | Valid-email message appears | PASS |
| QA-03 | Auth | Password under 6 chars | Password validation appears | PASS |
| QA-04 | Auth | Valid demo credentials | Dashboard opens | PASS |
| QA-05 | Navigation | Open each sidebar page | Correct page renders | PASS |
| QA-06 | Projects | Search by project name | Matching rows remain | PASS |
| QA-07 | Projects | Filter by status | Only selected status remains | PASS |
| QA-08 | Projects | Create project | New row appears + toast | PASS |
| QA-09 | Projects | Edit project | Row updates + toast | PASS |
| QA-10 | Team | Invite member | New invited member appears | PASS |
| QA-11 | Settings | Save settings | Success toast appears | PASS |
| QA-12 | Notification | Click bell | Notification feedback appears | PASS |
| QA-13 | Search | Ctrl/Cmd + K | Global search modal opens | PASS |
| QA-14 | Modal | Press Escape | Modal closes | PASS |
| QA-15 | Modal | Click backdrop | Modal closes | PASS |
| QA-16 | Empty state | Search impossible term | Empty-state message appears | PASS |
| QA-17 | Responsive | Width under 900px | Sidebar becomes mobile drawer | PASS |
| QA-18 | Responsive | Width under 600px | Content/toolbars stack | PASS |
| QA-19 | Accessibility | Keyboard through controls | Focus is visible | PASS |
| QA-20 | Accessibility | Icon buttons | Accessible labels available | PASS |

## Manual browser validation

Recommended browsers:
- Google Chrome
- Microsoft Edge
- Mozilla Firefox

Recommended viewport checks:
- 1440 × 900 desktop
- 1024 × 768 tablet
- 768 × 1024 tablet
- 390 × 844 mobile

## Usability evidence

The main task flows are intentionally short:

**Sign in → Overview → Projects → Search/Filter → Create/Edit → Toast confirmation**

**Sign in → Team → Invite → Confirmation**

**Sign in → Settings → Save → Confirmation**

The interface uses consistent button placement, familiar table patterns, clear status badges, visible focus states, and immediate feedback after actions.

## Production QA still required

For a real deployment, add:
- Automated unit tests
- End-to-end browser tests
- Accessibility audit with axe/Lighthouse
- API contract tests
- Cross-browser testing on real devices
- Security testing
- Performance profiling
