<template>
  <q-header elevated>
    <q-toolbar style="margin-bottom: 10px; margin-top: 10px">
      <q-btn dense flat :to="{ name: 'Home' }" @click="dialog = false">
        <div class="q-ml-sm" style="font-weight: bold">Flipbasket</div>
      </q-btn>

      <!-- Desktop -->
      <div class="flex-row items-center menu-list desktop-menu">
        <a
          v-for="({ label, path }, index) in menuList"
          :key="index"
          :href="path"
          :class="{ 'is-actived': isActived(path) }"
        >
          {{ label }}
        </a>
        <div @click="pushToProfile" v-if="userDetail">
          <div v-if="userDetail.name != undefined">
             <a class="test">Profile</a>
          </div>
        </div>
        <div class="cursor-pointer non-selectable">
          <a>Product</a>
          <q-menu auto-close>
            <q-list>
              <div class="flex-col edit-font">
                <a
                  v-for="({ label, path }, index) in productList"
                  :key="index"
                  :href="path"
                  :class="{ 'is-actived': isActived(path) }"
                  class="edit-font"
                >
                  {{ label }}
                  <q-separator />
                </a>
              </div>
            </q-list>
          </q-menu>
        </div>
      </div>
      <div
        class="flex-row items-center menu-list desktop-menu"
        v-if="userDetail"
      >
        <div v-if="userDetail.name != undefined">
          Welcome : {{ userDetail.name }}
          <!-- <q-icon
            class="cart-edit-icon"
            name="shopping_bag"
            @click="pushPage()"
          />
          <q-icon
            class="cart-edit-icon"
            name="support_agent"
            @click="pushToNoti()"
          /> -->
        </div>
      </div>
      <div v-if="userDetail">
        <button
          v-if="userDetail.name != undefined"
          class="logout edit-btn q-mr-sm desktop-menu"
          @click="Logout"
          style="margin-left: 20px"
        >
          Logout
        </button>
        <button
          v-if="userDetail.name == undefined"
          class="logout edit-btn q-mr-sm desktop-menu"
          @click="Login"
          style="margin-left: 20px"
        >
          Login
        </button>
      </div>
      <q-icon size="sm" name="account_circle" class="desktop-menu" />

      <!-- Mobile -->
      <div class="menu-list mobile-menu">
        <q-btn icon="menu" @click="dialog = !dialog" />
        <q-dialog maximized seamless v-model="dialog" position="right">
          <q-card class="menu-dialog flex-col items-center" v-if="userDetail">
            <q-card-section v-if="userDetail.name != undefined"> Welcome : {{ userDetail.name }} </q-card-section>
            <q-card-section
              v-for="({ label, path }, index) in menuList"
              :key="index"
            >
              <a
                :class="{ 'is-actived': isActived(path) }"
                :href="path"
                @click="dialog = !dialog"
              >
                {{ label }}
              </a>
            </q-card-section>
            <q-card-section v-if="userDetail.name != undefined">
              <button class="edit-btn" @click="pushToProfile()" v-close-popup>
                Profile
              </button>
            </q-card-section>
            <q-card-section
              v-for="({ label, path }, index) in productList"
              :key="index"
            >
              <a
                :class="{ 'is-actived': isActived(path) }"
                :href="path"
                @click="dialog = !dialog"
              >
                {{ label }}
              </a>
            </q-card-section>
            <!-- <q-card-section>
              <button class="edit-btn" @click="pushPage()" v-close-popup>
                Cart
              </button>
            </q-card-section>
            <q-card-section>
              <button class="edit-btn" @click="pushToNoti()" v-close-popup>
                Notification
              </button>
            </q-card-section> -->
            <q-card-section v-if="userDetail">
              <button
                class="logout edit-btn"
                v-if="userDetail.name != undefined"
                @click="Logout"
              >
                Logout
              </button>
              <button
                class="logout edit-btn"
                v-if="userDetail.name == undefined"
                @click="Login"
              >
                Log in
              </button>
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import { auth } from 'src/boot/firebase';
import { useRoute, useRouter } from 'vue-router';
import { defineComponent, ref, onMounted } from 'vue';

interface Error {
  message: string;
}

export default defineComponent({
  name: 'MainLayoutHeader',
  components: {},
  setup() {
    const router = useRouter();
    const route = useRoute();
    const dialog = ref(false);
    const userDetail = ref();

    onMounted(() => {
      auth.onAuthStateChanged((user) => {
        userDetail.value = {
          name: user?.displayName,
        };
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        console.log(userDetail.value.name, 'this line');
      });
    });

    console.log(userDetail);

    const Logout = () => {
      auth
        .signOut()
        .then(() => console.log('Signed Out'))
        .catch((err: Error) => alert(err.message));
    };

    const pushToProfile = () => {
      void router.push({path: 'profile'})
    }

    const Login = () => {
      void router.push({ path: 'login-session' });
    };

    const menuList = [
      { label: 'Home', path: '#home' },
      { label: 'About', path: '#about' },
      // { label: 'Gallery', path: '#gallery' },
      // { label: 'Location', path: '#location' },
    ];
    const productList = [
      { label: 'Shirt', path: '#shirt' },
      { label: 'Trousers', path: '#trousers' },
      { label: 'Accessory', path: '#accessory' },
      // { label: 'Gallery', path: '#gallery' },
      // { label: 'Location', path: '#location' },
    ];
    const isActived = (path: string) => {
      return route.path.substring(1) === path;
    };

    const pushPage = () => {
      void router.push({ path: 'cart' });
    };

    const pushToNoti = () => {
      void router.push({ path: 'noti' });
    };

    return {
      pushToNoti,
      pushPage,
      menuList,
      dialog,
      isActived,
      productList,
      Logout,
      userDetail,
      Login,
      pushToProfile,
    };
  },
});
</script>

<style lang="scss" scoped>
.test{
  cursor: pointer;
}
.edit-btn {
  cursor: pointer;
  background: none;
  border: none;
}
.edit-btn:hover {
  color: rgb(43, 144, 226);
}
.cart-edit-icon {
  margin-left: 20px;
  font-size: 20px;
  cursor: pointer;
}
.cart-edit-icon:hover {
  color: rgb(43, 144, 226);
}
.q-header {
  color: black;
  background-color: white;
  .q-toolbar {
    margin: auto;
    max-width: 1440px;
  }
  .menu-list {
    margin-left: auto;
  }
  a {
    text-align: center;
    color: black;
    margin: 0 20px 0 20px;
    &:hover {
      color: rgb(43, 144, 226);
    }
  }
  a.is-actived {
    &:link,
    &:visited {
      color: rgb(43, 144, 226);
    }
  }
}
.menu-dialog {
  width: 100vw;
  padding: 10px;
  margin-top: auto;
  background-color: white;
  opacity: 10;
  height: calc(100vh - 70.3px) !important;
  a {
    text-align: center;
    color: black;
    margin: 0 20px 0 20px;
    &:hover {
      color: rgb(43, 144, 226);
    }
  }
  a.is-actived {
    &:link,
    &:visited {
      color: rgb(43, 144, 226);
    }
  }
}
.edit-font {
  margin: 10px 30px 10px 30px;
  color: black;
}
.edit-font:hover {
  color: rgb(43, 144, 226);
}
@media only screen and (max-width: 1000px) {
  .desktop-menu {
    display: none;
  }
}
@media only screen and (min-width: 1000px) {
  .mobile-menu {
    display: none;
  }
}
</style>
