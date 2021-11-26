<template>
  <div class="flex-col flex-center text-white main-layout-footer">
    <div class="flex-container">
      <div class="space-bottom">
        <div class="flex-row footer-list">
          <div class="column" style="width: 350px">
            <div class="title">Flipbasket</div>
            <div class="content">
              {{aboutList.about}}
            </div>
          </div>
          <div class="column">
            <div class="title">Contact detail</div>
            <div v-for="(item, index) in footerList" :key="index">
              {{ item.title }} : {{ item.label }}
            </div>
          </div>
          <div class="column">
            <div class="title">Store address</div>
            <div style="margin-bottom:10px;" v-for="(item, index) in addressList" :key="index">
              {{ item.title }} : {{ item.label }}
            </div>
            <q-btn @click="contact()" align="center" class="btn-fixed-width" color="primary"><q-icon name="gps_fixed" style="margin-right:5px;"/>Find Location</q-btn>
          </div>
          <div class="column">
            <div class="title">Open on</div>
              <div v-for="(item, index) in openList" :key="index">
                <div class="flex-col">
                  {{ item.openOn }}
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="flex-col flex-center edit-bgcolor">
      <span>© Tailor</span>
      <span>copyright © 2021 all right reserved.</span>
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'MainLayoutFooter',
  props: {
    selectedCondition: {
      default: '',
      type: String,
    },
  },
  setup(props) {

    const contact = () =>{
      window.open('https://www.google.com/maps/dir/45.7034589,21.3021564/45.703536,21.302092/@45.7033946,21.3019842,43m/data=!3m1!1e3');
    }

    const route = useRoute();
    const selectedPath = ref('');
    const aboutList = {
      about:'simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and'
    }
    const footerList = [
      { title: 'Facebook', label: '어쩌면나', path: 'locations' },
      { title: 'Line', label: '@7th.31', path: 'blog' },
      { title: 'Mail', label: 'tmst.mtj@gmail.com', path: 'contactus' },
      { title: 'Tel', label: '081-691-2827', path: 'terms-and-conditions' },
    ];
    const addressList = [
      {
        title: 'Address',
        label: 'On the UFO forest',
        path: 'locations',
      },
    ];
    const openList = [
      {
        openOn: 'Mon : 9.00-20.00',
      },
      {
        openOn: 'Tue : 9.00-20.00',
      },
      {
        openOn: 'Wed : 9.00-20.00',
      },
      {
        openOn: 'Thu : 9.00-20.00',
      },
      {
        openOn: 'Fri : 9.00-20.00',
      },
      {
        openOn: 'Sat : 9.00-20.00',
      },
    ];

    onMounted(() => (selectedPath.value = route.path.substring(1)));
    watch(props, ({ selectedCondition }) => {
      if (selectedCondition) selectedPath.value = selectedCondition;
    });

    const isActived = (path: string) => {
      return selectedPath.value === path;
    };

    return { addressList, openList, footerList, isActived,aboutList,contact };
  },
});
</script>

<style lang="scss" scoped>
.main-layout-footer {
  width: 100%;
  padding-top: 20px;
  background-color: white;
  box-shadow: 1px -1px 19px 2px rgba(0,0,0,0.4);
-webkit-box-shadow: 1px -1px 19px 2px rgba(0,0,0,0.4);
-moz-box-shadow: 1px -1px 19px 2px rgba(0,0,0,0.4);
  .q-img {
    margin: 0 10px 0 10px;
  }
  .footer-list {
    justify-content: space-between;
    margin: 0 10px;
    flex-wrap: wrap;
  }
  .column {
    color: #7a7a7a;
    margin-top: 20px;
    width: 250px;
  }
  .title {
    color: #000000;
    margin-bottom: 10px;
    font-size: 30px;
    font-weight: bold;
  }
  .edit-bgcolor {
    padding: 10px;
    width: 100%;
    background-color: var(--bc-blue-2);
  }
}
@media only screen and(max-width: 1000px) {
  .main-layout-footer {
    .footer-list {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
