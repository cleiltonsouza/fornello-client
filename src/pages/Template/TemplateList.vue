<template>
  <div>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" />
        <q-breadcrumbs-el label="Template" />
      </q-breadcrumbs>
    </div>
    <div class="q-pa-md">
      <q-table title="Templates" :data="data" :columns="colunas" :loading="loading" row-key="_id" color="primary"
        :pagination="{rowsPerPage:30}">
        <template v-slot:body-template="props">
        <q-td :props="props">
          <descricao-template-component :template="props.row.row"/>
        </q-td>
      </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn dense round flat color="primary" @click="editarMapeamento(props)" icon="map">
              <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                <strong>Mapeamento</strong>
              </q-tooltip>
            </q-btn>
            <q-btn dense round flat color="warning" @click="editar(props)" icon="edit">
              <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                <strong>Editar</strong>
              </q-tooltip>
            </q-btn>
            <q-btn dense round flat color="red" @click="excluir(props)" icon="delete">
              <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                <strong>Excluir</strong>
              </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="positive" @click="novoTemplate">
          <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
            <strong>Adicionar</strong>
          </q-tooltip>
        </q-btn>
      </q-page-sticky>
    </div>
  </div>
</template>

<script lang="ts">
import { _helperConstants } from "src/helpers/_helperConstants";
import { Component, Vue } from "vue-property-decorator";
import DescricaoTemplateComponent from "../../components/DescricaoTemplate.vue";
import { TemplateService } from "../../services/TemplateService";
@Component({ components: {  DescricaoTemplateComponent } })

export default class TemplateList extends Vue {
  data: any[] = [];
  loading: boolean = true;

  private _templateService!: TemplateService;

  colunas: Array<object> = [
    { name: "api", label: "API", field: "api", align: "left" },
    { name: "version", label: "Version", field: "version", align: "left" },
    { name: "location", label: "Location", field: "location", align: "left" },
    { name: "method", label: "Method", field: "method", align: "left" },
    {
      field: "endpoint",
      label: "Endpoint",
      name: "endpoint",
      align: "left"
    },

    { name: "actions", label: "", field: "", align: "center" },
  ];

  recuperaConteudos() {
    this.loading = true;
    this._templateService
      .listar()
      .then((result) => {
        this.loading = false;
        this.data = result;
      })
      .catch()
      .finally();
  }

  created() {
    this._templateService = new TemplateService();
    this.recuperaConteudos();
  }

  editar(row: any) {
    console.log(row.row.id);
    this.$router.push({
      path: `templateEdit/${row.row._id}`,
    });
  }

  excluir(row: any) {
    this._templateService.excluir(row.row._id)
      .then((result) => {
        if (result.type == _helperConstants.Notify.POSITIVE) {
          this.data = this.data.filter(value => value._id != row.row._id)
        }
        this.$q.notify(result)
      })
      .catch((err: any) => this.$q.notify(err))
  }

  editarMapeamento(row: any) {
    this.$router.push({
      path: `mapeamentoEdit/${row.row.mapeamentoId}`,
    });
  }

  novoTemplate() {
    this.$router.push({
      path: `templateCreate`,
    });
  }
}
</script>
