async function executaKtns(instancia, tarefas) {
  try {
    const axios = require("axios");
    let resposta = null;
    let data = JSON.stringify({
      matrizFerramentas: instancia.matrizFerramentas,
      tempoProcessamentoTarefa: instancia.tempoProcessamentoTarefa,
      tamanhoMagazine: instancia.tamanhoMagazine,
      tempoTrocaFerramenta: instancia.tempoTrocaFerramenta,
      tarefas: tarefas,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/ktns",
      headers: { "Content-Type": "application/json" },
      data: data,
    };

    await axios
      .request(config)
      .then((response) => {
        resposta = response.data.KTNS;
      })
      .catch((error) => {
        console.log(error);
      });

      return resposta;

  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  executaKtns,
};
