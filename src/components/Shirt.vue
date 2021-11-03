<template>
  <div class="flex-row justify-center" v-if="item">
    <div
      class="home-sewing"
      v-for="(item, index) in item"
      :key="index"
      :style="`width: ${widthPerItem}%`"
    >
      <div class="flex-col">
        <div  @click="pushpage()" class="flex-col items-center">
          <img
            class="transition"
            :src="item.postedImg"
            alt=""
            style="width: 250px; height: 250px"
          />
        </div>
        <div class="flex-col items-end posted-on">
          Posted On : {{ item.postedOn }}
        </div>
        <div class="posted-by">{{ item.productName }}</div>
        <div class="content-detail">{{ item.detail }}</div>
        <div class="Location-box">
          <div>price: {{ item.price }} bath</div>
        </div>
        <div class="flex-col items-end posted-on" style="color: #149bfc">
          Read more...
        </div>
      </div>
    </div>
  </div>
  <div class="flex-col text-blue" style="margin-left: auto; margin-right: 50px">
    <span>See all</span>
  </div>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { ClothesDeatail } from 'src/type/Home';
import { useRouter } from 'vue-router'
import { defineComponent, computed} from 'vue';
export default defineComponent({
  name: 'HomeSewing',

  props: {
    item: Object as () => ClothesDeatail,
  },

  setup() {
    const router = useRouter()
    const quasar = useQuasar();
    const pushpage = () => {
      void router.push({ name: 'Product'})
    }

    const widthPerItem = computed(() => {
      const { width } = quasar.screen;
      const itemPerRow = width < 1000 ? `${width / 2}`.charAt(0) : '4';
      return 100 / parseInt(itemPerRow, 10) - 2;
    });
    return { widthPerItem,pushpage };
  },
});
</script>

<style lang="scss" scoped>
.flex-row{
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
