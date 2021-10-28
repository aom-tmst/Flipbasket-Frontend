<template>
  <div class="HomeSecondBanner row justify-between" id="about">
    <q-parallax src="images/accwallpaper.png">
     <q-intersection transition="scale">
      <h1 class="text-white">
        <div class="flex-col content text-center">
          <div class="flex-row text">what is Flipbasket</div>
          <div class="flex-row head-title">Accessory</div>
          <div class="flex-row text">
            With real time chat system But still maintain the general online shooping system.
          </div>
        </div>
      </h1>
     </q-intersection>
    </q-parallax>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'HomeSecondBanner',
});
</script>

<style lang="scss" scoped>
.HomeSecondBanner{
  .text{
    font-size:18px;
  }
  .head-title {
    font-size: 5vw;
    font-weight: bold;
  }
}
</style>
