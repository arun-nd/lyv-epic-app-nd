<template>
  <v-text-field
    type="number"
    placeholder=" "
    persistent-hint
    :value="value"
    :loading="loading"
    :disabled="disabled"
    :rules="rules"
    :min="min"
    :max="max"
    @change="onChange"
  >
    <span slot="label" v-html="label"></span>
    <span slot="append">{{ unit }}</span>
  </v-text-field>
</template>

<script>
export default {
  name: "UnitfulInput",

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

  data() {
    return {
      loading: false,
    };
  },

  methods: {
    onChange(value) {
      this.$emit("input", value);
    },
  },
};
</script>
