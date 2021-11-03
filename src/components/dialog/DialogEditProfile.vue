<template>
    <q-card class="dialog-edit-profile" style="max-width:500px;width:100%">
      <q-card-section class="row items-center q-pb-none">
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <span>Change your name</span>
      <q-input class="q-pa-md q-mb-sm" v-model="name" :dense="dense" />
      <div class="flex-row justify-end">
        <q-btn color="primary" >Save Change</q-btn>
      </div>
      </q-card-section>
    </q-card>
  
</template>

<script lang="ts">
import { defineComponent,ref} from 'vue';
export default defineComponent({
  name: 'DialogAddProduct',

  setup(){
      const name = ref('');
      const dense = ref(null);
      return{
          name,
          dense
      }
  }
});
</script>

<style lang="scss" scoped>
.dialog-edit-profile{
  padding: 10px;
  span{
    font-size: 16px;
    font-weight: bold;
    margin: 10px;
  }
}

</style>
