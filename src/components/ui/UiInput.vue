<script setup lang="ts">

import {ref} from "vue";

interface IPropsUiInput {
  type: 'text' | 'number',
  title: string,
  warning?: string | false
}

type TInputValue = string | number
type IEmitsUiInput = {
  updateValue: [value: TInputValue]
}

const props = defineProps<IPropsUiInput>()
const inputValue = ref<TInputValue>('')
const emits = defineEmits<IEmitsUiInput>()
const inputInFocus = ref(false)

function updateInputValue() {
  emits('updateValue', inputValue.value)
}

function changeStateFocucedInput() {
  inputInFocus.value = !inputInFocus.value
}

</script>

<template>
  <div class="ui-input__wrapper">
    <label class="ui-label" :class="{'--ui-input-warning': warning}">
      <span class="ui-label__title" :class="{'ui-label__title-in-top': inputInFocus || inputValue}">{{ title }}</span>
      <input :type="type" class="ui-input" required min="1" max="100" minlength="2" maxlength="20" v-model="inputValue"
             @change="updateInputValue" @focusin="changeStateFocucedInput" @focusout="changeStateFocucedInput">
    </label>
    <span v-if="typeof warning === 'string' && warning.length > 0" class="ui-label__warning">{{ warning }}</span>
  </div>
</template>

<style lang="scss">
.ui-input__wrapper {
  .ui-label {
    display: block;
    position: relative;
    border: 1px solid map-get($colors, 'grayL');
    border-radius: 4px;
    transition: all 300ms;

    &:hover {
      box-shadow: 0 4px 56px 0 #33333329, 0 4px 4px 0 #3333330A;
    }

    &__title {
      @include p2;
      position: absolute;
      top: 16px;
      left: 16px;
      color: map-get($colors, 'another-gray');
      transition: all 300ms;

      &-in-top {
        @include p3;
        color: map-get($colors, 'gray');
        top: 8px;
      }
    }


    &__warning {
      @include p2;
      display: block;
      color: map-get($colors, 'red');
      margin-top: 7px;
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

.--ui-input-warning {
  background-color: map-get($colors, 'red-girl');
}
</style>
