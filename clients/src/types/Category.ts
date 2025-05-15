type Category = {
  id: string;
  name: string;
}

type CategorySelectBox = Pick<Category, 'id' | 'name'>

export type {
  CategorySelectBox
}
