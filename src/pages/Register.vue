<template>
      <div class="register">
    <h1>Register</h1>
    <form @submit.prevent="Register">
      <input type="text" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
      <input type="submit" value="Register" />
      <p>
        have and account ?
        <router-link class="text-black" to="/login"> Log in</router-link>
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
    name: 'Register',

    setup(){
        const email = ref('');
        const password = ref('');

        const Register = () => {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email.value , password.value)
                .then(user => {
                    alert(user);
                })
                .catch((err:Error) => alert(err.message))
        }
        return{
            Register,
            email,
            password
        }
    }
})


</script>

<style>

</style>