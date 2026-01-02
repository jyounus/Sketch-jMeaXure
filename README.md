# Sketch jMeaXure (Updated for Sketch 2025.3+)
fork of [Sketch meaXure](https://gitee.com/hubzyy/sketch-meaxure) 
fork of [Sketch Measure](https://github.com/utom/sketch-measure) 

## Overview

**Sketch jMeaXure** is a plugin for Sketch that helps generate design specs for developers and teammates. This repository is a fork of the project maintained by **hubzy**, which was a fork of the original project created by **utom**.

The reason I created this repo is because utom's repository is outdated and no longer maintained, and hubzy's repo is hosted on Gitee and in Chinese, which I don’t understand. 

Additionally, hubzy's repo hasn't been updated in over 6 months, and no new releases have been made to fix the export issue with the plugin. After the release of Sketch 2025.3, the export functionality broke due to API changes. I’ve made the necessary fixes to restore the export feature and ensure compatibility with Sketch 2025.3 and newer.


### Original Repositories:

* **[utom's repo (pre-Sketch 2025)](https://github.com/utom/sketch-measure)**: The original creator of this plugin that worked with older Sketch releases.
* **[hubzy’s repo (updated for Sketch 2025)](https://gitee.com/hubzyy/sketch-jmeaxure/tree/master)**: hubzy’s fork, which was updated for Sketch 2025.

### Credits

* **utom**: For creating the original plugin and laying the foundation.
* **hubzy**: For maintaining the plugin and providing the initial update for Sketch 2025 compatibility.

---

## What's New

* **Updated dependencies**: All package versions have been updated to ensure compatibility and successful local builds.
* **Export functionality restored**: Due to API changes in Sketch 2025.3, the export feature broke. This has been fixed, and the export function now works as expected.
* **Default language changed to English**: The plugin’s default language was previously set to Chinese. Since I don’t understand Chinese, I’ve updated it to English to make it more accessible for English-speaking users.

**Note:** While I plan to keep this plugin functional for future Sketch releases, I will not be adding new features. If you’d like to contribute, feel free to open a PR!

---

## Contributing

I’m happy to accept pull requests that address bugs or improve the functionality of the plugin. If you’d like to contribute, please ensure:

1. PRs are focused and professional - only include the necessary changes.
2. Avoid committing unnecessary files or changes.
3. Ensure your PR is easy to review by keeping changes small and well-documented.
4. Contributions should be in English for easier review and understanding.

I will review contributions and merge them if they align with the goal of maintaining compatibility with the latest Sketch versions.

---

## Installation & Building

These instructions are based on my development environment: macOS Tahoe 26.2.

### Prerequisites

Ensure you're using **Node 20.19.6**. If you're using `nvm` (Node Version Manager), you can switch to this version by running:

```bash
nvm use 20.19.6
```

### Setup

1. **Clean up old dependencies**:
   Remove the existing `node_modules` folder and `package-lock.json` file:

   ```bash
   rm -Rf node_modules && rm package-lock.json
   ```

2. **Install dependencies**:
   Install the required dependencies:

   ```bash
   npm install --ignore-scripts
   ```

3. **Build the plugin**:
   Build the project to generate the `.sketchplugin` file:

   ```bash
   npm run build
   ```

This will generate the `sketch-jmeaxure.sketchplugin` file for manual installation.

---

## Installing the Plugin into Sketch

After building the plugin, you’ll have a `.sketchplugin` file. To install it:

1. Copy the `.sketchplugin` file.

2. Navigate to your Sketch plugin folder:

   ```bash
   ~/Library/Application\ Support/com.bohemiancoding.sketch3/Plugins/
   ```

3. Paste the `.sketchplugin` file into this folder.

The plugin should now be available for use in Sketch!

---

## License

This project is licensed under the [MIT License](LICENSE).

