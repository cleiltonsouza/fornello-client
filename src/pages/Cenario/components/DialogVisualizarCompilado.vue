<template>
  <q-dialog ref="dialog" v-model="showModal"  full-width  full-height cancel>
    <q-card  class="column full-height full-width">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Compilado</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="q-gutter-md">
         <v-jsoneditor
            v-model="compiladoOutput"
            :options="options"
            height="500px"

          >
          </v-jsoneditor>
          
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn
            label="Voltar"
            @click="$emit('close')"
             value
            v-close-popup
          />
        </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import VJsoneditor from 'v-jsoneditor/src/index'

@Component(
  {
    components:{VJsoneditor}
})
export default class DialogVisualizarCompilado extends Vue{

  showModal : boolean = false;
  options: any =  {
                type: Object,
                mode: 'code'
  }
  compiladoOutput : any = {}


    show(compilado: any){
      this.compiladoOutput = compilado;
        this.showModal = true;
        
    }

  
  created() {
    this.compiladoOutput = this.compilado;
  }

  
}
</script>