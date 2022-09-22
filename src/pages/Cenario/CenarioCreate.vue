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
              focus
              :rules="[ val => val && val.length > 0 || 'Campo de preenchimento obrigatório']"
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
            <div v-if="cenarioInput.mapeamentoTemplatePersonaCenarioItens.length > 0">
              <div
                class="text-h6"
                style="margin-top: 10px"
                v-for="mapeamento in cenarioInput.mapeamentoTemplatePersonaCenarioItens"
                v-bind:key="mapeamento.mapeamentoItem.mapeamentoItemId"
              >
                <cenario-mapeamento-template-persona-component
                  :mapeamentoTemplatePersonaCenario="mapeamento"
                />
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
import CenarioMapeamentoTemplatePersonaComponent from "./components/CenarioMapeamentoTemplatePersonaComponent.vue";
import RecuperaObjetoPorString from "../../helpers/RecuperaObjetoPorString";

@Component({ components: { CenarioMapeamentoTemplatePersonaComponent } })
export default class CenarioCreate extends Vue {
  mapeamentoId: string = "";
  personaId: string = "";

  mapeamentos: any[] = [];

  mapeamentoInput: _modelsInput.Mapeamento = {
    templateId: "",
    tipoMapeamentoItem: 0,
    template: {},
    mapeamentoItens: [],
  };

  cenarioInput: _modelsInput.Cenario = {
    descricao: "",
    mapeamentoId: "",
    templateId: "",
    templateDescricao: "",
    personaId: "",
    persona: {},
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

  recuperaMapeamentos() {
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
        console.log(result);
        this.cenarioInput.mapeamentoTemplatePersonaCenarioItens =
          result.mapeamentoItens.map((x) => {
            let newitem: _modelsInput.MapeamentoTemplatePersonaCenarioItem = {
              mapeamentoTemplatePersonaCenarioItensId: x.mapeamentoItemId,
              mapeamentoItem: x,
              value: null,
            };
            return newitem;
          });
        this.montaValueDoMapeamentoPorPersona();
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

  mapeamentoSelecionado(value: any) {
    this.cenarioInput.mapeamentoId = value.data._id;
    this.cenarioInput.templateId = value.data.templateId;
    this.cenarioInput.templateDescricao = value.data.template;
    this.recuperaMapeamentoPorId(value.data._id);
  }

  montaValueDoMapeamentoPorPersona() {
    if (this.cenarioInput.personaId && this.cenarioInput.mapeamentoId) {
      this.cenarioInput.mapeamentoTemplatePersonaCenarioItens.forEach((x) => {
        if (x.mapeamentoItem.pathPersona) {
          x.value = RecuperaObjetoPorString.recuperar(
            this.cenarioInput.persona,
            x.mapeamentoItem.pathPersona
          );
        }
      });
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
