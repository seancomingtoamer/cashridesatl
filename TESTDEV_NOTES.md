# Testdev Workflow — CashRides ATL

## How it works
- **`master`** = live site (auto-deploys to Vercel)
- **`testdev`** = work-in-progress branch (safe playground)

## Workflow
1. "Launch dev server" → work happens on `testdev` branch
2. Make changes, they get committed to `testdev` and pushed to GitHub
3. Vercel builds a **preview URL** for `testdev` automatically — test there
4. When ready to go live: merge `testdev` → `master` → production deploys

## Commands (for reference)
```bash
git checkout testdev        # switch to dev branch
PORT=3001 npm run dev       # start local dev server at localhost:3001
git add . && git commit -m "msg" && git push   # save work to GitHub
```

## To deploy to production
Merge testdev into master:
```bash
git checkout master && git merge testdev && git push
```
