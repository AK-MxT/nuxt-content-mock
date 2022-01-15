import { actionTree } from 'typed-vuex'
import state from './state'
import type { TableData } from '~/types/data'

export default actionTree(
  { state },
  {
    register ({ commit, state }, field: TableData) {
      const list: TableData[] = []
      Object.assign(list, state.itemList)

      // idの最大値+1の値を取得して登録データに付与する
      const id = String(list.length + 1)
      field.id = id

      list.push(field)

      commit('setItemList', list)
      commit('setSnackbar', 'データを登録しました。')
    },

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
