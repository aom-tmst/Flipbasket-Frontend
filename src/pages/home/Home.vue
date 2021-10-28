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
          <HomeShirt :item="clothesDeatail" />
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
          <Hometrousers :item="trousersDetail" />
        </div>
      </div>

      <div class="scoped-banner" id="accessory">
        <HomeAccessoryBanner />
      </div>
      <div class="flex-container">
        <div class="flex-col items-center">
          <div class="flex-row justify-center">
            <span>Accessory</span>
          </div>
          <HomeAccessory :item="accessoryDetail" />
        </div>
      </div>
      <!-- <div class="review">
            <span>Review By Customers</span>
          </div> -->
      <div class="flex-container">
        <div class="flex-col items-center">
          <div id="gallery" />
          <span>Gallery</span>
          <HomeGallery :item="galleryImg" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import HomeMainBanner from 'src/pages/home/HomeMainBanner.vue';
import HomeSecondBanner from 'src/pages/home/HomeSecondBanner.vue';
import HomeTrouserBanner from 'src/pages/home/HomeTrouserBanner.vue';
import HomeAccessoryBanner from 'src/pages/home/HomeAccessoryBanner.vue';
import HomeShirt from 'src/pages/home/HomeShirt.vue';
import Hometrousers from 'src/pages/home/Hometrousers.vue';
import HomeAccessory from 'src/pages/home/HomeAccessory.vue';
import HomeGallery from 'src/pages/home/HomeGallery.vue';
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
    HomeShirt,
    Hometrousers,
    HomeGallery,
    HomeAccessory,
    HomeTrouserBanner,
    HomeAccessoryBanner,
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
  iframe {
    max-width: 1440px;
    width: 100%;
    margin-bottom: 40px;
  }
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
