<?php

require_once('Conf.php');

class Model {

    public static $pdo;

    public static function init_pdo() {
        $host   = Conf::getHostname();
        $dbname = Conf::getDatabase();
        $login  = Conf::getLogin();
        $pass   = Conf::getPassword();
        try {
            // connexion à la base de données
            // le dernier argument sert à ce que toutes les chaines de charactères
            // en entrée et sortie de MySql soit dans le codage UTF-8
            self::$pdo = new PDO("mysql:host=$host;dbname=$dbname", $login, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
            // on active le mode d'affichage des erreurs, et le lancement d'exception en cas d'erreur
            self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $ex) {
            echo $ex->getMessage();
            die("Problème lors de la connexion à la base de données.");
        }
    }


    public static function addAdherent($nom) {
        try {
            // préparation de la requête
            $sql = "INSERT INTO adherent(nomAdherent) VALUES ($nom)";
            $req_prep = self::$pdo->prepare($sql);
            $l = "";
            $values = array("name_tag" => $l);
            // exécution
            $req_prep->execute($values);
            $tabResults = $req_prep->fetchAll();
            // tableau résultat retourné
            return $tabResults;
        } catch (PDOException $e) {
            echo $e->getMessage();
            die("Erreur lors de la recherche dans la base de données.");
        }
    }
 
    public static function addlivre($nom) {
        try {
            // préparation de la requête
            $sql = "INSERT INTO livre(titreLivre) VALUES ($nom)";
            $req_prep = self::$pdo->prepare($sql);
            $l = "";
            $values = array("name_tag" => $l);
            // exécution
            $req_prep->execute($values);
            $tabResults = $req_prep->fetchAll();
            // tableau résultat retourné
            return $tabResults;
        } catch (PDOException $e) {
            echo $e->getMessage();
            die("Erreur lors de la recherche dans la base de données.");
        }
    }

    public static function reqAdherent() {
        try {
            // préparation de la requête
            $sql = "SELECT * FROM adherent ";
            $req_prep = self::$pdo->prepare($sql);
            $l = "";
            $values = array("name_tag" => $l);
            // exécution
            $req_prep->execute($values);
            $tabResults = $req_prep->fetchAll();
            // tableau résultat retourné
            return $tabResults;
        } catch (PDOException $e) {
            echo $e->getMessage();
            die("Erreur lors de la recherche dans la base de données.");
        }
    }

    
    public static function reqLivresDispo() {
        try {
            // préparation de la requête
            $sql = "SELECT * FROM livre WHERE idLivre NOT IN (SELECT idLivre FROM emprunt) ";
            $req_prep = self::$pdo->prepare($sql);
            $l = "";
            $values = array("name_tag" => $l);
            // exécution
            $req_prep->execute($values);
            $tabResults = $req_prep->fetchAll();
            // tableau résultat retourné
            return $tabResults;
        } catch (PDOException $e) {
            echo $e->getMessage();
            die("Erreur lors de la recherche dans la base de données.");
        }
    }

    
    public static function reqLivresEmpruntes() {
        try {
            // préparation de la requête
            $sql = "SELECT * FROM livre WHERE idLivre IN (SELECT idLivre FROM emprunt) ";
            $req_prep = self::$pdo->prepare($sql);
            $l = "";
            $values = array("name_tag" => $l);
            // exécution
            $req_prep->execute($values);
            $tabResults = $req_prep->fetchAll();
            // tableau résultat retourné
            return $tabResults;
        } catch (PDOException $e) {
            echo $e->getMessage();
            die("Erreur lors de la recherche dans la base de données.");
        }
    }

    public static function reqMaj_NombreEmprunts() {
        try {
            // préparation de la requête
            $sql = "SELECT idAdherent,COUNT(idAdherent) AS nbEmprunt, idLivre FROM `emprunt` GROUP BY idAdherent";
            $req_prep = self::$pdo->prepare($sql);
            $l = "";
            $values = array("name_tag" => $l);
            // exécution
            $req_prep->execute($values);
            $tabResults = $req_prep->fetchAll();
            // tableau résultat retourné
            return $tabResults;
        } catch (PDOException $e) {
            echo $e->getMessage();
            die("Erreur lors de la recherche dans la base de données.");
        }
    }

    public static function reqMaj_LivresDunAdherent($idAdherent){
        try {
            // préparation de la requête
            $sql = "SELECT titreLivre FROM `emprunt` e JOIN `livre` l ON e.idLivre = l.idLivre WHERE idAdherent=:name_tag";
            $req_prep = self::$pdo->prepare($sql);
            $values = array("name_tag" => $idAdherent);
            // exécution
            $req_prep->execute($values);
            $tabResults = $req_prep->fetchAll();
            // tableau résultat retourné
            return $tabResults;
        } catch (PDOException $e) {
            echo $e->getMessage();
            die("Erreur lors de la recherche dans la base de données.");
        }
    }

    public static function reqPreterLivre($idAdherent, $idLivre){
        try {
            // préparation de la requête
            $sql = "INSERT INTO emprunt(idAdherent,idLivre) VALUES (:idAdherent_tag, :idLivre_tag)";
            $req_prep = self::$pdo->prepare($sql);
            $values = array("idAdherent_tag" => $idAdherent, "idLivre_tag" => $idLivre);
            // exécution
            $req_prep->execute($values);
            $tabResults = $req_prep->fetchAll();
            // tableau résultat retourné
            return $tabResults;
        } catch (PDOException $e) {
            echo $e->getMessage();
            die("Erreur lors de la recherche dans la base de données.");
        }
    }

    public static function reqRecupererLivre($idLivre){
        try {
            // préparation de la requête
            $sql = "DELETE FROM `emprunt` WHERE idLivre =: idLivre_tag";
            $req_prep = self::$pdo->prepare($sql);
            $values = array("idLivre_tag" => $idLivre);
            // exécution
            $req_prep->execute($values);
            $tabResults = $req_prep->fetchAll();
            // tableau résultat retourné
            return $tabResults;
        } catch (PDOException $e) {
            echo $e->getMessage();
            die("Erreur lors de la recherche dans la base de données.");
        }
    }

}
// on initialise la connexion $pdo
Model::init_pdo();

?>
