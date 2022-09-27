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
          <div class="text-subtitle2">{{ mapeamentoInput.template.descricao }}</div>
        </q-card-section>

        <q-card-section>
          <div class="q-pa-md q-gutter-md">
            <div
              class="text-h6"
              style="margin-top: 10px"
              v-for="mapeamento in mapeamentoInput.mapeamentoItens"
              v-bind:key="mapeamento.mapeamentoItemId"
            >
              <q-badge color="primary" align="middle" text-color="white">
                template api
              </q-badge>
              <q-badge align="middle" color="white" text-color="black">
                {{ mapeamento.pathTemplate }}
              </q-badge>
              <q-input
                outlined
                v-model="mapeamento.pathPersona"
                label="Persona template"
              />
              <div v-if="mapeamento.tipoMapeamentoItem != 3">
                <div
                  class="text-h6"
                  style="margin-top: 10px"
                  v-for="mapeamentoNivel1 in mapeamento.subMapeamentoItem"
                  v-bind:key="mapeamentoNivel1.mapeamentoItemId"
                >
                  <q-badge color="primary" align="middle" text-color="white">
                    template api
                  </q-badge>
                  <q-badge align="middle" color="white" text-color="black">
                    {{ mapeamentoNivel1.pathTemplate }}
                  </q-badge>
                  <q-input
                    outlined
                    v-model="mapeamentoNivel1.pathPersona"
                    label="Persona template"
                  />

                  <div v-if="mapeamentoNivel1.tipoMapeamentoItem != 3">
                    <div
                      class="text-h6"
                      style="margin-top: 10px"
                      v-for="mapeamentoNivel2 in mapeamentoNivel1.subMapeamentoItem"
                      v-bind:key="mapeamentoNivel2.mapeamentoItemId"
                    >
                      <q-badge
                        color="primary"
                        align="middle"
                        text-color="white"
                      >
                        template api
                      </q-badge>
                      <q-badge align="middle" color="white" text-color="black">
                        {{ mapeamentoNivel2.pathTemplate }}
                      </q-badge>
                      <q-input
                        outlined
                        v-model="mapeamentoNivel2.pathPersona"
                        label="Persona template"
                      />
                    </div>
                  </div>
                </div>
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
import { _modelsInput } from "../../models/_modelsInput";
@Component
export default class MapeamentoEdit extends Vue {
  mapeamentoId!: string;
  mapeamentoInput: _modelsInput.Mapeamento = {
    templateId: "",
    tipoMapeamentoItem: 0,
    template: {},
    mapeamentoItens: [],
  };


  private _mapeamentoService!: MapeamentoService;



  atualizar() {
    this._mapeamentoService
      .atualizar(this.mapeamentoId, {
        mapeamentoItens: this.mapeamentoInput.mapeamentoItens,
      }).then((result) => {

        this.$q.notify(result);
      })
      .catch((err: any) => {
        this.$q.notify(err);
      })
      .finally(() => {
        this.$q.loading.hide();
      });
  }


  recuperaPorId(mapeamentoId: string) {
    this._mapeamentoService
      .recuperaPorId(mapeamentoId)
      .then((result) => {
        console.log(result);
        this.mapeamentoInput = result;
      })
      .catch((err: any) => {
        this.$q.notify(err);
      })
      .finally(() => {
        // this.$q.loading.hide();
      });
  }

  

  created() {
    this._mapeamentoService = new MapeamentoService();
    // this._personaTemplateService = new PersonaTemplateService();
    this.mapeamentoId = this.$route.params.mapeamentoId;
    this.recuperaPorId(this.mapeamentoId);
    // this.recuperaPersonaTemplate();
  }
}
</script>
