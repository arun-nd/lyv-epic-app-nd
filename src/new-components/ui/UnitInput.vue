<template>
  <v-text-field
    type="number"
    placeholder=" "
    persistent-hint
    :value="value"
    :disabled="disabled"
    :rules="rules"
    :min="min"
    :max="max"
    @change="$emit('input', $event)"
  >
    <span slot="label" v-html="label"></span>
    <span slot="append">{{ unit }}</span>
  </v-text-field>
</template>

<script>
export default {
  name: "UnitInput",

  props: {
    value: null,
    unit: String,
    label: String,
    min: { type: Number, default: 0 },
    max: Number,
    rules: { type: Array, default: () => [(value) => !!value || "Required"] },
    step: { type: Number, default: 1 },
    disabled: { type: Boolean, default: false },
  },
};
</script>
