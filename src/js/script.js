let xhrAdherent = new XMLHttpRequest();
let xhrLivre = new XMLHttpRequest();
let div_adherent = document.getElementById("listeAdherents");
let div_LivreDispo = document.getElementById("listeLivresDisponibles");
charger_adherent();
charger_livres();

function callback() {

    let tab = JSON.parse(xhrAdherent.responseText);
    div_adherent.innerHTML = "";

    for (let i = 0; i != tab.length; i ++) {
        div_adherent.innerHTML = div_adherent.innerHTML + "<p>" + tab[i].idAdherent + "-"+ tab[i].nomAdherent+"</p>";
    } 

}

function charger_adherent() {
	let url = 'http://localhost/td7-numa-maurin/src/php/collecteAdherent.php';

	xhrAdherent.open("GET", url, true);
	xhrAdherent.addEventListener('load', callback);
	xhrAdherent.send(null);
}


function callback_livre() {

    let tab = JSON.parse(xhrLivre.responseText);
    div_LivreDispo.innerHTML = "";

    for (let i = 0; i != tab.length; i ++) {
        div_LivreDispo.innerHTML = div_LivreDispo.innerHTML + "<p>" + tab[i].idLivre + "-"+ tab[i].titreLivre+"</p>";
    } 

}

function charger_livres() {
	let url = 'http://localhost/td7-numa-maurin/src/php/collecteLivreDispo.php';

	xhrLivre.open("GET", url, true);
	xhrLivre.addEventListener('load', callback_livre);
	xhrLivre.send(null);
}