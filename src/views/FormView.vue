<script setup lang="ts">
import {useRouter} from "vue-router";
import {reactive} from "vue";
import {useAppStore} from "@/stores/appStore";
import UiInput from "@/components/ui/UiInput.vue";
import ChildData from "@/components/pages/ChildData.vue";
import type {IChild} from "@/utils/types/child";
import type {IUser} from "@/utils/types/user";
import type {IWarningsUserAndChildren} from "@/utils/types/common";
import {checkWarning} from "@/utils/common";

const router = useRouter()
const appStore = useAppStore()
const children = reactive<IChild[]>([])
const userInfo = reactive<IUser>({
  id: Date.now(),
  name: '',
  age: 0
})
const warnings = reactive<IWarningsUserAndChildren>({
  user: {
    name: '',
    age: ''
  },
  children: []
})

function addChild() {
  if (children.length < 5) {
    const thisChildId = Date.now()
    children.push({
      id: thisChildId,
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

function updateUserInfo(valueInput: string | number) {
  if (typeof valueInput === 'number') {
    userInfo.age = valueInput
  } else {
    userInfo.name = valueInput
  }
}

function getWarningForChildById(childId: number) {
  const foundedChild = warnings.children.find(item => item.id === childId)
  if (foundedChild) return foundedChild
  return warnings.children[0]
}

function validation() {
  warnings.user.name = checkWarning(userInfo.name)
  warnings.user.age = checkWarning(userInfo.age)

  warnings.children.length = 0

  children.forEach(child => {
    warnings.children.push({
      id: child.id,
      name: checkWarning(child.name),
      age: checkWarning(child.age)
    })
  })

  let validationPassed = false
  if (!warnings.user.age && !warnings.user.name) {
    if (warnings.children.length) {
      validationPassed = warnings.children.every(childWarning => !childWarning.age && !childWarning.name)
    } else validationPassed = true
  }
  if (validationPassed) saveData()
}

function saveData() {
  appStore.resetStore()

  appStore.setUser(userInfo)
  appStore.addChildren(children)

  router.push('/info')
}

</script>

<template>
  <div class="page__form">
    <section class="personal__data">
      <h2 class="section-title">Персональные данные</h2>
      <UiInput title="Имя" type="text" :warning="warnings.user.name" @updateValue="updateUserInfo"/>
      <UiInput title="Возраст" type="number" :warning="warnings.user.age" @updateValue="updateUserInfo"/>
    </section>
    <section class="children-section" :class="{'--children-section__active': children.length > 0}">
      <div class="children-section__header">
        <h2 class="section-title">Дети (макс. 5)</h2>
        <button class="btn-primary --btn-secondary" @click="addChild">Добавить ребенка</button>
      </div>
      <div class="children-section__body">
        <div class="children-data">
          <ChildData v-for="child in children" :key="child.id" :child="child"
                     :warning="getWarningForChildById(child.id)" @updateChild="updateChildrenInfo"
                     @deleteChild="removeChild"/>
        </div>
      </div>
    </section>
    <button class="btn-primary" @click="validation">Сохранить</button>
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

    & ~ .btn-primary {
      align-self: flex-start;
    }
  }

  .btn-primary {
    align-self: unset;
    margin-top: 30px;
  }
}
</style>
