import { mutationTree } from 'typed-vuex'
import state from './state'
import type { TableData } from '~/types/data'

export default mutationTree(state, {
  setItemList (state, newValue: TableData[]) {
    state.itemList = newValue
  },

  setSelectedItem (state, newValue: TableData) {
    state.selectedItem = newValue
  },

  initializeStore (state) {
    console.log('initialized')
    state.itemList = [] as TableData[]
    state.selectedItem = {} as TableData
  }
})
