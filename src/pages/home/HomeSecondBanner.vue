<template>
  <div class="HomeSecondBanner row justify-between" id="about">
    <q-parallax src="https://cdn.quasar.dev/img/parallax2.jpg">
     <q-intersection once transition="scale">
      <h1 class="text-white">
        <div class="flex-col content text-center">
          <div class="flex-row text">About fabric work. Trust us.</div>
          <div class="flex-row head-title">LOREN IPSUM</div>
          <div class="flex-row text">
            With over 40 years of experience as a skilled weaver
          </div>
        </div>
      </h1>
     </q-intersection>
    </q-parallax>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'HomeSecondBanner',
});
</script>

<style lang="scss" scoped>
.HomeSecondBanner{
  .text{
    font-size:18px;
  }
  .head-title {
    font-size: 5vw;
    font-weight: bold;
  }
}
</style>
