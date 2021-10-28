<template>
    <q-btn no-caps flat dense>
      <img src="icons/searchico.png" alt="" />
    </q-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'SearchButton',
  
});
</script>

<style scoped>
.q-btn {
  border-radius: 8px;
  animation: yourAnimation 3s ease 0.5s infinite alternate none;
}

@keyframes yourAnimation {
  0.0% {
  }
  49.8% {
    transform: translate(0px, 20px);
  }
}
</style>
