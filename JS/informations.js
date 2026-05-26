let theme = localStorage.getItem('theme') || 'clair';
document.body.setAttribute('data-theme', theme);

fetch('assets/data/data.json')
    .then(response => response.json())
    .then(data => drawInfo(data));

function drawInfo(data) {
    document.querySelector('nav h1').innerText = `Promo ${data.formation.name}`;
    document.getElementById('debut').innerText = data.formation.debut;
    document.getElementById('fin').innerText = data.formation.fin;
    document.getElementById('apprenant').innerText = data.formation.apprenants;
    for (let i = 0; data.formation.description[i]; i++) {
        document.getElementById('description').innerHTML += `<p>${data.formation.description[i]}</p><br>`;
    }
}