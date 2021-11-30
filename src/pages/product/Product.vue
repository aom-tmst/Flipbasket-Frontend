<template>
  <q-page>
    <div class="desktop product flex-row justify-center">
      <div class="flex-container">
        <q-btn
          @click="$router.go(-1)"
          no-caps
          dense
          flat
          style="margin-top: 20px"
        >
          <q-icon name="chevron_left" /> Black</q-btn
        >
        <div class="flex-row justify-center">
          <div class="flex-col">
            <div class="edit-box-img">
              <img class="edit-img-desktop" :src="selectedProduct.image_Url" alt="" />
            </div>
          </div>
          <div class="flex-col items-center justify-center">
            <div class="content" style="width: 350px">
              <div class="flex-col items-end posted-on">
                Posted On : {{ selectedProduct.createdAt }}
              </div>
              <div class="posted-by flex-row">
                <div>{{ selectedProduct.name }}</div>
                <q-space />
                <div>
                  <q-btn
                    class="items-end"
                    flat
                    no-caps
                    dense
                    unelevated
                    icon="more_vert"
                  >
                    <q-menu>
                      <ProductPopup
                        :item="selectedProduct"
                        :thisUser="storeDetail"
                        :thisCartId="cartDetailId"
                      />
                    </q-menu>
                  </q-btn>
                </div>
              </div>
              <div class="content-detail">
                {{ selectedProduct.desc }}
              </div>
              <div class="flex-row justify-end items-center content-detail">
                price: {{ selectedProduct.price }} Bath
                <q-btn no-caps fab-mini
                class=" q-ml-md bg-primary text-white"
                  @click="
                    NotificationStatus(
                      selectedProduct.store.uid,
                      selectedProduct._id
                    )
                  "
                  >Buy</q-btn
                >
              </div>
              <div class="flex-row items-center clickable product-by" style="cursor:pointer" @click="pushpage(selectedProduct.uid)">
                <div class="profile-img">
                  <img :src="productClothesDeatail.profileImg" alt="" />
                </div>
                <div>
                  <span>{{ selectedProduct.store.name }} </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="recommended-text" style="margin: 20px 50px">
          Recommended
        </div>
        <Accessory :item="recommentedProduct" />
      </div>
    </div>
    <!-- desktop -->

    <!-- mobile -->
    <div class="flex-row justify-center product mobile">
      <div class="flex-container">
        <div
          class="flex-row justify-center wrapper"
          style="margin: 0 20px 0 20px"
        >
          <div class="flex-col">
            <div class="edit-box-img">
              <img class="edit-img" :src="selectedProduct.image_Url" alt="" />
            </div>
          </div>
          <div class="flex-col items-center justify-center">
            <div class="content" style="max-width: 350px; width: 100%">
              <div class="flex-col items-end posted-on">
                Posted On : {{ selectedProduct.createdAt }}
              </div>
              <div class="posted-by flex-row">
                <div>{{ selectedProduct.name }}</div>
                <q-space />
                <div>
                  <q-btn
                    class="items-end"
                    flat
                    no-caps
                    dense
                    unelevated
                    icon="more_vert"
                  >
                    <q-menu>
                      <ProductPopup
                        :item="selectedProduct"
                        :thisUser="storeDetail"
                        :thisCartId="cartDetailId"
                      />
                    </q-menu>
                  </q-btn>
                </div>
              </div>
              <div class="content-detail">
                {{ selectedProduct.desc }}
              </div>
              <div class="flex-row justify-end items-center content-detail">
                price: {{ selectedProduct.price }} Bath
                <q-btn no-caps fab-mini
                class=" q-ml-md bg-primary text-white"
                  @click="
                    NotificationStatus(
                      selectedProduct.store.uid,
                      selectedProduct._id
                    )
                  "
                  >Buy</q-btn
                >
              </div>
              <div class="flex-row  items-center clickable">
                <div class="profile-img">
                  <img :src="productClothesDeatail.profileImg" alt="" />
                </div>
                <div @click="pushpage(selectedProduct.uid)" class="product-by">
                  <span>{{ selectedProduct.store.name }} </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="recommended-text" style="margin: 20px 50px">
          Recommended
        </div>
        <Accessory :item="recommentedProduct" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import Accessory from 'src/components/Accessory.vue';
