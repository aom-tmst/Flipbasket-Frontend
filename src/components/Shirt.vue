<template>
  <div class="flex-row justify-center" v-if="item">
    <div
      class="home-sewing"
      v-for="(item, index) in item"
      :key="index"
      :style="`width: ${widthPerItem}%`"
    >
      <div class="flex-col">
        <div @click="pushpage()" class="flex-col items-center">
          <!-- <img
            class="transition"
            :src="'https://tailors-phuket.herokuapp.com'+item.image.url"
            alt=""
            style="width: 250px; height: 250px"
          /> -->
        </div>
        <div class="flex-col items-end posted-on">
          Posted On : {{ item.createdAt }}
        </div>
        <div class="posted-by">{{ item.name }}</div>
        <div class="content-detail">{{ item.desc }}</div>
        <div class="Location-box">
          <div>price: {{ item.price }} bath</div>
        </div>
        <div class="flex-col items-end posted-on" style="color: #149bfc">
          <div class="flex-row">Read more...</div>
          <div class="flex-row">
            <q-btn class="edit-btn" @click="editProduct(item)" v-if="showEdit">
              edit Product
            </q-btn>
            <q-btn
              color="red"
              class="edit-btn"
              @click="deleteProduct(item)"
              v-if="showDelete"
            >
              delete Product
            </q-btn>
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="editProductDialog">
      <DialogEditProduct :item="selectedItem" />
    </q-dialog>
    <q-dialog v-model="deleteProductDialog">
      <DialogDeleteProduct :item="selectedItem" />
    </q-dialog>
  </div>
  <div class="flex-col text-blue" style="margin-left: auto; margin-right: 50px">
    <span>See all</span>
  </div>
</template>

<script lang="ts">
import DialogDeleteProduct from 'src/components/dialog/DialogDeleteProduct.vue';
import DialogEditProduct from 'src/components/dialog/DialogEditProduct.vue';
import { Product } from 'src/type/Product';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { defineComponent, computed, ref } from 'vue';
export default defineComponent({
  name: 'HomeSewing',

  components: {
    DialogEditProduct,
    DialogDeleteProduct,
  },

  props: {
    item: Object as () => Product,
    showEdit: {
      type: Boolean,
      default: true,
    },
    showDelete: {
      type: Boolean,
      default: true,
    },
  },

  setup() {
    const router = useRouter();
    const quasar = useQuasar();
    const editProductDialog = ref(false);
    const deleteProductDialog = ref(false);
    const selectedItem = ref();

    const editProduct = (item: Product) => {
      selectedItem.value = item;
      editProductDialog.value = true;
    };

    const deleteProduct = (item: Product) => {
      selectedItem.value = item;
      deleteProductDialog.value = true;
    };

    const pushpage = () => {
      void router.push({ name: 'Product' });
    };

    const widthPerItem = computed(() => {
      const { width } = quasar.screen;
      const itemPerRow = width < 1000 ? `${width / 2}`.charAt(0) : '4';
      return 100 / parseInt(itemPerRow, 10) - 2;
    });
    return {
      widthPerItem,
      pushpage,
      editProductDialog,
      editProduct,
      selectedItem,
      deleteProduct,
      deleteProductDialog,
    };
  },
});
</script>

<style lang="scss" scoped>
.flex-row {
  flex-wrap: wrap;
}
.home-sewing {
  margin: 20px 50px 20px 50px;
  .Location-box {
    margin-left: 20px;
  }
  .posted-on {
    margin: 5px 0 10px 0;
  }
  .posted-by {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .content-detail {
    color: #585858;
    margin-bottom: 10px;
  }
  .Location-box {
    color: #585858;
  }
  .transition {
    cursor: pointer;
    transition: ease 0.3s;
  }
  .transition:hover {
    transform: scale(1.05);
  }
}
</style>
