export function required (val: string): boolean | string {
  return !!val || '入力必須項目です'
}
