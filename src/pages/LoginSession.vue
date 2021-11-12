<template>
  <div class="flex-row justify-center fixed-center wrapper">
    <div class="flex-col justify-center">
      <div class="animation justify-center" style="margin: 0 50px 0 50px">
        <div class="animation_"><h3>Flipbasket</h3></div>
      </div>
      <div class="flex-row justify-center" style="margin: 10px 0">
        <q-btn flat no-caps dense rounded @click="LoginWithGoogle()" style="margin: 0 10px"> <img src="images/googleico.png" alt=""> </q-btn>
        <q-btn flat no-caps dense rounded @click="LoginWithGoogle()" style="margin: 0 10px"> <img src="images/facebookico.png" alt=""> </q-btn>
      </div>
      <div class="flex-row justify-center" style="margin: 10px 0">
        <q-btn class="edit-btn" @click="selectedComponent = 'Login'">
          go to login
        </q-btn>
        <q-btn class="edit-btn" @click="selectedComponent = 'Register'">
          go to register
        </q-btn>
      </div>
    </div>
    <div class="flex-col">
      <component :is="selectedComponent" />
    </div>
  </div>
</template>

<script lang="ts">
import Login from 'pages/Login.vue';
import Register from 'pages/Register.vue';
import firebase from 'firebase/compat/app';
import { defineComponent, ref } from 'vue';

interface Error {
  message: string;
}

export default defineComponent({
  name: 'LoginSession',

  components: {
    Login,
    Register,
  },

  setup() {
    const selectedComponent = ref('Login');

    const provider = new firebase.auth.GoogleAuthProvider();

    const LoginWithGoogle = () => {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((data) => {
          console.log(data);
        })
        .catch((err: Error) => alert(err.message));
    };

    return {
      selectedComponent,
      LoginWithGoogle,
    };
  },
});
</script>

<style></style>
