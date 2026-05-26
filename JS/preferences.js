window.addEventListener("load", function() {
    let theme = localStorage.getItem('theme') || 'clair';
    let affichage = localStorage.getItem('affichage') || 'liste';

    document.getElementById('theme').value = theme;
    document.querySelector(`input[value="${affichage}"]`).checked = true;

    document.querySelector('.enregistrer').addEventListener('click', function() {
        let theme = document.getElementById('theme').value;
        let affichage = document.querySelector('input[name="affichage"]:checked').value;
        
        localStorage.setItem('theme', theme);
        localStorage.setItem('affichage', affichage);
        alert("Préférences enregistrées !")
    });
});