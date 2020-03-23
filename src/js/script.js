let xhr = new XMLHttpRequest();
let div_adherent = document.getElementById("listeAdherents");
charger_adherent();

function callback() {

    let tab = JSON.parse(xhr.responseText);
    div_adherent.innerHTML = "";

    for (let i = 0; i != tab.length; i ++) {
        div_adherent.innerHTML = div_adherent.innerHTML + "<p>" + tab[i].idAdherent + "-"+ tab[i].nomAdherent+"</p>";
    } 

}

function charger_adherent() {
	let url = 'http://localhost/td7-numa-maurin/src/php/recherche.php';

	xhr.open("GET", url, true);
	xhr.addEventListener('load', callback);
	xhr.send(null);
}