<script setup lang="ts">

import UiInput from "@/components/ui/UiInput.vue";
import {ref} from "vue";
import type {IChild} from "@/utils/types/child";

interface IPropsChildrenData {
  child: IChild
}

type TEmitsChildrenData = {
  updateChild: [child: IChild],
  deleteChild: [childId: number]
}

const props = defineProps<IPropsChildrenData>()
const emits = defineEmits<TEmitsChildrenData>()
const name = ref('')
const age = ref(0)

function updateInfo() {
  const updatedChild = JSON.parse(JSON.stringify(props.child)) as IChild
  updatedChild.age = age.value
  updatedChild.name = name.value
  emits('updateChild', updatedChild)
}

function callEmitDeleteChild() {
  emits('deleteChild', props.child.id)
}

</script>
<template>
  <div class="child-data">
    <UiInput class="child-data__input" title="Имя" type="text" v-model="name" @change="updateInfo"/>
    <UiInput class="child-data__input" title="Возраст" type="number" v-model="age" @change="updateInfo"/>
    <p class="child-data__del-btn" @click="callEmitDeleteChild">Удалить</p>
  </div>
</template>

<style lang="scss">

.child-data {
  display: flex;
  align-items: center;
  gap: 18px;

  &__input {
    width: 100%;
  }

  &__del-btn {
    color: map-get($colors, 'primary');
    cursor: pointer;
  }
}

</style>
