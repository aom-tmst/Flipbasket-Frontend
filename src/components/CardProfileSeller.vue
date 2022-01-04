<template>
  <div class="flex-row card-profile wrapper" v-if="item">
    <div class="flex-col">
      <div>
        <img
          class="edit-profile-img"
          src="images/profileImg.jpg"
          style="width: 75px"
        />
      </div>
    </div>
    <div class="edit-space-profile flex-col items-center justify-center">
      <div class="flex-row posted-by">
        <div class="text-black">{{item.name}}</div>
      </div>
      <!-- <div class="flex-row" v-if="item">
        <q-btn class="edit-btn" @click="pushpage(item._id)">
          Chat With Merchant
          <q-icon
            name="live_help"
            style="margin-left: 5px; color: rgb(43, 144, 226)"
          />
        </q-btn>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import {Store} from 'src/store/pages/state'
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'CardProfile',

  props:{
      item: Object as () => Store
  },

  setup(){
    const router = useRouter();
      const pushpage = (item : string) => {
          void router.push({ name: 'Chat', query: { item } });
      }
      return {
          pushpage
      }
  }
});
</script>

<style lang="scss" scoped>
.card-profile {
  margin: 20px;
  .wrapper {
    flex-wrap: wrapper;
  }
  .posted-by {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .edit-space-profile {
    margin: 10px;
  }
  .edit-btn {
    border-radius: 8px;
    border: 10px;
  }
  .edit-profile-img {
    border-radius: 10px;
  }
}
</style>
