<template>
  <div>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" />
        <q-breadcrumbs-el label="Template" />
        <q-breadcrumbs-el label="Mapeamento" />
      </q-breadcrumbs>
    </div>
    <div class="q-pa-md q-gutter-sm">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">Mapeamento</div>
          <div class="text-subtitle2">{{ mapeamentoInput.template}}</div>
        </q-card-section>

        <q-card-section>
          <div class="q-pa-md q-gutter-md">
            
            <div
              class="text-h6"
              style="margin-top: 10px"
              v-for="mapeamento in mapeamentoInput.mapeamentoItens"
              v-bind:key="mapeamento.mapeamentoItemId"
            >
            <q-badge color="primary"  align="middle" text-color="white">
                          template api
              </q-badge>
              <q-badge  align="middle" color="white" text-color="black">
                {{ mapeamento.pathTemplate }}
              </q-badge>
              <q-select
                v-model="mapeamento.pathPersona"
                :options="filterOptionsTemplatePersona"
                outlined
                @filter="filterPathPerson"
                use-input
                @new-value="adicionarNovoPathPersona"
                label="Persona template"
              />
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
            @click="atualizar()"
          />

          <q-btn icon="arrow_back" label="Voltar" flat @click="voltar()" />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MapeamentoService } from "../../services/MapeamentoService";
import { PersonaTemplateService } from "../../services/PersonaTemplateService";
import { _modelsInput } from "../../models/_modelsInput";
@Component
export default class MapeamentoEdit extends Vue {
  dataInput: any = {};
  mapeamentoId!: string;
  mapeamentoInput: _modelsInput.Mapeamento = {
    templateId: "",
    template: {},
    mapeamentoItens: [],
  };

  personaTemplate: any[] = [];

  private _mapeamentoService!: MapeamentoService;
  private _personaTemplateService!: PersonaTemplateService;

  adicionarNovoPathPersona(val: any) {
    this.personaTemplate.push(val);
  }

  filterOptionsTemplatePersona: any = {};

  filterPathPerson(val, update) {
    update(() => {
      debugger;
      if (val === "") {
        this.filterOptionsTemplatePersona = this.personaTemplate;
      } else {
        const needle = val.toLowerCase();
        this.filterOptionsTemplatePersona = this.personaTemplate.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      }
    });
  }
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

  recuperaPorId(mapeamentoId: string) {
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

  recuperaPersonaTemplate() {
    this._personaTemplateService
      .recuperaTemplate()
      .then((result) => {
        console.log(result);
        this.personaTemplate = result.path.map((s) => {
          return s;
        });

        this.filterOptionsTemplatePersona = this.personaTemplate;
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        // this.$q.loading.hide();
      });
  }

  created() {
    this._mapeamentoService = new MapeamentoService();
    this._personaTemplateService = new PersonaTemplateService();
    this.mapeamentoId = this.$route.params.mapeamentoId;
    this.recuperaPorId(this.mapeamentoId);
    this.recuperaPersonaTemplate();
  }
}
</script>
