<template>
  <Card :titulo="'Ajuda'" :icone="'bi bi-info-circle'">
    <template v-slot:conteudo>
      <div class="card">
        <div class="card-body">
            <ul class="list-group">
                <li class="list-group-item active"><strong>Tópicos da Ajuda</strong> <i class="bi bi-person-raised-hand"></i> </li>
                <li class="list-group-item"><strong><i class="bi bi-info-circle-fill"></i> Observações</strong>
                    <p><i>
                      ** Melhor solução conhecida - Leva em consideração a melhor solução conhecida, o estado da arte atual. 
                      Estes dados foram alimentados no banco de dados da aplicação. Caso haja alteração no estado da arte, o banco de dados deverá ser atualizado.                  
                    </i></p>
                </li>
                <li class="list-group-item"><strong><i class="bi bi-info-circle-fill"></i> Formatação do conteúdo do arquivo de entrada para instância</strong>
                    <p><br>
                      <span><strong>2 8 15 5</strong></span> <i class="bi bi-arrow-left-circle"></i> <i>Número de máquinas, Número de tarefas, Quantidade de ferramentas, Capacidade magazine</i><br>
                      <span><strong>65</strong></span> <i class="bi bi-arrow-left-circle"></i> <i>Tempo de troca por ferramenta</i><br>
                      <span><strong>56 10 42 22 44 20 21 40</strong></span> <i class="bi bi-arrow-left-circle"></i> <i>Tempo de execução de cada tarefa</i><br>
                      <span><strong>0 0 0 0 1 0 0 0</strong></span> <i class="bi bi-arrow-left-circle"></i> <i>Matriz de ferramentas</i><br>
                      <span><strong>1 0 0 0 0 0 0 0</strong></span> <i class="bi bi-arrow-left-circle"></i> <i>Matriz de ferramentas</i><br>
                      <span><strong>0 0 1 0 0 1 1 0</strong></span> <i class="bi bi-arrow-left-circle"></i> <i>Matriz de ferramentas</i><br>
                      <span><strong>0 0 0 0 0 0 1 1</strong></span> <i class="bi bi-arrow-left-circle"></i> <i>Matriz de ferramentas</i><br>
                      <span><strong>0 0 0 0 0 0 1 1</strong></span> <i class="bi bi-arrow-left-circle"></i> <i>Matriz de ferramentas</i><br>
                      <span><strong>0 0 0 0 0 1 0 0</strong></span> <i class="bi bi-arrow-left-circle"></i> <i>Matriz de ferramentas</i><br>
                      <span><strong>0 0 1 0 0 0 0 1</strong></span> <i class="bi bi-arrow-left-circle"></i> <i>Matriz de ferramentas</i><br>
                      <span><strong>1 1 0 0 0 0 0 0</strong></span> <i class="bi bi-arrow-left-circle"></i> <i>Matriz de ferramentas</i><br>
                      <span><strong>1 0 0 0 1 1 0 1</strong></span> <i class="bi bi-arrow-left-circle"></i> <i>Matriz de ferramentas</i><br>
                      <span><strong>0 1 0 0 1 0 1 0</strong></span> <i class="bi bi-arrow-left-circle"></i> <i>Matriz de ferramentas</i><br>
                      <span><strong>1 0 0 0 0 1 0 0</strong></span> <i class="bi bi-arrow-left-circle"></i> <i>Matriz de ferramentas</i><br>
                      <span><strong>0 0 0 1 1 0 0 0</strong></span> <i class="bi bi-arrow-left-circle"></i> <i>Matriz de ferramentas</i><br>
                      <span><strong>1 0 0 1 0 0 0 0</strong></span> <i class="bi bi-arrow-left-circle"></i> <i>Matriz de ferramentas</i><br>
                      <span><strong>0 0 0 0 1 1 1 0</strong></span> <i class="bi bi-arrow-left-circle"></i> <i>Matriz de ferramentas</i><br>
                      <span><strong>0 0 0 1 0 0 0 1</strong></span> <i class="bi bi-arrow-left-circle"></i> <i>Matriz de ferramentas</i><br>
                    </p>
                </li>
                <li class="list-group-item"><strong><i class="bi bi-info-circle-fill"></i> Formatação do conteúdo do arquivo de entrada para solução</strong>
                    <p><br>
                      <span><strong>5 458 0 3 4</strong></span> <i class="bi bi-arrow-left-circle"></i> <i >Número de trocas, Tempo da máquina, Tarefa a, ... Tarefa n</i><br>
                      <span><strong>6 560 7 2 6 5</strong></span> <i class="bi bi-arrow-left-circle"></i> <i>Número de trocas, Tempo da máquina, Tarefa a, Tarefa b, ... Tarefa n</i><br>
                    </p>
                </li>
                <li class="list-group-item"><strong><i class="bi bi-info-circle-fill"></i> Formato do arquivo de entrada para solução (.txt)</strong>
                    <p><br>
                      <span><strong>instance???_m=??_n=??_l=??_c=??_s=??</strong></span> <i class="bi bi-arrow-left-circle"></i> <i >nome da instancia: instance2, m: quantidade de máquinas, n: quantidade de tarefas, l: quantidade de ferramentas, c: capacidade magazine </i><br>                      
                    </p>
                    <p>
                      <i>Exemplo: <strong>instance2_m=2_n=8_l=15_c=5_s=1.txt</strong></i>
                    </p>
                </li>
                <li class="list-group-item"><strong><i class="bi bi-info-circle-fill"></i> Download de arquivos</strong>
                    <p> Baixe arquivos úteis</p>
                    <div class="row m-1">
                      <div class="col-md-12">  
                        <button class="btn btn-primary btn-sm m-2" type="button" @click="baixar('instances.zip')"><i class="bi bi-file-earmark-zip"></i> Pacote com instâncias</button>
                        <button class="btn btn-primary btn-sm m-2" type="button" @click="baixar('planilhaEstadoArte.xls')"><i class="bi bi-filetype-xls"></i> Planilha de resultados</button>
                      </div>             
                    </div>                      
                </li>
            </ul>
        </div>
      </div>
    </template>
  </Card>   
</template>

<script>
import Card from "../components/Card.vue";
import { download } from '../auxFunctions/http-download';

export default {
  name: "HELP",
  components: {
    Card,
  },   
  data: function () {
    return {

    };
  },
  methods: {
    async baixar(arquivo){
       await download(arquivo);
    },  
  },

};
</script>
<style scoped>

</style>