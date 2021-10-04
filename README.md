# Mock Fournisseur d'Identité

Ce mock permet de simuler un FI en fonctionnement normal mais aussi des cas extrêmes (erreur 500, timeout, réponse mal formée, etc.)


## Implémentation

Ce mock repose sur le FI d'exemple public de france connect [disponible sur GitHub](https://github.com/france-connect/identity-provider-example).


## Utilisation

Ce mock fonctionne comme le FI d'exemple, pour l'utiliser :

 - Faire pointer le lien symbolique du volume docker de fip1 vers une copie de ce dépôt.
 - Redémarrer le container fip1

## Contribution

Les comportement spéciaux sont enregistrés dans les fichiers suivants :

| Fichier | Usage |
| ------- | ----- |
| [overrides/redirect.js](https://gitlab.com/france-connect/fi-mock/blob/master/src/overrides/redirect.js) | Modifier les paramètre de l'URL oidc_callback avant redirection |
| [overrides/userinfo.js](https://gitlab.com/france-connect/fi-mock/blob/master/src/overrides/userinfo.js) | Modifier la réponse lors de l'appel du core à /userinfo |


Les comportement sont induits en fournissant un identifiant de connexion spécifique (qui doit être présent dans la base de donnée du FI).

L'identifiant de connexion est ensuite repéré dans un switch/case dans l'un des fichiers ci-dessus.
