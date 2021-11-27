<template>
  <q-card
    class="dialog-edit-profile"
    style="max-width: 500px; width: 100%"
    v-if="item"
  >
    <q-card-section class="row items-center q-pb-none">
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-card-section>
      <span>Change your name</span>
      <q-input
        class="q-pa-md q-mb-sm"
        :placeholder="item.name"
        v-model="name"
        :dense="dense"
      />
      <div class="flex-row justify-end">
        <q-btn @click="editProfile(item)" color="primary" v-close-popup
          >Save Change</q-btn
        >
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { useStore } from 'src/store';
import { api } from 'src/boot/axios';
import { Store } from 'src/store/pages/state';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'DialogAddProduct',

  props: {
    item: Object as () => Store,
  },

  setup() {
    const $q = useQuasar();
    const store = useStore();
    const name = ref('');
    const dense = ref(null);

    const editProfile = async (item: Store | undefined) => {
      if (!item) return;
      if(name.value == ''){
          name.value = item.name
      }
      const payload = {
        _id: item._id,
        name: name.value,
      };

      try {
        $q.loading.show();
        const result = await api.put(`stores/${item?._id}`, payload);
        console.log(result);

        await store.dispatch('pagesModule/UpdateProfileName');

        $q.notify({
          type: 'positive',
          message: ' Changed name successed',
          color: 'secondary',
          timeout: 1000,
        });
      } catch (error) {
        console.log(error);
        $q.notify({
          type: 'negative',
          message: 'Bad form please enter your product again.',
          timeout: 1000,
        });
      } finally {
        $q.loading.hide();
      }
    };

    return {
      editProfile,
      name,
      dense,
    };
  },
});
</script>

<style lang="scss" scoped>
.dialog-edit-profile {
  padding: 10px;
  span {
    font-size: 16px;
    font-weight: bold;
    margin: 10px;
  }
}
</style>
