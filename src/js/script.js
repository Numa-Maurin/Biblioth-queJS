let xhrAdherent = new XMLHttpRequest();
let xhrAjoutAdherent = new XMLHttpRequest();
let xhrLivre = new XMLHttpRequest();
let xhrLivreE = new XMLHttpRequest();
let div_adherent = document.getElementById("listeAdherents");
let div_LivreDispo = document.getElementById("listeLivresDisponibles");
let div_LivreEmpruntés = document.getElementById("listeLivresEmpruntes");

charger_adherent();
charger_livres();
charger_livresEmpruntes();

function callback() {

    let tab = JSON.parse(xhrAdherent.responseText);
    div_adherent.innerHTML = "";

    for (let i = 0; i != tab.length; i ++) {
        div_adherent.innerHTML = div_adherent.innerHTML + "<p>" + tab[i].idAdherent + "-"+ tab[i].nomAdherent+"</p>";
    } 

}

function charger_adherent() {
	let url = 'http://webinfo.iutmontp.univ-montp2.fr/~maurinn/td7-Numa-Maurin/src/php/collecteAdherent.php';

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
	let url = 'http://webinfo.iutmontp.univ-montp2.fr/~maurinn/td7-Numa-Maurin/src/php/collecteLivreDispo.php';

	xhrLivre.open("GET", url, true);
	xhrLivre.addEventListener('load', callback_livre);
	xhrLivre.send(null);
}



function callback_livreEmpruntes() {

    let tab = JSON.parse(xhrLivreE.responseText);
    div_LivreEmpruntés.innerHTML = "";

    for (let i = 0; i != tab.length; i ++) {
        div_LivreEmpruntés.innerHTML = div_LivreEmpruntés.innerHTML + "<p>" + tab[i].idLivre + "-"+ tab[i].titreLivre+"</p>";
    } 

}

function charger_livresEmpruntes() {
	let url = 'http://webinfo.iutmontp.univ-montp2.fr/~maurinn/td7-Numa-Maurin/src/php/collecteLivreEmpruntes.php';

	xhrLivreE.open("GET", url, true);
	xhrLivreE.addEventListener('load', callback_livreEmpruntes);
	xhrLivreE.send(null);
}