var connection = require("../config/db");

class Utilisateur {
  static createUser(nom, prenoms, profession, cb) {
    var data = {
      nom_utilisateur: nom,
      prenoms_utilisateur: prenoms,
      profession: profession,
      date_creation: new Date(),
    };
    connection.query(
      "INSERT INTO utilisateurs  SET  ? ",
      data,
      function (error, results, fields) {
        if (error) throw error;

        cb();
      }
    );
  }
  static allUser(cb) {
    connection.query(
      "SELECT * FROM  utilisateurs  ",
      function (error, results) {
        if (error) throw error;

        cb(results);
      }
    );
  }
  static OnUser(identifiant, cb) {
    let id = parseInt(identifiant);
    connection.query(
      "SELECT * FROM  utilisateurs WHERE id_utilisateur = ? ",
      id,
      function (error, results) {
        if (error) throw error;
        cb(results[0]);
      }
    );
  }

  static deleteUser(identifiant, cb) {
    connection.query(
      "DELETE FROM utilisateurs  WHERE id_utilisateur = ? ",
      identifiant,
      function (error, results) {
        if (error) throw error;
        cb(results.affectedRows);
      }
    );
  }
  static UpdateUser(identifiant, nom, prenoms, profession, cb) {
    var data = {
      nom_utilisateur: nom,
      prenoms_utilisateur: prenoms,
      profession: profession,
    };
    connection.query(
      "UPDATE  utilisateurs SET  ? WHERE id_utilisateur = ? ",
      [data, identifiant],
      function (error, results) {
        if (error) throw error;
        cb(results.affectedRows);
      }
    );
  }
}

module.exports = Utilisateur;
