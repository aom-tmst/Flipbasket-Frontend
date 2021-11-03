<template>
  <div class="HomeSecondBanner row justify-between" id="about">
    <q-parallax :height="800" src="images/loginbanner.jpg">
      <q-intersection transition="scale">
        <div class="flex-row wrapper edit-space">
          <div class="flex-col items-center detail items-center">
            <h1 class="text-white">
              <div class="flex-col content text-center">
                <div class="flex-row text">
                  open a new experience about shopping online
                </div>
                <div class="flex-row head-title">Flipbasket</div>
                <div class="flex-row text">
                  simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum
                </div>
              </div>
            </h1>
          </div>
          <div class="flex-col items-center login justify-center">
            <div class="text-white flex-row head-title">
              Login to your account
            </div>
            <q-input bg-color="white" filled v-model="id" label="email">
            <template v-slot:append>
          <q-icon
            name="person"
            class="cursor-pointer"
          />
        </template>
            </q-input>
            <q-input bg-color="white" v-model="password" label="password" filled :type="isPwd ? 'password' : 'text'" hint="Password with toggle">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
            <div class="flex-row justify-end">
              <q-btn color="primary">login</q-btn>
            </div>
          </div>
        </div>
      </q-intersection>
    </q-parallax>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue';
export default defineComponent({
  name: 'HomeSecondBanner',

  setup(){
      const id = ref('');
      const isPwd = ref(true);
      const password = ref('');
      return{
          id,
          password,
          isPwd
      }
  }
});
</script>

<style lang="scss" scoped>
.HomeSecondBanner {
    .q-input{
        margin: 20px;
        max-width: 350px;
        width: 100%;
    }
  .text {
    font-size: 18px;
  }
  .detail {
    margin: 20px;
  }
  .login {
    margin: 20px;
  }
  .head-title {
    font-size: 2vw;
    font-weight: bold;
  }
  .wrapper {
    display: flex;
    flex-wrap: wrap;
  }
  .edit-space {
    display: flex;
    justify-items: space-between;
  }
}
</style>
