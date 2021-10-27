<template>
  <q-page>
    <div class="flex-col items-center home" id="home">
      <HomeMainBanner :isShowArrows="false" :item="bannerAds" />
      <div class="scoped-banner" id="about">
        <HomeSecondBanner />
      </div>
      <div class="flex-container">
        <div id="product" />
        <div class="flex-col items-center">
          <div class="flex-row justify-center">
            <span>Latest sewing work</span>
          </div>
          <HomeSewing :item="clothesDeatail" />
          <!-- <div class="review">
            <span>Review By Customers</span>
          </div> -->
          <div id="gallery" />
          <span>Gallery</span>
          <HomeGallery :item="galleryImg" />
          <div id="location" />
          <span>Location</span>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.393182321986!2d98.35364238932227!3d7.853854298286074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30502e4a79554b11%3A0x950b9d90cf09db50!2z4LmC4Lij4LiH4LmA4Lij4Li14Lii4LiZIOC4reC4muC4iC7guJrguYnguLLguJnguJnguLLguJrguK3guJk!5e0!3m2!1sth!2sth!4v1635290212154!5m2!1sth!2sth"
            width="600"
            height="450"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import HomeMainBanner from 'src/pages/home/HomeMainBanner.vue';
import HomeSecondBanner from 'src/pages/home/HomeSecondBanner.vue';
import HomeSewing from 'src/pages/home/HomeSewing.vue';
import HomeGallery from 'src/pages/home/HomeGallery.vue';
import {
  bannerAds,
  clothesDeatail,
  galleryImg,
} from 'src/pages/home/constants';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Home',

  components: {
    HomeMainBanner,
    HomeSecondBanner,
    HomeSewing,
    HomeGallery,
  },

  setup() {
    return {
      bannerAds,
      clothesDeatail,
      galleryImg,
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
  #product {
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
