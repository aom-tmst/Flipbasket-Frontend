<template>
  <div class="HomeSecondBanner row justify-between" id="about">
    <q-parallax src="images/pantswallpaper.jpg">
     <q-intersection transition="scale">
      <h1 class="text-white">
        <div class="flex-col content text-center">
          <div class="flex-row text">what is Flipbasket</div>
          <div class="flex-row head-title">Trouser</div>
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
    // text-shadow: 0 1px 0 #cccccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9,
    //   0 5px 0 #aaa;
  }
   .content{
    margin: 20px;
  }
}
@media only screen and (max-width: 500px) {
  .HomeSecondBanner {
    .content{
      line-height: 50px;
    }
    .head-title {
        font-size: 40px;
        font-weight: bold;
      }
  }
}
</style>
