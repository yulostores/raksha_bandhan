# YuloStores — Restaurant Operations Platform

A responsive product landing page for YuloStores: one connected platform for restaurant POS, orders, kitchen, inventory, purchasing, staff, customers, payments, reporting, and multi-outlet operations.

## Run locally

```bash
npm start
```

Open `http://127.0.0.1:4173`.

No build step is required. Run `npm run check` for JavaScript syntax validation.

## Public pages

- `/` — YuloStores restaurant operations landing page
- `/privacy-policy.html` — Yulo Stores privacy policy
- `/delete-account.html` — account deletion instructions

## Production notes

- Connect the demo form to the production CRM or lead API. It currently prepares an email request through the visitor's email client.
- Replace provisional platform-benefit metrics with verified YuloStores figures before launch.
- Connect the existing analytics hooks to the production analytics provider if required.
