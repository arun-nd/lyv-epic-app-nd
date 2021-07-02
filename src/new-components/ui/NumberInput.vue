<template>
  <v-text-field
    :id="id"
    v-model.number="inputValue"
    type="number"
    placeholder=" "
    persistent-hint
    :messages="message"
    :error="isNotValid"
    :error-messages="errorMessage"
    :disabled="disabled"
    :rules="applyRules"
    :loading="loading"
    autocomplete="off"
    @input="$emit('input', $event)"
    @change="onChange"
  >
    <span slot="label" v-html="label"></span>
    <span slot="append">{{ appendText }}</span>
  </v-text-field>
</template>

<script>
import validateInputMixin from "@/mixins/validateInputMixin";

export default {
  name: "NumberInput",

  mixins: [validateInputMixin],

  props: {
    appendText: String,
    min: { type: Number, default: Number.MIN_VALUE },
    max: { type: Number, default: Number.MAX_VALUE },
    step: { type: Number, default: 1 },
    disabled: { type: Boolean, default: false },
  },

  data() {
    return {
      inputValue: null,
    };
  },

  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (!isNaN(value)) {
          this.inputValue = parseFloat(value);
        }
      },
    },
  },

  methods: {
    onChange(value) {
      if (this.min > value) {
        value = this.min;
      }
      if (this.max < value) {
        value = this.max;
      }
      this.inputValue = value;
      this.$emit("input", value);
      this.$emit("change", value);
    },
  },
};
</script>
