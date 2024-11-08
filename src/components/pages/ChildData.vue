<script setup lang="ts">

import UiInput from "@/components/ui/UiInput.vue";
import {ref} from "vue";
import type {IChild} from "@/utils/types/child";
import type {IWarningWithId} from "@/utils/types/common";

interface IPropsChildrenData {
  child: IChild,
  warning?: IWarningWithId
}

type TEmitsChildrenData = {
  updateChild: [child: IChild],
  deleteChild: [childId: number]
}

const props = defineProps<IPropsChildrenData>()
const emits = defineEmits<TEmitsChildrenData>()
const name = ref('')
const age = ref(0)

function updateInfo(updatedValue: string | number) {
  const updatedChild = JSON.parse(JSON.stringify(props.child)) as IChild
  switch (typeof updatedValue) {
    case "string":
      updatedChild.name = updatedValue
      break
    case "number":
      updatedChild.age = updatedValue
  }
  emits('updateChild', updatedChild)
}

function callEmitDeleteChild() {
  emits('deleteChild', props.child.id)
}

</script>
<template>
  <div class="child-data">
    <UiInput class="child-data__input" title="Имя" type="text" :warning="warning?.name" @updateValue="updateInfo"/>
    <UiInput class="child-data__input" title="Возраст" type="number" :warning="warning?.age"  @updateValue="updateInfo"/>
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
