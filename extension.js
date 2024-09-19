const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

let patterns = {};

function loadPatterns(context) {
    const filePath = path.join(context.extensionPath, 'patterns.json');
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } else {
        return {};
    }
}

function activate(context) {
    console.log('Extension "quickreplace" is now active!');
    patterns = loadPatterns(context);

    const provider = vscode.languages.registerCompletionItemProvider(
        { scheme: 'file', language: '*' },
        {
            provideCompletionItems(document, position) {
                const line = document.lineAt(position);
                const completionItems = [];

                const text = line.text.substring(0, position.character);
                const lastSpaceIndex = text.lastIndexOf(' ');
                const prefix = text.substring(lastSpaceIndex + 1);

                for (const key in patterns) {
                    const value = patterns[key];
                    if (key.startsWith(prefix)) {
                        const item = new vscode.CompletionItem(key, vscode.CompletionItemKind.Snippet);
                        item.detail = `Replace with: ${value}`;

                        const startPos = position.translate(0, -prefix.length);
                        const endPos = position;
                        const range = new vscode.Range(startPos, endPos);
                        item.range = range;

                        item.insertText = value;
                        completionItems.push(item);
                    }
                }
                return completionItems;
            }
        }
    );

    context.subscriptions.push(provider);

    const reloadDisposable = vscode.commands.registerCommand('extension.reloadPatterns', () => {
        patterns = loadPatterns(context);
        vscode.window.showInformationMessage('Patterns reloaded successfully!');
    });

    context.subscriptions.push(reloadDisposable);

    const editPatternsDisposable = vscode.commands.registerCommand('extension.editPatterns', () => {
        const filePath = path.join(context.extensionPath, 'patterns.json');
        vscode.workspace.openTextDocument(filePath).then((document) => {
            vscode.window.showTextDocument(document);
        });
    });

    context.subscriptions.push(editPatternsDisposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};