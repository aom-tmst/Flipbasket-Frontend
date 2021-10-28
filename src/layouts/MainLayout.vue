<template>
  <q-layout view="lHh Lpr lFf">
    <MainLayoutHeader />
    <div class="absolute">
      <SearchButton/>
    </div>
    <q-page-container>
      <router-view @onConditionChanged="onConditionChanged" class="star-backgroud" />
    </q-page-container>
    <MainLayoutFooter :selectedCondition="selectedCondition" />
  </q-layout>
</template>

<script lang="ts">
import SearchButton from 'src/components/SearchButton.vue'
import MainLayoutHeader from 'src/layouts/MainLayoutHeader.vue';
import MainLayoutFooter from 'src/layouts/MainLayoutFooter.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainLayout',
  components: { MainLayoutHeader, MainLayoutFooter,SearchButton },
  setup() {
    // use for sync selected condition path with footer menu
    const selectedCondition = ref('');

    function onConditionChanged(condition: string) {
      selectedCondition.value = condition;
    }

    return {
      selectedCondition,
      onConditionChanged,
    };
  },
});
</script>

<style lang="scss" scoped>
  .q-layout{
    position: relative;
    .absolute{
      right: 0;
      z-index: 5;
      margin-top: 100px;
      position: absolute;
      position: fixed;
      margin-right: 15px;
    }
  }
</style>
