export interface Account {
  id: string,
  password: string,
  userName: string
}

export interface Authentication {
  isLogin: boolean,
  userName: string
}

export interface TableData {
  id: string,
  title: string,
  author: string,
  supervision: string,
  publisher: string,
  price: string,
  genre: string,
  description: string,
  releaseDate: string,
  purchaseDate: string,
  remarks: string,
  createDate: string,
  updateDate: string
}
