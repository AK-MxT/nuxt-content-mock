import { actionTree } from 'typed-vuex'
import state from './state'
import type { TableData } from '~/types/data'

export default actionTree(
  { state },
  {
    update ({ commit, state }, field: TableData) {
      const list: TableData[] = []
      Object.assign(list, state.itemList)

      const idx = list.findIndex(item => item.id === field.id)

      if (idx >= 0) {
        list[idx] = field
        commit('setItemList', list)
        commit('setSnackbar', 'データを更新しました。')
      }
    }
  }
)
