type SelectBox = {
  value: string;
  content: string;
  isSelected: boolean;
}

type OrderBy = {
  columnName: string;
  direction: 'ASC' | 'DESC';
}

export type {
  SelectBox, OrderBy
}
