//requetes AJAX
let xhrAdherent = new XMLHttpRequest();
let xhrAjoutAdherent = new XMLHttpRequest();
let xhrAjoutLivre = new XMLHttpRequest();
let xhrLivresDunAdherent = new XMLHttpRequest();
let xhrPreterLivre = new XMLHttpRequest();
let xhrRecupererLivre = new XMLHttpRequest();
let xhrNombreEmprunts = new XMLHttpRequest();
let xhrLivre = new XMLHttpRequest();
let xhrLivreE = new XMLHttpRequest();

//selection des divs a remplir
let div_adherent = document.getElementById("listeAdherents");
let div_LivreDispo = document.getElementById("listeLivresDisponibles");
let div_LivreEmpruntés = document.getElementById("listeLivresEmpruntes");

//ajout adherent
let zonesaisie= document.getElementById("nomAdherent");
let boutonAjout= document.getElementById("ajouterAdherent");
boutonAjout.addEventListener("click",function(){ 
    let url = "http://localhost/JS/td7/src/php/ajoutAdherent.php?nom='"+zonesaisie.value+"'";
    xhrAjoutAdherent.open("GET", url, true);
    xhrAjoutAdherent.addEventListener('load', function(){
        alert("l'utilisateur "+zonesaisie.value+" a été ajouté");
        zonesaisie.value='';
    });
    xhrAjoutAdherent.send(null);
    charger_adherent();
 })

//ajout livre
let zonesaisieLivre= document.getElementById("titreLivre");
let boutonAjoutLivre= document.getElementById("ajouterLivre");
boutonAjoutLivre.addEventListener("click",function(){
    let url = "http://localhost/JS/td7/src/php/ajoutlivre.php?nom='"+zonesaisieLivre.value+"'";
    xhrAjoutLivre.open("GET", url, true);
    xhrAjoutLivre.addEventListener('load', function(){
        alert("le livre "+zonesaisieLivre.value+" a été ajouté");
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
        li.id =tab[i].idAdherent;
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
        li.id ="liv"+tab[i].idLivre;
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
    div_LivreEmpruntés.innerHTML = "";
    div_LivreEmpruntés.appendChild(ul);

    for (let i = 0; i != tab.length; i ++) {
        let li = document.createElement("li");
        li.id ="liv"+tab[i].idLivre;
        li.innerHTML =  tab[i].idLivre + "-"+ tab[i].titreLivre;
        li.setAttribute("onclick", "recupererLivre('"+tab[i].idLivre+"')");
        div_LivreEmpruntés.children[0].appendChild(li);
    }

}

function charger_livresEmpruntes() {
    //on vide le div
    while(div_LivreEmpruntés.children.length > 0){
		div_LivreEmpruntés.removeChild(div_LivreEmpruntés.children[0]);
    }

	let url = 'http://localhost/JS/td7/src/php/collecteLivreEmpruntes.php';

	xhrLivreE.open("GET", url, true);
	xhrLivreE.addEventListener('load', callback_livreEmpruntes);
	xhrLivreE.send(null);
}



//mise a jour du nombre d'emprunts par adherent
/*
function callback_NombreEmprunts() {

    let tab = JSON.parse(xhrNombreEmprunts.responseText);
    for (let i = 0; i != tab.length; i ++) {
        let li = document.getElementById(tab[i].idAdherent);
        li.innerHTML = li.innerHTML+ "(emprunts :" +tab[i].nbEmprunt+")";
    }
}

function maj_NombreEmprunts() {
    let url = 'http://localhost/JS/td7/src/php/maj_NombreEmprunts.php';

	xhrNombreEmprunts.open("GET", url, true);
	xhrNombreEmprunts.addEventListener('load', callback_NombreEmprunts);
	xhrNombreEmprunts.send(null);
}

*/
//Click sur adhérent
function callback_LivresDunAdherent() {

    let tab = JSON.parse(xhrLivresDunAdherent.responseText);
    let message = "";
    if(tab.length>1){
        message = " a " + tab.length + " emprunts : \n\n";
    }
    else{
        message = " a " + tab.length + " emprunt.\n";
    }

    for(let i = 0; i < tab.length;i++){
        message += "- "+tab[i].titreLivre + "\n";
    }
    alert(message)
}

function recupererLivresDunAdherent(idAdherent, nomAdherent) {
    let url = 'http://localhost/JS/td7/src/php/LivresDunAdherent.php?idAdherent='+idAdherent;
    xhrLivresDunAdherent.open("GET", url, true);
    xhrLivresDunAdherent.addEventListener('load', callback_LivresDunAdherent);
    xhrLivresDunAdherent.send(null);
}

//Click pour preter un livre

function callback_PreterRecupererLivre(){
    charger_livres();
    charger_livresEmpruntes();
}

function preterLivre(idLivre, titreLivre){
    let idAdherent = prompt("prêt de\""+ titreLivre + "\".\nn° de l'emprunteur ?", "");
    idAdherent = parseInt(idAdherent);
    let url = "http://localhost/JS/td7/src/php/PreterLivre.php?idAdherent="+idAdherent+"&idLivre="+idLivre;
    xhrPreterLivre.open("GET", url, true);
    xhrPreterLivre.addEventListener('load', callback_PreterRecupererLivre);
    xhrPreterLivre.send(null);
}

//Click pour récuperer un livre

function recupererLivre(idLivre){
    if(confirm("Retour de ce livre ?")){
        let url = 'http://localhost/JS/td7/src/php/RecupererLivre.php?idLivre='+idLivre;
        xhrRecupererLivre.open("GET", url, true);
        xhrRecupererLivre.addEventListener('load', callback_PreterRecupererLivre);
        xhrRecupererLivre.send(null);
    }
}


//lancement des fonctions d'affichages
charger_adherent();
charger_livres();
charger_livresEmpruntes();