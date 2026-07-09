# FocusFlow

FocusFlow is a Chrome extension that helps you stay focused by combining a Pomodoro timer with a simple website blocker.

The extension opens in the Chrome side panel, so you can manage your focus sessions and blocked websites without leaving your current tab.

## Features

* Pomodoro timer with focus, short break and long break modes
* Automatic session flow: focus → break → focus
* Long break after every 4 focus sessions
* Timer settings for session durations and alert volume
* Timer completion sound
* Website blocker for distracting sites
* Add, edit and enable/disable blocked websites
* Blocker preferences for timer-based blocking and focus page redirects
* Custom focus page for redirected blocked sites
* Toast notifications for blocker and timer actions
* Upcoming features section for planned improvements
* Data persistence using Chrome local storage
* Side panel interface for quick access

## Tech Stack

* React
* TypeScript
* Vite
* Tailwind CSS
* Motion
* Lucide React
* Sonner
* Chrome Extension Manifest V3
* Chrome Storage API
* Chrome Declarative Net Request API

## Getting Started

### Prerequisites

Make sure you have Node.js installed.

This project uses `pnpm` in the examples below.

### Installation

Clone the repository:

```bash
git clone https://github.com/ArtemShuhat/FocusFlow.git
cd FocusFlow
```

Install dependencies:

```bash
pnpm install
```

Build the extension:

```bash
pnpm build
```

## Running in Chrome

After building the project:

1. Open Chrome.
2. Go to `chrome://extensions`.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the generated `dist` folder.

The extension should now be available in Chrome.

## Development

To rebuild the extension automatically while working on it, run:

```bash
pnpm dev
```

Then reload the extension manually from `chrome://extensions` after changes.

## Project Structure

```bash
src/
├── app/
│   ├── blocker/       # Website blocking logic and UI
│   ├── header/        # App header
│   └── timer/         # Pomodoro timer logic and UI
├── assets/            # Fonts and static assets
├── shared/
│   └── ui/            # Reusable UI components
├── background.ts      # Chrome extension background script
├── App.tsx
└── main.tsx
```

Additional current entries:

```bash
src/app/focus-page/        # Focus redirect page shown instead of blocked sites
src/app/soon/              # Upcoming features section
src/assets/sounds/         # Timer alert sounds
src/app/timer/lib/         # Timer helper utilities
src/app/timer/hooks/       # Timer hooks and settings hooks
src/app/blocker/hooks/     # Blocked sites and blocker settings hooks
focus.html                 # Standalone focus page entry
```

## License

This project is currently not licensed.
