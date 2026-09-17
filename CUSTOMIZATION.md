# H1MANXHU Portfolio — Frontend Polish Notes

## What was updated

- Hero floating elements reduced to 3 social cards: GitHub, LinkedIn, Instagram.
- Added sparse status cards: Open to Work, Collaboration, CTF Player, Ethical Hacker.
- Reworked the portrait into a looping brush-reveal animation with a calmer hover state.
- Shortened the About terminal and added the persistent `h1mnxshu.exe` identity.
- Added recognizable tool/language icons using Simple Icons CDN.
- Reworked Professional Journey into sleek dark glass-style cards on a subtle starfield background.
- Added image-ready mini cards to Field Notes.
- Reworked Gallery into an image-ready archive/photo wall with an upgraded lightbox.
- Contact form now opens the visitor's mail client with the form fields pre-filled.
- Centralized the contact email in `src/data.ts`.

## Easy edits before Sanity

Open `src/data.ts`:

- `contactEmail` — replace with the real email.
- `socialLinks` — replace the placeholder social URLs.
- `blogs[].image` — optional image URL for Field Notes.
- `gallery[].image` — optional image URL for Gallery.

Open `src/App.tsx`:

- `resumeUrl` — replace `#` with the real resume URL.

## Sanity phase

Once the visual design is approved, the next step is to move editable content out of `src/data.ts` and into Sanity.

Recommended Sanity documents/types:

- `siteSettings` — name, email, social URLs, resume, hero copy.
- `project` — title, description, category, stack, features, result, GitHub, demo.
- `experience` — role, organization, dates, description, tags, certificate.
- `skillCategory` / `skill` — category and tool name.
- `certification` — title, issuer, date, image, verification URL.
- `fieldNote` — title, date, category, description, image, URL.
- `galleryItem` — title, category, image, label.

The current data structures are intentionally close to these future CMS fields so the Sanity migration can be done without redesigning the UI.


## Contact delivery
The contact form uses `contactEmail` in `src/data.ts`. Update that value whenever you want to point the portfolio to a different inbox.
