<template>
  <Card :titulo="'Gráfico'" :icone="'bi bi-bar-chart-line'">
    <template v-slot:conteudo>
      <div class="card m-2">
          <div v-if="tamanhoGrafico.selecionado == 'pequeno'" class="card-body">        
            <apexchart
              :width="tamanhoGrafico.pequeno.width"
              :height="tamanhoGrafico.pequeno.height"
              type="bar"
              :options="chartOptions"
              :series="series"
            ></apexchart>
          </div>
          <div v-if="tamanhoGrafico.selecionado == 'grande'" class="card-body meu-card">        
            <apexchart
              :width="tamanhoGrafico.grande.width"
              :height="tamanhoGrafico.grande.height"
              type="bar"
              :options="chartOptions"
              :series="series"
            ></apexchart>
          </div>          
          <div>

            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex justify-content-start">
                <button class="btn btn-primary btn btn-sm m-1" @click="carregarGrafico" data-toggle="tooltip" data-placement="top" title="Plotar o gráfico"><i class="bi bi-layers-fill"></i> Plotar gráfico</button>
              </div> 
              <div class="d-flex justify-content-end">        
                <button class="btn btn-secondary btn-sm m-1" @click="tamanhoPequeno"><i class="bi bi-zoom-out"></i></button>
                <button class="btn btn-secondary btn-sm m-1" @click="tamanhoGrande" ><i class="bi bi-zoom-in"></i></button>
              </div>  
            </div> 
            <div class="row">              
              <div class="col-md-12">      
                <div class="m-2 legenda">
                  <table class="table table-striped table-hover table-sm">
                    <thead>
                      <tr>
                        <th scope="col">Legenda</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in tarefasFiltradas" :key="index">
                        <td><span class="quadrado-colorido" :style="{ 'background-color': item.cor }"></span> Tarefa <strong>{{item.tarefa}}</strong> da máquina <strong>{{item.maquina}}</strong> - {{item.tempo}} t</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>  
            </div>                 
          </div>
      </div>    
    </template>
  </Card>   
</template>

<script>
import Card from "../components/Card.vue";

