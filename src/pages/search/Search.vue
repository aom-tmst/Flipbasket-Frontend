<template>
  <q-page>
    <q-layout
      view="hHh Lpr lff"
      container
      style="height: 100vh"
      class="shadow-2 rounded-borders"
    >
      <q-header elevated class="bg-color">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>
            <div class="flex-row items-center">
               <q-space />

              <q-select
                outlined
                v-model="model"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="options"
                @filter="filterFn"
                style="margin: 10px;width:100%;max-width:150px;"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
              <q-btn icon="search" @click="pushpage(model)"/>
            </div>
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="500"
        bordered
        class="bg-grey-3"
      >
        <q-scroll-area class="fit">
          <q-list>
            <q-item>
              <q-item-section> Categories </q-item-section>
            </q-item>
            <q-separator />
            <template v-for="(menuItem, index) in menuList" :key="index">
              <q-item
                clickable
                :active="menuItem.label === 'Outbox'"
                v-ripple
                @click="selectedCate(menuItem.value)"
              >
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
            </template>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-page padding>
          <Costume :showEdit="false" :showDelete="false" :item="selected" />
        </q-page>
      </q-page-container>
    </q-layout>
  </q-page>
</template>

<script lang="ts">
import Costume from 'src/components/Costume.vue';
import { useRouter } from 'vue-router';
import { useStore } from 'src/store';
import { defineComponent, ref, computed, onMounted } from 'vue';
export default defineComponent({
  name: 'Search',

  components: {
    Costume,
  },

  preFetch({ store }) {
    const fetchAllProduct = store.dispatch('pagesModule/fetchAllProduct');
    return Promise.all([fetchAllProduct]);
  },

  setup() {
    const router = useRouter();
    const store = useStore();
    const drawer = ref(false);
    const model = ref('');
    const selected = ref();

    const products = computed(() => {
      const product = store.state.pagesModule.allProduct;
      return product;
    });

    onMounted(() => {
      selectedCate('shirt')
    });

    const selectedCate = (item: string) => {
      const selectedInFunction = computed(() =>
        products.value.filter((e) => e.type == item)
      );
      selected.value = selectedInFunction.value;
    };

    const menuList = [
      {
        label: 'Shirt',
        value: 'shirt',
      },
      {
        label: 'Pants',
        value: 'pants',
      },
      {
        label: 'Accessory',
        value: 'accessory',
      },
    ];

    const mapName = products.value.map((e) => e.name);

    const pushpage = (mumi: string) => {
      console.log('test');

      const getProductByName = products.value.find((e) => e.name == mumi);
      const item = getProductByName?._id;

      void router.push({ name: 'Product', query: { item } });
    };

    const options = ref(mapName);

    return {
      menuList,
      drawer,
      selected,
      options,
      model,
      pushpage,
      selectedCate,

      filterFn(
        val: string,
        update: (arg0: () => void) => void,
        abort: () => void
      ) {
        if (val.length < 2) {
          abort();
          return;
        }

        update(() => {
          const needle = val.toLowerCase();
          options.value = mapName.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        });
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.bg-color {
  color: black;
  background-color: whitesmoke;
}
</style>
