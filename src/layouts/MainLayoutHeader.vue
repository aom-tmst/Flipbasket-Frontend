<template>
  <q-header elevated>
    <q-toolbar style="margin-bottom: 10px; margin-top: 10px">
      <q-btn dense flat :to="{ name: 'Home' }" @click="dialog = false">
        <img src="icons/fliplogo.png" style="width: 200px" />
      </q-btn>

      <!-- Desktop -->
      <div class="flex-row items-center menu-list desktop-menu e">
        <a
          v-for="({ label, path }, index) in menuList"
          :key="index"
          :href="path"
          :class="{ 'is-actived': isActived(path) }"
        >
          {{ label }}
        </a>
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
      <div class="flex-row items-center menu-list desktop-menu">
        Welcome : {{ name }}
        <q-btn
          flat
          no-caps
          dense
          class="logout"
          @click="Logout"
          style="margin-left: 20px"
        >
          Logout
        </q-btn>
        <q-icon size="sm" name="account_circle" />
      </div>

      <!-- Mobile -->
      <div class="menu-list mobile-menu">
        <q-btn icon="menu" @click="dialog = !dialog" />
        <q-dialog maximized seamless v-model="dialog" position="right">
          <q-card class="menu-dialog flex-col items-center">
            <q-card-section> Welcome : {{ name }} </q-card-section>
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
            <q-card-section>
              <q-btn
                flat
                no-caps
                dense
                class="logout text-black"
                to="profile"
                @click="dialog = !dialog"
              >
                profile
              </q-btn>
            </q-card-section>
            <q-card-section>
              <q-btn
                flat
                no-caps
                dense
                class="logout text-black"
                @click="Logout"
              >
                Logout
              </q-btn>
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import { auth } from 'src/boot/firebase';
import { useRoute } from 'vue-router';
import { defineComponent, ref, onMounted } from 'vue';

interface Error {
  message: string;
}

export default defineComponent({
  name: 'MainLayoutHeader',
  components: {},
  setup() {
    const route = useRoute();
    const dialog = ref(false);
    const name = ref('');

    onMounted(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          name.value = user.email?.split('@')[0] || '';
        }
        console.log(user);
        
      });
    });

    const Logout = () => {
      auth
        .signOut()
        .then(() => console.log('Signed Out'))
        .catch((err: Error) => alert(err.message));
    };

    const menuList = [
      { label: 'Home', path: '#home' },
      { label: 'About', path: '#about' },
      { label: 'Profile', path: 'profile' },
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

    return { menuList, dialog, isActived, productList, name, Logout };
  },
});
</script>

<style lang="scss" scoped>
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