import ProductPopup from 'src/pages/product/ProductPopup.vue';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';
import { auth } from 'src/boot/firebase';
import { useStore } from 'src/store';
import { useRouter, useRoute } from 'vue-router';
import { productClothesDeatail } from 'src/pages/product/constants';
import { defineComponent, computed, watchEffect, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'Product',

  components: {
    ProductPopup,
    Accessory,
  },

  preFetch({ store }) {
    const fetchAllProduct = store.dispatch('pagesModule/fetchAllProduct');
    const fetchHomePage = store.dispatch('pagesModule/fetchHomePage');
    const fetchCartPage = store.dispatch('pagesModule/fetchCartPage');
    const fetchNotification = store.dispatch('pagesModule/fetchNotification');
    return Promise.all([
      fetchAllProduct,
      fetchHomePage,
      fetchNotification,
      fetchCartPage,
    ]);
  },

  setup() {
    const $q = useQuasar();
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const selectedProduct = ref();
    const menu = ref(false);

    const products = computed(() => {
      const product = store.state.pagesModule.allProduct;
      return product;
    });

    // ------------------------  Store Detail --------------------

    onMounted(() => {
      auth.onAuthStateChanged((user) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const userDetails = store.dispatch('pagesModule/SubmitUid', {
          name: user?.displayName,
          uid: user?.uid,
        });
      });
    });

    const userDetail = computed(() => {
      const user = store.state.pagesModule.auth;
      return user;
    });
    console.log(userDetail, 'user');

    const homePageA = computed(() => {
      const homePage = store.state.pagesModule.store;
      return homePage;
    });

    const storeDetail = computed(() =>
      homePageA.value.find((e) => e.uid == userDetail.value?.uid)
    );
    console.log(storeDetail, 'this');

    // ------------------------  Function --------------------

    watchEffect(() => {
      const queryProduct = route.query;
      const selectedProductOnWatch = products.value.find(
        (e) => e._id == queryProduct.item
      );
      console.log(selectedProductOnWatch);
      selectedProduct.value = selectedProductOnWatch;
    });

    console.log(selectedProduct, 'this line');

    const pushpage = (item: string) => {
      void router.push({ name: 'SellerProfile', query: { item } });
    };

    // ------------------------  find cart id  --------------------

    const cartDetail = computed(() => {
      const cartDetails = store.state.pagesModule.cart;
      return cartDetails;
    });

    const cartDetailId = computed(() =>
      cartDetail.value.find((e) => e.uid == userDetail.value?.uid)
    );

    // ------------------------  find recommed product  --------------------

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const recommentedProduct = computed(() => products.value.filter((e) =>e.type == selectedProduct.value.type &&e._id != selectedProduct.value._id
      )
    );


    //----------------------- Notifications status ----------------------

    const notifications = computed(() => {
      const notification = store.state.pagesModule.notification;
      return notification;
    });

    
      const thisProductStoreId = ref()
               // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
               thisProductStoreId.value =  selectedProduct.value.store.uid
    
        
    const NotificationStatus = async (items: string, itemId: string) => {
      const selectedStauts = computed(() =>
        notifications.value.filter((e) => e.uid == thisProductStoreId.value)
      );

      console.log(selectedStauts.value, '0.1');

      console.log(items, '0');

      const productIds =
        selectedStauts.value[0].products.map((data) => data._id) || [];
      // const productIds = selectedStauts.value.map((data) => data._id) || [];

      console.log(productIds, 'products all id');

      const test = notifications.value.find((e) => e.uid == items);

      // const test = selectedStauts.value.find((e) => e.uid == items);
      console.log(test?._id, '1');
      console.log(itemId, '2');
      console.log(productIds, '3');

      try {
        $q.loading.show();
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        await api.put(`notifications/${test?._id}`, {
          products: [itemId, ...productIds],
        });
        $q.notify({
          type: 'positive',
          message: 'buy product successed',
          color: 'secondary',
          timeout: 1000,
        });
        await store.dispatch('pagesModule/UpdateNotification');
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: 'Can not buy product, please check your wifi ',
          timeout: 1000,
        });
      } finally {
        $q.loading.hide();
      }
    };

    return {
      NotificationStatus,
      recommentedProduct,
      cartDetailId,
      storeDetail,
      menu,
      selectedProduct,
      productClothesDeatail,
      pushpage,
      products,
    };
  },
});
</script>

<style lang="scss" scoped>
.product {
  .edit-img-desktop {
    width: 400px;
  }
  .edit-display {
    display: flex;
  }
  .posted-by {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .recommended-text {
    color: rgb(36, 108, 167);
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .content {
    margin: 20px;
    max-width: 300px;
    width: 100%;
    .posted-on {
      margin: 5px 0 10px 0;
    }
    .content-detail {
      color: #585858;
      margin-bottom: 10px;
    }
    .profile-img {
      img {
        border-radius: 5px;
        width: 30px;
        margin-right: 10px;
      }
    }
    // .product-by {
    //   font-weight: bold;
    // }
  }
  .edit-box-img {
    margin: 20px;
    .edit-img {
      max-width: 300px;
      width: 100%;
    }
  }
  .wrapper {
    display: flex;
    flex-wrap: wrap;
  }
  .product-by{
    font-size: 16px;
  }
  .product-by:hover {
    cursor: pointer;
    color: rgb(43, 144, 226);
  }
}

@media only screen and(min-width:767px) {
  .mobile {
    display: none;
  }
}

@media only screen and(max-width:767px) {
  .desktop {
    display: none;
  }
}
</style>
