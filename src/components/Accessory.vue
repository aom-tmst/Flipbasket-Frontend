<template>
  <div class="row-format flex-format flex-container" v-if="item">
    <div
      class="home-sewing"
      v-for="(item, index) in item"
      :key="index"
    >
      <div class="flex-col" style="width:300px">
        <!-- <div class="flex-col items-center">
          <img
            class="transition"
            :src="item.postedImg"
            alt=""
            style="width: 250px; height: 250px"
          />
        </div> -->
        <div class="flex-col items-end posted-on">
          Posted On : {{ item.createdAt }}
        </div>
        <div class="posted-by">{{ item.name }}</div>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { Product } from 'src/type/Product';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'HomeSewing',
  props: {
    item: Object as () => Product,
  },
  setup() {
    const router = useRouter();



    const pushPage = (item: string) => {
      void router.push({ name: 'Product', query: { item } });
    };

    return { pushPage };
  },
});
</script>

<style lang="scss" scoped>
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
.row-format {
  display: flex;
  flex-direction: row;
  overflow: auto;
  flex-wrap: nowrap;
}
.row-format::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}
.row-format::-webkit-scrollbar-track {
  background-color: #ffffff;
  border-radius: 100px;
  margin: 0 12px 0 12px;
}
.row-format::-webkit-scrollbar-thumb {
  border-radius: 100px;
  background-color: white;
  box-shadow: inset 2px 2px 5px 0 rgba(rgb(189, 189, 189), 0.5);
}
</style>
