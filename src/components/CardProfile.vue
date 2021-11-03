<template>
  <div class="flex-row card-profile wrapper" v-if="item">
    <div class="flex-col">
      <div>
        <img
          class="edit-profile-img"
          src="images/profileImg.jpg"
          style="width: 100px"
        />
      </div>
    </div>
    <div class="edit-space-profile flex-col">
      <div class="flex-row q-ml-sm posted-by">
        <div>{{ item.profileName }}</div>
      </div>
      <div class="flex-row">
        <q-btn class="edit-btn" @click="addProduct = true">
          Add Product
        </q-btn>
        <q-dialog v-model="addProduct">
          <DialogAddProduct />
        </q-dialog>

        <q-btn class="edit-btn" @click="editProfile = true">
          Edit Profile
        </q-btn>
        <q-dialog v-model="editProfile">
          <DialogEditProfile />
        </q-dialog>

        <q-btn class="edit-btn" @click="addGallery = true">
          Add Gallery
        </q-btn>
        <q-dialog v-model="addGallery">
          <DialogAddGallery />
        </q-dialog>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import DialogAddGallery from 'src/components/dialog/DialogAddGallery.vue';
import DialogEditProfile from 'src/components/dialog/DialogEditProfile.vue';
import DialogAddProduct from 'src/components/dialog/DialogAddProduct.vue';
import { ProfileDetail } from 'src/type/profile';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'CardProfile',

  components: {
    DialogAddProduct,
    DialogEditProfile,
    DialogAddGallery,
  },

  props: {
    item: Object as () => ProfileDetail,
  },

  setup(){
    const addProduct = ref(false);
    const editProfile = ref(false);
    const addGallery = ref(false)
    return {
      addProduct,
      editProfile,
      addGallery
    };
  },
});
</script>

<style lang="scss" scoped>
.q-btn {
  margin: 5px;
}
.card-profile {
  margin: 20px;
  .wrapper {
    flex-wrap: wrapper;
  }
  .posted-by {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .edit-space-profile {
    margin: 10px;
  }
  .edit-btn {
    border-radius: 8px;
    border: 10px;
  }
  .edit-profile-img {
    border-radius: 10px;
  }
}
</style>
