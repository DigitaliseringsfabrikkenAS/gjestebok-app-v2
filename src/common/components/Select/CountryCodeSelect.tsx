import { ReactNode } from 'react';
import { Control } from 'react-hook-form';
import { t } from 'i18next';

// Components
import { CountryCodeLabel, Select } from './';

// Country Code
import codes from 'country-calling-code';

// Flags
import '../../../../node_modules/flag-icons/css/flag-icons.min.css';

// Interfaces
interface OptionProps {
  label: ReactNode;
  selectedLabel: ReactNode;
  value: string;
}

interface CountryCodeProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  required?: boolean;
  defaultValue: string | undefined | null;
  getDefaultValue?: (valueOfCountryCode: string) => void;
}

export const CountryCodeSelect = ({
  name,
  control,
  required = false,
  defaultValue,
  ...props
}: CountryCodeProps) => {
  const countryCodeOptions = codes.map((item): OptionProps => {
    return {
      label: (
        <CountryCodeLabel
          country={item.country}
          countryCodes={item.countryCodes}
          isoCode2={item.isoCode2}
        />
      ),
      selectedLabel: (
        <CountryCodeLabel
          country={item.country}
          countryCodes={item.countryCodes}
          isoCode2={item.isoCode2}
          showCountry={false}
        />
      ),
      value: `+${item.countryCodes}`,
    };
  });
  const defaultOption: OptionProps | undefined = countryCodeOptions.find(
    (option) => {
      return option.value === defaultValue;
    }
  );

  return (
    <Select
      hideDropdownIcon={true}
      size={'sm'}
      control={control}
      required={required}
      options={countryCodeOptions}
      name={name}
      placeholder={defaultOption?.selectedLabel}
      label={t('components.countryCode.label')}
      isSearchable={true}
      defaultValue={defaultOption}
      {...props}
    />
  );
};
