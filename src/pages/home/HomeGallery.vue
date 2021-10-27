<template>
  <div class="home-gallery" v-if="item">
    <div class="flex-col items-center">
      <div class="flex-row wrapper justify-center">
        <div class="edit-margin" v-for="(item, index) in item" :key="index">
          <img :src="item.img" alt="" style="width: 330px;height:330px" />
        </div>
      </div>
      <div class="flex-row text-blue">
        <span>Load more</span>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { GalleryImg } from 'src/type/Home';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'HomeGallery',

  props: {
    item: Object as () => GalleryImg,
  },
});
</script>

<style lang="scss" scoped>
.home-gallery {
  margin: 10px;
  .wrapper {
    display: flex;
    flex-wrap: wrap;
  }
  .edit-margin{
      margin:20px;
  }
}
</style>
