<template>
  <div class="main-banner" v-if="item">
    <q-carousel
      animated
      :autoplay="true"
      infinite
      control-color="blue"
      :arrows="isShowArrows"
      v-model="slide"
      navigation
      class="full-width"
    >
      <q-carousel-slide
        v-for="(item, index) in item || []"
        :key="index"
        :name="index"
        :img-src="item.bannerImg"
        class="column no-wrap flex-center"
      >
      <q-intersection once transition="scale">
        <div class="flex-col content text-center">
          <div class="flex-row">Choose to search for unique products at</div>
          <div class="flex-row head-title">Flipbasket</div>
          <div class="flex-row">
            Open a new experience of online shopping.
          </div>
        </div>
        </q-intersection>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script lang="ts">
import { BannerAds } from 'src/type/Home'
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainssBanner',
  props: {
    item: Object as () => BannerAds[],
    isShowArrows: {
      type: Boolean,
      default: true,
    },
  },
  setup: () => ({ slide: ref(0) }),
});
</script>

<style lang="scss" scoped>
.main-banner {
  width: 100%;
  height: 100vh;
  .q-carousel {
    z-index: 0;
    height: 100vh;
    background-color: white;
    .q-carousel-slide {
      width: 50px;
    }
  }
  .q-carousel__slide {
    padding: 0 0 100px 0; // v.1
  }
  .q-btn {
    margin: 0 5px;
  }
  .content {
    margin-left: 30vw;

    .head-title {
    font-size: 5vw;
    font-weight: bold;
  }
  }
  
}
@media only screen and (min-width: 1000px) {
  .main-banner {
    .mobile {
      display: none;
    }
  }
}
@media only screen and (max-width: 1000px) {
  .main-banner {
    height: 50vh;
    .desktop {
      display: none;
    }
    .q-carousel {
      height: 50vh;
    }
    .q-carousel__slide {
      padding: 0 0 80px 0; // v.1
    }
    .q-btn {
      margin: 0 3px;
    }
  }
}
</style>
