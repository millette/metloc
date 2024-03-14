# metloc readme

## Installer

```sh
curl -fsSL https://bun.sh/install | bash
git clone https://github.com/millette/metloc.git
cd metloc
```

## Exécuter

```sh
bun index.js [CHEMIN-VERS-UNE-IMAGE]
```

Voilà, ça va ouvrir google maps sur les coordonnées de l'image.

Si on veut plutôt un lien vers OpenStreetMap il faut passer "osm" comme dernier argument:

```sh
bun index.js [CHEMIN-VERS-UNE-IMAGE] osm
```
