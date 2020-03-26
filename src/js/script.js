//requetes AJAX
let xhrAdherent = new XMLHttpRequest();
let xhrAjoutAdherent = new XMLHttpRequest();
let xhrAjoutLivre = new XMLHttpRequest();
let xhrNomDunAdherent = new XMLHttpRequest();
let xhrLivresDunAdherent = new XMLHttpRequest();
let xhrPreterLivre = new XMLHttpRequest();
let xhrRecupererAdherentDuLivre = new XMLHttpRequest();
let xhrRecupererLivre = new XMLHttpRequest();
let xhrLivre = new XMLHttpRequest();
let xhrLivreE = new XMLHttpRequest();

//selection des divs a remplir
let div_adherent = document.getElementById("listeAdherents");
let div_LivreDispo = document.getElementById("listeLivresDisponibles");
let div_LivreEmpruntes = document.getElementById("listeLivresEmpruntes");

//Variables globales
let nomAdherentClick = null;

//ajout adherent
let zonesaisie= document.getElementById("nomAdherent");
let boutonAjout= document.getElementById("ajouterAdherent");
boutonAjout.addEventListener("click",function(){ 
    let url = "http://localhost/JS/td7/src/php/ajoutAdherent.php?nom="+zonesaisie.value;
    xhrAjoutAdherent.open("GET", url, true);
    xhrAjoutAdherent.addEventListener('load', function(){
        alert("L'adhérent "+zonesaisie.value+" a été ajouté.");
        zonesaisie.value='';
    });
    xhrAjoutAdherent.send(null);
    charger_adherent();
 })

//ajout livre
let zonesaisieLivre= document.getElementById("titreLivre");
let boutonAjoutLivre= document.getElementById("ajouterLivre");
boutonAjoutLivre.addEventListener("click",function(){
    let url = "http://localhost/JS/td7/src/php/ajoutlivre.php?nom="+zonesaisieLivre.value;
    xhrAjoutLivre.open("GET", url, true);
    xhrAjoutLivre.addEventListener('load', function(){
        alert("Le livre "+zonesaisieLivre.value+" a été ajouté.");
        zonesaisieLivre.value='';
    });
    xhrAjoutLivre.send(null);
    charger_livres();
 })


//affichage des adherents dans leurs div
function callback() {

    let tab = JSON.parse(xhrAdherent.responseText);
    let ul = document.createElement("ul");
    div_adherent.innerHTML = "";
    div_adherent.appendChild(ul);

    for (let i = 0; i != tab.length; i ++) {
        let li = document.createElement("li");
        li.innerHTML = tab[i].idAdherent + "-"+ tab[i].nomAdherent;
        li.setAttribute("onclick","recupererLivresDunAdherent('"+tab[i].idAdherent+"')");
        div_adherent.children[0].appendChild(li);
    }

}

function charger_adherent() {
    //on vide d'abord le div de tous ses enfants
    while(div_adherent.children.length > 0){
		div_adherent.removeChild(div_adherent.children[0]);
    }

	let url = 'http://localhost/JS/td7/src/php/collecteAdherent.php';

	xhrAdherent.open("GET", url, true);
	xhrAdherent.addEventListener('load', callback);
    xhrAdherent.send(null);

    //on lance la fonction qui gere le nombre d'abonnement
    //maj_NombreEmprunts();
}

//affichage des livres disponibles
function callback_livre() {

    let tab = JSON.parse(xhrLivre.responseText);
    let ul = document.createElement("ul");
    div_LivreDispo.innerHTML = "";
    div_LivreDispo.appendChild(ul);

    for (let i = 0; i != tab.length; i ++) {
        let li = document.createElement("li");
        li.innerHTML =  tab[i].idLivre + "-"+ tab[i].titreLivre;
        li.setAttribute("onclick", "preterLivre('"+tab[i].idLivre+"','"+tab[i].titreLivre+"')");
        div_LivreDispo.children[0].appendChild(li);
    }

}

function charger_livres() {
    //on vide le div
    while(div_LivreDispo.children.length > 0){
		div_LivreDispo.removeChild(div_LivreDispo.children[0]);
    }

	let url = 'http://localhost/JS/td7/src/php/collecteLivreDispo.php';

	xhrLivre.open("GET", url, true);
	xhrLivre.addEventListener('load', callback_livre);
	xhrLivre.send(null);
}


