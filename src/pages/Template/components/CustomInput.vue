<template>
    <q-input ref="input" :rules="required ? [validateRequiredField()] : []" lazy-rules class="col-2 q-mr-sm" outlined
        :label="label" :value="value" @input="onInput" />
</template>
  
<script>

import { QInput } from 'quasar'

export default {
    name: 'CustomInput',
    props: ['label', 'value', 'required'],
    methods: {
        onInput(event) {
            this.$emit('input', event);
        },
        validateRequiredField() {
            return value => (!!value && value.trim().length > 0) || 'Campo obrigatório';
        },
        validate(value) {
            return this.$refs.input.validate(value)
        }
    },
    components: {
        QInput
    }
}
</script>