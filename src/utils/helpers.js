//A função shuffleArray é usada para embaralhar a ordem das categorias retornadas pelo banco.
function shuffleArray(array) {
    return array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  }
  
  module.exports = {
    shuffleArray,
  };
  