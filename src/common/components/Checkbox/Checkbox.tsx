import React from 'react';

interface CheckboxProps {
  placeholder: string;
  shadow?: boolean;
  checked?: boolean;
  className?: string;
  name?: string;
  required?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: any;
  label?: string;
  disabled?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      placeholder,
      shadow = false,
      className = '',
      label,
      name,
      required = false,
      errors,
      disabled = false,
      ...props
    },
    ref
  ) => {
    return (
      <div className="text-[#003060] flex flex-0 w-fit">
        <div className="flex flex-row-reverse items-center gap-2">
          <label htmlFor={name} className="flex gap-1 cursor-pointer">
            <span className="max-w-sm">{label}</span>
            {required && <span className="text-[#E91010]">{' *'}</span>}
          </label>
          <div className="bg-transparent outline-none w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
            <input
              disabled={disabled}
              id={name}
              name={name}
              type="checkbox"
              ref={ref}
              placeholder={placeholder}
              aria-label={label}
              className="absolute cursor-pointer w-full h-full"
              {...props}
            />
          </div>
        </div>
        <label
          className={`text-red-700 mt-2 ml-2 absolute bottom-0 transform translate-y-full ${
            errors && errors.message ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {errors?.message}
        </label>
      </div>
    );
  }
);

export default Input;
