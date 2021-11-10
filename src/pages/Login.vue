<template>
  <div class="flex-col items-cente">
    <div class="flex-container">
      <div class="flex-col items-center justify-center" style="height: 100vh">
        <div class="login">
          <div class="flex-row wrapper justify-center">
            <div class="flex-col animation justify-center"  style="margin: 0 50px 0 50px">
              <div class="animation_"> <h1>Login</h1> </div>
            </div>
            <div class="flex-col" style="margin: 0 50px 0 50px">
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

                <input type="submit" value="Login" />
                <p>
                  Need an account?
                  <router-link class="text-black" to="/register"
                    >Register</router-link
                  >
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { auth } from 'src/boot/firebase';
import { defineComponent, ref } from 'vue';

interface Error {
  message: string;
}

export default defineComponent({
  name: 'Login',

  setup() {
    const isPwd = ref(true);
    const email = ref('');
    const password = ref('');

    const Login = () => {
      auth
        .signInWithEmailAndPassword(email.value, password.value)
        .then((data) => console.log(data))
        .catch((err: Error) => alert(err.message));
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
.wrapper{
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
