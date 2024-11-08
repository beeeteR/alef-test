<script setup lang="ts"></script>

<template>
  <footer class="app__footer">
    <p>all rights reserved</p>
  </footer>
</template>

<style lang="scss">
.app__footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
  margin-top: auto;
  p {
    @include p3;
    color: #000000;
  }
}
</style>
