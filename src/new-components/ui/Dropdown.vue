<template>
  <v-select
    :id="id"
    placeholder="Select"
    :value="value"
    :items="items"
    :rules="applyRules"
    :error="isNotValid"
    @change="$emit('input', $event)"
  >
    <span slot="label" v-html="label"></span>
    <span slot="append">{{ appendText }}</span>
  </v-select>
</template>

<script>
import validateInputMixin from "@/mixins/validateInputMixin";

export default {
  name: "Dropdown",

  mixins: [validateInputMixin],

  props: {
    items: { type: Array, required: true },
    fieldKey: { type: String },
    appendText: String,
  },
};
</script>

<style>
.v-list-item__content,
.v-select__selection {
  text-transform: capitalize !important;
}
</style>
