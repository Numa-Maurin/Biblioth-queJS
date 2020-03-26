<?php

require_once 'Conf.php';
require_once 'Model.php';

$idLivre = $_GET['idLivre'];
$nomAdherent = Model::reqRecupererAdherentDuLivre($idLivre);
echo json_encode($nomAdherent);
?>