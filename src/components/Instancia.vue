<template>
  <Card :titulo="'Instância'" :icone="'bi bi-folder2-open'">
    <template v-slot:conteudo>
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Instância</h5>
          <div class="alert alert-warning alert-dismissible fade show" role="alert" v-show="erro">
            <strong><i class="bi bi-exclamation-triangle-fill"></i> Atenção: </strong> {{ mensagemErro }}
            <button type="button" class="btn-close" @click="fechaErro"></button>
          </div>
          <div class="row m-1">
            <div class="col-md-12">
                <input class="form-control" type="file" id="instancia" @change="instanciaSelecionada">
            </div>   
          </div>          
          <div class="row m-1">       
            <div class="col-md-6">
                <label for="tempoProcessamentoTarefa">Tempo das tarefas (t)</label>
                <input type="text" class="form-control" id="tempoProcessamentoTarefa" v-model="instancia.tempoProcessamentoTarefa" disabled/>
            </div>        
            <div class="col-md-3">
                <label for="tempoTrocaFerramenta">Tempo de troca das ferramentas (t)</label>
                <input type="text" class="form-control" id="tempoTrocaFerramenta" v-model="instancia.tempoTrocaFerramenta" disabled/>
            </div>
            <div class="col-md-3">
                <label for="quantidadeFerramentas">Qtd Ferramentas (unid)</label>
                <input type="text" class="form-control" id="quantidadeFerramentas" v-model=" instancia.quantidadeFerramentas" disabled/>
            </div>        
          </div>      
          <div class="row m-1">   
            <div class="col-md-3">
                <label for="qtdMaquinas">Qtd de máquinas (unid)</label>
                <input type="text" class="form-control" id="qtdMaquinas" v-model="instancia.quantidadeMaquinas" disabled/>
            </div>
            <div class="col-md-3">
                <label for="qtdMaquinas">Qtd de tarefas (unid)</label>
                <input type="text" class="form-control" id="qtdMaquinas" v-model="instancia.quantidadeTarefas" disabled/>
            </div>
            <div class="col-md-3">                         
                <label for="tamanhoMagazine">Tamanho do magazine (unid)</label>
                <input type="text" class="form-control" id="tamanhoMagazine" v-model="instancia.tamanhoMagazine" disabled/>
            </div>
            <div class="col-md-3">                         
                <label for="estadoArte">Melhor Solução Conhecida(t) **</label>
                <input type="text" class="form-control" id="estadoArte" v-model="estadoDaArte" disabled/>
            </div>
          </div>            
          <div class="row m-1">
            <div class="col-md-12">  
              <button class="btn btn-secondary btn-sm m-2" type="button" @click="mostrarMatrizFerramentas"><i class="bi bi-table"></i> Matriz Ferramentas</button>
              <button class="btn btn-success btn-sm m-2" type="button" @click="gerarSolucao" v-if="habilitaResposta"><i class="bi bi-calculator"></i> Resolver Problema</button>
              <button class="btn btn-danger btn-sm m-2"    type="button" @click="limpar"><i class="bi bi-stars"></i> Reiniciar</button>
            </div>             
          </div>  
          <div v-if="habilitaResposta" class="row m-1">          
            <div class="col-md-12">  
              <label for="consoleResposta" class="form-label"><i class="bi bi-terminal"></i> Console de resposta</label>
              <textarea  v-model="consoleResposta" class="form-control" id="consoleResposta" rows="2"></textarea>
            </div>            
          </div>
          
          <div v-show="matrizFerramentasVisivel" class="row">              
            <div class="col-md-12">      
              <div class="m-2 matriz">
                <table class="table caption-top table-striped table-fixed table-hover table-sm table-bordered border-secondary tabelaCentralizada">
                  <caption>Matriz de Ferramentas</caption>
                  <thead><tr><th scope="row">#</th><th v-for="(cabecalho, index) in this.instancia.matrizFerramentas[0]" :key="index">{{index}}</th></tr></thead>       
                  <tbody>
                    <tr v-for="(linha, rowIndex) in this.instancia.matrizFerramentas" :key="rowIndex">                    
                      <th scope="row">{{rowIndex}}</th><td data-toggle="tooltip" data-placement="top" :title="coordenadas" v-for="(valor, colIndex) in linha" :key="colIndex" @mouseover="mostraCoordenadas(rowIndex,colIndex)"> {{ valor }} </td>
                    </tr>
                  </tbody>
                </table>                  
              </div>
            </div>  
          </div>
        </div>
      </div>
      <div class="card" v-if="permiteCarregarSolucao">
        <div class="card-body"> 
          <h5 class="card-title">Solução</h5>
          <div class="row m-1" v-for="(item, index) in this.instancia.quantidadeMaquinas" :key="index">              
            <div class="col-md-4">    
              <label v-bind:for="'tarefas'+index" @click="copiarParaAreaDeTransferencia(index)"><strong>Tarefas da máquina #{{ index }} </strong> <i class="bi bi-scissors"></i></label>
              <input type="text" class="form-control" v-bind:id="'tarefas'+index" v-bind:ref="'inputTarefas'+index" v-model="maquinas[index].tarefas" disabled>
            </div>
            <div class="col-md-2">    
              <label>Trocas *</label>
              <input type="text" :class="maquinas[index].classTrocasInformadas" v-bind:id="'trocasInformadas'+index" v-model="maquinas[index].trocasInformadas">
            </div>
            <div class="col-md-2">    
              <label>Trocas **</label>
              <input type="text" :class="maquinas[index].classTrocasCalculadas" v-bind:id="'trocasCalculadas'+index" v-model="maquinas[index].trocasCalculadas">
            </div>
            <div class="col-md-2">
              <label>Tempo Máquina (t) *</label>
              <input type="text" :class="maquinas[index].classTempoInformado" v-bind:id="'tempoInformado'+index" v-model="maquinas[index].tempoInformado">
            </div>
            <div class="col-md-2">
              <label>Tempo Máquina (t) **</label>
              <input type="text" :class="maquinas[index].classTempoCalculado" v-bind:id="'tempoCalculado'+index" v-model="maquinas[index].tempoCalculado">
            </div>
          </div>
            <p><i>* valor informado</i></p>
            <p><i>** valor calculado</i></p>
          <div class="row m-1">
            <div class="col-md-12">  
              <input class="form-control" type="file" id="solucao" @change="solucaoSelecionada">
              <button class="btn btn-primary btn-sm m-2" type="button" @click="executarKtns" ><i class="bi bi-calculator-fill"></i> Executa os cálculos</button>
            </div>             
          </div>  
        </div>
        <div v-if="mostraGap" id="card">
          <div id="chart">
            <apexchart 
              type="radialBar" 
              height="200" 
              :options="chartOptions1" 
              :series="series1">
            </apexchart>
            <hr>
            <apexchart 
              type="bar" 
              height="200" 
              :options="chartOptions2" 
              :series="series2">
            </apexchart>
          </div>          
        </div>

      </div>
    </template>
  </Card>   
