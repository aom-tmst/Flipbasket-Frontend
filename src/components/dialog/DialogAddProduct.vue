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
      <span>Product Name</span>
      <q-input class="q-pa-md q-mb-sm" v-model="name" :dense="dense" />
      <span>Detail</span>
      <div class="q-pa-md q-mb-sm" style="width: 100%">
        <q-input v-model="desc" filled type="textarea" />
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
      <div class="flex-row justify-end">
        <q-btn @click="addProduct" color="primary">Add Product</q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Store } from 'src/store/pages/state';
import { api } from 'src/boot/axios';
import { defineComponent, ref } from 'vue';

interface AddProductPayload {
  name: string;
  desc: string;
  price: number | null;
}

interface Product {
  _id: string;
}

export default defineComponent({
  name: 'DialogEditProfile',

  props: {
    item: Object as () => Store,
  },

  setup(props) {
    const name = ref('');
    const desc = ref('');
    const price = ref(null);
    const image = ref(null);
    const dense = ref(false);

    const addProduct = async () => {
      const payload: AddProductPayload = {
        name: name.value,
        desc: desc.value,
        price: price.value,
      };

      const product = await api
        .post<Product>('products', payload)
        .then((response) => response.data);

      const productIds = props.item?.products.map((product) => product._id) || []

      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const result1 = api.put(`stores/${props.item?._id}`, {  
        products: [product._id,...productIds],
      });
      console.log(result1);
    };

    return {
      addProduct,
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
