<template>
  <div>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" />
        <q-breadcrumbs-el label="Persona" />
      </q-breadcrumbs>
    </div>
    <div class="q-pa-md">
      <q-table
        title="Cenários"
        :data="data"
        :columns="colunas"
        :loading="loading"
        row-key="personaId"
        rowsPerPage="15"
        color="primary"
        :pagination.sync="pagination"
      >
   
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              dense
              round
              flat
              color="warning"
              @click="editar(props)"
              icon="edit"
            >
              <q-tooltip
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
              >
                <strong>Atualizar</strong>
              </q-tooltip>
            </q-btn>

            <q-btn
              dense
              round
              flat
              color="primary"
              @click="visualizarCompilado(props)"
              icon="visibility"
            >
              <q-tooltip
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
              >
                <strong>Compilado</strong>
              </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="positive" @click="novoCenario">
          <q-tooltip
            anchor="center left"
            self="center right"
            :offset="[10, 10]"
          >
            <strong>Adicionar</strong>
          </q-tooltip>
        </q-btn>
      </q-page-sticky>
    </div>
    <dialog-visualizar-compilado
      ref="dialogVisualizarCompilado"
    ></dialog-visualizar-compilado>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DescricaoTemplateComponent from "../../components/DescricaoTemplate.vue";
import { CenarioService } from "../../services/CenarioService";
import DialogVisualizarCompilado from "./components/DialogVisualizarCompilado.vue";

@Component({ components: { DialogVisualizarCompilado, DescricaoTemplateComponent } })
export default class CenarioList extends Vue {
  data: any[] = [];
  loading: boolean = true;
  pagination: any = {
    rowsPerPage: 30, // current rows per page being displayed
  };
  private _cenarioService!: CenarioService;

  colunas: Array<object> = [
   
    {
      field: "descricao",
      label: "Descrição",
      nome: "descricao",
      align: "left",
    },
    {
      field: "nome",
      label: "Persona",
      nome: "nome",
      align: "left",
    },

    {
      field: "template",
      label: "Template",
      nome: "template",
      align: "left",
    },
    { name: "actions", label: "", field: "", align: "center" },
  ];

  recuperaCenarios() {
    this.loading = true;
    this._cenarioService
      .listar()
      .then((result) => {
        this.data = result.map((s: any) => {
          return {
            cenarioId: s._id,
            descricao: s.descricao,
            template: s.templateDescricao,
            nome: s.persona.nome,
            compilado : s.compilado
          };
        });
      })
      .catch((err: any) => {
        this.$q.notify(err);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  created() {
    this._cenarioService = new CenarioService();
    this.recuperaCenarios();
  }

  editar(row: any) {
    this.$router.push({
      path: `cenarioEdit/${row.row.cenarioId}`,
    });
  }

  visualizarCompilado(row: any) {
    (
      this.$refs.dialogVisualizarCompilado as Vue & { show(any: any): boolean }
    ).show(row.row.compilado);
  }

  novoCenario() {
    this.$router.push({
      path: `cenarioCreate`,
    });
  }
}
</script>
