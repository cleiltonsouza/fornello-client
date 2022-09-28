<template>
    <q-select ref="select" :rules="required ? [validateRequiredField()] : []" lazy-rules class="col-2 q-mr-sm" outlined
        :label="label" :value="value" :options="options" @input="onInput" filter filter-placeholder="select" />
</template>
  
<script>

import { QSelect } from 'quasar'

export default {
    name: 'CustomSelect',
    props: ['label', 'value', 'required', 'options'],
    methods: {
        onInput(event) {
            this.$emit('input', event);
        },
        validateRequiredField() {
            return value => (!!value && value.trim().length > 0) || 'Campo obrigatório';
        },
        validate(value) {
            return this.$refs.select.validate(value)
        }
    },
    components: {
        QSelect
    }
}
</script>