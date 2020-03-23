<?php

require_once 'Conf.php';
require_once 'Model.php';

// récupération de la lettre et dy type de recherche, passés en get

// récupération du résultat de la requête SQL
$tab_adherent = Model::reqAdherent();

// affichage pour le responseText de l'objet XmlHttpRequest
echo json_encode($tab_adherent);

?>