interface CountryCodeLabelProps {
  countryCodes: string[];
  country: string;
  isoCode2: string;
  showCountry?: boolean;
}

export const CountryCodeLabel = ({
  country,
  countryCodes,
  isoCode2,
  showCountry = true,
}: CountryCodeLabelProps) => (
  <div className="flex gap-2">
    <span className={`fi fi-${isoCode2.toLocaleLowerCase()}`} />
    {showCountry && <span>{country}</span>}
    <span>{`(+${countryCodes})`}</span>
  </div>
);
