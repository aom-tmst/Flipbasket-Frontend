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
          @click="LoginWithGoogle()"
          style="margin: 0 10px"
        >
          <img src="images/googleico.png" alt="" />
        </q-btn>
        <q-btn
          flat
          no-caps
          dense
          rounded
          @click="LoginWithFacebook()"
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
import Login from 'pages/Login.vue';
import Register from 'pages/Register.vue';
import ForgotPassword from 'pages/ForgotPassword.vue'
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
    ForgotPassword,
  },

  setup() {
    const selectedComponent = ref('Login');

    const provider = new firebase.auth.GoogleAuthProvider();
    const facebookProvider = new firebase.auth.FacebookAuthProvider();

    const LoginWithGoogle = () => {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((data) => {
          console.log(data);
        })
        .catch((err: Error) => alert(err.message));
    };

    const LoginWithFacebook = () => {
       firebase
        .auth()
        .signInWithPopup(facebookProvider)
        .then((data) => {
          console.log(data);
        })
        .catch((err: Error) => alert(err.message));
    };

    return {
      selectedComponent,
      LoginWithFacebook,
      LoginWithGoogle,
    };
  },
});
</script>

<style lang="scss" scoped>
.login-session{
  button{
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

h1{
  font-size: 50px;
  font-weight: bolder;
  color: rgb(255, 255, 255);
  position: relative;
  -webkit-text-stroke: 0.2vh white;
  justify-content: #000000;
  text-transform: uppercase;
}
h1::before{
  content: attr(data-text);
  position: absolute;
  top:0;
  left:0;
  width:0;
  height:100%;
  color: #222222;
  -webkit-text-stroke: 0vh #000000;
  border-right: 2px solid #000000;
  overflow: hidden;
  animation: animate 6s linear infinite;
}
@keyframes animate{
  0%{
    width:0;
  }
  70%{
    width: 100%;
  }
}
</style>
