# Registering your project

This is your first open-source pull request — the exact workflow real teams use.
New to it? That's the point. A mentor will walk you through it.

## 1. Fork this repo

Click **Fork** at the top of
<https://github.com/Valley-Christian-Startup-Incubator/tap>. This makes your own
copy you can change freely.

## 2. Clone your fork and make a branch

```sh
# clone YOUR fork (swap in your username)
git clone https://github.com/<your-username>/tap.git
cd tap

# make a branch named after your project
git checkout -b register/<your-slug>
```

## 3. Add your entry

Open `registry.json` and add an object to the array. Copy an existing entry and
change the values. Make sure:

- your `slug` is unique (not already in the file),
- the JSON is still valid (commas between entries, no trailing comma after the last one).

Use Node.js 24.22.1 from `.node-version`, then check it before committing:

```sh
npm ci --ignore-scripts
npm run validate
```

## 4. Commit and push

```sh
git add registry.json
git commit -m "Register <Your Project Name>"
git push -u origin register/<your-slug>
```

## 5. Open the pull request

GitHub will show a **Compare & pull request** button — click it to open a PR
against `Valley-Christian-Startup-Incubator/tap`. A check runs automatically to
validate your entry. Once it's green and a mentor approves, your project is
registered. 🎉

## Updating or removing a project

Same flow — edit your entry (e.g. change `status` to `seeking-steward` when you're
looking for someone to take over, or `archived` if it's done) and open a PR.
