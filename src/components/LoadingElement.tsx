import { PropsWithChildren, useEffect, useState } from 'react';

export type LoadingElementProps = PropsWithChildren<{
  status?: 'none' | 'error' | 'loading' | 'success';
  colorLoading?: string;
  colorError?: string;
  colorSuccess?: string;
  iconSize?: '2x' | '3x' | '4x' | '5x';
}>;

export function LoadingElement({
  status = 'none',
  colorLoading = '#0ea5e9',
  colorError = '#dc2626',
  colorSuccess = '#22c55e',
  iconSize = '2x',
  children,
}: LoadingElementProps) {
  const [isOpacity, setIsOpacity] = useState(status !== 'none');
  const [iconProps, setIconProps] = useState({ className: '', style: {} });
  useEffect(() => {
    setIsOpacity(status !== 'none');
    switch (status) {
      case 'loading':
        setIconProps({
          className: `fas fa-circle-notch fa-spin fa-${iconSize}`,
          style: {
            color: colorLoading,
          },
        });
        break;

      case 'error':
        setIconProps({
          className: `fas fa-times fa-${iconSize}`,
          style: {
            color: colorError,
          },
        });
        break;

      case 'success':
        setIconProps({
          className: `far fa-check-circle fa-${iconSize}`,
          style: {
            color: colorSuccess,
          },
        });
        break;
      default:
        break;
    }
  }, [status, colorSuccess, colorError, colorLoading, iconSize]);
  return (
    <div className="relative min-w-fit min-h-fit ">
      <div className={`min-w-fit min-h-fit ${isOpacity && 'opacity-50'}`}>
        {children}
      </div>
      {isOpacity && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <i {...iconProps}></i>
        </div>
      )}
    </div>
  );
}

export default LoadingElement;
