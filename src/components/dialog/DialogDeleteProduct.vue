<template>
  <q-card class="dialog-add-product" style="max-width: 500px; width: 100%" v-if="item">
    <q-card-section class="row items-center q-pb-none">
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-card-section>
      <span>Are you sure to Delete : {{item.name}}</span>
      <div class="flex-row justify-end">
        <q-btn @click="addProduct(item)" color="primary">delete product</q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Product } from 'src/type/Product'
import { api } from 'src/boot/axios';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'DialogEditProfile',

  props:{
    item : Object as () => Product
  },

  setup() {
    const addProduct = (item:Product) => {
      const result =  api.delete(`products/${item._id}` );
      console.log(result);
      
    };

    return {
      addProduct,
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
