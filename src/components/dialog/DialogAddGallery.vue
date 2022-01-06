<template>
  <q-card class="dialog-add-gallery" style="max-width: 500px; width: 100%">
    <q-card-section class="row items-center q-pb-none">
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section>
      <span>Upload Image</span>
      <q-file class="q-pa-md q-mb-sm" filled v-model="image" label="Filled" />
      <div class="flex-row justify-end">
        <q-btn color="primary" @click="putImage()">Add Product</q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { useStore } from 'src/store';
import { Store } from 'src/store/pages/state';
import { UploadImage } from 'src/boot/firebase';
import { api } from 'src/boot/axios';
import { defineComponent, ref } from 'vue';

interface Product {
  _id: string;
}

export default defineComponent({
  name: 'DialogAddProduct',

  props: {
    item: Object as () => Store,
  },

  setup(props) {
    const $q = useQuasar();
    const image = ref<File>();
    const store = useStore();

    const putImage = async () => {
      try {
        $q.loading.show();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const imagUrl = await UploadImage(image.value!);
        console.log(imagUrl);

        const payload = {
          store_Image: imagUrl,
        };

        console.log(payload, 'image path');

        console.log(props.item?._id, 'store id');

        const result = await api
          .post<Product>('galleries', payload)
          .then((response) => response.data);
        console.log(result);

        await store.dispatch('pagesModule/fetchHomePage');

        const galleryIgs = props.item?.galleries.map((e) => e._id) || [];

        console.log(galleryIgs, 'this');

        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        const putStore = await api.put(`stores/${props.item?._id}`, {
          galleries: [result._id, ...galleryIgs],
        });
        console.log(putStore);

        await store.dispatch('pagesModule/fetchHomePage');

        $q.notify({
          type: 'positive',
          message: ' Add image successed',
          color: 'secondary',
          timeout: 1000,
        });
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: 'Error , please check your internet and try again.',
          timeout: 1000,
        });
      } finally {
        $q.loading.hide();
      }
    };

    return {
      image,
      putImage,
    };
  },
});
</script>

<style lang="scss" scoped>
.dialog-add-gallery {
  padding: 10px;
  span {
    font-size: 16px;
    font-weight: bold;
    margin: 10px;
  }
}
</style>
