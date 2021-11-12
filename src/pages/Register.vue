<template>
 
            <div class="flex-col" style="margin: 0 50px 0 50px">
              <form class="flex-col" @submit.prevent="Register">
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
                <q-btn type="submit" value="Register" style="margin: 10px 0"
                  ><span style="color: rgb(43, 144, 226)">Register</span></q-btn
                >
              </form>
            </div>
          
</template>

<script lang="ts">
import { auth } from 'src/boot/firebase';
import { defineComponent, ref } from 'vue';

interface Error {
  message: string;
}

export default defineComponent({
  name: 'Register',

  setup() {
    const isPwd = ref(true);
    const email = ref('');
    const password = ref('');

    const Register = () => {
      auth
        .createUserWithEmailAndPassword(email.value, password.value)
        .then((user) => {
          alert(user);
        })
        .catch((err: Error) => alert(err.message));
    };
    return {
      isPwd,
      Register,
      email,
      password,
    };
  },
});
</script>

<style></style>