export default {
  name: "GRAFICO",
  components: {
    Card
  },    
  props: [
    'instancia',
    'maquinas',
  ],  
  data: function () {
    return {
      tamanhoGrafico: {
        pequeno: {
          width: 1000,
          height: 600,
        },
        grande: {
          width: 5000,
          height: 800,
        },
        selecionado: 'pequeno'  
      },
      erro: false,
      msgErro: '',      
      legendaTarefas: [],
      chartOptions: {
        chart: {
          type: "bar",
          height: 350,
          width: 10,
          stacked: true,
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: true,
            type: "x",
            resetIcon: {
              offsetX: -10,
              offsetY: 0,
              fillColor: "#fff",
              strokeColor: "#37474F",
            },
            selection: {
              background: "#90CAF9",
              border: "#0D47A1",
            },
          },                
        },
        dataLabels: {
          enabled: true,
          dropShadow: {
            enabled: true
          },
          style: {
            fontSize: "14px",
          },          
        },     
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              total: {
                enabled: true,
                offsetX: 0,
                style: {
                  fontSize: "14px",
                  fontWeight: 900,
                },
              },
            },
          },
        },
        stroke: {
          width: 2,
          colors: ["#FFFFFF"],
        },
        title: {
          text: 'Distribuição das tarefas entre as máquinas',
          align: 'left',
        },  
        subtitle: {
            text: 'As partes coloridas indicam tarefas, enquanto as partes hachuradas indicam as trocas de ferramentas.',
            align: 'left',
        },           
        xaxis: {
          categories: [ ],
          labels: { formatter: function (val) { return val + " t"; }, },
          title: { text: 'Tempo', },
        },
        yaxis: {
          title: { text: 'Máquinas', },
        },
        tooltip: {
          shared: false,
          x: { formatter: function (val) { return val; }, },
          y: { formatter: function (val) { return val + " t"; }, },
        },
        legend: {
          position: "top",
          horizontalAlign: "center",
          offsetX: 40,
          show: false,
        },
        grid: {
          position: 'front',
          borderColor: '#808080',
          strokeDashArray: 3,          
        },        
      },
      series: [ ],
      maquinasXtarefas: [ ],
    };
  },
  computed: {
    tarefasFiltradas() {
      return this.legendaTarefas.filter(item => item.tempo > 0);
    },
  },
  methods: {
    tamanhoPequeno() {
      this.tamanhoGrafico.selecionado = 'pequeno';
    },
    tamanhoGrande() {
      this.tamanhoGrafico.selecionado = 'grande';
    },

    carregarGrafico() {    
      try {

        this.limpar();

        this.series.length = 0;
        this.chartOptions.xaxis.categories.length = 0;     
        this.maquinasXtarefas.length = 0;

        let tarefas = [];
        for(let i = 0; i < this.maquinas.length; i++){
          const lista = this.maquinas[i].tarefas;        
          tarefas.push({ maquina: i, lista: lista });
        }

        for(let i = 0; i < (this.maquinas.length); i++){
          this.maquinasXtarefas.push(this.maquinas[i].matrizResposta);        
        }

        for(let i = 0; i < this.maquinasXtarefas.length; i++){        
          this.chartOptions.xaxis.categories.push(`Máquina ${i}`);
        }

        let matrizInvertida = this.inverterMatriz(this.maquinasXtarefas);
        for(let i = 0; i < matrizInvertida.length; i++){                    
          this.series.push({ name: 'Tempo: ', data: matrizInvertida[i], });
          let cont = 0;
          for(let j = 0; j < matrizInvertida.length; j++){
              let valor = matrizInvertida[j][i];

              if(valor < 1){
                  const cor = '#000000';                
                  matrizInvertida[j][i] = {
                    x: '', 
                    y: Math.abs(valor), 
                    fillColor: cor.toString(), 
                    fill: { 
                      type: 'pattern', 
                      pattern: { 
                        style: 'slantedLines', 
                        width: 5, 
                        height: 5, 
                        strokeWidth: 1 
                      } 
                    },                   
                  }
              }else{
                  const cor = this.randomColor();                  
                  matrizInvertida[j][i] = {
                    x: '', 
                    y: valor, 
                    fillColor: cor.toString(), 
                  }
                  if(tarefas.length > i){
                    this.legendaTarefas.push({
                      cor: cor.toString(),
                      tempo: valor,
                      maquina: i,
                      tarefa: tarefas[i].lista[cont],
                    });
                  }                                
                  cont++;
              }
          }
        }
      } catch (error) {
        this.erro = true;
        this.msgErro = "Erro ao carregar o gráfico.";        
        console.log(error);
      }

    },

    // LIMPAR O GRÁFICO
    limpar() {
      this.legendaTarefas.length = 0;
      this.series.length = 0;
      this.chartOptions.xaxis.categories.length = 0;     
      this.maquinasXtarefas.length = 0;
    },

    // CONVERTE OS EIXOS X E Y
    inverterMatriz(matriz) {

      try {
        let linhas = matriz.length;
        let colunas = 0;

        for(let t = 0; t < matriz.length; t++){
          if(colunas < matriz[t].length){
            colunas = matriz[t].length;
          }
        }

        let matrizInvertida = [];
        for (let i = 0; i < colunas; i++) {
            matrizInvertida[i] = [];
            for (let j = 0; j < linhas; j++) {
              if (typeof matriz[j][i] === 'undefined') {
                matrizInvertida[i][j] = 0;
              }else{
                matrizInvertida[i][j] = matriz[j][i];
              }
            }
        }
        return matrizInvertida;        
      } catch (error) {
        this.erro = true;
        this.msgErro = "Erro ao inverter a matriz.";        
        console.log(error);        
      }
    },

    // GERA UMA COR ALEATÓRIA
    randomColor() {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);

      const hexR = r.toString(16).padStart(2, '0');
      const hexG = g.toString(16).padStart(2, '0');
      const hexB = b.toString(16).padStart(2, '0');
      return `#${hexR}${hexG}${hexB}`;
    },
       
  },

};
</script>
<style>
  .meu-card {
    width: 2000;
    overflow-x: auto;
    white-space: nowrap; 
  }
  .quadrado-colorido {
      display: inline-block;
      width: 15px;
      height: 15px;
      margin-right: 5px;
  }  
  .legenda {
    width: 2000;
    height: 200px;
    overflow-x: auto;
    overflow-y: auto;
    white-space: nowrap; 
  }
</style>
