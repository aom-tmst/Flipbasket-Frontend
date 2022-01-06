<template>Redirection</template>

<script>
import { defineComponent, onMounted } from 'vue';
export default defineComponent({
  name: 'Addmin',

  setup() {
    onMounted(() => {
        window.location.href = 'https://tailors-phuket.herokuapp.com/admin/auth/login';
    });
  },
});
</script>

<style lang="scss" scoped></style>
