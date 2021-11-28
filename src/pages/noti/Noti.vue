<template>
  <q-page>
    <div class="flex-row justify-center">
      <div class="flex-container">
        <div v-for="(item, index) in selectedStauts[0].products" :key="index">
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
              </div>
            </div>
          </div>
          <q-separator style="margin: 20px 0" />
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
  name: 'Noti',

  preFetch({ store }) {
    const fetchNotification = store.dispatch('pagesModule/fetchNotification');
    const fetchHomePage = store.dispatch('pagesModule/fetchHomePage');
    return Promise.all([fetchNotification, fetchHomePage]);
  },

  setup() {
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

    const selectedStauts = computed(() =>
      notifications.value.filter((e) => e.uid == userDetail.value.uid)
    );
    return { selectedStauts };
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
