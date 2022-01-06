<template>
  <q-card
    class="dialog-add-product"
    style="max-width: 500px; width: 100%"
    v-if="item"
  >
    <q-card-section class="row items-center q-pb-none">
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-card-section>
      <span>Are you sure to Delete : {{ item.name }}</span>
      <div class="flex-row justify-end">
        <q-btn @click="Product(item)" color="primary" v-close-popup>delete product</q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { useStore } from 'src/store';
import { Product } from 'src/type/Product';
import { api } from 'src/boot/axios';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'DialogEditProfile',

  props: {
    item: Object as () => Product,
  },

  setup() {
    const $q = useQuasar();
    const store = useStore();
    const Product = async (item: Product | undefined) => {
      if (!item) return;

      try {
        $q.loading.show();
        const result = await api.delete(`products/${item?._id}`);
        console.log(result);
        await store.dispatch('pagesModule/DeleteProduct');

        $q.notify({
          type: 'positive',
          message: ' Delete product successed',
          color: 'secondary',
          timeout: 1000,
        });
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: 'Error , please check your internet and try again.',
          timeout: 1000,
        });
      }
      finally {
        $q.loading.hide();
      }
    };

    return {
      Product,
    };
  },
});
</script>

<style lang="scss" scoped>
.dialog-add-product {
  padding: 10px;
  span {
    font-size: 16px;
    font-weight: bold;
    margin: 10px;
  }
}
</style>
