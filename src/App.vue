<template>
  <router-view />
</template>
<script lang="ts">
// import * as io from 'socket.io-client';
// import { useStore } from 'src/store';
import { useRoute, useRouter } from 'vue-router';
import { defineComponent, onMounted,  } from 'vue'; //nextTick
import { auth } from 'src/boot/firebase';

export default defineComponent({
  name: 'App',

  setup() {
    // const store = useStore();
    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
      auth.onAuthStateChanged((user) => {
        if (!user) {
          void router.replace('/');
        } else if (
          route.path == '/login-session' ||
          route.path == '/register'
        ) {
          void router.replace('/');
        }
      });

      // void nextTick(() => {
      //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
      //    const socket = io('http://localhost:1337');   
      //   // const socket = io('http://192.168.1.44:1337');
      //   console.log(socket, 'this');
      //   // eslint-disable-next-line
      //   (window as any).socket = socket;
      //   // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
      //   socket.emit('test');
      //   // eslint-disable-next-line
      //   socket.on('client', async (text: any) => {
      //     console.log('test2-on', text);
          
      //     await store.dispatch('pagesModule/InputMessage', text);
      //   });
      // });
    });
    return { };
  },
});
</script>
