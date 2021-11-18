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
          <Shirt :item="findUid?.products" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { auth } from 'src/boot/firebase';
import CardProfile from 'src/components/CardProfile.vue';
import Shirt from 'src/components/Shirt.vue';
import { profileDetail } from 'src/pages/profile/constants';
import { useStore } from 'src/store';
import { defineComponent, computed, onMounted } from 'vue';
export default defineComponent({
  name: 'Profile',

  components: {
    Shirt,
    CardProfile,
  },

  preFetch({ store }) {
    const fetchHomePage = store.dispatch('pagesModule/fetchHomePage');
    return Promise.all([fetchHomePage]);
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
    console.log(findUid, 'uid');

    return {
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
