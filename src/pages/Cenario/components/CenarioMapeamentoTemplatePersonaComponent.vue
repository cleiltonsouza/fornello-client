<template>
  <div v-if="mapeamentoTemplatePersonaCenario">
    <q-card class="my-card">
      <q-card-section>
        <div class="col-12">
          <q-badge color="primary" align="middle" text-color="white">
            template api
          </q-badge>
          <q-badge align="middle" color="white" text-color="black">
            {{ mapeamentoTemplatePersonaCenario.mapeamentoItem.pathTemplate }}
          </q-badge>
        </div>
        <div class="col-12">
          <q-badge color="indigo" align="middle" text-color="white">
            template persona
          </q-badge>
          <q-badge align="middle" color="white" text-color="black">
            {{ mapeamentoTemplatePersonaCenario.mapeamentoItem.pathPersona }}
          </q-badge>
        </div>
         <div class="col-12">
          <q-badge color="secondary" align="middle" text-color="white"
          v-if="mapeamentoTemplatePersonaCenario.mapeamentoItem
                .tipoMapeamentoItem == 1">
            array de string
          </q-badge>
        </div>
        <div class="col-12">
          <q-input
            outlined
            v-model="mapeamentoTemplatePersonaCenario.value"
            label="Valor"
            @input="updateValue"
            v-if="
              mapeamentoTemplatePersonaCenario.mapeamentoItem
                .tipoMapeamentoItem == 3
            "
          />
          <q-select
            label="Valor"
            outlined
            v-model="mapeamentoTemplatePersonaCenario.value"
            use-input
            use-chips
            multiple
            hide-dropdown-icon
            input-debounce="0"
            new-value-mode="add"
            v-if="
              mapeamentoTemplatePersonaCenario.mapeamentoItem
                .tipoMapeamentoItem == 1
            "
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { _modelsInput } from "../../../models/_modelsInput";

@Component
export default class CenarioMapeamentoTemplatePersonaComponent extends Vue {
  @Prop()
  readonly mapeamentoTemplatePersonaCenario!: _modelsInput.MapeamentoTemplatePersonaCenarioItem;

    updateValue(value : any){
        console.log(value)
        this.$emit("value", this.mapeamentoTemplatePersonaCenario)
    }
}
</script>
