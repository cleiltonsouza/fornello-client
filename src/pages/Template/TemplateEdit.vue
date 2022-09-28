<template>
  <div>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" />
        <q-breadcrumbs-el label="Template" />
        <q-breadcrumbs-el label="Atualização" />
      </q-breadcrumbs>
    </div>
    <div class="q-pa-md q-gutter-sm">
      <q-card class="my-card ">
        <q-form @submit="updateTempĺate()">
          <q-card-section>
            <div class="text-h6">Atualizar Template</div>
            <div class="text-subtitle2">{{dataInput.nome}}</div>
          </q-card-section>
          <div class="q-gutter-md col-12">
            <div class="q-pa-md row">
              <custom-input label="API" :required="true" v-model="dataInput.api" />
              <custom-input label="Version" :required="true" v-model="dataInput.version" />
              <custom-input label="Endpoint" :required="true" v-model="dataInput.endpoint" />
              <custom-select label="Method" :options="['POST', 'GET', 'PUT', 'DELETE', 'PATCH']" :required="true"
                v-model="dataInput.method" />
              <custom-select label="Location" :options="['RESPONSE', 'REQUEST']" :required="true"
                v-model="dataInput.location" />
            </div>
          </div>
          <q-card-section>
            <v-jsoneditor v-model="dataInput.template" :options="options" height="500px" @error="onError">
            </v-jsoneditor>
          </q-card-section>
          <q-card-actions class="q-pl-md">
            <q-btn color="primary" type="submit">
              <strong>Atualizar</strong>
            </q-btn>
            <q-btn icon="arrow_back" label="Voltar" flat @click="navigateBack()" />
          </q-card-actions>
        </q-form>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CustomInput from './components/CustomInput.vue'
import CustomSelect from './components/CustomSelect.vue'
import { TemplateService } from "../../services/TemplateService";
import VJsoneditor from 'v-jsoneditor/src/index'
@Component(
  {
    components: { VJsoneditor, CustomInput, CustomSelect }
  })
export default class TemplateEdit extends Vue {
  dataInput: any = {};
  dataOutput: any = {};
  templateId: string = "";
  options: any = {
    mode: 'code'
  }

  private _templateService!: TemplateService;
  onError() {
    console.log("error de json");
  }

  findTemplateById(templateId: string) {
    this._templateService
      .recuperaPorId(templateId)
      .then((result) => this.dataInput = result)
      .catch((err: any) => this.$q.notify(err))
      .finally(() => this.$q.loading.hide());
  }

  updateTempĺate() {
    this._templateService
      .atualizar(this.templateId, this.dataInput)
      .then((result) => this.$q.notify(result))
      .catch((err: any) => this.$q.notify(err))
      .finally(() => this.$router.push({ path: `/template` }));
  }

  created() {
    this._templateService = new TemplateService();
    this.templateId = this.$route.params.templateId;
    this.findTemplateById(this.templateId);
  }

  navigateBack() {
    this.$router.back();
  }
}
</script>
