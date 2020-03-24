<?php

    require_once 'Conf.php';
    require_once 'Model.php';
    
    $nom = $_GET['nom'];
    Model::addAdherent($nom);

?>