# HoverPeek 👁️

A simple, lightweight Chrome extension to preview links inline without opening a million background tabs. Just hold `Alt` and hover over any link to see what's on the other side.

I built this because I got tired of "link roulette"—clicking open five tabs from an article or documentation page just to find out four of them are irrelevant or clickbait. This extension injects a fast, interactive iframe preview right next to your cursor so you can scout ahead without losing your place.


## Features

* **On-Demand Previews:** It only triggers when you hold down the `Alt` key while hovering. It won't get in your way or pop up accidentally during normal browsing.
* **Scrollable & Interactive:** The preview isn't just a static snapshot. You can slide your mouse right into the popup box to scroll through the page, check code snippets, or read ahead.
* **Smart Positioning:** Automatically detects the edges of your browser window so the preview box never clips off-screen.
* **Super Lightweight:** Built using plain vanilla JavaScript and modern Manifest V3. No heavy frameworks, no external dependencies, and zero tracking.

---

## How to Install It Locally

Since this is an open-source project and not on the Chrome Web Store yet, you can load it directly into your browser as a developer:

1. **Clone or Download** this repository to your local machine.
2. Open Chrome and go to `chrome://extensions/` in the address bar.
3. In the top-right corner, switch the **Developer mode** toggle to **ON**.
4. In the top-left corner, click **Load unpacked**.
5. Select the root folder of this project (the one containing `manifest.json`).

---

## How to Use It

1. Head over to any site with plenty of links (like Wikipedia, Reddit, or a documentation portal).
2. Press and **hold the `Alt` key**.
3. **Hover your cursor** over a link. 
4. After a tiny 300ms delay (added so it doesn’t glitch out while you're quickly moving your mouse across the screen), the preview window will open.
5. Move your mouse straight into the box to scroll the page.
6. Move your mouse away from both the link and the box to close it instantly.

---

## Project Structure

* `manifest.json` - Tells Chrome what permissions the script needs to run.
* `content.js` - Handles the hover event listeners, timing logic, and creating/destroying the preview box.
* `styles.css` - Custom UI layout, shadows, and smooth positioning behavior for the popup box.

---

## ⚠️ The "Refused to Connect" Catch (Important Note)

You will notice that on a few major websites—like Google, YouTube, GitHub, or Facebook—the preview window pops up but displays a *"Refused to connect"* error. 

This is **not a bug in the extension**. Security-conscious sites send a specific HTTP header called `X-Frame-Options: SAMEORIGIN` (or specific Content Security Policies). This is a built-in browser defense mechanism designed to prevent "clickjacking" by blocking their pages from being embedded inside an `<iframe>` on external websites. 

HoverPeek works perfectly on standard blogs, documentation pages, forums, news outlets, and wikis, which covers the vast majority of deep-dive research browsing!

---

## License

MIT License. Do whatever you want with the code—fork it, tweak the styles, or add new features!