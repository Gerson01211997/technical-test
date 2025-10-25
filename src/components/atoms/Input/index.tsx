import React, { memo, useMemo } from 'react';
import { className as Styles } from './constants';
import { InputProps } from './types';

function InputComponent({
    label,
    error,
    helperText,
    startIcon,
    endIcon,
    className = '',
    ...props
}: InputProps) {
    const inputClasses = useMemo(() => {
        const stateClass = error ? Styles.error : Styles.normal;
        const iconClass = startIcon
            ? Styles.iconStart
            : endIcon
                ? Styles.iconEnd
                : '';

        return `${Styles.base} ${stateClass} ${iconClass} ${className}`.trim();
    }, [error, startIcon, endIcon, className]);

    return (
        <div className={Styles.wrapper}>
            {label && (
                <label htmlFor={props.id} className={Styles.label}>
                    {label}
                </label>
            )}

            <div className={Styles.inputContainer}>
                {startIcon && (
                    <div className={`${Styles.iconWrapper} ${Styles.iconStartWrapper}`}>
                        {startIcon}
                    </div>
                )}

                <input
                    {...props}
                    className={inputClasses}
                />

                {endIcon && (
                    <div className={`${Styles.iconWrapper} ${Styles.iconEndWrapper}`}>
                        {endIcon}
                    </div>
                )}
            </div>

            {error ? (
                <p className={Styles.errorMessage}>{error}</p>
            ) : helperText ? (
                <p className={Styles.helperText}>{helperText}</p>
            ) : null}
        </div>
    );
}

InputComponent.displayName = "input-component"

export default memo(InputComponent);
