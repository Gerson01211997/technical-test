import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
}

export default function Input({
    label,
    error,
    helperText,
    startIcon,
    endIcon,
    className = '',
    ...props
}: InputProps) {
    const baseClasses = 'appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm';
    const errorClasses = error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300';
    const iconClasses = startIcon ? 'pl-10' : endIcon ? 'pr-10' : '';

    return (
        <div className="space-y-1">
            {label && (
                <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            <div className="relative">
                {startIcon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {startIcon}
                    </div>
                )}

                <input
                    className={`${baseClasses} ${errorClasses} ${iconClasses} ${className}`}
                    {...props}
                />

                {endIcon && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        {endIcon}
                    </div>
                )}
            </div>

            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}

            {helperText && !error && (
                <p className="text-sm text-gray-500">{helperText}</p>
            )}
        </div>
    );
}
