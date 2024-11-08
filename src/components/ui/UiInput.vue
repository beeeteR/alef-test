<script setup lang="ts">

import {ref} from "vue";

interface IPropsUiInput {
  type: 'text' | 'number',
  title: string,
  max?: number,
  min?: number
}
type TInputValue = string | number
type IEmitsUiInput = {
    updateValue: [value: TInputValue]
}

const props = defineProps<IPropsUiInput>()
const inputValue = ref<TInputValue>('')
const emits = defineEmits<IEmitsUiInput>()

function updateInputValue() {
  emits('updateValue', inputValue.value)
}

</script>

<template>
  <div class="ui-input__wrapper">
    <label class="ui-label">
      <span class="ui-label__title">{{ title }}</span>
      <input :type="type" class="ui-input" @change="updateInputValue">
    </label>
  </div>
</template>

<style lang="scss">
.ui-input__wrapper {
  border: 1px solid map-get($colors, 'grayL');
  border-radius: 4px;
  .ui-label {
    display: block;
    position: relative;

    &__title {
      @include p3;
      position: absolute;
      top: 8px;
      left: 16px;
      color: map-get($colors, 'gray');
    }
  }

  .ui-input {
    @include p2;
    color: map-get($colors, 'black');
    padding: 26px 0 6px 16px;
    width: 100%;

    &[type="number"]::-webkit-inner-spin-button {
      webkit-appearance: none;
      display: none;
    }
  }
}
</style>
