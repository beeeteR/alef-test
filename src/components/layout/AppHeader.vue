<script setup lang="ts">
</script>

<template>
  <header class="app__header">
    <router-link to="/" class="app__logo-wrapper">
      <img src="@/assets/image/logo.png" alt="logo" class="app__logo">
    </router-link>
    <nav class="header__nav">
      <router-link to="/" class="header__nav-item --p2">Форма</router-link>
      <router-link to="/info" class="header__nav-item --p2">Превью</router-link>
    </nav>
  </header>
</template>

<style lang="scss">
.app__header {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 22px 92px;
  box-shadow: 0 1px 0 0 #1111111A;

  .header__nav {
    display: flex;
    gap: 24px;
    margin-left: 50%;
    transform: translate(-50%);

    &-item {
      color: map-get($colors, 'grey')
    }
  }
}
</style>
