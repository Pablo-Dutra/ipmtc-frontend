<template>
    <div class="card m-2">
      <div class="card-header bg-secondary text-white d-flex justify-content-between align-items-center"  @click="inverte">              
        <strong><i :class="icone"></i> {{titulo}} </strong>
        <div class="btn-group btn-group-sm" role="group" aria-label="">
              <i class="bi bi-box"></i>              
        </div>              
      </div>
      <Transition duration="550" name="nested">
      <div class="card-body" v-show="propriedadesCard.visivel">
        <div class="row">
            <slot name="conteudo">

            </slot>
        </div>
      </div>
      </Transition>   
    </div>       
</template>

<script>

export default {
  name: "CARD",
  data: function () {
    return {
        propriedadesCard: {
            classIcone: 'bi bi-arrow-down-square-fill',
            visivel: false,
            erro: false,
            mensagemErro: '',
        },
    };    
  },
  computed: {
    teste: function () {
        return 'e ai'; 
    }
  },  
  props: [
    'titulo',
    'icone',
  ],
  methods: {

    inverte(){
      if(this.propriedadesCard.visivel){
        this.propriedadesCard.visivel = false;
      }else{
        this.propriedadesCard.visivel = true;
      }
    },

    // POSSIBILITA O USO DA INSTANCIA EM OUTROS COMPONENTES
    emitirCard() {
      this.$emit('card-atualizado', this.card);
    },
      
  },
  // POSSIBILITA O USO DA INSTANCIA EM OUTROS COMPONENTES
  mounted() {   
    this.emitirCard();
  }  
};
</script>
<style scoped>

.outer, .inner {
	background: #eee;
  padding: 30px;
  min-height: 100px;
}
  
.inner { 
  background: #ccc;
}
 
.nested-enter-active, .nested-leave-active {
	transition: all 0.3s ease-in-out;
}

.nested-leave-active {
  transition-delay: 0.25s;
}

.nested-enter-from,
.nested-leave-to {
  transform: translateY(30px);
  opacity: 0;
}

 nested-enter-active .inner,
.nested-leave-active .inner { 
  transition: all 0.3s ease-in-out;
}
.nested-enter-active .inner {
	transition-delay: 0.25s;
}
.nested-enter-from .inner,
.nested-leave-to .inner {
  transform: translateX(30px);
  opacity: 0.001;
}
</style>