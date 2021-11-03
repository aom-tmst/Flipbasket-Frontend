<template>
    <q-card class="dialog-add-gallery" style="max-width:500px;width:100%">
      <q-card-section class="row items-center q-pb-none">
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <span>Upload Image</span>
      <q-file class="q-pa-md q-mb-sm" filled v-model="image" label="Filled" />
      <div class="flex-row justify-end">
        <q-btn color="primary" >Add Product</q-btn>
      </div>
      </q-card-section>
    </q-card>
  
</template>

<script lang="ts">
import { defineComponent,ref} from 'vue';
export default defineComponent({
  name: 'DialogAddProduct',

  setup(){
    const image = ref(null);
    return{
      image
    }
  }
});
</script>

<style lang="scss" scoped>
.dialog-add-gallery{
  padding: 10px;
  span{
    font-size: 16px;
    font-weight: bold;
    margin: 10px;
  }
}</style>
