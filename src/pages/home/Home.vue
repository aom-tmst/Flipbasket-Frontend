<template>
  <q-page>
    <div class="flex-col items-center home" id="home">
      <HomeMainBanner :isShowArrows="false" :item="bannerAds" />
      <div class="scoped-banner" id="about">
        <HomeSecondBanner />
      </div>
      <div class="flex-container">
        <div id="shirt" />
        <div class="flex-col items-center">
          <div class="flex-row justify-center">
            <span>Shirt</span>
          </div>
          <Shirt :item="clothesDeatail" />
        </div>
      </div>

      <div class="scoped-banner" id="trousers">
        <HomeTrouserBanner />
      </div>
      <div class="flex-container">
        <div class="flex-col items-center">
          <div class="flex-row justify-center">
            <span>Trousers</span>
          </div>
          <Trousers :item="trousersDetail" />
        </div>
      </div>

      <div class="scoped-banner" id="accessory">
        <HomeAccessoryBanner />
      </div>
      <div class="flex-container" style="margin-bottom: 20px">
        <div class="flex-col items-center">
          <div class="flex-row justify-center">
            <span>Accessory</span>
          </div>
          <Accessory :item="accessoryDetail" />
        </div>
      </div>

      <div class="scoped-banner-login" id="login">
        <HomeLoginSession />
      </div>
      <!-- <div class="review">
            <span>Review By Customers</span>
          </div> -->
    </div>
  </q-page>
</template>

<script lang="ts">
import HomeMainBanner from 'src/pages/home/HomeMainBanner.vue';
import HomeSecondBanner from 'src/pages/home/HomeSecondBanner.vue';
import HomeTrouserBanner from 'src/pages/home/HomeTrouserBanner.vue';
import HomeAccessoryBanner from 'src/pages/home/HomeAccessoryBanner.vue';
import HomeLoginSession from 'src/pages/home/HomeLoginSession.vue';
import Shirt from 'src/components/Shirt.vue';
import Trousers from 'src/components/Trousers.vue';
import Accessory from 'src/components/Accessory.vue';
import {
  bannerAds,
  clothesDeatail,
  galleryImg,
  trousersDetail,
  accessoryDetail,
} from 'src/pages/home/constants';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Home',

  components: {
    HomeMainBanner,
    HomeSecondBanner,
    Shirt,
    Trousers,
    Accessory,
    HomeTrouserBanner,
    HomeAccessoryBanner,
    HomeLoginSession,
  },

  setup() {
    return {
      bannerAds,
      clothesDeatail,
      galleryImg,
      trousersDetail,
      accessoryDetail,
    };
  },
});
</script>

<style lang="scss" scoped>
.home {
  .flex-container {
    position: relative;
    scroll-snap-type: y mandatory;
  }
  #shirt {
    position: absolute;
    margin-top: -90px;
  }
  .scoped-banner {
    width: 100%;
    height: 520px;
  }
  .scoped-banner-login {
    width: 100%;
    height: 800px;
  }
  .wrapper {
    display: flex;
    flex-wrap: wrap;
  }
  span {
    margin: 30px;
    font-size: 30px;
    font-weight: bold;
  }
  .review {
    margin-right: auto;
  }
}
</style>
