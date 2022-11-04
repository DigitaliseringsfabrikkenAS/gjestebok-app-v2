export const selectComponentStyle: {
  [key: string]: (
    base: { [key: string]: string },
    state?: { [key: string]: boolean }
  ) => void;
} = {
  placeholder: (base) => ({
    ...base,
    fontSize: '1em',
    color: '#97ACCB',
    fontWeight: 400,
  }),

  dropdownIndicator: (base, state) => ({
    ...base,
    fontSize: '16px',
    paddingRight: '0',
    color: '#333',
    '&:hover': {
      color: 'black',
    },
    svg: {
      width: 15,
      color: state?.isDisabled ? 'grey' : '#333',
    },
  }),

  control: (base, state) => ({
    ...base,
    border: state?.isFocused
      ? '2px solid #e5e7eb !important'
      : '2px solid #e5e7eb !important',
    boxShadow: state?.isFocused
      ? '0 0 0 2px #cbd5e1 !important'
      : '0 0 0 2px white !important',
    '&:hover': {
      border: state?.isFocused ? 0 : 0,
    },
    backgroundColor: 'white',
    padding: '3px 0',
    margin: '0',
    fontSize: '16px',
    flexDirection: 'row-reverse',
    color: 'green',
  }),

  menuPortal: (base) => ({
    ...base,
    zIndex: 50,
  }),

  option: (base, state) => ({
    ...base,
    fontSize: '16px',
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '18px',
    backgroundColor: state?.isFocused ? '#EBF4FE' : null,
    color: '#003060',
  }),

  menu: (base) => ({
    ...base,
    width: '100%',
    border: '1px solid #DDE4EE',
    borderRadius: '5px',
    padding: 0,
    margin: 0,
    backgroundColor: '#FAFCFE',
  }),
  singleValue: (base) => ({
    ...base,
    color: '#1252A1',
    backgroundColor: '#FAFCFE',
    fontSize: '16px',
    fontWeight: 400,
  }),
};

export const nonSearchableStyle: {
  [key: string]: (
    base: { [key: string]: string },
    state?: { [key: string]: boolean }
  ) => void;
} = {
  control: (base, state) => ({
    ...base,
    border: state?.isFocused
      ? '2px solid #DDE4EE !important'
      : '2px solid #DDE4EE !important',
    boxShadow: state?.isFocused ? '0 0 0 2px #cbd5e1 !important' : '',
    '&:hover': {
      border: state?.isFocused ? 0 : 0,
    },
    backgroundColor: '#FAFCFE',
    padding: '0px 3px',
    margin: '0',
    height: '48px',
    fontSize: '16px',

    color: '#96ADCB',
  }),
};
