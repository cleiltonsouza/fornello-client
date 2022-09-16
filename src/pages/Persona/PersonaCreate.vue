<template>
  <div>

    <div class="q-pa-md q-gutter-sm">

    <q-breadcrumbs>
      <q-breadcrumbs-el label="Home" />
      <q-breadcrumbs-el label="Persona" />
      <q-breadcrumbs-el label="Nova Persona" />
    </q-breadcrumbs>
 </div>
    <div class="q-pa-md q-gutter-sm">

      <q-card class="my-card ">
        <q-card-section>
          <div class="text-h6">Nova Persona</div>
          <div class="text-subtitle2">{{dataInput.nome}}</div>
        </q-card-section>

        <q-card-section>
          <v-jsoneditor
            v-model="dataInput"
            :options="options"
            height="500px"
            @error="onError"
            @
          >
          </v-jsoneditor>
        </q-card-section>

        <q-separator dark />

        <q-card-actions>

          <q-btn color="primary" icon="check" label="Salvar" flat @click="adicionar()"/>

          <q-btn  icon="arrow_back" label="Voltar" flat @click="voltar()"/>

        </q-card-actions>
      </q-card>
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
        
        this.$q.notify(result);

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

    voltar() {
    this.$router.replace({ name: "persona" });
  }

  created() {
    this._personaService = new PersonaService();
  }
}
</script>
