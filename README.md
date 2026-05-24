# Diego Claw

Static site for Diego Claw, published via GitHub Pages.

## Local staging before push

Because the site uses absolute paths like `/diego-claw/assets/...`, serve it from the workspace parent, not from inside the repo root.

### Quick preview

From the repo root:

```bash
./scripts/preview_site.sh
```

Then open:

```text
http://localhost:8123/diego-claw/
```

You can also choose a different port:

```bash
./scripts/preview_site.sh 9000
```

## Recommended workflow

1. Create a feature branch for changes.
2. Run the local preview server.
3. Review the page locally before push.
4. Commit only the intended files.
5. Push to GitHub once the local preview looks right.

Example:

```bash
cd ~/.openclaw/workspace/diego-claw
git checkout -b feature/my-change
./scripts/preview_site.sh
```

In another terminal:

```bash
cd ~/.openclaw/workspace/diego-claw
git status
git add <files>
git commit -m "Describe the change"
git push origin <branch>
```

## Optional separate staging worktree

If you want a separate folder just for testing changes before merge/push:

```bash
cd ~/.openclaw/workspace/diego-claw
git worktree add ../diego-claw-staging -b staging-preview
```

That gives you a clean parallel checkout for staging work.
