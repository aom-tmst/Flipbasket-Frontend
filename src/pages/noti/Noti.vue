<template>
  <q-page>
      <div class="flex-col">
          <div class="flex-container flex-col items-center">
              <div class="flex-row">
                  {{selectedStauts}}
              </div>
          </div>
      </div>
  </q-page>
</template>

<script>
import { auth } from 'src/boot/firebase';
import { useStore } from 'src/store';
import { defineComponent,computed,onMounted } from 'vue'
export default defineComponent({
    name : 'Noti',

    preFetch({ store }) {
    const fetchNotification = store.dispatch('pagesModule/fetchNotification');
    const fetchHomePage = store.dispatch('pagesModule/fetchHomePage');
    return Promise.all([fetchNotification,fetchHomePage]);
  },

  setup(){
      const store = useStore();
      const notifications = computed(() => {
      const notification = store.state.pagesModule.notification;
      return notification;
    });

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
    console.log(userDetail.value.uid, 'user');

    const selectedStauts = computed(() => notifications.value.filter((e) => e.uid == userDetail.value.uid ) )    
    return { selectedStauts }
  }

})


</script>

<style lang="scss" scoped>
//  .noti-page{

//  }
</style>