<template>
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
            @click="atualizar()"
                      >

              <strong>Atualizar</strong>
          </q-btn>
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
export default class PersonaEdit extends Vue {
  dataInput : any = {};
  dataOutput : any ={};
  personaId : string;
  options: any =  {
                type: Object,
                mode: 'code'
  }
            
  private _personaService!: PersonaService;

  onError(){
    console.log("error de json");
  }

  recuperaPorId(personaId : string) {
    this._personaService
      .recuperaPorId(personaId)
      .then((result) => {
        
        this.dataInput = result.persona;
        console.log(result)
      })
      .catch((err: any) => {
        this.$q.notify(err);
      })
      .finally(() => {
        this.$q.loading.hide();
      });
  }

  atualizar(){
    this._personaService
      .atualizar(this.personaId, {persona:this.dataInput})
      .then((result) => {
        
        console.log(result)
      })
       .catch((err: any) => {
        this.$q.notify(err);
      })
      .finally(() => {
      });
  }

  created() {
    this._personaService = new PersonaService();
    this.personaId = this.$route.params.personaId;
    this.recuperaPorId(this.personaId);
  }
}
</script>
