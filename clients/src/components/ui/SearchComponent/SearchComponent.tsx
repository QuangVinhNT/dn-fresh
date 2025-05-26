import { IoSearch } from "react-icons/io5";
import './SearchComponent.scss';
import { useRef, useState } from "react";

interface IProps {
  keywordRef: React.MutableRefObject<string>;
  placeholder?: string;
  onSearch: () => void;
}

const SearchComponent = (props: IProps) => {
  const { placeholder, onSearch, keywordRef } = props;

  const [searchKey, setSearchKey] = useState('');

  const searchRef = useRef<HTMLInputElement | null>(null);

  const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      keywordRef.current = searchKey;
      searchRef.current?.blur();
      onSearch();
    }
  };

  return (
    <div className="search-component">
      <IoSearch />
      <input
        ref={searchRef}
        type="text"
        placeholder={placeholder ?? ''}
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
        onKeyDown={onEnterPress}
      />
    </div>
  );
};

export default SearchComponent;
