import { ReactNode, ReactElement, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import ReactSelect, { components } from 'react-select';

// Partials
import Dropdown from './_Dropdown';
import SelectMocker from './_SelectMocker';

// Styles
import { selectComponentStyle, nonSearchableStyle } from './select.styles';

// Components
import { ReactComponent as SearchIcon } from 'assets/svg/search-icon.svg';
import { ReactComponent as ArrowIcon } from 'assets/svg/arrow-down.svg';

export interface SelectOptions {
  label: string | ReactNode | number;
  value: string;
  disabled?: boolean;
  selectedLabel?: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SearchIndicator = (props: any): ReactElement => {
  return (
    <components.DropdownIndicator {...props}>
      <SearchIcon />
    </components.DropdownIndicator>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DropdownIndicator = (props: any): ReactElement => {
  return (
    <components.DropdownIndicator {...props}>
      <ArrowIcon className="mr-1" />
    </components.DropdownIndicator>
  );
};

const DisplayLabel = ({
  isSearchable,
  required = false,
  label,
}: {
  isSearchable: boolean;
  required?: boolean;
  label: string;
}) => {
  if (isSearchable) return null;

  return (
    <label className="text-sm text-slate-700 ">
      {label}
      {required ? <span className="text-red-700"> *</span> : ''}
    </label>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DisplayError = ({ error }: { error: any }) => (
  <label
    className={`text-red-700 mt-2 ml-2 absolute bottom-0 transform translate-y-full ${
      error && error.message ? 'opacity-100' : 'opacity-0'
    }`}
  >
    {error?.message}
  </label>
);
interface SelectProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, object>;
  options: SelectOptions[];
  name: string;
  hideDropdownIcon?: boolean;
  placeholder: ReactNode | string;
  disabled?: boolean;
  size?: 'sm' | 'lg';
  label: string;
  required?: boolean;
  menuPortalTarget?: HTMLBodyElement | HTMLDivElement | HTMLSpanElement | null;
  isSearchable?: boolean;
  defaultValue?: SelectOptions;
}
export const Select = ({
  isSearchable = false,
  control,
  options,
  name,
  label,
  placeholder,
  hideDropdownIcon = false,
  size = 'lg',
  required,
  menuPortalTarget = null,
  defaultValue,
}: SelectProps) => {
  // State
  const [dropdownState, setDropdownState] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<
    ReactNode | string | null
  >(placeholder);

  const handleOnSelectChange = ({
    value,
    controllerOnChange,
  }: {
    value: string | null;
    controllerOnChange: (value: string) => void;
  }) => {
    setDropdownState(false);
    const option = options.find((item) => item.value === value);
    setSelectedOption(option?.selectedLabel || option?.label);
    controllerOnChange(value || '');
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Dropdown
          dropdownState={dropdownState}
          onClose={() => {
            setDropdownState(false);
          }}
          seachable={isSearchable}
          className={`${size === 'lg' ? 'max-w-md' : 'w-[96px]'}`}
          target={
            <SelectMocker
              dropdownState={dropdownState}
              error={error}
              toogleDropdown={() => setDropdownState(!dropdownState)}
              label={label}
              placeholder={placeholder}
              required={required}
              selectedOption={selectedOption}
              hideDropdownIcon={hideDropdownIcon}
            />
          }
        >
          <>
            <DisplayLabel
              isSearchable={isSearchable}
              required={required}
              label={label}
            />
            <ReactSelect
              className={`${size === 'lg' ? '!w-full' : '!w-[250px]'}`}
              value={options.filter((option) => value?.includes(option.value))}
              placeholder={isSearchable ? 'Search...' : placeholder}
              options={options}
              defaultMenuIsOpen={isSearchable}
              menuPortalTarget={menuPortalTarget}
              styles={
                isSearchable
                  ? selectComponentStyle
                  : {
                      ...selectComponentStyle,
                      ...nonSearchableStyle,
                    }
              }
              components={{
                DropdownIndicator: (props): ReactElement => {
                  if (isSearchable) {
                    return <SearchIndicator {...props} />;
                  }

                  return <DropdownIndicator {...props} />;
                },
                IndicatorSeparator: () => null,
              }}
              onChange={(e) =>
                handleOnSelectChange({
                  value: e?.value || null,
                  controllerOnChange: onChange,
                })
              }
              defaultValue={defaultValue}
            />
            <DisplayError error={error} />
          </>
        </Dropdown>
      )}
    />
  );
};

export default Select;
