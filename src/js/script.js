//requetes AJAX
let xhrAdherent = new XMLHttpRequest();
let xhrAjoutAdherent = new XMLHttpRequest();
let xhrNombreEmprunts = new XMLHttpRequest();
let xhrLivre = new XMLHttpRequest();
let xhrLivreE = new XMLHttpRequest();

//selection des divs a remplir
let div_adherent = document.getElementById("listeAdherents");
let div_LivreDispo = document.getElementById("listeLivresDisponibles");
let div_LivreEmpruntés = document.getElementById("listeLivresEmpruntes");

//lancement des fonctions d'affichages
charger_adherent();
charger_livres();
charger_livresEmpruntes();

//ajout adherent
let zonesaisie= document.getElementById("nomAdherent");
let boutonAjout= document.getElementById("ajouterAdherent");
boutonAjout.addEventListener("click",function(){ 
    let url = "http://webinfo.iutmontp.univ-montp2.fr/~maurinn/td7-Numa-Maurin/src/php/ajoutAdherent.php?nom='"+zonesaisie.value+"'";
    xhrAjoutAdherent.open("GET", url, true);
    xhrAjoutAdherent.addEventListener('load', function(){
        alert("l'utilisateur "+zonesaisie.value+" a été ajouté");
        zonesaisie.value='';
    });
    xhrAjoutAdherent.send(null);
    charger_adherent();
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
        div_adherent.children[0].appendChild(li);
    } 

}

function charger_adherent() {
    //on vide d'abord le div de tous ses enfants 
    while(div_adherent.children.length > 0){
		div_adherent.removeChild(div_adherent.children[0]);
    }
    
	let url = 'http://webinfo.iutmontp.univ-montp2.fr/~maurinn/td7-Numa-Maurin/src/php/collecteAdherent.php';

	xhrAdherent.open("GET", url, true);
	xhrAdherent.addEventListener('load', callback);
    xhrAdherent.send(null);
    
    //on lance la fonction qui gere le nombre d'abonnement
    maj_NombreEmprunts();
}

//mise a jour du nombre d'emprunts par adherent
function callback_NombreEmprunts() {
    
    let tab = JSON.parse(xhrNombreEmprunts.responseText);
    for (let i = 0; i != tab.length; i ++) {
        let li = document.getElementById(tab[i].idAdherent);
        li.innerHTML = li.innerHTML+ "(emprunts :" +tab[i].nbEmprunt+")";
    } 
}

function maj_NombreEmprunts() {
    let url = 'http://webinfo.iutmontp.univ-montp2.fr/~maurinn/td7-Numa-Maurin/src/php/maj_NombreEmprunts.php';

	xhrNombreEmprunts.open("GET", url, true);
	xhrNombreEmprunts.addEventListener('load', callback_NombreEmprunts);
	xhrNombreEmprunts.send(null);
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

        div_LivreDispo.children[0].appendChild(li);
    } 

}

function charger_livres() {
    //on vide le div
    while(div_LivreDispo.children.length > 0){
		div_LivreDispo.removeChild(div_LivreDispo.children[0]);
    }

	let url = 'http://webinfo.iutmontp.univ-montp2.fr/~maurinn/td7-Numa-Maurin/src/php/collecteLivreDispo.php';

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

        div_LivreEmpruntés.children[0].appendChild(li);
    } 

}

function charger_livresEmpruntes() {
    //on vide le div 
    while(div_LivreEmpruntés.children.length > 0){
		div_LivreEmpruntés.removeChild(div_LivreEmpruntés.children[0]);
    }

	let url = 'http://webinfo.iutmontp.univ-montp2.fr/~maurinn/td7-Numa-Maurin/src/php/collecteLivreEmpruntes.php';

	xhrLivreE.open("GET", url, true);
	xhrLivreE.addEventListener('load', callback_livreEmpruntes);
	xhrLivreE.send(null);
}