fetch('assets/data/data.json').then(Response => Response.json()).then(data => createList(data))

function createList(data) {
    let table = 
    `<table>
    <thead>
    <tr>
    <th>Nom</th>
    <th>Prenom</th>
    <th>Ville</th>
    </tr>
    </thead>
    <tbody>`

    data.apprenants.forEach(apprenants => {
        table += `
        <tr>
        <td>${apprenants.nom}</td>
        <td>${apprenants.prenom}</td>
        <td>${apprenants.ville}</td>
        <td><button class="btnDetail">Détail</button></td>
        </tr>
        `
    });
    table += `
    </tbody>
    </table>`

    document.getElementById("table").innerHTML = table;
}