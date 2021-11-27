<template>
  <div class="flex-row test" v-if="item">
    <div
      class="home-sewing"
      v-for="(item, index) in item"
      :key="index"
      :style="`width: ${widthPerItem}%`"
    >
      <div class="flex-col">
        <div @click="pushPage(item._id)" class="flex-col items-center">
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
        <div class="flex-row">
          <div class="posted-by">
            {{ item.name }}
          </div>
          <q-space/>
          <div v-if="showEdit">
              <q-btn dense flat no-caps color="primary" icon="drag_handle">
                <q-menu>
                  <q-list dense style="width:100%;min-width:200px">
                    <q-item clickable v-close-popup style="min-height:50px" >
                      <q-item-section @click="editProduct(item)">Edit Product</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable v-close-popup style="min-height:50px">
                      <q-item-section @click="deleteProduct(item)">Delete Product</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
        </div>
        <div class="content-detail">{{ item.desc }}</div>
        <div class="Location-box">
          <div>price: {{ item.price }} bath</div>
        </div>
        <div class="flex-col items-end posted-on" style="color: #149bfc">
          <q-btn
            @click="pushPage(item._id)"
            no-caps
            flat
            dense
            unelevated
            style="margin-bottom: 10px; color: #149bfc"
            >Read more...</q-btn
          >
          <!-- <div class="flex-row">
            <q-btn
              class="flex-col edit-btn"
              @click="editProduct(item)"
              v-if="showEdit"
            >
              edit
            </q-btn>
            <q-btn
              color="red"
              class="flex-col edit-btn"
              @click="deleteProduct(item)"
              v-if="showDelete"
            >
              delete
            </q-btn>
          </div> -->
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

    const pushPage = (item: string) => {
      void router.push({ name: 'Product', query: { item } });
    };

    const widthPerItem = computed(() => {
      const { width } = quasar.screen;
      const itemPerRow = width < 1000 ? `${width / 3}`.charAt(0) : '3';
      return 100 / parseInt(itemPerRow, 8) - 2;
    });
    return {
      widthPerItem,
      pushPage,
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
.test{
  padding-left: 50px;
}
.flex-row {
  flex-wrap: wrap;
}
.home-sewing {
  padding: 0 30px ;
  margin: 15px 0;
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
    font-size: 16px;
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
@media only screen and(min-width:1000px) {
  .edit-btn {
    height: 20px;
    font-size: 12px;
  }
}
@media only screen and(max-width:1000px) {
  .edit-btn {
    height: 20px;
    width: 50%;
    font-size: 1vw;
  }
}
@media only screen and(max-width:600px) {
  .test{
  padding-left: 0px;
  margin: 0px 20px;
}
}
</style>
