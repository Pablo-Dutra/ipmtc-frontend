async function buscaResposta(entrada) {
    try {
      const axios = require("axios");
      let resposta = null;
      let data = JSON.stringify(entrada);
        let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: process.env.VUE_APP_ROOT_API + '/instancias',
        headers: { "Content-Type": "application/json" },
        data: data,
      };
  
      await axios
        .request(config)
        .then((response) => {
          resposta = response.data.RESPOSTA;
        })
        .catch((error) => {
          console.log(error);
        });
  
        return resposta;
  
    } catch (error) {
      console.log(error);
    }
  }
  
  module.exports = { buscaResposta, };
  