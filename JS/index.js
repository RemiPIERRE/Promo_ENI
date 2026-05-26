let theme = localStorage.getItem('theme') || 'clair';
document.body.setAttribute('data-theme', theme);

let affichage = localStorage.getItem("affichage") || "liste";
let dataJson;

document.querySelector(`input[value="${affichage}"]`).checked = true;

if (affichage === "liste") {
    document.getElementById("apprenants_card").style.display = "none";
} else {
    document.getElementById("apprenants_list").style.display = "none";
}

fetch('assets/data/data.json')
    .then(response => response.json())
    .then(data => createTab(data));

function createTab(data) {
    dataJson = data;
    if (affichage === 'liste') {
        createList(data);
    } else {
        createCards(data);
    }
}

function createList(data) {
    let html = `<table>
        <thead>
            <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Ville</th>
                <th></th>
            </tr>
        </thead>
        <tbody>`;

    data.apprenants.forEach(apprenant => {
        html += `
            <tr>
                <td>${apprenant.nom}</td>
                <td>${apprenant.prenom}</td>
                <td>${apprenant.ville}</td>
                <td><button class="btnDetail">Détail</button></td>
            </tr>`;
    });

    html += `</tbody></table>`;
    document.getElementById("apprenants_list").innerHTML = html;
}

function createCards(data) {
    let html = "";

    data.apprenants.forEach(apprenant => {
        html += `
            <div>
                <p class="cardNom">${apprenant.nom} ${apprenant.prenom}</p>
                <p>${apprenant.ville}</p>
                <button class="btnDetail">Détail</button>
            </div>`;
    });

    document.getElementById("apprenants_card").innerHTML = html;
}

document.querySelectorAll('input[name="affichage"]').forEach(radio => {
    radio.addEventListener("change", function () {
        if (this.value === 'liste') {
            document.getElementById("apprenants_card").style.display = "none";
            document.getElementById("apprenants_list").style.display = "block";
            createList(dataJson);
        } else {
            document.getElementById("apprenants_list").style.display = "none";
            document.getElementById("apprenants_card").style.display = "flex";
            createCards(dataJson);
        }
    });
});