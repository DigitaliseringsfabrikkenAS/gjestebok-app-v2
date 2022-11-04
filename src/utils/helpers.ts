export const capitalize = (word: string) => {
  return word[0].toUpperCase() + word.slice(1);
};

type LanguagePrefix =
  | 'claimText'
  | 'claimTextEn'
  | 'claimTextSw'
  | 'claimTextDa';

export const getLanguagePrefix = (
  language: string,
  prefix: string
): LanguagePrefix => {
  if (language === 'no') {
    return prefix as LanguagePrefix;
  }

  return `${prefix}${capitalize(language)}` as LanguagePrefix;
};