</template>

<script>
import { executaKtns } from '../auxFunctions/http-ktns';
import { buscaResposta } from '../auxFunctions/http-instancia';
import { resolveProblema } from '../auxFunctions/http-resolve';

import Card from "../components/Card.vue";

export default {
  name: "INSTANCIA",
  components: {
    Card
  },   
  data: function () {
    return {
      coordenadas: "",
      nomeInstancia: "",
      consoleResposta: "",
      habilitaResposta: false,
      gap: [0],
      mostraGap: false,
      estadoDaArte: 0,
      instancia: {
       matrizFerramentas: [],
       tempoProcessamentoTarefa: [],
       tamanhoMagazine: 0,
       tempoTrocaFerramenta: 0,
       quantidadeMaquinas: 0,
       quantidadeTarefas: 0,
       quantidadeFerramentas: 0,
      },
      maquinas: [
        {
          tarefas: [],
          trocasInformadas: 0,
          trocasCalculadas: 0,
          tempoInformado: 0,
          tempoCalculado: 0,
          matrizResposta: [],
          classTrocasInformadas: 'form-control',
          classTrocasCalculadas: 'form-control',
          classTempoInformado: 'form-control',
          classTempoCalculado: 'form-control',             
        }
      ], 
      matrizFerramentasVisivel: false,
      permiteCarregarSolucao: false,
      erro: false,
      mensagemErro: '',

      series1: [],

      chartOptions1: {
        chart: {
          type: 'radialBar',
          offsetY: -20,
          sparkline: {
            enabled: true
          }
        },
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
              background: "#e7e7e7",
              strokeWidth: '97%',
              margin: 5,
              dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                color: '#999',
                opacity: 1,
                blur: 2
              }
            },
            dataLabels: {
              name: {
                show: false
              },
              value: {
                offsetY: -2,
                fontSize: '22px'
              }
            }
          }
        },
        grid: {
          padding: {
            top: -10
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            shadeIntensity: 0.4,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 53, 91]
          },
        },
        title: {
          text: 'GAP',
          align: 'center',
        },          
        labels: ['GAP'],
      },

      series2: [ ],

      chartOptions2: {
         chart: {
           type: 'bar',
           height: 100
         },
         plotOptions: {
           bar: {
             horizontal: true,
             dataLabels: {
               position: 'top',
             },
           }
         },
         dataLabels: {
           enabled: true,
           offsetX: -6,
           style: {
             fontSize: '12px',
             colors: ['#fff']
           }
         },
         stroke: {
           show: true,
           width: 1,
           colors: ['#fff']
         },
         tooltip: {
           shared: true,
           intersect: false
         },
         xaxis: {
           categories: ['Makespan'],
         },
        title: {
          text: 'Comparativo entre a solução e a melhor solução conhecida.',
          align: 'center',
        },  
        subtitle: {
          text: 'obs: para esta funcionalidade, é necessário que a instância tenha sido encontrada na literatura.',
          align: 'center',
        },  
       },

    };
  },
  methods: {

    // POSSIBILITA O USO EM OUTROS COMPONENTES
    emitirInstancia() {
      this.$emit('instancia-atualizada', this.instancia);
    },
    emitirMaquinas() {
      this.$emit('maquinas-atualizadas', this.maquinas);
    },
     
    fechaErro(){
      this.erro = false;
    },

    mostraCoordenadas(x,y){
      this.coordenadas = 'Ferramenta: ' + x + ' Tarefa: ' + y;
    },

    copiarParaAreaDeTransferencia(index) {
      const conteudo = this.maquinas[index].tarefas;     
      try {
        const inputElement = document.createElement("input");
        inputElement.value = conteudo;
        inputElement.style.position = "absolute";
        inputElement.style.left = "-9999px";
        document.body.appendChild(inputElement);
        inputElement.select();
        inputElement.setSelectionRange(0, 99999); // Para seleção em navegadores móveis
        document.execCommand("copy");
        document.body.removeChild(inputElement);
      } catch (err) {
        console.error('Falha ao copiar texto: ', err);
      }
      window.getSelection().removeAllRanges();
    },

    limpar(){

      window.location.reload();

      // this.erro = false;

      // this.consoleResposta = "";
      // this.habilitaResposta = false;

      // this.series1 = [];
      // this.series2 = [];

      // this.mostraGap = false; 
      // this.estadoDaArte = 0;

      // this.matrizFerramentasVisivel = false;
      // this.permiteCarregarSolucao = false;

      // const inputInstancia = document.getElementById("instancia");
      // inputInstancia.value = "";
     
      // this.instancia = {
      //  matrizFerramentas: [],
      //  tempoProcessamentoTarefa: [],
      //  tamanhoMagazine: 0,
      //  tempoTrocaFerramenta: 0,
      //  quantidadeMaquinas: 0,
      //  quantidadeTarefas: 0,
      //  quantidadeFerramentas: 0,
      // };
      // this.maquinas = [
      //   {
      //     tarefas: [],
      //     trocasInformadas: 0,
      //     trocasCalculadas: 0,
      //     tempoInformado: 0,
      //     tempoCalculado: 0,
      //     matrizResposta: [],
      //     classTrocasInformadas: 'form-control',
      //     classTrocasCalculadas: 'form-control',
      //     classTempoInformado: 'form-control',
      //     classTempoCalculado: 'form-control',             
      //   }
      // ];
    },

    async gerarSolucao(){
      const respostaProblema = await resolveProblema(this.instancia);
      for(let i = 0; i < respostaProblema.length; i++ ){
        this.consoleResposta += respostaProblema[i].toString().replace(/,/g, ' ');
        this.consoleResposta += '\n';
      }   
      
      const a = document.createElement('a');
      const blob = new Blob([this.consoleResposta], { type: 'text/plain' });
      a.href = URL.createObjectURL(blob);
      a.download = 'SOLUCAO_'+ this.nomeInstancia;
      a.click();
    },    

    mostrarMatrizFerramentas(){
      if(this.matrizFerramentasVisivel){
        this.matrizFerramentasVisivel = false;
      }else{
        this.matrizFerramentasVisivel = true;
      }
    },

    async instanciaSelecionada(event){
      const file = event.target.files[0];
      if (file) {
        const arquivo = file.name;
        this.nomeInstancia = arquivo;
        let arquivoDesmembrado;        
        try {
          arquivoDesmembrado = arquivo.split('_');  
          let entrada = {
              Instancia: arquivoDesmembrado[0],
              Maquinas: arquivoDesmembrado[1].slice(2),
              Tarefas: arquivoDesmembrado[2].slice(2),
              Ferramentas: arquivoDesmembrado[3].slice(2),
              Magazine: arquivoDesmembrado[4].slice(2),
          };
          let resposta;
          try {
            resposta = await buscaResposta(entrada);
            this.estadoDaArte = resposta[0].Makespan;            
          } catch (error) {
              this.erro = true;
              this.mensagemErro = 'Não foi possível conectar ao banco de dados. O campo Melhor Solução Conhecida(t) pode não ser informado.'; 
              console.log(error);
          }        

        } catch (error) {
            this.erro = true;
            this.mensagemErro = 'Não foi possível encontrar uma instância na literatura com o nome especificado.'; 
            console.log(error);          
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = e.target.result;
            const linesComEspacos = data.split('\n');
            const lines = linesComEspacos.map((line) => line.replace(/\s+$/, '')).filter((line) => line.trim() !== '');
            const [quantidadeMaquinas, quantidadeTarefas, quantidadeFerramentas, tamanhoMagazine] = lines[0].split(' ').map(Number);
            const matrizFerramentas = [];
            for (let i = 3; i < lines.length; i++) {
              const row = lines[i].split(' ').map(Number);
              matrizFerramentas.push(row);
            }
            this.instancia.tempoProcessamentoTarefa = lines[2].split(' ').map(Number);
            this.instancia.tempoTrocaFerramenta = parseInt(lines[1]);
            this.instancia.matrizFerramentas = matrizFerramentas;
            this.instancia.tamanhoMagazine = tamanhoMagazine;
            this.instancia.quantidadeMaquinas = quantidadeMaquinas;
            this.instancia.quantidadeTarefas = quantidadeTarefas;
            this.instancia.quantidadeFerramentas = quantidadeFerramentas;

            
            this.maquinas.length = 0;
            for(let i = 0; i < quantidadeMaquinas; i++){
              this.adicionarMaquina();
            }

            this.permiteCarregarSolucao = true;

          } catch (error) {
            this.erro = true;
            this.mensagemErro = ' Erro ao analisar o arquivo da instância.';
            console.error('Erro ao analisar o arquivo da instância:', error);
          }
        };
        reader.readAsText(file);
        this.habilitaResposta = true;
      }
    },

    async solucaoSelecionada(event){
      
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = e.target.result;
            const linhasComEspacos = data.split('\n');
            const linhas = linhasComEspacos.map((linha) => linha.replace(/\s+$/, '')).filter((linha) => linha.trim() !== '');
            // LIMPA O CAMPO DAS TAREFAS ANTES DE POPULAR O NOVO
            for (let i = 0; i < linhas.length; i++) {
              this.maquinas[i].tarefas = [ ];
            }
            for (let i = 0; i < linhas.length; i++) {
              const row = linhas[i].split(' ').map(Number);
              this.maquinas[i].trocasInformadas = row[0];
              this.maquinas[i].tempoInformado = row[1];
              for(let j = 2; j < row.length; j++){
                this.maquinas[i].tarefas.push(row[j]);
              }
            }
          } catch (error) {
            this.erro = true;
            this.mensagemErro = ' Erro ao analisar o arquivo da solução.';            
            console.error('Erro ao analisar o arquivo da solução:', error);
          }
        };
        reader.readAsText(file);
      }
    },

    async executarKtns() {
      for(let j = 0; j < this.maquinas.length; j++ ){
        const tarefas = this.maquinas[j].tarefas;
        const respostaKtns = await executaKtns(this.instancia,tarefas);
        this.maquinas[j].trocasCalculadas = respostaKtns.qtdTrocas;
        this.maquinas[j].tempoCalculado = respostaKtns.tempoTotal;
        this.maquinas[j].matrizResposta = respostaKtns.matriz;
      }

      this.verificaValores();
    }, 
    
    verificaValores(){  
      this.erro = false;     
      for(let i = 0; i < this.maquinas.length; i++){
          if(this.maquinas[i].trocasInformadas === this.maquinas[i].trocasCalculadas ){
             this.maquinas[i].classTrocasInformadas = 'form-control is-valid';
             this.maquinas[i].classTrocasCalculadas = 'form-control is-valid';
          }else{
             this.maquinas[i].classTrocasInformadas = 'form-control is-invalid';
             this.maquinas[i].classTrocasCalculadas = 'form-control is-invalid';
          }
          if(this.maquinas[i].tempoInformado === this.maquinas[i].tempoCalculado ){
             this.maquinas[i].classTempoInformado = 'form-control is-valid';
             this.maquinas[i].classTempoCalculado = 'form-control is-valid';
          }else{
             this.maquinas[i].classTempoInformado = 'form-control is-invalid';
             this.maquinas[i].classTempoCalculado = 'form-control is-invalid';
          }
      }
      let Makespan = 0;
      for(let i = 0; i < this.maquinas.length; i++){
        if(Makespan < this.maquinas[i].tempoCalculado){
          Makespan = this.maquinas[i].tempoCalculado;
        }
      }
      // CÁLCULO DO GAP:
      let gap = 100;
      if(Makespan != this.estadoDaArte){
        // 100 x ( ( SOLUCAO - ESTADOARTE) / ESTADOARTE)
        gap = (100 * ((Makespan - this.estadoDaArte) / this.estadoDaArte)).toFixed(2);
      }else{
        gap = 0;
      }

      let series2 = [{
         name: 'Melhor Solução da Literatura',
         data: [this.estadoDaArte]
       }, {
         name: 'Solução Encontrada',
         data: [Makespan]
      }];

      this.series1 = [gap];
      this.series2 = series2;
      this.mostraGap = true; 

      let todasTarefas = [];
      for(let i = 0; i < this.maquinas.length; i++){
        let tamanhoDaTarefa = this.maquinas[i].tarefas.length;
        for(let j = 0; j < tamanhoDaTarefa; j++){
          todasTarefas.push(this.maquinas[i].tarefas[j]);
        }
      }

      todasTarefas = todasTarefas.sort(function(a, b) { return a - b; });
      let tarefaFaltando = null;
      for(let i = 0; i < this.instancia.quantidadeTarefas; i++){
        if(i != todasTarefas[i]){
            tarefaFaltando = i;
            break;
        }
      }
      if (tarefaFaltando !== null) {
        this.erro = true;
        this.mensagemErro = 'A tarefa ' + tarefaFaltando + ' não foi encontrada.';
      }

    },

    adicionarMaquina( ) {
      const novaMaquina = {
          tarefas: [],
          trocasInformadas: 0,
          trocasCalculadas: 0,
          tempoInformado: 0,
          tempoCalculado: 0,
          matrizResposta: [],
          classTrocasInformadas: 'form-control',
          classTrocasCalculadas: 'form-control',
          classTempoInformado: 'form-control',
          classTempoCalculado: 'form-control',          
        };
      this.maquinas.push(novaMaquina);
    },

  },
  // POSSIBILITA O USO DA INSTANCIA EM OUTROS COMPONENTES
  mounted() {   
    this.emitirInstancia();
    this.emitirMaquinas();
  }  
};
</script>
<style scoped>
  .matriz {
    width: 2000;
    height: 400px;
    overflow-x: auto;
    overflow-y: auto;
    white-space: nowrap; 
  }
  .tabelaCentralizada {
    text-align: center;
  }
</style>