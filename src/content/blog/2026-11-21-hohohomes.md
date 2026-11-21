---
title: "HoHoHomes: A Map of Who's Lit Tonight"
date: 2026-11-21
categories: ["Experiments", "Building"]
tags: ["next.js", "maplibre", "openstreetmap", "vercel-blob", "vercel", "ai"]
---

Jacksonville goes all in on Christmas lights. The hard part has never been the lights. It's finding them.

The good streets get passed around by word of mouth, a Facebook post, a neighbor who swears the house on the corner does a whole show synced to music. Then you drive over and it's dark, or it was last year's house, or you can't remember which street it was.

So I built a map.

## What it does

HoHoHomes is a crowd-sourced map of Christmas lights around Jacksonville. Zoomed out, houses gather into glowing neighborhood "Hot Zones" like *San Marco • 14 houses*. Tap one and the map flies in until every house is its own little twinkling light.

Adding a house is one tap. Hit **🎄 I see lights here** and the pin drops right where you are, snapped onto the nearest house. Undo it, nudge it, or tag the vibe with one more tap: 🎶 Music Sync, 🎈 Inflatable Jungle, ✨ Clark Griswold, 🕯️ Classic & Cozy.

Tap any house and you can confirm it's **Lit Tonight ✨**. Houses nobody has confirmed in three days fade out until someone does.

No accounts. No sign-up. It only stores where the house is, its tags and when it was last seen lit.

[Try it →](https://hohohomes.app)

## The stack

- **Next.js 16** on Vercel
- **MapLibre GL** with free OpenFreeMap tiles (OpenStreetMap data)
- **Photon** for address search and naming the neighborhoods
- **Vercel Blob** holding every house in one JSON file, written with ETag checks so two people adding at once don't overwrite each other

Claude and I built it together. The first version went up just after midnight. The redesign happened that same afternoon.

## What I actually learned

**Design for the passenger.**

The person using this is in a moving car at night, or walking with a kid on their shoulders. The first version asked them to tap the button, then tap the map, then fill in a little form. That's three things too many. Now it saves first and asks questions later: drop the pin, offer Undo. Undo is kinder than a confirm button.

**A lights map is only as good as tonight.**

A map full of houses from last week is a map that lies to you. The count of houses mattered less than knowing which ones are actually on. One tap to say "still lit" and a slow fade for the ones nobody has vouched for turned out to be the feature, not a nice-to-have.

**People think in neighborhoods, not dots.**

Zoomed out, a pile of overlapping dots tells you nothing. A soft golden glow with "Riverside" on it tells you where to drive. The tricky part was the edges: the first version happily merged San Marco and Riverside into one zone, then flew you to the empty space between them.

## What's next

The season is short, which is kind of the point. What I'd like to get to before it ends:

- A "drive this route" mode that strings the best houses together
- Photos, if I can do them without turning it into a moderation job
- Other cities, if people ask

---

*This is part of my [experiments](/experiments) series (small things I build, ship, and write about).*

***
## Release notes

HoHoHomes keeps changing through the season. Every release gets a note here, newest first.

### v1.2 · November 21, 2026 · A fresh map every season

- **Removing houses.** I can now take a house off the map straight from its card, for the ones that were dropped by mistake or went dark for good.
- **A new map every January 15.** The map starts empty each season, and last season's houses are kept as a saved archive instead of lingering into next year.

### v1.1 · November 21, 2026 · Lights that twinkle

- **One tap, really.** "I see lights here" drops and saves the pin right away and snaps it onto the nearest house. Undo and Adjust Location sit right below it, big enough to hit from a passenger seat.
- **Vibe tags.** Tag a house 🎶 Music Sync, 🎈 Inflatable Jungle, ✨ Clark Griswold or 🕯️ Classic & Cozy. Anyone who taps the house sees them.
- **Lit Tonight.** Every house shows when it was last confirmed. Houses nobody has vouched for in 72 hours dim until someone taps Lit Tonight ✨.
- **Fairy lights.** Houses are now warm-white and colored lights that twinkle out of step, so a street looks like a string of lights. New pins switch on with a golden glow, a little buzz and an optional chime.
- **Hot Zones.** Zoomed out, houses gather into glowing halos named for the neighborhood. Tap one to fly in.
- **Saves that stick.** Tapping things quickly could fail with "Busy right now, try again." Every save is now its own numbered version, so two people tapping at once can't trip over each other.
- **Snow and glass.** A little snow falls in the header card, and everything floating over the map got a frosted-glass look. The bottom buttons no longer cover the map credits.

### v1.0 · November 21, 2026 · First lights

- A map of Christmas lights around Jacksonville. A heat map of glowing streets zoomed out, a dot for each house zoomed in.
- Add a house with one tap, by tapping the map or by address. Optional 1 to 3 star "how wow" rating and a short note.
- Live at hohohomes.app.
