const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

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
	let patterns = loadPatterns(context);
	console.log(patterns);
	
	const provider = vscode.languages.registerCompletionItemProvider(
		{ scheme: 'file', language: '*' },
		{
			provideCompletionItems(document, position) {
				console.log(position);
				console.log('document', document['fileName']);
				console.log('provideCompletionItems called');
				const line = document.lineAt(position);
				const completionItems = [];
	
				// Extraire la sous-chaîne de la ligne qui commence par '@' et se termine par le prochain espace ou la fin de la ligne
				const text = line.text.substring(0, position.character);
				const match = text.match(/@(\S*)$/);
				const prefix = match ? match[1] : '';
	
				for (const key in patterns) {
					console.log('key', key);
					if (patterns.hasOwnProperty(key)) {
						const value = patterns[key];
						console.log('prefix', prefix);
						if (key.startsWith(prefix)) {
							const item = new vscode.CompletionItem(key, vscode.CompletionItemKind.Snippet);
							item.detail = `Replace with: ${value}`;

							const startPos = position.translate(0, -prefix.length - 1);
							const endPos = position;
							const range = new vscode.Range(startPos, endPos);
							item.range = range;

							item.insertText = value;
							completionItems.push(item);
						}
					}
				}
	
				return completionItems;
			}
		},
		'@'
	);
	
	context.subscriptions.push(provider);
	
	console.log('Completion item provider registered');
	
	let reloadDisposable = vscode.commands.registerCommand('extension.reloadPatterns', () => {
		patterns = loadPatterns(context);
		vscode.window.showInformationMessage('Patterns reloaded successfully!');
	});

    context.subscriptions.push(provider);
    context.subscriptions.push(reloadDisposable);

	let editPatternsDisposable = vscode.commands.registerCommand('extension.editPatterns', () => {
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
