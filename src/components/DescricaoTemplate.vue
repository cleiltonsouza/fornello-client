<template>
  <div v-if="template">
    <q-badge color="primary" v-if="template.method == 'POST'">{{template.method}}</q-badge>
    <q-badge color="primary" v-if="template.method == 'GET'">{{template.method}}</q-badge>
    <q-badge color="primary" v-if="template.method == 'PUT'">{{template.method}}</q-badge>
    <q-badge color="primary" v-if="template.method == 'DELETE'">{{template.method}}</q-badge>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { _modelsInput } from "../models/_modelsInput";

@Component
export default class DescricaoTemplateComponent extends Vue {
  @Prop()
  readonly template!: _modelsInput.Template;


}
</script>
