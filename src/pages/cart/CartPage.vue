<template>
  <q-page>
    <div class="flex-row justify-center" v-if="findMathUid">
      <!-- {{findMathUid}} -->
      <div class="flex-container">
        <div v-for="(item, index) in findMathUid.products" :key="index">
          <div class="flex-col" style="margin: 20px">
            <div class="flex-row">
              <div>profile</div>
              <div>{{ item.name }}</div>
            </div>
            <div class="row">
              <div class="col">image</div>
              <div class="col">{{ item.desc }}</div>
              <div class="col">{{ item.type }}</div>
              <div class="col">{{ item.price }}</div>
              <div class="col">{{ item._id }}</div>
              <q-btn @click="deleteItemOnCart(item._id)"> - </q-btn>
            </div>
          </div>
        </div>
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

<style></style>
