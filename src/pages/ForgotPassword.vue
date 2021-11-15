<template>
  <div class="flex-col" style="margin: 0 50px 0 50px">
    <div style="font-weight: bold">
      <div style="font-size: 16px; color: #149bfc">Change</div>
      youre password , please enter your email
    </div>
    <form class="flex-col">
      <q-input type="text" placeholder="Email" v-model="email" />

      <q-btn flat no-caps dense @click="resetPassword()"
        ><span style="color: rgb(43, 144, 226); font-weight: bold"
          >Sent</span
        ></q-btn
      >
    </form>
  </div>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { auth } from 'src/boot/firebase';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Login',

  setup() {
    const $q = useQuasar();
    const email = ref('');

    const resetPassword = () => {
      auth
        .sendPasswordResetEmail(email.value)
        .then(
          // eslint-disable-next-line @typescript-eslint/await-thenable
          async () => await onSent('sent succeed! please check on your email.')
        )
        .catch(() => triggerNegative('invalid email ?!'));
    };

    const onSent = (e: string) => {
      $q.notify({
        type: 'positive',
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        message: `${e}`,
      });
    };

    const triggerNegative = (e: string) => {
      $q.notify({
        type: 'negative',
        message: `${e}`,
        timeout: 1000,
      });
    };

    return {
      resetPassword,
      email,
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
