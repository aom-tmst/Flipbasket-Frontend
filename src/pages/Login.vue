<template>
  <div class="flex-col" style="margin: 0 50px 0 50px">
    login
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
      <q-btn @click="resetPassword()">forgot password ?</q-btn>
      <q-btn type="submit" value="Login" style="margin: 10px 0"
        ><span style="color: rgb(43, 144, 226)">login</span></q-btn
      >
    </form>
  </div>
</template>

<script lang="ts">
import { useQuasar } from 'quasar'
import { auth } from 'src/boot/firebase';
import { defineComponent, ref } from 'vue';

interface Error {
  message: string;
}

export default defineComponent({
  name: 'Login',

  setup() {
    const $q = useQuasar()
    const isPwd = ref(true);
    const email = ref('');
    const password = ref('');

    const Login = () => {
      auth
        .signInWithEmailAndPassword(email.value, password.value)
        
        // eslint-disable-next-line @typescript-eslint/await-thenable
        .then(async () => await showNotif())
        .catch((err: Error) => triggerNegative(err.message));
    };

     const showNotif = () => {
        $q.notify({
           spinner: true,
          message: 'Login Successed',
          color: 'secondary',
          timeout: 1000
        })
      }

      const triggerNegative = (e: string) => {
        $q.notify({
          type: 'negative',
          message: `${e}`,
          timeout: 1000
        })
      }

    const resetPassword = () => {
      auth.sendPasswordResetEmail(email.value)
       // eslint-disable-next-line @typescript-eslint/await-thenable
       .then(async() => await onSent('please check on your email.'))
        .catch(() => triggerNegative('invalid email ?!'));
    }

    const onSent = (e: string) => {
      $q.notify({
          type: 'positive',
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          message: `${e}`
        })
    }
    

    return {
      isPwd,
      Login,
      resetPassword,
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
