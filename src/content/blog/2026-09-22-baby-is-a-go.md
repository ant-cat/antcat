---
title: "Baby is a Go: What I Built When I Couldn't Find the Right Way to Share the News"
date: 2026-09-22
categories: ["Experiments", "Building"]
tags: ["next.js", "twilio", "resend", "postgresql", "vercel", "ai"]
---

My wife and I found out we were pregnant and I immediately ran into the same problem every expectant parent does: how do you tell people?

The group text is terrible. A social media post feels performative. Calling everyone takes days. And the one thing you actually want — to tell each person something a little personal, to make them feel like *they* were the ones you thought of first — doesn't scale.

After 5 years, I finally had the tools to build something.

## What it does

Baby is a Go is a broadcast tool for one specific moment. You write a message once — your announcement — and then personalize it for each recipient before you send. Every person gets their own private SMS or email, addressed to them, with whatever detail you wanted to add for them specifically. No one sees a group thread. No one gets anyone else's number.

When they reply, everything comes back to a single inbox. You can respond, you can see who you've heard from, you can keep track of the whole conversation without your phone melting down.

[Try the demo →](https://baby.ant.cat)

The demo mode runs without any real credentials — you can compose a full announcement and walk through the entire flow without sending anything.

## The stack

- **Next.js 14** with the App Router
- **TypeScript** throughout
- **PostgreSQL** on Supabase for storing recipients and message threads
- **Twilio** for SMS sending and inbound webhook handling
- **Resend** for email delivery
- **Deployed on Vercel**

Claude helped me build it — we went from idea to deployed app in a single session.

## What I actually learned

**Building for a single moment changes everything about what "done" means.**

Most software is designed for recurring use. You optimize for retention, for the returning user, for the habit. Baby is a Go has a lifespan of maybe two weeks. You use it once, intensely, then never again. That changes the design priorities completely — there's no onboarding to get right, no empty state to worry about. The only thing that matters is that it works when you need it.

**Demo mode was the unlock.**

The hardest thing about sharing a tool that requires Twilio credentials and a database is that nobody can just try it. I added a demo mode — a fully sandboxed walkthrough that simulates the whole flow with fake sends — and suddenly the app became shareable. If you can't let someone experience the thing in 90 seconds, you don't have a demo, you have documentation.

**The inbox problem is actually hard.**

Aggregating replies from SMS and email into a single threaded view sounds simple. It isn't. Twilio's inbound webhook, Resend's reply routing, matching a reply to the right recipient, deduplicating — there's a lot of plumbing. I underestimated it at first and had to rethink the database schema halfway through.

## What's next

The app is live and the code works. What it doesn't have yet:

- A proper auth layer (right now it's single-user by design)
- MMS support for sending the ultrasound photo
- A more polished inbox UI

Those are future-me problems. For now, it did exactly what it was supposed to do.

---

*This is part of my [experiments](/experiments) series — small things I build, ship, and write about.*
