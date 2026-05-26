let theme = localStorage.getItem('theme') || 'clair';
document.body.setAttribute('data-theme', theme);

const map = L.map('map').setView([46.603354, 1.888334], 5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: '© OpenStreetMap'
}).addTo(map);

console.log(document.getElementById('map'));
console.log(document.getElementById('map').offsetHeight);

fetch('assets/data/data.json')
    .then(response => response.json())
    .then(data => {
        document.querySelector('nav h1').innerText = `Promo ${data.formation.name}`
        data.apprenants.forEach(apprenant => {
            if (apprenant.coordonnees.latitude !== 0) {
                L.marker([apprenant.coordonnees.latitude, apprenant.coordonnees.longitude])
                    .addTo(map)
                    .bindPopup(`<b>${apprenant.prenom} ${apprenant.nom}</b><br>${apprenant.ville}`);
            }
        });
    });