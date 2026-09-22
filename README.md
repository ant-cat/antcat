# ant.cat

Personal site and experiment lab — built with Astro, deployed on Cloudflare Pages.

## Stack

- **Framework:** Astro 4.15
- **Content:** Markdown in `src/content/blog/`
- **Hosting:** Cloudflare Pages
- **Domain:** ant.cat (DNS on Cloudflare)

## Local dev

```bash
npm install
npm run dev
```

## Deploy to Cloudflare Pages

### One-time setup

1. Push this repo to GitHub
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/) → Create a project → Connect to Git
3. Select this repo
4. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Save and deploy

Cloudflare Pages will redeploy automatically on every push to `main`.

### Custom domain

In Cloudflare Pages → your project → Custom domains → Add `ant.cat` and `www.ant.cat`.
Cloudflare will add the DNS records automatically (since ant.cat DNS is already on Cloudflare).

## Adding content

### New blog post

Create `src/content/blog/YYYY-MM-DD-slug.md`:

```markdown
---
title: "Post title"
date: 2026-01-15
slug: "post-slug"
categories: ["Category"]
tags: []
---

Post content here.
```

### New experiment

Edit `src/pages/experiments/index.astro` and add an entry to the `experiments` array.

## Subdomains for experiments

Each experiment lives on its own subdomain, configured in Cloudflare DNS:

| Subdomain | Target |
|-----------|--------|
| baby.ant.cat | CNAME → babyisago-ten.vercel.app |

Add new subdomains in Cloudflare Dashboard → ant.cat → DNS → Add record.
