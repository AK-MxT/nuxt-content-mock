import { getAccessorType } from 'typed-vuex'

// Import all your submodules
// import * as submodule from '~/store/submodule'

// Keep your existing vanilla Vuex code for state, getters, mutations, actions, plugins, etc.
import state from './state'
import actions from './actions'
import mutations from './mutations'

// This compiles to nothing and only serves to return the correct type of the accessor
export const accessorType = getAccessorType({
  state,
  // getters,
  actions,
  mutations
  // modules: {
  // The key (submodule) needs to match the Nuxt namespace (e.g. ~/store/submodule.ts)
  //   submodule,
  // },
})
