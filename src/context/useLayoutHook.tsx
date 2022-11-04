import { useCallback, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import checkinServices from 'services/checkin.service';

import { InitialSettingsData } from './LayoutContext';

export const useLayoutHook = ({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) => {
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState(InitialSettingsData);
  const [loadingSettings, setLoadingSettings] = useState(false);

  // handlers
  const fetchSettings = async (resetDefaults = false) => {
    if (!isAuthenticated) {
      return;
    }

    setLoadingSettings(true);

    const settings = await checkinServices.fetchSettings();
    if (resetDefaults) {
      i18n.changeLanguage(settings.language.toLowerCase());
    }
    setSettings(settings);
    setLoadingSettings(false);
  };

  const initLoading = useCallback(() => {
    setLoading(true);
  }, []);

  const finishLoading = useCallback(() => {
    setLoading(false);
  }, []);

  // Effects
  useEffect(() => {
    fetchSettings();
  }, [isAuthenticated]);

  return {
    settings,
    loading,
    initLoading,
    finishLoading,
    fetchSettings,
    loadingSettings,
  };
};
