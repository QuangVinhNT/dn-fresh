type SelectBox = {
  value: string;
  content: string;
  isSelected: boolean;
}

type OrderBy = {
  name: string;
  value: 'ASC' | 'DESC';
}

export type {
  SelectBox, OrderBy
}
