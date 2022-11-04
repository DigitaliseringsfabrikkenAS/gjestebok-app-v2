import React, { ReactNode } from 'react';

// Components
import { ReactComponent as ArrowIcon } from 'assets/svg/arrow-down.svg';

interface SelectMockerProps {
  hideDropdownIcon?: boolean;
  placeholder: ReactNode | string;
  selectedOption: ReactNode | string;
  dropdownState: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
  label: string;
  toogleDropdown: () => void;
  required?: boolean;
}

const SelectMocker = ({
  label,
  placeholder,
  dropdownState,
  selectedOption,
  hideDropdownIcon,
  error,
  toogleDropdown,
  required,
}: SelectMockerProps) => {
  return (
    <>
      <div className="w-full ">
        <label className="text-sm text-slate-700 ">
          {label}
          {required ? <span className="text-red-700"> *</span> : ''}
        </label>
        <div
          onClick={toogleDropdown}
          className={`flex items-center justify-between rounded disabled:opacity-50 disabled:text-red-300 text-base font-normal bg-[#FAFCFE] outline-none border-2 appearance-none border-[#DDE4EE]  py-3  w-full pl-3 h-[52px] ${
            selectedOption === placeholder ? 'text-[#97ACCB]' : 'text-[#1252A1]'
          }`}
        >
          <span>{selectedOption ? selectedOption : placeholder}</span>
          <div className="h-full" onClick={toogleDropdown}>
            {!hideDropdownIcon && (
              <ArrowIcon
                className={`mt-1 mr-2 align-middle ${
                  dropdownState
                    ? 'transition-all duration-300 rotate-180'
                    : 'transition-all duration-300 rotate-0'
                }`}
              />
            )}
          </div>
        </div>
      </div>
      <label
        className={`text-red-700 mt-2 ml-2 absolute bottom-0 transform translate-y-full ${
          error && error.message ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {error?.message}
      </label>
    </>
  );
};

export default SelectMocker;
