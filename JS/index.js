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
    document.querySelector('nav h1').innerText = `Promo ${data.formation.name}`;
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
                <td><button class="btnDetail" data-id="${apprenant.id}">Détail</button></td>
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
                <button class="btnDetail" data-id="${apprenant.id}">Détail</button>
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

document.getElementById('modalClose').addEventListener('click', function (e) {
    e.stopPropagation();
    document.getElementById('modalDetail').close();
});

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('btnDetail')) {
        let x = e.clientX;
        let y = e.clientY;

        let modal = document.getElementById('modalDetail');
        let id = e.target.dataset.id;
        let apprenant = dataJson.apprenants[id - 1];

        document.getElementById('modalAvatar').src = apprenant.avatar
            ? "assets/images/" + apprenant.avatar
            : "assets/images/avatar.png";
        document.getElementById('modalNom').innerText = apprenant.nom;
        document.getElementById('modalPrenom').innerText = apprenant.prenom;
        document.getElementById('modalVille').innerText = apprenant.ville;
        document.getElementById('modalAnecdotes').innerHTML = "";
        for (let i = 0; i < apprenant.anecdotes.length; i++) {
            document.getElementById('modalAnecdotes').innerHTML += `<p>${apprenant.anecdotes[i]}</p>`;
        }

        modal.showModal();

        if (affichage === 'liste') {
            let table = document.querySelector('table');
            let tableRect = table.getBoundingClientRect();
            modal.style.transform = 'translateY(-50%)';
            modal.style.left = tableRect.right + 20 + 'px';
            modal.style.top = '50%';
        } else {
            modal.style.transform = 'none';
            if (x + modal.offsetWidth > window.innerWidth) {
                modal.style.left = window.innerWidth - modal.offsetWidth - 10 + 'px';
            } else {
                modal.style.left = x + 'px';
            }
            if (y + modal.offsetHeight > window.innerHeight) {
                modal.style.top = Math.max(0, window.innerHeight - modal.offsetHeight - 10) + 'px';
            } else {
                modal.style.top = y + 'px';
            }
        }
    }
});