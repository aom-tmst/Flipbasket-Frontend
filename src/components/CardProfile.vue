<template>
  <div class="flex-row card-profile items-center" v-if="item || store">
    <div class="flex-col">
      <div>
        <img
          class="edit-profile-img"
          src="images/profileImg.jpg"
        />
      </div>
    </div>
    <div class="edit-space-profile flex-col">
      <div class="flex-row q-ml-sm posted-by">
        <div>{{ store?.name }}</div>
      </div>
      <div class="flex-row">
        <q-btn class="edit-btn" @click="addProduct = true">
          Add Product
        </q-btn>
        <q-dialog v-model="addProduct">
          <DialogAddProduct :item="store" />
        </q-dialog>

        <q-btn class="edit-btn" @click="editProfile = true">
          Edit Profile
        </q-btn>
        <q-dialog v-model="editProfile">
          <DialogEditProfile :item="store" />
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
import { Store } from 'src/store/pages/state'
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
    store: Object as () => Store,
  },

  setup(){
    const addProduct = ref(false);
    const editProfile = ref(false);
    const addGallery = ref(false)
    return {
      addProduct,
      editProfile,
      addGallery,
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
    display: flex;
    flex-wrap: wrapper;
  }
  img{
    width: 100px;
  }
  .posted-by {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .edit-space-profile {
    margin: 10px;
    .q-btn{
      max-width: 200px;
      width: 100%;
    }
  }
  .edit-btn {
    border-radius: 8px;
    border: 10px;
  }
  .edit-profile-img {
    border-radius: 10px;
  }
}
@media only screen and(max-width:1000px){
  .card-profile {
    .edit-space-profile {
    margin: 10px;
    .q-btn{
      font-size: 2vw;
      width: 100%;
    }
  }
  img{
    width: 20vw;
  }
  }
}
@media only screen and(max-width:370px){
  .card-profile {
    .edit-space-profile {
    margin: 10px;
    .q-btn{
      font-size: 2vw;
      width: 20%;
    }
  }
  }
}
</style>
