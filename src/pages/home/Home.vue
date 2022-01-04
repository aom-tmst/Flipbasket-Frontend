<template>
  <q-page>
    <div class="flex-col items-center home" id="home">
      <HomeMainBanner :isShowArrows="false" :item="bannerAds" />
      <div class="scoped-banner" id="about">
        <HomeSecondBanner />
      </div>
      <div class="flex-container">
        <div id="shirt" />

        <div class="flex-row justify-center">
          <span>Shirt</span>
        </div>
        <Costume :showEdit="false" :showDelete="false" :item="productShirt" />
      </div>

      <div class="scoped-banner" id="trousers" v-if="productPants.length !=0">
        <HomeTrouserBanner />
      </div>
      <div class="flex-container" v-if="productPants.length !=0">
        <div class="flex-row justify-center">
          <span>Trousers</span>
        </div>
        <Costume :showEdit="false" :showDelete="false" :item="productPants" />
      </div>

      <div class="scoped-banner" id="accessory" v-if="productAcc.length !=0">
        <HomeAccessoryBanner />
      </div>
      <div class="flex-container" style="margin-bottom: 20px" v-if="productAcc.length !=0">
        <div class="flex-row justify-center">
          <span>Accessory</span>
        </div>
        <Accessory :item="productAcc" />
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
import Costume from 'src/components/Costume.vue';
import Accessory from 'src/components/Accessory.vue'
import {
  bannerAds,
  clothesDeatail,
  galleryImg,
} from 'src/pages/home/constants';
import { useStore } from 'src/store';
import { defineComponent, computed } from 'vue';
export default defineComponent({
  name: 'Home',

  components: {
    Accessory,
    HomeMainBanner,
    HomeSecondBanner,
    Costume,
    HomeTrouserBanner,
    HomeAccessoryBanner,
  },

  preFetch({ store }) {
    const fetchAllProduct = store.dispatch('pagesModule/fetchAllProduct');
    return Promise.all([fetchAllProduct]);
  },

  setup() {
    const store = useStore();

    const products = computed(() => {
      const product = store.state.pagesModule.allProduct;
      return product;
    });

    console.log(products.value, 'this');
    const productShirt = computed(() =>
      products.value.filter((product) => product.type == 'shirt')
    );
    const productPants = computed(() =>
      products.value.filter((product) => product.type == 'pants')
    );
    const productAcc = computed(() =>
      products.value.filter((product) => product.type == 'accessory')
    );
    console.log(productShirt);

    return {
      productShirt,
      productPants,
      productAcc,
      bannerAds,
      clothesDeatail,
      galleryImg,
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
