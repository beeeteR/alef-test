<script setup lang="ts">
import  { RouterView } from 'vue-router'
import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";

</script>

<template>
  <AppHeader />
  <RouterView class="app__content" />
  <AppFooter />
</template>

<style lang="scss">
.app__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  flex-grow: 1;
  margin-top: 30px;
  width: 616px;
}
</style>
