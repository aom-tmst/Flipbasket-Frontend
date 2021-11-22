<template>
  <q-page>
    <div class="flex-row justify-center">
      <div class="flex-container">
        <!-- v-for -->
        {{userDetail}}
        <div class="flex-col" style="margin: 20px">
          <div class="flex-row">
            <div>profile</div>
            <div>name</div>
          </div>
          <div class="flex-row">
            <div>image</div>
            <div>desc</div>
            <div>type</div>
            <div>price</div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useStore } from 'src/store';
import { defineComponent, computed } from 'vue';
export default defineComponent({
  name: 'CartPage',

  preFetch({ store }) {
    const fetchHomePage = store.dispatch('pagesModule/fetchHomePage');
    const fetchCartPage = store.dispatch('pagesModule/fetchCartPage');
    return Promise.all([fetchHomePage, fetchCartPage]);
  },

  setup() {
    const store = useStore();

    const userDetail = computed(() => {
      const user = store.state.pagesModule.cart;
      return user;
    });

    return { userDetail }
  },
});
</script>

<style></style>
