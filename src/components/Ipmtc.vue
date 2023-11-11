<template>
  <div>
    <div class="card m-2">
      <div class="card-header bg-secondary text-white"><strong>IPMTC</strong> - <i>Identical Parallel Machines With Tooling Constraints</i></div>
      <div class="card-body bg-light">

        <Instancia 
          @instancia-atualizada="capturarInstancia" 
          @maquinas-atualizadas="capturarMaquinas"           
        />

        <Grafico 
          :instancia="instancia" 
          :maquinas="maquinas" 
        />

        <Labs 
          
        />        

        <Help 
        />

      </div>
    </div>
  </div>
</template>

<script>

import Instancia from "./Instancia.vue";
import Grafico from "./Grafico.vue";
import Labs from "./Labs.vue";
import Help from "./Help.vue";

export default {
  name: "IPMTC", 
  components: {
    Instancia,
    Grafico,
    Labs,
    Help,
  },  
  data: function () {
    return {
      instancia: [ ],
      maquinas: { },
    };
  },
  methods: {
    // QUANDO DETECTA EVENTO DE ALTERAÇÃO NA INSTANCIA, BUSCA A NOVA INSTANCIA
    capturarInstancia(instancia) {
      this.instancia = instancia;
    },    
    capturarMaquinas(maquinas) {
      this.maquinas = maquinas;
    },    

  },
};
</script>
<style scoped>

</style>