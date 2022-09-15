<template>
<div>
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Home" />
      <q-breadcrumbs-el label="Persona" />
      <q-breadcrumbs-el label="Novo" />
    </q-breadcrumbs>
  <div>
    <v-jsoneditor
      v-model="dataInput"
      :options="options"
      plus="true"
      height="800px"
      @error="onError"
      @
    >
    </v-jsoneditor>

    <q-btn
            color="blue"
            @click="adicionar()"
                      >

              <strong>Adicionar</strong>
          </q-btn>
  </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { PersonaService } from "../../services/PersonaService";
import VJsoneditor from 'v-jsoneditor/src/index'
@Component(
  {
    components:{VJsoneditor}
})
export default class PersonaCreate extends Vue {
  dataInput : any = {};
  options: any =  {
                type: Object,
                mode: 'code'
  }
            
  private _personaService!: PersonaService;

  onError(){
    console.log("error de json");
  }


  adicionar(){
    this._personaService.
    adicionar({persona:this.dataInput})
      .then((result) => {
        
        console.log(result);
      })
       .catch((err: any) => {
        this.$q.notify(err);
      })
      .finally(() => {
          this.$router.push({
      path: `persona`,
    });
      });
  }

  created() {
    this._personaService = new PersonaService();
  }
}
</script>
