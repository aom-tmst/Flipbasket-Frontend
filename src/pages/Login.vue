<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="Login">
      <input type="text" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
      <input type="submit" value="Login" />
      <p>
        Need an account? 
        <router-link class="text-black" to="/register">Register</router-link>
      </p>
    </form>
  </div>
</template>

<script lang="ts">
import firebase from 'firebase/compat/app';
import { defineComponent, ref } from 'vue';
import 'firebase/compat/auth';

interface Error {
    message : string
}

export default defineComponent({
  name: 'Login',

  setup(){
    const email = ref('');
    const password = ref('');

    const Login = () => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .then(data => console.log(data))
        .catch((err:Error) => alert(err.message)) ;
    };

    return{
        Login,
        email,
        password,
    }
  },
});
</script>

<style></style>
