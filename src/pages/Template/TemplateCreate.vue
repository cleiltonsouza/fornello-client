<template>
  <div>
    <div class="q-pa-md q-gutter-sm">

      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" />
        <q-breadcrumbs-el label="Template" />
        <q-breadcrumbs-el label="Novo template" />
      </q-breadcrumbs>
    </div>
    <div class="q-pa-md q-gutter-sm">

      <q-card class="my-card ">
        <q-card-section>
          <div class="text-h6">Novo Template</div>
          <div class="text-subtitle2">{{dataInput.nome}}</div>
        </q-card-section>

        <div class="q-gutter-md col-12">
          <div class="q-pa-md row">
            <q-input class="col-2 q-mr-sm" outlined label="API" v-model="template.api" />
            <q-input class="col-2 q-mr-sm" outlined label="Version" v-model="template.version" />
            <q-input class="col-2 q-mr-sm" outlined label="Endpoint" v-model="template.endpoint" />
            <q-select class="col-2 q-mr-sm" outlined v-model="template.method"
              :options="['POST', 'GET', 'PUT', 'DELETE', 'PATCH']" label="Method" />
            <q-select class="col-2" outlined v-model="template.location" :options="['RESPONSE', 'REQUEST']"
              label="Location" />
          </div>
        </div>
        <q-card-section>
          <v-jsoneditor v-model="template.template" :options="options" height="500px" @error="onError">
          </v-jsoneditor>
        </q-card-section>

        <q-separator dark />
        <q-card-actions class="q-pl-md">
          <q-btn color="primary" icon="check" label="Salvar" flat @click="adicionar()" />
          <q-btn icon="arrow_back" label="Voltar" flat @click="voltar()" />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { TemplateService } from "../../services/TemplateService";
import { _modelsInput } from "../../models/_modelsInput";
import VJsoneditor from 'v-jsoneditor/src/index'
@Component(
  {
    components: { VJsoneditor }
  })
export default class TemplateCreate extends Vue {
  dataInput: any = {};
  options: any = {
    type: Object,
    mode: 'code'
  }

  template: _modelsInput.Template = {
    api: "",
    endpoint: "",
    version: "",
    method: "",
    location: "",
    template: {}
  }

  private _templateService!: TemplateService;

  onError() {
    console.log("error de json");
  }

  adicionar() {
    this._templateService.
      adicionar(this.template)
      .then((result) => this.$q.notify(result))
      .catch((err: any) => this.$q.notify(err))
      .finally(() => this.$router.push({ path: `/template` }));
  }

  voltar() {
    this.$router.replace({ name: "template" });
  }

  created() {
    this._templateService = new TemplateService();
  }
}
</script>
