'use client';

import React, { useMemo } from 'react';
import { className as Styles } from './constants';
import { ButtonProps } from './types';

const Button = React.memo(function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  startIcon,
  endIcon,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const computedClassName = useMemo(() => {
    const widthClasses = fullWidth ? Styles.fullWidth : '';
    const disabledClasses = disabled || loading ? Styles.disabled : '';

    return [
      Styles.base,
      Styles.variants[variant],
      Styles.sizes[size],
      widthClasses,
      disabledClasses,
      className,
    ]
      .filter(Boolean)
      .join(' ');
  }, [variant, size, loading, fullWidth, disabled, className]);

  const StartIcon = useMemo(
    () =>
      !loading && startIcon ? (
        <span className={Styles.iconContainer.start}>{startIcon}</span>
      ) : null,
    [loading, startIcon],
  );

  const EndIcon = useMemo(
    () =>
      !loading && endIcon ? <span className={Styles.iconContainer.end}>{endIcon}</span> : null,
    [loading, endIcon],
  );

  const LoadingIcon = useMemo(
    () =>
      loading ? (
        <svg className={Styles.loadingIcon} fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 
              5.373 0 12h4zm2 5.291A7.962 7.962 0 
              014 12H0c0 3.042 1.135 5.824 
              3 7.938l3-2.647z"
          />
        </svg>
      ) : null,
    [loading],
  );

  return (
    <button className={computedClassName} disabled={disabled || loading} {...props}>
      {LoadingIcon}
      {StartIcon}
      {children}
      {EndIcon}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
