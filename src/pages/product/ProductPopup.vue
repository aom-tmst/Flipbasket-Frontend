<template>
  <q-list style="min-width: 200px" v-if="item">
    <q-item clickable v-close-popup>
      <q-item-section @click="AddCart()">
        <div class="flex-row items-center">
          <q-icon name="shopping_cart" class="q-mr-sm" />
          {{thisCartId}}
          <span>Add to cart</span>
        </div>
      </q-item-section>
    </q-item>
    <q-item v-close-popup>
      <q-item-section>Other function +</q-item-section>
    </q-item>
    <q-separator />
    <q-item v-close-popup>
      <q-item-section>
        <div class="flex-row items-center">
          <q-icon name="info" class="q-mr-sm" />
          <span>Report</span>
        </div>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <div class="flex-row items-center">
          <q-input outlined v-model="reportDetail" label="Report title" />
        </div>
        <q-btn @click="SentReport()" color="primary" style="margin-top: 20px"
          >Sent report</q-btn
        >
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { api } from 'src/boot/axios';
import { FixProduct } from 'src/type/FixProduct';
import { Store } from 'src/store/pages/state';
import { defineComponent, ref } from 'vue';

interface Product {
  _id : string
}

interface CartDetail {
  _id: string,
  products : Product[]
}

export default defineComponent({
  name: 'ProductPopup',

  props: {
    item: Object as () => FixProduct,
    thisUser: Object as () => Store,
    thisCartId: Object as () => CartDetail,
  },

  setup(props) {
    const reportDetail = ref('');

    const payload = {
      report_title: reportDetail.value,
      name: props.item?.name,
      desc: props.item?.desc,
      price: props.item?.price,
      type: props.item?.type,
      product_id: props.item?._id,
      store_name: props.item?.store.name,
      sentBy: props.thisUser?.name,
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const productIds = props.thisCartId?.products.map((data)=> data._id)

    const AddCart = async () => {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      await api.put<FixProduct>(`carts/${props.thisCartId?._id}`, { products: [props.item?._id, ...[productIds]] })
    };

    const SentReport = async () => {
      await api.post<FixProduct>('feedbacks', payload);
    };

    return { reportDetail, SentReport, AddCart };
  },
});
</script>

<style></style>
