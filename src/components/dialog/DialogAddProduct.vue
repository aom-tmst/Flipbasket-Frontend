<template>
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Close icon</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        this is Add product
      </q-card-section>
    </q-card>
  
</template>

<script lang="ts">
import { defineComponent} from 'vue';
export default defineComponent({
  name: 'DialogAddProduct',


});
</script>

<style lang="scss" scoped></style>
