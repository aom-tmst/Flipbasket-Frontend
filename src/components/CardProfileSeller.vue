<template>
  <div class="flex-row card-profile wrapper" v-if="item">
    <div class="flex-col">
      <div>
        <img
          class="edit-profile-img"
          src="images/profileImg.jpg"
          style="width: 100px"
        />
      </div>
    </div>
    <div class="edit-space-profile flex-col items-center justify-center">
      <div class="flex-row posted-by">
        <div>{{item.merchantName}}</div>
      </div>
      <div class="flex-row">
        <q-btn class="edit-btn">
          Chat With Merchant
          <q-icon
            name="live_help"
            style="margin-left: 5px; color: rgb(43, 144, 226)"
          />
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ProfileDetail } from 'src/type/sellerprofile'
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'CardProfile',

  props:{
      item: Object as () => ProfileDetail
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
