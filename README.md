# tap — the SUI project registry

This repository is the registry for the **Valley Christian Startup Incubator**. It
holds one file — [`registry.json`](./registry.json) — listing every project in the
incubator so they can be found, maintained, and handed off to the next builder.

> Registering a project **does not** move your code here. Your project stays in
> **your own** GitHub account — you own it during the program and you can keep it
> after you graduate. You only transfer a repo into the
> `Valley-Christian-Startup-Incubator` organization in one case: you're leaving
> and have no one lined up to take over.

## How to register your project

It's a single pull request. Full step-by-step instructions (with animated demos)
live on the site:

👉 **https://valley-christian-startup-incubator.github.io/website/#register**

The short version:

1. **Fork** this repo.
2. **Add an entry** to `registry.json` describing your project (see the format below).
3. **Open a pull request.** A check validates your entry; a mentor reviews and merges it.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the exact commands.

## Entry format

Each project is one object in the `registry.json` array:

```json
{
  "name": "Compost Tracker",
  "slug": "compost-tracker",
  "tagline": "Gamified composting for school cafeterias",
  "repo": "jane-2024/compost-tracker",
  "status": "active",
  "stack": ["Next.js", "Supabase", "Tailwind"],
  "owners": ["@jane-2024"],
  "handoffDocs": "README.md",
  "addedAt": "2026-06-24"
}
```

| Field | Required | What it is |
| --- | --- | --- |
| `name` | ✅ | Human-readable project name. |
| `slug` | ✅ | URL-safe id (lowercase, dashes). **Must be unique.** |
| `tagline` | ✅ | One short sentence (≤120 chars). |
| `repo` | ✅ | GitHub repo as `owner/name` — usually **your** account. |
| `status` | ✅ | `active`, `seeking-steward`, or `archived`. |
| `owners` | ✅ | GitHub handles of the maintainers. |
| `addedAt` | ✅ | Registration date, `YYYY-MM-DD`. |
| `stack` | optional | Key technologies. |
| `handoffDocs` | optional | Path/URL to your maintain/deploy/learn docs. |

The full contract is in [`schema.json`](./schema.json).

## Validating locally

Before you open a PR you can check your entry yourself:

```sh
bun install
bun run validate
```

This is the same check that runs on your pull request. It confirms `registry.json`
is valid JSON, matches the schema, and has no duplicate slugs.
