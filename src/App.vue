<template>
  <router-view />
</template>
<script lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { defineComponent, onMounted } from 'vue';
import { auth } from 'src/boot/firebase';

export default defineComponent({
  name: 'App',

  setup() {
    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
      auth.onAuthStateChanged((user) => {
        if (!user) {
          void router.replace('/login');
        } else if (route.path == '/login' || route.path == '/register') {
          void router.replace('/');
        }
      });
    });
  },
});
</script>
