<template>
  <q-card
    class="dialog-add-product"
    style="max-width: 500px; width: 100%"
    v-if="item"
  >
    <q-card-section class="row items-center q-pb-none">
      <q-space />
      {{ item._id }}
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-card-section>
      <span>Product Name</span>
      <q-input
        class="q-pa-md q-mb-sm"
        v-model="name"
        :dense="dense"
        :placeholder="item.name"
      ></q-input>
      <span>Detail</span>
      <div class="q-pa-md q-mb-sm" style="width: 100%">
        <q-input
          v-model="desc"
          :placeholder="item.desc"
          filled
          type="textarea"
        />
      </div>
      <span>price</span>
      <div class="q-pa-md q-mb-sm" style="width: 100%">
        <div class="q-gutter-md">
          <q-input
            filled
            v-model="price"
            mask="#.##"
            fill-mask="0"
            reverse-fill-mask
            input-class="text-right"
          />
        </div>
      </div>
      <span>Upload Image</span>
      <q-file class="q-pa-md q-mb-sm" filled v-model="image" label="Filled" />
      <div class="flex-row justify-end" v-if="item">
        <q-btn @click="editProduct(item)" color="primary">Change Product</q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { useStore } from 'src/store';
import { Product } from 'src/type/Product';
import { api } from 'src/boot/axios';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'DialogEditProfile',

  props: {
    item: Object as () => Product,
  },

  setup() {
    const store = useStore();
    const name = ref('');
    const desc = ref('');
    const price = ref(null);
    const image = ref(null);
    const dense = ref(false);

    const editProduct = async (item: Product | undefined) => {
      if (!item) return;
      const payload = {
        _id: item._id,
        name: name.value,
        desc: desc.value,
        price: price.value,
        image: image.value,
      };
      await store.dispatch('pagesModule/UpdateProduct', payload);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const result = await api.put(`products/${item?._id}`, payload);

    };

    return {
      editProduct,
      name,
      dense,
      desc,
      price,
      image,
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
