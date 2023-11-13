async function resolveProblema(instancia) {
    try {
      const axios = require("axios");
      let resposta = null;
      let data = JSON.stringify({
        parametrosEntrada: {
            matrizFerramentas: instancia.matrizFerramentas,
            tempoProcessamentoTarefa: instancia.tempoProcessamentoTarefa,
            tamanhoMagazine: instancia.tamanhoMagazine,
            tempoTrocaFerramenta: instancia.tempoTrocaFerramenta,
            quantidadeMaquinas: instancia.quantidadeMaquinas
        }
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: process.env.VUE_APP_ROOT_API + '/resolveProblema',
        headers: { "Content-Type": "application/json" },
        data: data,
      };
  
      await axios
        .request(config)
        .then((response) => {
          resposta = response.data;
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
    resolveProblema,
  };
  