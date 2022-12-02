# Json szerver
[json server](https://github.com/typicode/json-server)
[json konverter](https://www.convertsimple.com/convert-javascript-to-json/)

indítás: json-server --watch db.json

```json

```


# Webáruház átalakítás
0. Mindezt úgy, githubbal együttműködve
[git parancsok](https://github.com/kovacsnandor/GitParancsok)
    - github repo: webaruhaz létrehozás
    - leklónozás tokennel
    - user név és email lokális beállítása
    - webáruház bemásolása a helyi repóba, push
    - helyi repóban
        - egy régi ág: 01_memoria
        - mindezt egy új ágban: 02_Json
        - folymatos commit: részfeladatok
        - unána push

1. Adatszerkezet:
    - régi:
```js
{
    id: idGen(),
    name: "Áru 1",
    price: 1500,
    quantity: 97,
    isInStock: true
}
```
    - új:
```js
{
    id: idGen(),
    name: "Áru 1",
    price: 1500,
    quantity: 97,
    type: "tejtermék",
}
```            
2. Létrehozni a db.json fájlt
    - minta:
```json

```
3. Űrlap kiegészítése, javítása
4. Átalakítani json szerveresre.
    - elkészíteni a request.rest: pingelés
    - fetch-el átlakítni a webáruházat




