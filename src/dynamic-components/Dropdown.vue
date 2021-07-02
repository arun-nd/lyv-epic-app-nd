<template>
  <v-select
    :label="label"
    placeholder="Select"
    :value="value"
    :items="items"
    :rules="rules || defaultRules"
    @change="onChange"
    :id="id"
    :name="name"
  />
</template>

<script>
export default {
  name: "Dropdown",

  props: {
    label: String,
    value: null,
    id:String,
    name:String,
    items: { type: Array, required: true },
    rules: { type: Array },
    fieldKey: { type: String },
    startValidation: { type: Boolean, default: false },
  },

  data() {
    return {
      defaultRules: [(value) => !!value || "Required"],
    };
  },

  watch: {
    startValidation(val) {
      if (val) {
        if (this.value) {
          this.$emit("valid", { key: this.fieldKey, value: true });
        } else {
          this.$emit("valid", { key: this.fieldKey, value: null });
        }
      }
    },
  },

  methods: {
    onChange(value) {
      this.$emit("update:value", value);
    },
  },
};
</script>
<style>
.v-list-item__content {
  text-transform: capitalize !important;
}
</style>