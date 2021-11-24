<template>
  <div class="flex-col" style="margin: 0 50px 0 50px">
    <div style="font-weight: bold">
      <div style="font-size: 16px; color: #149bfc">Let's</div>
      start and open the new experience.
    </div>
    <form class="flex-col" @submit.prevent="Login">
      <q-input type="text" placeholder="Email" v-model="email" />
      <q-input
        placeholder="Password"
        v-model="password"
        :type="isPwd ? 'password' : 'text'"
        hint="Password with toggle"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <q-btn type="submit" value="Login" style="margin: 10px 0"
        ><span style="color: rgb(43, 144, 226); font-weight: bold"
          >login</span
        ></q-btn
      >
    </form>
  </div>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { LoginWithFirebase } from 'src/boot/firebase';
import { useStore } from 'src/store';
import { defineComponent, ref, onBeforeUnmount } from 'vue';

export default defineComponent({
  name: 'Login',

  setup() {
    const store = useStore();
    const $q = useQuasar();
    const isPwd = ref(true);
    const email = ref('');
    const password = ref('');

    let timer: NodeJS.Timeout|undefined

    onBeforeUnmount(() => {
      if (timer !== void 0) {
        clearTimeout(timer);
        $q.loading.hide();
      }
    });

    const Login = async () => {
      try {
        $q.loading.show();
        const user = await LoginWithFirebase(email.value, password.value);
        if (user.user) {
          const userDetail = {
            name: user.user.displayName,
            uid: user.user.uid,
          };
          $q.loading.show();

          // hiding in 2s
        
          await store.dispatch('pagesModule/SubmitUid', userDetail);
          $q.notify({
            type: 'positive',
            message: 'Login successed.',
            color: 'secondary',
            timeout: 1000,
          });
        }
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: 'Login failed , email or password does not exist',
          timeout: 1000,
        });
      }
      finally {
        $q.loading.hide();
      }
    };

    return {
      isPwd,
      Login,
      email,
      password,
    };
  },
});
</script>

<style lang="scss">
.wrapper {
  flex-wrap: wrap;
}
.q-input {
  margin: 20px;
}
.title {
  font-size: 30px;
  font-weight: bold;
}
.content {
  max-width: 800px;
  width: 100%;
}
.animation {
  .animation_ {
    margin-top: -80px;
    border-radius: 8px;
    animation: yourAnimation 3s ease 0.5s infinite alternate none;
  }
}
@keyframes yourAnimation {
  0.0% {
  }
  49.8% {
    transform: translate(0px, 20px);
  }
}
</style>
