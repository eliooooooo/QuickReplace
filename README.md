# QuickReplace 📜

L'extension QuickReplace vous aide à créer des suggestions de complétion VSCode, qui seront remplacées par le contenu du pattern que vous avez défini.

## Fonctionnalités

- **Suggestions de complétion** : Propose des patterns définis par l'utilisateur lors de la saisie.  
- **Remplacement automatique** : Remplace automatiquement les patterns par les chaînes de texte définies.  
- **Personnalisation** : Permet de définir et de gérer facilement vos propres patterns et remplacements.  

## Installation

1. Téléchargez l'extension depuis le [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/).
2. Ouvrez Visual Studio Code.
3. Allez dans l'onglet des extensions et recherchez "QuickReplace".
4. Cliquez sur "Installer".

## Utilisation

1. Ouvrez la palette de commandes VSCode ( Ctrl + Shift + P ).  
2. Lancez la commande : *QuickReplace: Edit Patterns*.  
3. Modifiez et ajoutez vos patterns et les chaînes de remplacement correspondantes.  
4. Lancez la commande : *QuickReplace: Reload Patterns* ( cela va activer les patterns modifiés/créés ).  
5. Lors de la saisie, utilisez les suggestions de complétion pour insérer rapidement vos chaînes de texte définies.  

## Configuration

La configuration de l'extension se fait via la commande *QuickReplace: Edit Patterns* ( depuis la palette de commande VSCode ) en ajoutant des patterns et des remplacements dans les paramètres de l'extension. Voici un exemple de configuration :

```json
{
    "@test": "Use the “Edit Patterns” command to add your own patterns"
}
```
