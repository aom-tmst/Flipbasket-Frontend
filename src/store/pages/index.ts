import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { PagesStateInterface } from './state'
import actions from './actions';
import mutations from './mutations';

const exampleModule: Module<PagesStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  mutations,
  state
};

export type { PagesStateInterface }
export default exampleModule;
