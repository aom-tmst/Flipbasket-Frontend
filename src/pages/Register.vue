<template>
  <div class="flex-col" style="margin: 0 50px 0 50px">
    <div style="font-weight: bold">
      <div style="font-size: 16px; color: #149bfc">Let's</div>
      register and open the new experience.
    </div>
    <form class="flex-col" @submit.prevent="Register">
      <q-input type="text" placeholder="Name" v-model="name" />
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
        ><span style="color: rgb(43, 144, 226); font-weight: bold"
          >Register</span
        ></q-btn
      >
    </form>
  </div>
</template>

<script lang="ts">
// import { api } from 'src/boot/axios';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';
import { useStore } from 'src/store';
import { RegistWithFirebase } from 'src/boot/firebase';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Register',

  setup() {
    const $q = useQuasar();
    const store = useStore();
    const name = ref();
    const isPwd = ref(true);
    const email = ref('');
    const password = ref('');

    const Register = async () => {
      try {
        const user = await RegistWithFirebase(
          name.value,
          email.value,
          password.value
        );
        if (user.user) {
          console.log(user.user);
          const userDetail = {
            name : user.user.displayName,
            uid : user.user.uid
          }
          // const createStore = await api.post('stores/',);
          // console.log(createStore, 'createStore');
          
          const result1 = await api.post('stores/', userDetail);
          console.log('🚀 ~ file: Register.vue ~ line 70 ~ Register ~ result1', result1)

          const addCart = await api.post('carts/', userDetail);
          console.log('🚀 ~ file: Register.vue ~ line 70 ~ Register ~ addCart', addCart)

          await store.dispatch('pagesModule/SubmitUid',userDetail);
          $q.notify({
            type: 'positive',
            message: 'Regist successed.',
            color: 'secondary',
            timeout: 1000,
          });
        }
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: 'Regist failed , invalid email',
          timeout: 1000,
        });
      }
    };

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions

    return {
      isPwd,
      Register,
      email,
      password,
      name,
    };
  },
});
</script>

<style></style>
