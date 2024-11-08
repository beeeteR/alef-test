<script setup lang="ts">

import {useAppStore} from "@/stores/appStore";
import {plural} from "@/utils/pluralize";

const appStore = useAppStore()
const user = appStore.getUser
const children = appStore.getChildren

function getAgeInPlural(num: number) {
  return `${num} ${plural(num, ['год', 'года', 'лет'])}`
}

</script>

<template>
  <div class="page__info">
    <section v-if="user.id" class="personal__info">
      <h2 class="section-title">Персональные данные</h2>
      <div class="personal__info-content">
        <span>{{ user.name }}, </span>
        <span>{{ getAgeInPlural(user.age) }}</span>
      </div>
    </section>
    <section v-else class="empty-page">
      <h2 class="section-title">Запоните поля в форме</h2>
    </section>
    <section v-if="children.length" class="children__info">
      <h2 class="section-title">Дети</h2>
      <div class="children__list">
        <div class="child__info" v-for="child in children" :key="child.id">
          <span>{{ child.name }}, </span>
          <span>{{ getAgeInPlural(child.age) }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">

.page__info {
  display: flex;
  flex-direction: column;
  gap: 60px;

  span {
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
  }

  .section-title {
    margin-bottom: 20px;
  }

  .children__info {
    .children__list {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .child__info {
        background-color: map-get($colors, 'grayL');
        padding: 10px 20px;
      }
    }
  }
}

</style>
