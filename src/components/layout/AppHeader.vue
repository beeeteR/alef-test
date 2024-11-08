<script setup lang="ts">
</script>

<template>
  <header class="app__header">
    <div class="app__logo-wrapper">
      <img src="@/assets/image/logo.png" alt="logo" class="app__logo">
    </div>
    <nav class="header__nav">
      <router-link to="/"  class="header__nav-item --p2"/>
      <router-link to="/info" class="header__nav-item --p2"/>
    </nav>
  </header>
</template>

<style lang="scss">
.app__header {
  .header__nav {
    &-item {
      color: map-get($colors, 'grey')
    }
  }
}

.app__logo-wrapper {
  .app__logo {

  }
}
</style>