import type { TableData } from '~/types/data'

const state = () => ({
  itemList: [] as TableData[],
  selectedItem: {} as TableData
})

export default state

export type State = ReturnType<typeof state>
