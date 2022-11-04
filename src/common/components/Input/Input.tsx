import React from 'react';
import { get as _get } from 'lodash';

interface InputProps {
  placeholder: string;
  round?: boolean;
  size?: 'lg' | 'sm';
  color?: 'white' | 'blue';
  shadow?: boolean;
  type?: string;
  wrapperClassName?: string;
  className?: string;
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: any;
  label?: string;
  required?: boolean;
  append?: React.ReactNode;
  disabled?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      placeholder,
      type = 'text',
      color = 'white',
      shadow = false,
      round = false,
      className = '',
      wrapperClassName = '',
      label,
      size = 'lg',
      name,
      errors,
      required = false,
      append,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const error = _get(errors, name || '', null);
    return (
      <div
        className={`relative ${
          size === 'lg' ? 'max-w-md' : 'w-fit'
        } text-[#003060] flex flex-col ${wrapperClassName}`}
      >
        {label && (
          <label className="text-[14px] leading-[16px] pt-1">
            {label}{' '}
            {required ? <span className="text-[#E91010]">{' *'}</span> : ''}
          </label>
        )}
        <div
          className={`relative flex justify-center items-center rounded-[4px] bg-[#FAFCFE] outline-none border-2 border-[#DDE4EE]  text-lg font-semibold text-[#1252A1] mt-1  !leading-7 ${className}`}
        >
          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            name={name}
            className={
              'flex-1 placeholder-[#97ACCB] text-[#1252A1] py-[14px] font-normal text-[16px] px-[16px] leading-5 rounded-[4px] bg-[#FAFCFE] disabled:opacity-50 focus:outline-none focus:shadow-none'
            }
            disabled={disabled}
            {...props}
          />
          {append ? (
            <div
              className={`pr-3 ${disabled && 'pointer-events-none opacity-50'}`}
            >
              {append}
            </div>
          ) : null}
        </div>

        <label
          className={`text-red-700 pt-1 mt-2 text-[14px] leading-[16px] absolute bottom-0 transform translate-y-full ${
            error && error.message ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {error?.message}
        </label>
      </div>
    );
  }
);

export default Input;
