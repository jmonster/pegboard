# Pegboard

A status board for software that ships on many platforms. One YAML file lists your platforms, devices and features. Zoomed out, the page shows how complete each platform is. Zoom in and it shows every feature's state, device by device, with notes.

**Demo:** https://jmonster.github.io/pegboard/

## Run it

```sh
git clone https://github.com/jmonster/pegboard
cd pegboard
npm install
npm run dev
```

Edit `status.yaml` and the page reloads. `npm run build` writes a static site to `dist/` and stops with the exact row if a key or state is wrong.

## The data

```yaml
title: My App

columns:
  Apple:
    tvos: {name: Apple TV, atvhd: HD, atv4k3: 4K (3rd gen)}
    ios: {name: iPhone}
  Web:
    web: {name: Browser, chrome: Chrome, safari: Safari}

Features:
  Playback:
    Downloads: {apple: built, web: plan}
    HDR: {tvos: done, atvhd: na no HDR output, safari: built, chrome: wip}

Performance:
  Startup:
    Launch time: {unit: ms, better: low, atv4k3: 840, ios: 610}
```

A cell is a state, optionally followed by a note. A key can be a family (`apple`), a platform (`tvos`) or a device (`atvhd`); the most specific one wins. Each row stays on one line, so an update is a one-line change.

| State | Meaning |
| --- | --- |
| `done` | Verified on that platform or device |
| `built` | Works, not yet verified |
| `wip` | In progress |
| `plan` | Planned |
| `broken` | The latest check failed |
| `na` | Does not apply |
| blank | Missing |

Store rows use `live`, `review` and `beta`. Rows with a `unit` are drawn as bars per device.

Each platform card shows the share of its rows that work (built or verified) and the share verified. A blank cell counts against the platform; `na` does not.

## Let an agent maintain it

Point your coding agent at [AGENT.md](AGENT.md). It builds the columns and rows from your repository's tests and receipts, then gives you one line for your `AGENTS.md` so later work updates the board one cell at a time.

## Controls

Pinch or Ctrl/⌘-scroll to zoom, drag to pan, click a card or tile to focus it, and press Esc for the overview. Focused views have their own links.

## Publish

The included workflow deploys to GitHub Pages on every push to `main`. In the repository's Settings → Pages, set Source to GitHub Actions.

## License

[PolyForm Shield 1.0.0](LICENSE.md). You may use it, change it, fork it and keep your board private, for any purpose except providing a product that competes with it.
