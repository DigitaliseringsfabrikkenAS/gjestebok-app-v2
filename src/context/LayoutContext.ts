/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { SettingsType } from 'common/types/CheckinData.type';
import { createContext } from 'react';
export const InitialSettingsData: SettingsType = {
  language: '',
  vistitorClaims: [],
};

export const LayoutContext = createContext({
  loading: false,
  settings: InitialSettingsData,
  loadingSettings: false,
  initLoading: () => {},
  finishLoading: () => {},
  fetchSettings: async (_resetSettings?: boolean) => {},
});
