<template>
  <div>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" />
        <q-breadcrumbs-el label="Cenário" />
        <q-breadcrumbs-el label="Novo" />
      </q-breadcrumbs>
    </div>
    <div class="q-pa-md q-gutter-sm">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">Cenário</div>
          <div class="text-subtitle2">{{ cenarioInput.descricao }}</div>
        </q-card-section>

        <q-card-section>
          <div class="q-pa-md q-gutter-md">
            <q-input
              outlined
              v-model="cenarioInput.descricao"
              label="Descrição do cenario"
            />

            <q-select
              v-model="mapeamentoId"
              outlined
              :options="mapeamentos"
              @input="mapeamentoSelecionado"
              label="Mapeamento"
            />

            <q-select
              v-model="personaId"
              outlined
              :options="personas"
              @input="pessoaSelecionada"
              label="Persona"
            />
            <div v-if="personaSelecionada.data != null">
              <div
                class="text-h6"
                style="margin-top: 10px"
                v-for="mapeamento in cenarioInput.mapeamentoTemplatePersonaCenarioItens"
                v-bind:key="mapeamento.mapeamentoItem.mapeamentoItemId"
              >
                <div class="col-12">
                  <q-badge color="primary" align="middle" text-color="white">
                    template api
                  </q-badge>
                  <q-badge align="middle" color="white" text-color="black">
                    {{ mapeamento.mapeamentoItem.pathTemplate }}
                  </q-badge>
                </div>
                <div class="col-12">
                  <q-badge color="indigo" align="middle" text-color="white">
                    template persona
                  </q-badge>
                  <q-badge align="middle" color="white" text-color="black">
                    {{ mapeamento.mapeamentoItem.pathPersona }}
                  </q-badge>
                </div>
                <div class="col-12">
                  <q-input outlined v-model="mapeamento.value" label="Valor" />
                </div>
                <q-separator />
              </div>
            </div>
          </div>
        </q-card-section>

        <q-separator dark />

        <q-card-actions>
          <q-btn
            color="primary"
            icon="check"
            label="Salvar"
            flat
            @click="adicionar()"
          />

          <q-btn icon="arrow_back" label="Voltar" flat @click="voltar()" />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { CenarioService } from "../../services/CenarioService";
import { _modelsInput } from "../../models/_modelsInput";
import { MapeamentoService } from "../../services/MapeamentoService";
import { PersonaService } from "../../services/PersonaService";
import  RecuperaObjetoPorString  from "../../helpers/RecuperaObjetoPorString";

@Component
export default class CenarioCreate extends Vue {
  mapeamentoId: string = "";
  personaId: string = "";

  mapeamentos : any[] = []

  mapeamentoInput: _modelsInput.Mapeamento = {
    templateId: "",
    template: {},
    mapeamentoItens: [],
  };

  cenarioInput: _modelsInput.Cenario = {
    descricao: "",
    mapeamentoId: "",
    templateId : "",
    templateDescricao : "",
    personaId : "",
    persona : {},
    mapeamentoTemplatePersonaCenarioItens: [],
  };
  private _personaService!: PersonaService;
  private _mapeamentoService!: MapeamentoService;
  private _cenarioService!: CenarioService;
  personaSelecionada: any = {};
  personas: any[] = [];

  adicionar() {
    this._cenarioService
      .adicionar(this.cenarioInput)
      .then((result) => {

        this.$q.notify(result);
      })
      .catch((err: any) => {
        this.$q.notify(err);
      })
      .finally(() => {
        this.$q.loading.hide();
      });
  }

  recuperaMapeamentos(){
    this._mapeamentoService
      .listar()
      .then((result) => {
        this.mapeamentos = result.map((x) => {
        
          return { label: x.template ?? "", value: x._id, data: x };
        });
      })
      .catch((err: any) => {
        this.$q.notify(err);
      })
      .finally(() => {
        this.$q.loading.hide();
      });
  }

  recuperaMapeamentoPorId(mapeamentoId: string) {
    this._mapeamentoService
      .recuperaPorId(mapeamentoId)
      .then((result) => {
        
this.mapeamentoInput = result;
        this.cenarioInput.mapeamentoId = this.mapeamentoId;
        this.cenarioInput.mapeamentoTemplatePersonaCenarioItens = this.mapeamentoInput.mapeamentoItens
          .map(x=> {
            let newitem : _modelsInput.MapeamentoTemplatePersonaCenarioItem =
                          {
                            mapeamentoTemplatePersonaCenarioItensId : x.mapeamentoItemId,
                            mapeamentoItem : x,
                            value : null
                          }
                          return newitem});
      })
      .catch((err: any) => {
        this.$q.notify(err);
      })
      .finally(() => {
        this.$q.loading.hide();
      });
  }

  recuperaPersonas() {
    this._personaService
      .listar()
      .then((result) => {
        this.personas = result.map((x) => {
          let obj = {};
          if (x.persona["nome"]) {
            obj = {
              label: x.persona.nome ?? "",
              value: x._id,
              data: x.persona,
            };
          }
          return { label: x.persona.nome ?? "", value: x._id, data: x.persona };
        });
      })
      .catch((err: any) => {
        this.$q.notify(err);
      })
      .finally(() => {
        this.$q.loading.hide();
      });
  }


  pessoaSelecionada(value: any) {
    this.personaSelecionada = value;
    this.cenarioInput.persona = value.data;
    this.cenarioInput.personaId = value.value;

    this.montaValueDoMapeamentoPorPersona();
  }

  mapeamentoSelecionado(value: any){
    this.cenarioInput.mapeamentoId = value.data._id;
    this.cenarioInput.templateId = value.data.templateId;
    this.cenarioInput.templateDescricao = value.data.template
    this.cenarioInput.mapeamentoTemplatePersonaCenarioItens = value.data.mapeamentoItens
          .map(x=> {
            let newitem : _modelsInput.MapeamentoTemplatePersonaCenarioItem =
                          {
                            mapeamentoTemplatePersonaCenarioItensId : x.mapeamentoItemId,
                            mapeamentoItem : x,
                            value : null
                          }
                          return newitem});
    this.montaValueDoMapeamentoPorPersona();
  }

  montaValueDoMapeamentoPorPersona(){

    if(this.cenarioInput.persona && this.cenarioInput.mapeamentoId){
    this.cenarioInput.mapeamentoTemplatePersonaCenarioItens.forEach(x=>{
        x.value = RecuperaObjetoPorString.recuperar(this.cenarioInput.persona, x.mapeamentoItem.pathPersona);
    })
    }
  }

  created() {
    this._mapeamentoService = new MapeamentoService();
    this._personaService = new PersonaService();
    this._cenarioService = new CenarioService();
    this.recuperaMapeamentos();
    this.recuperaPersonas();
  }


  voltar() {
    this.$router.replace({ name: "cenario" });
  }
}
</script>
