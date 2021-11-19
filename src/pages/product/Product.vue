<template>
  <q-page>
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
        <div class="flex-col items-center edit-display">
          <div class="flex-row wrapper items-center justify-center">
            <div class="edit-box-img">
              <img class="edit-img" src="images/shirt1.png" alt="" />
            </div>
            <div class="content" style="max-width:350px;width:100%">
              <div class="flex-col items-end posted-on">
                Posted On : {{ selectedProduct.createdAt}}
              </div>
              <div class="posted-by">
                {{ selectedProduct.name }}
              </div>
              <div class="content-detail">
                {{ selectedProduct.desc }}
              </div>
              <div class="flex-row justify-end content-detail">
                price: {{ selectedProduct.price }} Bath
              </div>

              <div class="flex-row justify-end items-center clickable">
                <div class="profile-img">
                  <img :src="productClothesDeatail.profileImg" alt="" />
                </div>
                <div @click="pushpage()" class="product-by">
                  <span>{{ selectedProduct.store.name }} </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { useStore } from 'src/store';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { productClothesDeatail } from 'src/pages/product/constants';
import { defineComponent, computed, watchEffect,ref } from 'vue';
export default defineComponent({
  name: 'Product',

  preFetch({ store }) {
    const fetchAllProduct = store.dispatch('pagesModule/fetchAllProduct');
    return Promise.all([fetchAllProduct]);
  },

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const selectedProduct = ref();

    const products = computed(() => {
      const product = store.state.pagesModule.allProduct;
      return product;
    });

    watchEffect(() => {
      const queryProduct = route.query;
      const selectedProductOnWatch = products.value.find(
        (e) => e._id == queryProduct.item
      );
      console.log(selectedProductOnWatch);
      selectedProduct.value = selectedProductOnWatch
    });

    const pushpage = () => {
      void router.push({ name: 'SellerProfile' });
    };

    return {
      selectedProduct,
      productClothesDeatail,
      pushpage,
    };
  },
});
</script>

<style lang="scss" scoped>
.product {
  .edit-display {
    display: flex;
  }
  .content {
    margin: 20px;
    max-width: 300px;
    width: 100%;
    .posted-on {
      margin: 5px 0 10px 0;
    }
    .posted-by {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
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
      .product-by {
        font-size: 18px;
      }
    }
  }
  .edit-box-img {
    margin: 20px;
    .edit-img {
      max-width: 400px;
      width: 100%;
    }
  }
  .wrapper {
    display: flex;
    flex-wrap: wrap;
  }
  .product-by:hover {
    cursor: pointer;
    color: rgb(43, 144, 226);
  }
}
</style>
