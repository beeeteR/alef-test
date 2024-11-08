<script setup lang="ts">
import UiInput from "@/components/ui/UiInput.vue";
import ChildData from "@/components/pages/ChildData.vue";
import {reactive} from "vue";
import type {IChild} from "@/utils/types/child";
import {useAppStore} from "@/stores/appStore";
import type {IUser} from "@/utils/types/user";
import {useRouter} from "vue-router";

const router = useRouter()
const appStore = useAppStore()
const children = reactive<IChild[]>([])
const userInfo = reactive<IUser>({
  id: Date.now(),
  name: '',
  age: 0
})

function addChild() {
  if (children.length < 5) {
    children.push({
      id: Date.now(),
      parentId: userInfo.id,
      name: '',
      age: 0
    })
  }
}

function updateChildrenInfo(updatedChild: IChild) {
  const childIndex = children.findIndex(child => child.id === updatedChild.id)
  children[childIndex] = updatedChild
}

function removeChild(id: number) {
  children.splice(children.findIndex(child => child.id === id), 1)
}

function updateUserInfo(value: string | number) {
  if (typeof value === 'number') {
    userInfo.age = value
  } else {
    userInfo.name = value
  }
}

function saveData() {
  appStore.setUser(userInfo)
  appStore.addChildren(children)
  router.push('/info')
}

</script>

<template>
  <div class="page__form">
    <section class="personal__data">
      <h2 class="section-title">Персональные данные</h2>
      <UiInput title="Имя" type="text" @updateValue="updateUserInfo"/>
      <UiInput title="Возраст" type="number" @updateValue="updateUserInfo"/>
    </section>
    <section class="children-section" :class="{'--children-section__active': children.length > 0}">
      <div class="children-section__header">
        <h2 class="section-title">Дети (макс. 5)</h2>
        <button class="btn-primary --btn-secondary" @click="addChild">Добавить ребенка</button>
      </div>
      <div class="children-section__body">
        <div class="children-data">
          <ChildData v-for="child in children" :key="child.id" :child="child" @updateChild="updateChildrenInfo"
                     @deleteChild="removeChild"/>
        </div>
      </div>
    </section>
    <button class="btn-primary" @click="saveData">Сохранить</button>
  </div>
</template>

<style lang="scss">
.page__form {
  .personal__data {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;

    &-title {
      @include p2-medium;
      color: map-get($colors, 'black');
    }
  }

  .children-section {
    width: 100%;
    margin-top: 44px;

    &__header {
      display: flex;
      justify-content: center;
      align-items: center;

      .section-title {
        display: none;
      }
    }

    &__body {
      display: none;

      .children-data {
        width: 100%;
        margin-top: 11px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
    }
  }

  .--children-section__active {
    .children-section__header {
      justify-content: space-between;

      .section-title {
        display: block;
      }
    }

    .children-section__body {
      display: block;
    }
  }

  .btn-primary {
    align-self: flex-start;
    margin-top: 30px;
  }
}
</style>
