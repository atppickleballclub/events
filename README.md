# ATP Events

The club's events hub at **eventsapp.atppickleballclub.com.au**. One card per event, each linking to that event's own site. Installs to a phone home screen as an app.

## Adding or changing an event

Open `index.html`, find the block marked `EDIT YOUR EVENTS HERE`, and edit the list:

```js
{
  name: "Summer Classic",
  short: "Summer Classic",   // optional shorter name for the square tile
  sub: "ATP tournament",
  date: "2027-03-14",        // YYYY-MM-DD, or null if not set
  time: "8:00am – 2pm",       // optional
  venue: "Jonas Bradley Park",
  url: "https://summer.atppickleballclub.com.au"   // null = "Details coming soon"
}
```

The next dated event always gets the big yellow poster with the countdown. Everything else shows as a square tile. Events turn into dark "Result" tiles automatically the day after their date. For a past event, add `result: "ATP won"` to show the result on its tile.

## Club logos

Add `clubs: ["atp", "dural"]` to an event to show the two clubs' logos on its poster or tile. The clubs are listed under `CLUBS` in `index.html`. To add a new club, put its logo in `icons/` and add a line like:

```js
newclub: { name: "Some Pickleball Club", initials: "SPC", logo: "icons/newclub.png", bg: "#ffffff" }
```

`bg` is the colour of the round badge behind the logo. Leave `logo: null` to show the initials until you have a logo.

## Files

| File | What it does |
|---|---|
| `index.html` | The page and the events list |
| `manifest.json` | Makes it installable (name, icon, colours) |
| `sw.js` | Lets it open offline with the last copy seen |
| `icons/` | App icons and the header logo, made from the club badge |
| `CNAME` | Tells GitHub Pages to use the club subdomain |

## Updating the logo

Replace the PNGs in `icons/` with new versions at the same sizes and names: `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` (180), `maskable-512.png` (512 with extra navy padding around the badge) and `logo.png` (header). If you change them, bump `VERSION` in `sw.js` so installed copies pick them up.
