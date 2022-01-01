import type { TableData } from '~/types/data'

const state = () => ({
  itemList: [] as TableData[],
  selectedItem: {} as TableData,
  snackbar: false,
  snackbarText: ''
})

export default state

export type State = ReturnType<typeof state>
