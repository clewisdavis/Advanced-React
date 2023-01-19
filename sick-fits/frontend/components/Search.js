import { useCombobox } from 'downshift';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

export default function Search() {
  const { getMenuProps, getInputProps, getComboboxProps } = useCombobox({
    items: [],
    // fires when select the box
    onInputValueChange() {
      console.log('Input Change');
    },
    // fire when select an item
    onSelectedItemChange() {
      console.log('Selected Item Change');
    },
  });
  return (
    <SearchStyles>
      <div>
        <input type="search" />
      </div>
      <DropDown>
        <DropDownItem>Hey</DropDownItem>
        <DropDownItem>Hey</DropDownItem>
        <DropDownItem>Hey</DropDownItem>
        <DropDownItem>Hey</DropDownItem>
      </DropDown>
    </SearchStyles>
  );
}
