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
            <CardProfile :store="findUid" />
          </div>
          <Costume :item="findUid?.products"/>
          <!-- <div class="posted-by">Pants</div>
          <Trousers :item="selectedPants" />
          <div class="posted-by">Accessory</div>
          <Accessory :item="selectedAcc" /> -->
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { auth } from 'src/boot/firebase';
import CardProfile from 'src/components/CardProfile.vue';
import Costume from 'src/components/Costume.vue';
// import Trousers from 'src/components/Trousers.vue';
// import Accessory from 'src/components/Accessory.vue';
import { profileDetail } from 'src/pages/profile/constants';
import { useStore } from 'src/store';
import { defineComponent, computed, onMounted, ref } from 'vue';
export default defineComponent({
  name: 'Profile',

  components: {
    Costume,
    CardProfile,
    // Trousers,
    // Accessory,
  },

  preFetch({ store }) {
    const fetchHomePage = store.dispatch('pagesModule/fetchHomePage');
    const fetchPublicStore = store.dispatch('pagesModule/fetchPublicStore');
    return Promise.all([fetchHomePage, fetchPublicStore]);
  },

  setup() {
    const store = useStore();
    const selectedShirt = ref();
    const selectedPants = ref();
    const selectedAcc = ref();

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

    const homePageA = computed(() => {
      const homePage = store.state.pagesModule.store;
      return homePage;
    });

    const findUid = computed(() =>
      homePageA.value.find((e) => e.uid == userDetail.value?.uid)
    );

    // watchEffect(() => {
    //   const productShirt = computed(() =>
    //     findUid.value?.products.filter((e) => e.type == 'shirt')
    //   );
    //   selectedShirt.value = productShirt;

    //   const productPants = computed(() =>
    //     findUid.value?.products.filter((e) => e.type == 'pants')
    //   );
    //   console.log(productPants);
    //   selectedPants.value = productShirt;

    //   const productAcc = computed(() =>
    //     findUid.value?.products.filter((e) => e.type == 'accessory')
    //   );
    //   console.log(productAcc);
    //   selectedAcc.value = productShirt;
    // });
    return {
      selectedShirt,
      selectedPants,
      selectedAcc,
      findUid,
      userDetail,
      homePageA,
      // user,
      profileDetail,
    };
  },
});
</script>

<style lang="scss" scoped></style>
