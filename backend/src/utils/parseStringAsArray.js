/**==================================================
 * REsponsavel por fazer a desestruturação do array
 * de string que armazena as tecnologias passadas no
 * corpo da requisição
 ===================================================*/

 module.exports = function parseStringAsArray(arrayAsString) {
    return arrayAsString.split(',').map(tech => tech.trim());
  }