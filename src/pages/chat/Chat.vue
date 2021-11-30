<template>
  <q-page>
    <div class="flex-row justify-center">
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
        <q-layout
          view="lHh lpr lFf"
          container
          style="height: 70vh"
          class="shadow-5 rounded-borders"
        >
          <q-header bordered class="bg-white text-primary" v-if="thisSeller">
            <q-toolbar>
              <q-toolbar-title>
                <div class="flex-row items-center justify-center">
                  Chat with :
                  <div class="head-title">
                    {{ thisSeller.name }}
                  </div>
                </div>
              </q-toolbar-title>
            </q-toolbar>
          </q-header>

          <q-page-container>
            <div class="flex-col q-ml-xl" v-if="thisSeller">
              <div
                class="q-mt-md q-mb-md"
                v-for="index in message"
                :key="index"
              >
                <q-chat-message>
                  <span class="content" style="margin-right:20px">{{ index }}</span>
                </q-chat-message>
              </div>
            </div>
          </q-page-container>
        </q-layout>
        <div class="flex-row q-mt-md q-ma-md">
          <q-input
            outlined
            v-model="text"
            label="Outlined"
            style="width: 100vw;"
          />
          <q-btn class="bg-primary text-white" @click="sent()">sent</q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { useStore } from 'src/store';
import { useRoute } from 'vue-router';
import { auth } from 'src/boot/firebase';
import { defineComponent, ref, onMounted, computed } from 'vue';

export default defineComponent({
  name: 'Chat',

  preFetch({ store }) {
    const fetchHomePage = store.dispatch('pagesModule/fetchHomePage');
    const fetchPublicStore = store.dispatch('pagesModule/fetchPublicStore');
    return Promise.all([fetchHomePage, fetchPublicStore]);
  },

  setup() {
    const route = useRoute();
    const store = useStore();
    const text = ref('');

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

    const message = computed(() => {
      const thisMessage = store.state.pagesModule.message;
      return thisMessage;
    });

    console.log(message.value);

    const homePageA = computed(() => {
      const homePage = store.state.pagesModule.store;
      return homePage;
    });

    const thisSeller = computed(() =>
      homePageA.value.find((e) => e._id == route.query.item)
    );

    const sent = async () => {
      // eslint-disable-next-line
      console.log((window as any).socket.emit);

        // eslint-disable-next-line
        text.value =  `${userDetail.value.name  + ' :   ' + text.value}`;
  
      // eslint-disable-next-line
      (window as any).socket.emit('server', text.value);
      await store.dispatch('pagesModule/InputMessage', text.value);
      text.value = ''
    };
    return { sent, text, userDetail, thisSeller, message };
  },
});
</script>

<style lang="scss" scoped>
.edit-bg {
  background-color: rgb(224, 224, 224);
  border-radius: 20px;
}
.head-title {
  font-weight: bold;
  font-size: 18px;
  .content {
    font-size: 16px;
  }
}
.edit-nav {
  background-color: antiquewhite;
}
</style>
