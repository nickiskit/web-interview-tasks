import { InputHTMLAttributes, JSX, memo } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement>;

export const SearchInput = memo(function SearchInput(
  props: Props
): JSX.Element {
  const { value, onChange } = props;

  return (
    <input
      type="search"
      name="search-input"
      id="search-input"
      placeholder="Search superheroes"
      className="mt-4 block w-full rounded-lg border border-solid border-gray-800 p-2"
      value={value}
      onChange={onChange}
    ></input>
  );
});
