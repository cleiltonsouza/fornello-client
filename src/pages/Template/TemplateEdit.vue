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
        <q-card-section>
          <div class="text-h6">Atualizar Template</div>
          <div class="text-subtitle2">{{dataInput.nome}}</div>
        </q-card-section>
        <div class="q-gutter-md col-12">
          <div class="q-pa-md row">
            <q-input class="col-2 q-mr-sm" outlined label="API" v-model="dataInput.api" />
            <q-input class="col-2 q-mr-sm" outlined label="Version" v-model="dataInput.version" />
            <q-input class="col-2 q-mr-sm" outlined label="Endpoint" v-model="dataInput.endpoint" />
            <q-select class="col-2 q-mr-sm" outlined v-model="dataInput.method"
              :options="['POST', 'GET', 'PUT', 'DELETE', 'PATCH']" label="Method" />
            <q-select class="col-2" outlined v-model="dataInput.location" :options="['RESPONSE', 'REQUEST']"
              label="Location" />
          </div>
        </div>
        <q-card-section>
          <v-jsoneditor v-model="dataInput.template" :options="options" height="500px" @error="onError">
          </v-jsoneditor>
        </q-card-section>
        <q-card-actions class="q-pl-md">
          <q-btn color="primary" @click="atualizar()">
            <strong>Atualizar</strong>
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { TemplateService } from "../../services/TemplateService";
import VJsoneditor from 'v-jsoneditor/src/index'
@Component(
  {
    components: { VJsoneditor }
  })
export default class TemplateEdit extends Vue {
  dataInput: any = {};
  dataOutput: any = {};
  templateId: string = "";
  options: any = {
    type: Object,
    mode: 'code'
  }

  private _templateService!: TemplateService;
  onError() {
    console.log("error de json");
  }

  recuperaPorId(templateId: string) {
    this._templateService
      .recuperaPorId(templateId)
      .then((result) => this.dataInput = result)
      .catch((err: any) => this.$q.notify(err))
      .finally(() => this.$q.loading.hide());
  }

  atualizar() {
    this._templateService
      .atualizar(this.templateId, this.dataInput)
      .then((result) => this.$q.notify(result))
      .catch((err: any) => this.$q.notify(err))
      .finally(() => this.$router.push({ path: `/template` }));
  }

  created() {
    this._templateService = new TemplateService();
    this.templateId = this.$route.params.templateId;
    this.recuperaPorId(this.templateId);
  }
}
</script>
