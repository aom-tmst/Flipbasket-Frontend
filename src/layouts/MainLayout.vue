<template>
  <q-layout view="lHh Lpr lFf">
    <MainLayoutHeader />
    <q-page-container>
      <router-view @onConditionChanged="onConditionChanged" class="star-backgroud" />
    </q-page-container>
    <MainLayoutFooter :selectedCondition="selectedCondition" />
  </q-layout>
</template>

<script lang="ts">
import MainLayoutHeader from 'src/layouts/MainLayoutHeader.vue';
import MainLayoutFooter from 'src/layouts/MainLayoutFooter.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainLayout',
  components: { MainLayoutHeader, MainLayoutFooter },
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
