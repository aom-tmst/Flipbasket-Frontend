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
      <q-input
        class="q-pa-md q-mb-sm"
        :rules="[(val) => !!val]"
        v-model="name"
        :dense="dense"
      />
      <span>Detail</span>
      <div class="q-pa-md q-mb-sm" style="width: 100%">
        <q-input
          v-model="desc"
          :rules="[(val) => !!val]"
          filled
          type="textarea"
        />
      </div>
      <span>price</span>
      <div class="q-pa-md q-mb-sm" style="width: 100%">
        <div class="q-gutter-md">
          <q-input
            :rules="[(val) => !!val]"
            filled
            v-model="price"
            mask="#.##"
            fill-mask="0"
            reverse-fill-mask
            input-class="text-right"
          />
        </div>
      </div>
      <div class="q-pa-md flex-row justify-center">
        <q-btn-toggle
          v-model="type"
          toggle-color="primary"
          :options="[
            { label: 'Shirt', value: 'shirt' },
            { label: 'Pants', value: 'pants' },
            { label: 'Accessory', value: 'accessory' },
          ]"
        />
      </div>
      <span>Upload Image</span>
      <q-file class="q-pa-md q-mb-sm" filled v-model="image" label="Filled" />
      <div class="flex-row justify-end">
        <q-btn @click="addProduct" color="primary" v-close-popup
          >Add Product</q-btn
        >
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { useStore } from 'src/store';
import { useQuasar } from 'quasar';
import { UploadImage } from 'src/boot/firebase';
import { Store } from 'src/store/pages/state';
import { api } from 'src/boot/axios';
import { defineComponent, ref } from 'vue';

interface AddProductPayload {
  name: string;
  desc: string;
  type: string | null;
  price: number | null;
  uid: string | undefined;
  image_Url: string;
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
    const $q = useQuasar();
    const store = useStore();
    const type = ref(null);
    const name = ref('');
    const desc = ref('');
    const price = ref(null);
    const image = ref<File>();
    const dense = ref(false);

    const addProduct = async () => {
      try {
        $q.loading.show();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const imagUrl = await UploadImage(image.value!);
        console.log(imagUrl);

        const payload: AddProductPayload = {
          name: name.value,
          desc: desc.value,
          price: price.value,
          type: type.value,
          uid: props.item?._id,
          image_Url: imagUrl,
        };

        console.log(payload);

        const product = await api
          .post<Product>('products', payload)
          .then((response) => response.data);

        console.log(product, 'find type');

        const productIds =
          props.item?.products.map((product) => product._id) || [];
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        const result1 = await api.put(`stores/${props.item?._id}`, {
          products: [product._id, ...productIds],
        });
        console.log(result1);

        // props.item?.products.map((product) => product._id) || [];

        $q.notify({
          type: 'positive',
          message: 'Add Product Successed',
          color: 'secondary',
          timeout: 1000,
        });
      } catch (error) {
        console.log(error);
        $q.notify({
          type: 'negative',
          message: 'Bad form please enter your product again.',
          timeout: 1000,
        });
      } finally {
        $q.loading.hide();
      }

      await store.dispatch('pagesModule/AddProduct');
    };

    return {
      addProduct,
      name,
      dense,
      desc,
      price,
      image,
      type,
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
