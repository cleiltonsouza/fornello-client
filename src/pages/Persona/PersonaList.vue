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
      title="People"
      :data="data"
      :columns="colunas"
      :loading="loading"
      row-key="personaId"
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
          </q-td>
        </template>
      </q-table>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="positive" @click="novaPersona">
          <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
            <strong>Adicionar</strong>
          </q-tooltip>
        </q-btn>
      </q-page-sticky>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { PersonaService } from "../../services/PersonaService";
@Component
export default class PersonaList extends Vue {
  data: any[] = [];
  loading: boolean = true;
  pagination: any =  {
        rowsPerPage: 30 // current rows per page being displayed
  }
  private _personaService!: PersonaService;

  colunas: Array<object> = [
    {
      field: "personaId",
      label: "Id",
      nome: "personaId",
      align: "left",

    },
    {
      field: "nome",
      label: "Nome",
      nome: "nome",
      align: "left",

    },
    { name: "actions", label: "", field: "", align: "center" },
  ];

  recuperaConteudos() {
    this.loading = true;
    this._personaService
      .listar()
      .then((result) => {
        this.data = result.map(s => { return { personaId: s._id, nome: s.persona.nome } });
      }).catch((err: any) => {
        this.$q.notify(err);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  created() {
    this._personaService = new PersonaService();
    this.recuperaConteudos();
  }

  editar(row: any) {
    this.$router.push({
      path: `personaEdit/${row.row.personaId}`,
    });
  }

  excluir(row: any) {
    console.log(row);
  }

  novaPersona() {
    this.$router.push({
      path: `personaCreate`,
    });
  }
}
</script>
