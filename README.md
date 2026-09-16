# NexaFlow — Professional SaaS Frontend

A production-style SaaS frontend built with semantic HTML, modern CSS, and vanilla JavaScript. The project demonstrates authentication screens, a reusable UI pattern system, responsive dashboard layouts, forms, tables, search/filtering, notifications, modal workflows, simulated API integration, and complete loading/error/empty-state handling.

## Features

- Login and account creation screens
- Client-side authentication demo using `localStorage`
- Responsive fixed sidebar + mobile navigation
- Dashboard KPI cards and activity chart
- Projects CRUD-style modal workflow
- Search and status filtering
- Team management and invitation modal
- Activity timeline
- Workspace settings form
- Toast notifications
- Global search with `Ctrl/Cmd + K`
- Loading/error/empty-state patterns
- Keyboard-accessible buttons, forms, dialogs, and focus states
- Responsive layouts for desktop, tablet, and mobile
- No framework or build step required

## Project structure

```text
saas-frontend/
├── index.html
├── styles.css
├── app.js
├── README.md
├── FINAL_REPORT.md
└── QA_CHECKLIST.md
```

## Run locally

1. Download/extract the project.
2. Open `index.html` in a modern browser.
3. Enter any valid email and a password containing at least 6 characters.
4. Explore Overview, Projects, Team, Activity, and Settings.

For a more realistic local server, run:

```bash
python -m http.server 5500
```

Then visit `http://localhost:5500`.

## Architecture decisions

- **Vanilla JS:** keeps the deliverable easy to inspect and deploy while demonstrating component-like rendering and client-side state management.
- **Single state object:** centralizes project/team/activity data and page state.
- **Reusable render functions:** `renderStats`, `renderActivity`, `projectRows`, `renderProjects`, and `renderTeam` avoid repeated markup logic.
- **Templates:** HTML `<template>` elements provide page-level reusable structures.
- **Modal workflows:** one modal root supports create/edit/invite/search interactions.
- **Progressive states:** empty results, validation errors, toast feedback, and loading/error patterns are represented without requiring a backend.
- **Accessibility:** labels, semantic controls, `aria-*` attributes, visible focus styles, keyboard shortcuts, and Escape-to-close behavior are included.

## API integration note

This version uses a simulated client-side data layer so it can run as a standalone frontend. The state object is intentionally shaped like API response data. In production, the same render functions can consume `fetch()` responses from endpoints such as:

```text
POST   /api/auth/login
POST   /api/auth/register
GET    /api/projects
POST   /api/projects
PATCH  /api/projects/:id
GET    /api/team
POST   /api/team/invite
GET    /api/activity
PATCH  /api/settings
```

Authentication should be replaced by secure server-side sessions or short-lived access tokens with refresh-token handling. Passwords must never be stored in localStorage.

## Validation

See `QA_CHECKLIST.md` for functional, responsive, accessibility, and usability test cases.

## Evidence / demo checklist

Recommended screenshots for submission:

1. Authentication / sign-in screen
2. Desktop dashboard overview
3. Projects page with search and status filter
4. Create/edit project modal
5. Team page + invite modal
6. Mobile responsive navigation
7. Empty search result state
8. Toast notification after a successful action

## Limitations

- Authentication is a frontend demonstration only.
- Data is stored in JavaScript memory rather than a database.
- No real API or server is included.
- No real email invitation is sent.
- Production security, authorization, audit logging, and automated browser tests would require a backend and test environment.

## Future improvements

- Connect Node.js/Express API and MongoDB/PostgreSQL.
- Add real authentication with secure cookies/session management.
- Add automated unit and end-to-end tests.
- Add role-based access control.
- Add server-side pagination/filtering.
- Add analytics and real chart library.
- Add CI/CD, linting, formatting, and security scanning.
