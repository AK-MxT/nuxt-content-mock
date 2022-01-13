import type { Authentication, TableData } from '~/types/data'

const state = () => ({
  authInfo: {} as Authentication,
  itemList: [] as TableData[],
  selectedItem: {} as TableData,
  snackbar: false,
  snackbarText: ''
})

export default state

export type State = ReturnType<typeof state>
