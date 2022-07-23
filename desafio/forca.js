class Forca {
  constructor(palavra) {
    this.palavraSecreta = Array.from(palavra);
    this.palavra = this.palavraSecreta.map(() => '_');
    this.vidas = 6;
    this.letrasChutadas = [];
    this.estado = "aguardando chute";
  }

  chuteInvalido(letra) {
    return letra.length != 1 || this.letrasChutadas.includes(letra);
  }

  acertouLetra() {
    this.palavra = this.palavraSecreta.map((letra) => {
      if (this.letrasChutadas.includes(letra))
        return letra;

      return '_';
    });

    if (!this.palavra.includes('_') && this.vidas > 0)
      this.estado = 'ganhou';
  }

  errouLetra() {
    this.vidas--;
    if (this.vidas == 0)
      this.estado = 'perdeu';
  }

  chutar(letra) {
    if (this.chuteInvalido(letra))
      return false;

    this.letrasChutadas.push(letra)

    if (!this.palavraSecreta.includes(letra)) {
      this.errouLetra();
      return false;
    }

    this.acertouLetra();
  }

  buscarEstado() {
    return this.estado;
  } // Possiveis valores: "perdeu", "aguardando chute" ou "ganhou"

  buscarDadosDoJogo() {
    return {
      letrasChutadas: this.letrasChutadas, // Deve conter todas as letras chutadas
      vidas: this.vidas, // Quantidade de vidas restantes
      palavra: this.palavra, // Deve ser um array com as letras que já foram acertadas ou o valor "_" para as letras não identificadas
    }
  }
}

module.exports = Forca;
