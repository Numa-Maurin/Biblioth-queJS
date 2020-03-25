<?php

    require_once 'Conf.php';
    require_once 'Model.php';

    $idLivre = $_GET['idLivre'];
    Model::reqRecupererLivre($idLivre);
?>