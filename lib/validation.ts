export function required (val: string): boolean | string {
  return !!val || '入力必須項目です'
}

export function number (val: number): boolean | string {
  return !isNaN(val) || '数値を入力してください'
}
