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
          <Shirt :item="homePageA.products"/>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import CardProfile from 'src/components/CardProfile.vue'
import Shirt from 'src/components/Shirt.vue';
import { profileDetail } from 'src/pages/profile/constants'
import { useStore } from 'src/store'
import { defineComponent,computed } from 'vue'
export default defineComponent({
    name: 'Profile',

    components:{
        Shirt,
        CardProfile
    },

  preFetch({ store }) {
    const fetchHomePage = store.dispatch('pagesModule/fetchHomePage')
    return Promise.all([fetchHomePage])
  },

    setup(){

    
const store = useStore()
    const homePageA = computed(()=>{
      const homePage = store.state.pagesModule.homePage
      // console.log(homePage);
      
      return homePage?.[0]
        
      
    })
        return{
          homePageA,
            profileDetail
        }
    }
})


</script>

<style lang="scss" scoped>

</style>