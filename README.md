# Closeout QA Automation

Cypress 13 + JavaScript test suite for the Closeout photo-upload & AI validation workflow.

---

## Project Structure

```
closeout-qa/
├── cypress/
│   ├── e2e/
│   │   ├── ui/
│   │   │   ├── 01_login_positive.cy.js
│   │   │   ├── 02_login_negative.cy.js
│   │   │   ├── 03_photo_validation_accepted.cy.js
│   │   │   └── 04_photo_validation_rejected.cy.js
│   │   └── api/
│   │       ├── 01_login_positive_api.cy.js
│   │       └── 02_login_negative_api.cy.js
│   ├── fixtures/images/
│   │   ├── hardhat_base.jpg        # person WITH hardhat
│   │   └── no_hardhat_base.jpg     # person WITHOUT hardhat
│   └── support/
│       ├── e2e.js
│       ├── helpers.js
│       └── pages/
│           ├── LoginPage.js
│           ├── ControlPanelPage.js
│           └── SitePage.js
├── cypress.config.js
└── package.json
```

---

## Test Coverage

| ID | Type | Scenario |
|----|------|----------|
| TC-UI-01 | UI | Valid login → success |
| TC-UI-02 | UI | Invalid login → error message |
| TC-UI-03 | UI | Hardhat photo → AI returns ACCEPTED |
| TC-UI-04 | UI | No-hardhat photo → AI returns REJECTED |
| TC-API-01 | API | Valid credentials → 200 + bearer token |
| TC-API-02 | API | Invalid credentials → 400 + no token |

---

## Setup

```bash
git clone <repo-url>
cd closeout
npm install
```

---

## Running Tests

```bash
npm run cy:open        # interactive runner
npm run cy:run         # all tests headless
npm run cy:run:ui      # UI tests only
npm run cy:run:api     # API tests only
```

---

## Test Images

Two base images are committed in `cypress/fixtures/images/`. Before each photo
upload test, `sharp` generates a slightly modified copy (±2% brightness) so the
server treats each run as a fresh upload. Generated copies are deleted
automatically after the suite finishes. Replace the base images any time —
just keep the same filenames.

---

## Assumptions

- **POM** — all selectors live in Page Objects; tests never reference the DOM directly
- **Selectors** — based on live DOM inspection; uses `ng-reflect-*` attributes, custom Angular component tags, and tooltip attributes for stability
- **Timestamp scoping** — upload time is captured after each upload and used to scope assertions to the correct photo card, avoiding false matches when multiple photos exist
- **AI timeout** — 120s timeout on validation assertions to account for slow AI processing
- **No fixed waits** — `cy.wait()` is only used on network intercepts, never as a timer
- **Device ID** — the login API requires a `deviceId`; a fresh UUID is generated per run via `helpers.js`
- **API error codes** — the server returns either `UNAUTHORIZED` or `BAD_REQUEST` for the same invalid credentials depending on its state; TC-API-02 asserts on status `400` and absence of a token rather than a specific error code# closeout-photo-upload-AI-validation