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
            <CardProfileSeller :item="sellerProfileDetail" />
          </div>
          <div class="posted-by">Shirt</div>
          <Shirt :item="clothesDeatail" />
          <div class="posted-by">Trousers</div>
          <Trousers :item="trousersDetail" />
          <div class="posted-by">Accessory</div>
          <Accessory :item="accessoryDetail" />
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
import { sellerProfileDetail } from 'src/pages/sellerprofile/constants';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'SellerProfile',

  components: {
    CardProfileSeller,
    Shirt,
    Trousers,
    Accessory,
    Gallery
  },

  setup() {
    return {
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
