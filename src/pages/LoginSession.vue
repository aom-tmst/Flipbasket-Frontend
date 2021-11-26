<template>
  <div class="flex-row justify-center fixed-center wrapper login-session">
    <div class="flex-col justify-center">
      <div class="animation justify-center" style="margin: 0 50px 0 50px">
        <div class="test">
          <h1 data-text="Flipbasket.">Flipbasket.</h1>
        </div>
      </div>
      <div class="flex-row justify-center" style="margin: 20px 0">
        <q-btn
          flat
          no-caps
          dense
          rounded
          @click="LoginGoogle()"
          style="margin: 0 10px"
        >
          <img src="images/googleico.png" alt="" />
        </q-btn>
        <q-btn
          flat
          no-caps
          dense
          rounded
          @click="LoginFacebook()"
          style="margin: 0 10px"
        >
          <img src="images/facebookico.png" alt="" />
        </q-btn>
      </div>
      <div class="flex-row justify-center edit-btn" style="margin: 10px 0">
        <button
          class="edit-btn line-text"
          @click="selectedComponent = 'Login'"
          style="margin: 0 10px"
        >
          Login
        </button>
        <button
          class="edit-btn line-text"
          @click="selectedComponent = 'Register'"
          style="margin: 0 10px"
        >
          Register
        </button>
        <button
          class="edit-btn line-text"
          @click="selectedComponent = 'ForgotPassword'"
          style="margin: 0 10px"
        >
          ForgotPassword
        </button>
      </div>
    </div>
    <div class="flex-col" style="margin-top: 20px">
      <component :is="selectedComponent" />
    </div>
  </div>
</template>

<script lang="ts">
import { api } from 'src/boot/axios';
import { useStore } from 'src/store';
import { useQuasar } from 'quasar';
import { LoginWithGoogle, LoginWithFacebook } from 'src/boot/firebase';
import Login from 'pages/Login.vue';
import Register from 'pages/Register.vue';
import ForgotPassword from 'pages/ForgotPassword.vue';
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  name: 'LoginSession',

  components: {
    Login,
    Register,
    ForgotPassword,
  },

  preFetch({ store }) {
    const fetchHomePage = store.dispatch('pagesModule/fetchHomePage');
    return Promise.all([fetchHomePage]);
  },

  setup() {
    const store = useStore();
    const $q = useQuasar();
    const selectedComponent = ref('Login');

    const checkStore = computed(() => {
      const homePage = store.state.pagesModule.store;
      return homePage;
    });
    console.log(checkStore, 'store');

    const LoginGoogle = async () => {
      try {
        const loginWithGoogle = await LoginWithGoogle();
        console.log(loginWithGoogle, 'test');

        const userDetail = {
          name: loginWithGoogle.user.displayName,
          uid: loginWithGoogle.user.uid,
        };

        const findStore = checkStore.value.find((e) => e.uid == userDetail.uid);
        if (findStore) {
          await store.dispatch('pagesModule/SubmitUid', userDetail);
          console.log('findStore');
        } else {
          const result1 = await api.post('stores/', userDetail);
          console.log(
            '🚀 ~ file: Register.vue ~ line 70 ~ Register ~ result1',
            result1
          );

          const addCart = await api.post('carts/', userDetail);
          console.log(
            '🚀 ~ file: Register.vue ~ line 70 ~ Register ~ addCart',
            addCart
          );

          await store.dispatch('pagesModule/SubmitUid', userDetail);
          console.log('else did not find');
        }
        $q.notify({
          type: 'positive',
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          message: 'Login Successed',
        });
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: 'Can not login please check your eamil ',
          timeout: 1000,
        });
      }
    };

    const LoginFacebook = async () => {
      try {
        const loginWithFacebook = await LoginWithFacebook();
        console.log(loginWithFacebook, 'Facebook user detail');

        const userDetail = {
          name: loginWithFacebook.user.displayName,
          uid: loginWithFacebook.user.uid,
        };
        const findStore = checkStore.value.find((e) => e.uid == userDetail.uid);
        if (findStore) {
          await store.dispatch('pagesModule/SubmitUid', userDetail);
          console.log('findStore');
        } else {
          const result1 = await api.post('stores/', userDetail);
          console.log(
            '🚀 ~ file: Register.vue ~ line 70 ~ Register ~ result1',
            result1
          );

          const addCart = await api.post('carts/', userDetail);
          console.log(
            '🚀 ~ file: Register.vue ~ line 70 ~ Register ~ addCart',
            addCart
          );

          await store.dispatch('pagesModule/SubmitUid', userDetail);
          console.log('else did not find');
        }
        $q.notify({
          type: 'positive',
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          message: 'Login Successed',
        });
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: 'Can not login please check your eamil ',
          timeout: 1000,
        });
      }
    };

    return {
      selectedComponent,
      LoginFacebook,
      LoginGoogle,
    };
  },
});
</script>

<style lang="scss" scoped>
.login-session {
  button {
    cursor: pointer;
    background-color: white;
    border: none;
  }
}
.line-text {
  font-weight: 550;
  background-image: linear-gradient(rgb(72, 72, 218), rgb(6, 70, 167));
  background-size: 0% 3px;
  background-repeat: no-repeat;
  background-position: left bottom;
  transition: 300ms ease;
}
.line-text:hover {
  background-size: 100% 3px;
}

h1 {
  font-size: 50px;
  font-weight: bolder;
  color: rgb(255, 255, 255);
  position: relative;
  -webkit-text-stroke: 0.2vh white;
  justify-content: #000000;
  text-transform: uppercase;
}
h1::before {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  color: #222222;
  -webkit-text-stroke: 0vh #000000;
  border-right: 2px solid #000000;
  overflow: hidden;
  animation: animate 6s linear infinite;
}
@keyframes animate {
  0% {
    width: 0;
  }
  70% {
    width: 100%;
  }
}
</style>
