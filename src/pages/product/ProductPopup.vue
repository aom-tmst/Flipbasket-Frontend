<template>
  <q-list style="min-width: 200px">
    <q-item clickable v-close-popup>
      <q-item-section>
        <div class="flex-row items-center">
          <q-icon name="shopping_cart" class="q-mr-sm" />
          <span>Add to cart</span>
        </div>
      </q-item-section>
    </q-item>
    <q-item v-close-popup>
      <q-item-section>Other function +</q-item-section>
    </q-item>
    <q-separator />
    <q-item clickable v-close-popup>
      <q-item-section>
          <div class="flex-row items-center">
          <q-icon name="info" class="q-mr-sm" />
          <span>Report</span>
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'ProductPopup',
});
</script>

<style></style>
