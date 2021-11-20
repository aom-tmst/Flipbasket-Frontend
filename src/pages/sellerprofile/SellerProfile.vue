<template>
  <q-page class="seller-profile">
    <div class="flex-col items-center product">
      <div class="flex-container items-cemter">
        <q-btn
          @click="$router.go(-1)"
          no-caps
          dense
          flat
          style="margin-top: 20px"
        >
          <q-icon name="chevron_left" /> Black</q-btn
        >
        <div class="flex-col">
          <div class="flex-row">
            <CardProfileSeller :item="selectedStore" />
          </div>
          <div class="posted-by">Shirt</div>
          <Shirt :showEdit="false" :showDelete="false" :item="selectedShirt" />
          <div class="posted-by">Trousers</div>
          <Trousers :showEdit="false" :showDelete="false" :item="selectedPants" />
          <div class="posted-by">Accessory</div>
          <Accessory :showEdit="false" :showDelete="false" :item="selectedAcc" />
          <div class="posted-by">Gallery</div>
          <Gallery :item="galleryImg" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import CardProfileSeller from 'src/components/CardProfileSeller.vue';
import Shirt from 'src/components/Shirt.vue';
import Trousers from 'src/components/Trousers.vue';
import Accessory from 'src/components/Accessory.vue';
import Gallery from 'src/components/Gallery.vue';
import {
  clothesDeatail,
  galleryImg,
  trousersDetail,
  accessoryDetail,
} from 'src/pages/home/constants';
import { useRoute } from 'vue-router';
import { sellerProfileDetail } from 'src/pages/sellerprofile/constants';
import { defineComponent, watchEffect, computed, ref } from 'vue';
import { useStore } from 'src/store';

export default defineComponent({
  name: 'SellerProfile',

  components: {
    CardProfileSeller,
    Shirt,
    Trousers,
    Accessory,
    Gallery,
  },

  preFetch({ store }) {
    const fetchHomePage = store.dispatch('pagesModule/fetchHomePage');
    const fetchAllProduct = store.dispatch('pagesModule/fetchAllProduct');
    return Promise.all([fetchHomePage, fetchAllProduct]);
  },

  setup() {
    // const selectedStoreOnWatch = ref();
    const route = useRoute();
    const store = useStore();
    const selectedStore = ref();
    const selectedShirt = ref();
    const selectedPants = ref();
    const selectedAcc = ref();

    const stores = computed(() => {
      const storesFormApi = store.state.pagesModule.store;
      return storesFormApi;
    });

    const products = computed(() => {
      const product = store.state.pagesModule.allProduct;
      return product;
    });

    console.log(stores);

    watchEffect(() => {
      const queryProduct = route.query;
      const findUid = stores.value.find((e) => e._id == queryProduct.item);
      selectedStore.value = findUid;

      const productShirt = products.value.filter(
        (e) => e.uid == queryProduct.item && e.type == 'shirt'
      );
      selectedShirt.value = productShirt;

      const productPants = products.value.filter(
        (e) => e.uid == queryProduct.item && e.type == 'pants'
      );
      selectedPants.value = productPants;

      const productAcc = products.value.filter(
        (e) => e.uid == queryProduct.item && e.type == 'accessory'
      );
      selectedAcc.value = productAcc;
      // console.log(selectedProduct , 'this');
    });

    // const productPants = products.value.filter((product) => product.type == 'pants')

    // const productAcc = computed(() =>
    //   products.value.filter((product) => product.type == 'accessory')
    // );

    return {
      selectedShirt,
      selectedPants,
      selectedAcc,
      selectedStore,
      sellerProfileDetail,
      clothesDeatail,
      trousersDetail,
      accessoryDetail,
      galleryImg,
    };
  },
});
</script>

<style lang="scss" scoped>
.seller-profile {
  .posted-by {
    font-size: 18px;
    font-weight: bold;
    margin: 20px;
  }
}
</style>
