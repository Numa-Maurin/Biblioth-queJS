<?php
    require_once 'Conf.php';
    require_once 'Model.php';

    $idAdherent = $_GET['idAdherent'];
    $tab_listeLivre = Model::reqMaj_LivresDunAdherent($idAdherent);

    // affichage pour le responseText de l'objet XmlHttpRequest
    echo json_encode($tab_listeLivre);
?>