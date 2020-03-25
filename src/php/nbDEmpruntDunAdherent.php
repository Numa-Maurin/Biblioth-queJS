<?php

require_once 'Conf.php';
require_once 'Model.php';

// récupération du résultat de la requête SQL
$tab_adherent = Model::reqMaj_NombreEmprunts();

// affichage pour le responseText de l'objet XmlHttpRequest
echo json_encode($tab_adherent);

?>