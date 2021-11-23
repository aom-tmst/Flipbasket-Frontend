<template>
  <q-page>
    <div class="flex-row justify-center" v-if="findMathUid">
      <div class="flex-container">
        <div v-for="(item,index) in findMathUid.products" :key="index">
          <div class="flex-col" style="margin: 20px">
          <div class="flex-row">
            <div>profile</div>
            <div>{{item.name}}</div>
          </div>
          <div class="row">
            <div class="col">image</div>
            <div class="col">{{item.desc}}</div>
            <div class="col">{{item.type}}</div>
            <div class="col">{{item.price}}</div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
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
    const findMathUid = computed(() => userDetail.value.find(
      (data) => data.uid == userUid.value.uid
    ))
    
    console.log(findMathUid);
    return { userDetail, findMathUid };
  },
});
</script>

<style></style>
