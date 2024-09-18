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
	let patterns_tmp = loadPatterns(context);
	let patterns = patterns_tmp.patterns;

	let events = [];
	patterns.forEach(pattern => {
		events.push(pattern.event);
	});
	console.log(events);
	console.log(patterns);
	
	const provider = vscode.languages.registerCompletionItemProvider(
		{ scheme: 'file', language: '*' },
		{
			provideCompletionItems(document, position, context) {
				console.log('provideCompletionItems called');
				const line = document.lineAt(position);
				const completionItems = [];
	
				const text = line.text.substring(0, position.character);
				const match = text.match(/@(\S*)$/);
				const prefix = match ? match[1] : '';
				console.log('prefix:', prefix);

				const triggeredEvent = context.triggerCharacter;
				console.log('triggeredEvent:', triggeredEvent);

				patterns.forEach(pattern => {
					if (pattern.event === triggeredEvent) {
						const item = new vscode.CompletionItem(pattern.pattern, vscode.CompletionItemKind.Snippet);
						item.detail = `Replace with: ${pattern.content}`;
				
						const startPos = position.translate(0, -prefix.length - 1);
						const endPos = position;
						const range = new vscode.Range(startPos, endPos);
						item.range = range;
				
						item.insertText = pattern.content;
						completionItems.push(item);
					}
				});
	
				return completionItems;
			}
		},
		...events
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
