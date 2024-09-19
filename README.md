# QuickReplace 📜

<p align="center">
  <img src="./src/logo.png" alt="Logo QuickReplace">
</p>

The QuickReplace extension helps you create VSCode completion suggestions, which will be replaced by the content of the pattern you have defined.

## Features

- **Completion Suggestions**: Offers user-defined patterns during typing.
- **Automatic Replacement**: Automatically replaces patterns with defined text strings.
- **Customization**: Allows you to easily define and manage your own patterns and replacements.

## Installation

1. Download the extension from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=BURKLEEliott.quickreplace).
2. Open Visual Studio Code.
3. Go to the extensions tab and search for "QuickReplace".
4. Click on "Install".

## Usage

1. Open the VSCode command palette (Ctrl + Shift + P).
2. Run the command: *QuickReplace: Edit Patterns*.
3. Edit and add your patterns and corresponding replacement strings.
4. Run the command: *QuickReplace: Reload Patterns* (this will activate the modified/created patterns).
5. While typing, use the completion suggestions to quickly insert your defined text strings. (Ctrl + Space to activate Intellisense)

## Configuration

The extension configuration is done via the *QuickReplace: Edit Patterns* command (from the VSCode command palette) by adding patterns and replacements in the extension settings. Here is an example configuration:

```json
{
    "@quickreplace": "<div>\n  <h1>QuickReplace</h1>\n  <p>Here is an example</p>\n</div>",
    "@test": "Use the “Edit Patterns” command to add your own patterns"
}