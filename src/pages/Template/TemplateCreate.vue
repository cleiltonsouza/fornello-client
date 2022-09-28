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
        <q-form @submit="saveTemplate()">
          <q-card-section>
            <div class="text-h6">Novo Template</div>
            <div class="text-subtitle2">{{dataInput.nome}}</div>
          </q-card-section>

          <div class="q-gutter-md col-12">
            <div class="q-pa-md row">
              <custom-input label="API" :required="true" v-model="template.api" />
              <custom-input label="Version" :required="true" v-model="template.version" />
              <custom-input label="Endpoint" :required="true" v-model="template.endpoint" />
              <custom-select label="Method" :options="['POST', 'GET', 'PUT', 'DELETE', 'PATCH']" :required="true"
                v-model="template.method" />
              <custom-select label="Location" :options="['RESPONSE', 'REQUEST']" :required="true"
                v-model="template.location" />
            </div>
          </div>
          <q-card-section>
            <v-jsoneditor v-model="template.template" :options="options" height="500px" @error="onError">
            </v-jsoneditor>
          </q-card-section>

          <q-separator dark />
          <q-card-actions class="q-pl-md">
            <q-btn color="primary" icon="check" label="Salvar" type="submit" flat />
            <q-btn icon="arrow_back" label="Voltar" flat @click="navigateBack()" />
          </q-card-actions>
        </q-form>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { TemplateService } from "../../services/TemplateService";
import CustomInput from './components/CustomInput.vue'
import CustomSelect from './components/CustomSelect.vue'
import { _modelsInput } from "../../models/_modelsInput";
import VJsoneditor from 'v-jsoneditor/src/index'
@Component(
  {
    components: { VJsoneditor, CustomInput, CustomSelect }
  })
export default class TemplateCreate extends Vue {
  dataInput: any = {};
  options: any = {
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

  saveTemplate() {
    this._templateService.
      adicionar(this.template)
      .then((result) => this.$q.notify(result))
      .catch((err: any) => this.$q.notify(err))
      .finally(() => this.$router.push({ path: `/template` }));
  }

  navigateBack() {
    this.$router.back();
  }

  created() {
    this._templateService = new TemplateService();
  }
}
</script>
