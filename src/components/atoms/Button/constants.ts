export const className = {
  base: 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors',
  variants: {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    outline: 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 focus:ring-indigo-500',
  },
  sizes: {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  },
  fullWidth: 'w-full',
  disabled: 'opacity-50 cursor-not-allowed',
  loadingIcon: 'animate-spin -ml-1 mr-2 h-4 w-4',
  iconContainer: {
    start: 'mr-2',
    end: 'ml-2',
  },
};
