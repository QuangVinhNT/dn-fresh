interface ValueType {
  valueName: string;
  value: string;
}

interface FilterType {
  query: string;
  name: string;
  values: ValueType[];
}

interface Filter {
  name: string;
  label: string;
  value: string;
}

export type {
  FilterType, Filter
};
