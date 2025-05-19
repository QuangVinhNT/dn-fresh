import { IoSearch } from "react-icons/io5";
import './SearchComponent.scss';
import { useRef, useState } from "react";

interface IProps {
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
}

const SearchComponent = (props: IProps) => {
  const { setKeyword, placeholder } = props;

  const [searchKey, setSearchKey] = useState('');

  const searchRef = useRef<HTMLInputElement | null>(null);

  const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setKeyword(searchKey)
      searchRef.current?.blur();
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
