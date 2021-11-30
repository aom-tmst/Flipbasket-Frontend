<template>
  <q-page>
    <div v-if="findMathUid">
      <div
        class="flex-row justify-center"
        v-if="findMathUid.products.length != 0"
      >
        <div class="flex-container">
          <div v-for="(item, index) in findMathUid.products" :key="index">
            <div class="flex-col desktop" style="margin: 20px">
              <div class="flex-row" style="margin-top: 20px">
                <img class="edit-profile-img" src="images/profileImg.jpg" />
                <div class="flex-col q-ml-md justify-center">
                  <div class="posted-by">{{ item.name }}</div>
                </div>
              </div>
              <div class="row">
                <div class="col content">
                  <img :src="item.image_Url" alt="" style="width: 12vw" />
                </div>
                <div class="col content content-detail">{{ item.desc }}</div>
                <div class="col content">type: {{ item.type }}</div>
                <div class="col content">price: {{ item.price }} bath</div>
                <div class="col content">
                  <q-btn
                    @click="deleteItemOnCart(item._id)"
                    class=" q-ml-md bg-primary text-white"
                    style="width: 30px; height: fit-content"
                    icon="delete"
                  />
                </div>
              </div>
            </div>

            <div class="mobile justify-start" style="margin: 30px 5px 30px 5px">
              <div class="edit-image">
                <img :src="item.image_Url" alt="" class="editeOnimage" />
              </div>
              <div class="flex-col justify-center" style="margin-left: 30px">
                <div class="flex-row q-mb-md q-mt-md">
                  <img class="edit-profile-img" src="images/profileImg.jpg" />

                  <div class="flex-col q-ml-md justify-center">
                    <div class="posted-by">{{ item.name }}</div>
                  </div>
                </div>
                <div class="content-detail" style="max-width: 500px">
                  {{ item.desc }}
                </div>
                <div class="flex-row items-center" style="margin-top: 20px">
                  <div style="margin-right: 30px">type: {{ item.type }}</div>
                  <div style="margin-right: 30px">
                    price: {{ item.price }} bath
                  </div>
                  <q-btn
                    @click="deleteItemOnCart(item._id)"
                    class=" q-ml-md bg-primary text-white"
                    style="width: 30px; height: fit-content"
                    icon="delete"
                  />
                </div>
              </div>
            </div>
            <q-separator style="margin: 20px 0" />
          </div>
        </div>
      </div>
      <div
        class="flex-col items-center"
        v-if="findMathUid.products.length == 0"
      >
        <q-page class="flex-col" style="justify-content: center;">
          <div class="test1 flex-col items-center">
            <div class="flex-row test2">
              <img src="images/addCart.png" alt="" style="width: 150px" />
            </div>
            <div
              class="flex-row q-mt-md"
              style="font-size: 16px; font-weight: bold; color: #9b9b9b"
            >
              don't have any product on your cart
            </div>
          </div>
        </q-page>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { auth } from 'src/boot/firebase';
import { useStore } from 'src/store';
import { defineComponent, computed, onMounted } from 'vue';
export default defineComponent({
  name: 'CartPage',

  preFetch({ store }) {
    const fetchHomePage = store.dispatch('pagesModule/fetchHomePage');
    const fetchCartPage = store.dispatch('pagesModule/fetchCartPage');
    return Promise.all([fetchHomePage, fetchCartPage]);
  },

  setup() {
    const store = useStore();
    const $q = useQuasar();

    onMounted(() => {
      auth.onAuthStateChanged((user) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const userDetails = store.dispatch('pagesModule/SubmitUid', {
          name: user?.displayName,
          uid: user?.uid,
        });
        console.log(userDetails, 'this line');
      });
    });

    const userUid = computed(() => {
      const thisUserUid = store.state.pagesModule.auth;
      return thisUserUid;
    });
    console.log(userUid.value, '1');

    const userDetail = computed(() => {
      const user = store.state.pagesModule.cart;
      return user;
    });
    console.log(userDetail.value, '2');
    const findMathUid = computed(() =>
      userDetail.value.find((data) => data.uid == userUid.value.uid)
    );

    const deleteItemOnCart = async (item) => {
      try {
        $q.loading.show();
        console.log(item, 'this from html');
        const productIds = findMathUid.value.products.filter(
          (product) => product._id != item
        );
        console.log(productIds, 'tset');

        const result = await api.put(`carts/${findMathUid.value._id}`, {
          products: productIds,
        });

        await store.dispatch('pagesModule/UpdateCarts');
        // const result = await api.delete(`carts/${findMathUid.value._id}`, {products: [findMathUid.value.products[0]._id]});
        console.log(result);

        $q.notify({
          type: 'positive',
          message: 'this product has removed from your cart',
          color: 'secondary',
          timeout: 1000,
        });
      } catch (e) {
        $q.notify({
          type: 'negative',
          message: 'have something worng, pls try again.',
          timeout: 1000,
        });
      } finally {
        $q.loading.hide();
      }
    };

    console.log(findMathUid);
    return { userDetail, findMathUid, deleteItemOnCart };
  },
});
</script>

<style lang="scss" scoped>
.test1 {
  margin-top: 10%;
  .test2 {
    opacity: 0.5;
  }
}
.posted-by {
  font-weight: bold;
}
.content-detail {
  color: #585858;
}
.content {
  display: flex;
  justify-content: center;
  align-items: center;
}
.editeOnimage {
  width: 150px;
}
.edit-profile-img {
  width: 50px;
  border-radius: 10px;
}

@media only screen and(min-width:1000px) {
  .mobile {
    display: none;
  }
}

@media only screen and(max-width:1000px) {
  .desktop {
    display: none;
  }
  .mobile {
    display: flex;
    flex-direction: row;
    justify-items: center;
  }
}
@media only screen and(max-width:500px) {
  .desktop {
    display: none;
  }
  .mobile {
    display: flex;
    flex-direction: column;
    justify-items: center;
    .edit-image {
      display: flex;
      justify-content: center;
    }
  }
  .editeOnimage {
    width: 250px;
  }
}
</style>
