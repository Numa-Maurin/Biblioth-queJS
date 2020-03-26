<?php

require_once 'Conf.php';
require_once 'Model.php';

$idAdherent = $_GET['idAdherent'];
$nomAdherent = Model::reqNomDunAdherent($idAdherent);
echo json_encode($nomAdherent);
?>