//affichage des livres dans le div emprunté
function callback_livreEmpruntes() {

    let tab = JSON.parse(xhrLivreE.responseText);
    let ul = document.createElement("ul");
    div_LivreEmpruntes.innerHTML = "";
    div_LivreEmpruntes.appendChild(ul);

    for (let i = 0; i != tab.length; i ++) {
        let li = document.createElement("li");
        li.innerHTML =  tab[i].idLivre + "-"+ tab[i].titreLivre;
        li.setAttribute("onclick", "recupererAdherentDuLivre('"+tab[i].idLivre+"')");
        div_LivreEmpruntes.children[0].appendChild(li);
    }

}

function charger_livresEmpruntes() {
    //on vide le div
    while(div_LivreEmpruntes.children.length > 0){
		div_LivreEmpruntes.removeChild(div_LivreEmpruntes.children[0]);
    }
	let url = 'http://localhost/JS/td7/src/php/collecteLivreEmpruntes.php';
	xhrLivreE.open("GET", url, true);
	xhrLivreE.addEventListener('load', callback_livreEmpruntes);
	xhrLivreE.send(null);
}

//Click sur adhérent
function callback_LivresSuite(){
    let tab = JSON.parse(xhrLivresDunAdherent.responseText);
    let message = nomAdherentClick;
    if(tab.length == 1){
        message += " a " + tab.length + " emprunt en ce moment : \n\n";
    }
    else if(tab.length == 0){
        message += " a " + tab.length + " emprunt en ce moment.\n";
    }
    else{
        message += " a " + tab.length + " emprunts en ce moment : \n\n";
    }

    for(let i = 0; i < tab.length;i++){
        message += "- "+tab[i].titreLivre + "\n";
    }
    alert(message);
}

function callback_LivresDunAdherent() {
    let tabReponse = JSON.parse(xhrNomDunAdherent.responseText);
    console.log(tabReponse);
    nomAdherentClick = tabReponse[0].nomAdherent;
    let url = 'http://localhost/JS/td7/src/php/LivresDunAdherent.php?idAdherent='+tabReponse[0].idAdherent;
    xhrLivresDunAdherent.open("GET", url, true);
    xhrLivresDunAdherent.addEventListener('load', callback_LivresSuite);
    xhrLivresDunAdherent.send(null);
}


function recupererLivresDunAdherent(idAdherent) {
    let url = 'http://localhost/JS/td7/src/php/nomDunAdherent.php?idAdherent='+idAdherent;
    xhrNomDunAdherent.open("GET", url, true);
    xhrNomDunAdherent.addEventListener('load', callback_LivresDunAdherent);
    xhrNomDunAdherent.send(null);
}

//Click pour preter un livre

function callback_PreterRecupererLivre(){
    charger_livres();
    charger_livresEmpruntes();
}

function preterLivre(idLivre, titreLivre){
    let idAdherent = prompt("prêt de \""+ titreLivre + "\".\nn° de l'emprunteur ?", "");
    idAdherent = parseInt(idAdherent);
    let url = "http://localhost/JS/td7/src/php/PreterLivre.php?idAdherent="+idAdherent+"&idLivre="+idLivre;
    xhrPreterLivre.open("GET", url, true);
    xhrPreterLivre.addEventListener('load', callback_PreterRecupererLivre);
    xhrPreterLivre.send(null);
}

//Click pour récuperer un livre

function callback_RecupererAdherentDuLivre(){
    let nomAdherentDuLivre= JSON.parse(xhrRecupererAdherentDuLivre.responseText);
    let messageConfirm = "Livre prêté à "+nomAdherentDuLivre[0].nomAdherent+".\nRetour de ce livre ?";
    if(confirm(messageConfirm)){
        let url = 'http://localhost/JS/td7/src/php/RecupererLivre.php?idLivre='+nomAdherentDuLivre[0].idLivre;
        xhrRecupererLivre.open("GET", url, true);
        xhrRecupererLivre.addEventListener('load', callback_PreterRecupererLivre);
        xhrRecupererLivre.send(null);
    }
}

function recupererAdherentDuLivre(idLivre){
    let url = 'http://localhost/JS/td7/src/php/RecupererAdherentDuLivre.php?idLivre='+idLivre;
    xhrRecupererAdherentDuLivre.open("GET", url, true);
    xhrRecupererAdherentDuLivre.addEventListener('load', callback_RecupererAdherentDuLivre);
    xhrRecupererAdherentDuLivre.send(null);
}


//lancement des fonctions d'affichages
charger_adherent();
charger_livres();
charger_livresEmpruntes();