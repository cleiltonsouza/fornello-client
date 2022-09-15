<template>
  <div>
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Home" />
      <q-breadcrumbs-el label="Template" />
      <q-breadcrumbs-el label="Mapeamento" />
    </q-breadcrumbs>
    <div class="q-pa-md">
      <div class="q-gutter-md">
        <q-input
          filled
          v-model="casoInput.descricaoCaso"
          label="Descrição do caso"
        />

        <q-select
          v-model="personaId"
          outlined
           :options="personas"
          @input ="pessoaSelecionada"
               label="Persona"
        />
        <div v-if="personaSelecionada.data != null">
          <div
            class="text-h6"
            style="margin-top: 10px"
            v-for="mapeamento in mapeamentoInput.mapeamentoItens"
            v-bind:key="mapeamento.mapeamentoItemId"
          > <div  class="col-12">
            <q-badge outline align="middle" color="teal">
              {{ mapeamento.pathTemplate }}
            </q-badge>
            </div>
          <div  class="col-12">
            <q-badge outline align="middle" color="blue" class="col-12">
              {{ mapeamento.pathPersona }}
            </q-badge>
          </div>
          <div  class="col-12">
            <q-input
              filled
              v-model="personaSelecionada.data[mapeamento.pathPersona]"
              label="Valor"
            />
          </div>
            <q-separator />
          </div>
        </div>

        <q-btn color="blue" @click="atualizar()">
          <strong>Atualizar</strong>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { CasoService } from "../../services/CasoService";
import { _modelsInput } from "../../models/_modelsInput";
import { MapeamentoService } from "../../services/MapeamentoService";
import { PersonaService } from "../../services/PersonaService";

@Component
export default class CasoCreate extends Vue {
  mapeamentoId!: string;
  personaId : string = "";

  mapeamentoInput: _modelsInput.Mapeamento = {
    templateId: "",
    template: {},
    mapeamentoItens: [],
  };

  casoInput: _modelsInput.Caso = {
    descricaoCaso: "",
    mapeamentoId: "",
    mapeamentoTemplatePersonaCasoItens: [],
  };
  private _personaService!: PersonaService;
  private _mapeamentoService!: MapeamentoService;
  private _casoService!: CasoService;
  personaSelecionada : any = {};
  personas: any[] = [];

  atualizar() {
    this._mapeamentoService
      .atualizar(this.mapeamentoId, {
        mapeamentoItens: this.mapeamentoInput.mapeamentoItens,
      })
      .then((result) => {
        // this.$router.push({
        //   path: `mapeamento`,
        // });
      })
      .catch((err: any) => {
        this.$q.notify(err);
      })
      .finally(() => {});
  }

  recuperaMapeamentoPorId(mapeamentoId: string) {
    this._mapeamentoService
      .recuperaPorId(mapeamentoId)
      .then((result) => {
        this.mapeamentoInput = result;
      })
      .catch((err: any) => {
        this.$q.notify(err);
      })
      .finally(() => {
        // this.$q.loading.hide();
      });
  }

  recuperaPersonas() {
    this._personaService
      .listar()
      .then((result) => {
        this.personas = result.map((x) => {
          let obj = {}
          if(x.persona["nome"]){
            obj ={ label: (x.persona.nome ?? ""), value: x._id, data: x.persona }
          }
          return { label: (x.persona.nome ?? ""), value: x._id, data: x.persona };
        });

      })
      .catch((err: any) => {
        this.$q.notify(err);
      })
      .finally(() => {
        // this.$q.loading.hide();
      });
  }

  pessoaSelecionada(value: any) {
    debugger
    this.personaSelecionada = value;
  }
  created() {
    this._mapeamentoService = new MapeamentoService();
    this._personaService = new PersonaService();
    this.mapeamentoId = this.$route.params.mapeamentoId;
    this.recuperaMapeamentoPorId(this.mapeamentoId);
    this.recuperaPersonas();
  }
}
</script>
