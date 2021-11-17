import { store } from 'quasar/wrappers'
import createPersistedState from "vuex-persistedstate";
import { InjectionKey } from 'vue'
import pagesModule, { PagesStateInterface } from './pages'
import {
  createStore,
  Store as VuexStore,
  useStore as vuexUseStore,
} from 'vuex'


export interface StateInterface {
  pagesModule: PagesStateInterface
}


declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: VuexStore<StateInterface>
  }
}

// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<StateInterface>> = Symbol('vuex-key')

export default store(function (/* { ssrContext } */) {
  const Store = createStore<StateInterface>({
    modules: {
      pagesModule
    },
    plugins: [createPersistedState()],

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: !!process.env.DEBUGGING
  })

  return Store;
})

export function useStore() {
  return vuexUseStore(storeKey)
}