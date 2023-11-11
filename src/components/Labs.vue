<template>
  <Card :titulo="'Labs'" :icone="'bi bi-puzzle-fill'">
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
                <input type="text" class="form-control" id="tempoProcessamentoTarefa" @input="tempoAlterado" v-model="instancia.tempoProcessamentoTarefa"/>
            </div>        
            <div class="col-md-3">
                <label for="tempoTrocaFerramenta">Tempo de troca das ferramentas (t)</label>
                <input type="number" step="1" min="1" class="form-control" id="tempoTrocaFerramenta" v-model="instancia.tempoTrocaFerramenta" />
            </div>
            <div class="col-md-3">
                <label for="quantidadeFerramentas">Qtd Ferramentas (unid)</label>
                <input type="number" step="1" min="1" class="form-control" id="quantidadeFerramentas" v-model=" instancia.quantidadeFerramentas" />
            </div>        
          </div>      
          <div class="row m-1">   
            <div class="col-md-3">
                <label for="qtdMaquinas">Qtd de máquinas (unid)</label>
                <input type="number" step="1" min="1" class="form-control" id="qtdMaquinas" @input="qtdMaquinasAlterada" v-model="quantidadeMaquinasNumerico" />
            </div>
            <div class="col-md-3">
                <label for="qtdMaquinas">Qtd de tarefas (unid)</label>
                <input type="number" step="1" min="1" class="form-control" id="qtdMaquinas" v-model="instancia.quantidadeTarefas" />
            </div>
            <div class="col-md-3">                         
                <label for="tamanhoMagazine">Tamanho do magazine (unid)</label>
                <input type="number" step="1" min="1" class="form-control" id="tamanhoMagazine" v-model="instancia.tamanhoMagazine" />
            </div>
            <div class="col-md-3">                         
                <label for="estadoArte">Melhor Solução Conhecida(t) **</label>
                <input type="number" step="1" min="1" class="form-control" id="estadoArte" v-model="estadoDaArte" />
            </div>
          </div>            
          <div class="row m-1">
            <div class="col-md-12">  
              <button class="btn btn-secondary btn-sm m-2" type="button" @click="mostrarMatrizFerramentas"><i class="bi bi-table"></i> Matriz Ferramentas</button>
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
      <div class="card" v-if="maquinas.length > 1">
        <div class="card-body"> 
          <h5 class="card-title">Solução</h5>
          <div class="row m-1" v-for="(item, index) in this.instancia.quantidadeMaquinas" :key="index">              
            <div class="col-md-4">    
              <label v-bind:for="'tarefas'+index" @click="colarDaAreaDeTransferencia(index)"><strong>Tarefas da máquina #{{ index }} </strong> <i class="bi bi-clipboard-check"></i></label>
              <input type="text" class="form-control" v-bind:id="'tarefas'+index" v-bind:ref="'inputTarefas'+index" @input="tarefasAlteradas(index)" v-model="maquinas[index].tarefas" >
            </div>
            <div class="col-md-4">    
              <label>Trocas</label>
              <input type="text" class="form-control" v-bind:id="'trocasCalculadas'+index" v-model="maquinas[index].trocasCalculadas" disabled>
            </div>
            <div class="col-md-4">
              <label>Tempo Máquina (t) <i class="bi bi-fire" style="color: red;" v-if="maquinas[index].tempoCalculado == this.series2[1].data ? true : false"></i></label>
              <input type="text" class="form-control" v-bind:id="'tempoCalculado'+index" v-model="maquinas[index].tempoCalculado" disabled>
            </div>
          </div>
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
  name: "LABS",
  components: {
    Card
  },   
  data: function () {
    return {
      respostaOtimizador: "",
      coordenadas: "",
      nomeInstancia: "",
      consoleResposta: "",
      habilitaResposta: false,
      gap: [0],
      mostraGap: false,
      estadoDaArte: 513,
      instancia: {
       matrizFerramentas: [
        [0, 0, 0, 0, 1, 0, 0, 0], 
        [1, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 1, 0, 0, 1, 1, 0], 
        [0, 0, 0, 0, 0, 0, 1, 1], 
        [0, 0, 0, 0, 0, 0, 1, 1], 
        [0, 0, 0, 0, 0, 1, 0, 0], 
        [0, 0, 1, 0, 0, 0, 0, 1], 
        [1, 1, 0, 0, 0, 0, 0, 0], 
        [1, 0, 0, 0, 1, 1, 0, 1], 
        [0, 1, 0, 0, 1, 0, 1, 0], 
        [1, 0, 0, 0, 0, 1, 0, 0], 
        [0, 0, 0, 1, 1, 0, 0, 0], 
        [1, 0, 0, 1, 0, 0, 0, 0], 
        [0, 0, 0, 0, 1, 1, 1, 0], 
        [0, 0, 0, 1, 0, 0, 0, 1]          
       ],
       tempoProcessamentoTarefa: [56,10,42,22,44,20,21,40],
       tamanhoMagazine: 5,
       tempoTrocaFerramenta: 65,
       quantidadeMaquinas: 2,
       quantidadeTarefas: 8,
       quantidadeFerramentas: 15,
      },
      maquinas: [
        {
          tarefas: [0,7,6,1],
          trocasCalculadas: 8,
          tempoCalculado: 647,
          matrizResposta: [],
        },
        {
          tarefas: [4,2,3,5],
          trocasCalculadas: 7,
          tempoCalculado: 583,
          matrizResposta: [],
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

      series2: [
        {
          data: 0
        },
        {
          data: 0
        },
       ],

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
  computed: {
    quantidadeMaquinasNumerico: {   
      get() {
        return this.instancia.quantidadeMaquinas.toString();
      },
      set(value) {
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue)) {
          this.instancia.quantidadeMaquinas = numericValue;
        }
      },      
    },
  },
  methods: {
   
    fechaErro(){
      this.erro = false;
    },

    colarDaAreaDeTransferencia(index){
      navigator.clipboard.readText()
        .then((clipText) => {
          this.maquinas[index].tarefas = clipText;
        })
        .catch((err) => {
          console.error('Erro ao colar da área de transferência: ' + err);
        });
    },

    mostraCoordenadas(x,y){
      this.coordenadas = 'Ferramenta: ' + x + ' Tarefa: ' + y;
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
      let Makespan = 0;
      for(let i = 0; i < this.maquinas.length; i++){
        if(Makespan < this.maquinas[i].tempoCalculado){
          Makespan = this.maquinas[i].tempoCalculado;
        }
      }
      let gap = 100;
      if(Makespan != this.estadoDaArte){
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
        console.log('A tarefa ' + tarefaFaltando + ' pode estar faltando...');
      }
    },
    qtdMaquinasAlterada() {
        this.maquinas.length = 0;
        for(let i = 0; i < this.instancia.quantidadeMaquinas; i++){
            this.adicionarMaquina();
        }
    },
    tarefasAlteradas(maquina){
        const valoresSeparados = this.maquinas[maquina].tarefas.split(',').map(valor => valor.trim());
        this.maquinas[maquina].tarefas = valoresSeparados.filter(valor => !isNaN(valor));
    },
    tempoAlterado(){
        const valoresSeparados = this.instancia.tempoProcessamentoTarefa.split(',').map(valor => valor.trim());
        this.instancia.tempoProcessamentoTarefa = valoresSeparados.filter(valor => !isNaN(valor));
    },

    adicionarMaquina( ) {
      const novaMaquina = {
          tarefas: [],
          trocasInformadas: 0,
          trocasCalculadas: 0,
          tempoInformado: 0,
          tempoCalculado: 0,
          matrizResposta: [],       
        };
      this.maquinas.push(novaMaquina);
    },

  },

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