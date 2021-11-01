<template>
  <q-page class="seller-profile">
    <div class="flex-col items-center product">
      <div class="flex-container items-cemter">
        <q-btn
          @click="$router.go(-1)"
          no-caps
          dense
          flat
          style="margin-top: 20px"
        >
          <q-icon name="chevron_left" /> Black</q-btn
        >
        <div class="flex-col">
          <div class="flex-row">
            <CardProfile :item="profileDetail" />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import CardProfile from 'src/components/CardProfile.vue'
import { profileDetail } from 'src/pages/profile/constants'
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'Profile',

    components:{
        CardProfile
    },

    setup(){
        return{
            profileDetail
        }
    }
})


</script>

<style lang="scss" scoped>

</style>