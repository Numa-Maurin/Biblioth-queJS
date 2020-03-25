<?php

    require_once 'Conf.php';
    require_once 'Model.php';

    $idAdherent = $_GET['idAdherent'];
    $idLivre = $_GET['idLivre'];
    Model::reqPreterLivre($idAdherent,$idLivre);

?>