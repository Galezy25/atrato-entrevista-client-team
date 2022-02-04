import { action } from '@storybook/addon-actions';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const changeLocationActionHandler = action('React-router location', {
  allowFunction: true,
});

export const ChangeLocationListener = ({
  defaultPath = '/',
}: {
  defaultPath?: string;
}) => {
  const location = useLocation();
  useEffect(() => {
    if (location.search || location.pathname !== defaultPath )
      changeLocationActionHandler(location);
  }, [location, defaultPath]);
  return <></>;
};
