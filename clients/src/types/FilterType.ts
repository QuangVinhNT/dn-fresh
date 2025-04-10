interface ValueType {
  valueName: string;
  value: string;
}

interface FilterType {
  query: string;
  name: string;
  values: ValueType[];
}

export default FilterType;
