<template>
  <v-text-field
    :id="id"
    :value="value"
    placeholder=" "
    persistent-hint
    :error="isNotValid"
    :error-messages="errorMessage"
    :disabled="disabled"
    :rules="applyRules"
    :loading="loading"
    autocomplete="off"
    :maxlength="maxlength"
    @input="$emit('input', $event)"
    @change="$emit('change', $event)"
  >
    <span slot="label" v-html="label"></span>
    <span slot="append">{{ appendText }}</span>
  </v-text-field>
</template>

<script>
import validateInputMixin from "@/mixins/validateInputMixin";

export default {
  name: "StringInput",

  mixins: [validateInputMixin],

  props: {
    appendText: String,
    disabled: { type: Boolean, default: false },
    maxlength: { type: Number },
  },
};
</script>
