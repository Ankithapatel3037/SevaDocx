import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, X, SlidersHorizontal } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SearchBarProps {
  value?: string;
  onChange?: (val: string) => void;
  onSubmit?: (val: string) => void;
  placeholder?: string;
  variant?: 'large' | 'compact';
  autoFocus?: boolean;
  showFiltersTrigger?: boolean;
  onOpenFilters?: () => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value: controlledValue,
  onChange,
  onSubmit,
  placeholder,
  variant = 'large',
  autoFocus = false,
  showFiltersTrigger = false,
  onOpenFilters,
  className = '',
}) => {
  const { t } = useApp();
  const [internalValue, setInternalValue] = useState(controlledValue || '');

  // Keep internal in sync with controlled value
  useEffect(() => {
    if (controlledValue !== undefined) {
      setInternalValue(controlledValue);
    }
  }, [controlledValue]);

  // Debounced notification if onChange provided
  useEffect(() => {
    const handler = setTimeout(() => {
      if (onChange && controlledValue === undefined) {
        onChange(internalValue);
      }
    }, 180);
    return () => clearTimeout(handler);
  }, [internalValue, onChange, controlledValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setInternalValue(next);
    if (onChange && controlledValue !== undefined) {
      onChange(next);
    }
  };

  const handleClear = () => {
    setInternalValue('');
    if (onChange) onChange('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSubmit) {
      e.preventDefault();
      onSubmit(internalValue);
    }
  };

  const isLarge = variant === 'large';

  return (
    <div
      className={`relative flex items-center w-full rounded-2xl bg-white dark:bg-slate-900 border transition-all duration-200 ${
        isLarge
          ? 'p-2 sm:p-2.5 shadow-card border-slate-200/90 dark:border-slate-800 focus-within:border-sky-500 focus-within:ring-4 focus-within:ring-sky-500/10'
          : 'p-1.5 shadow-subtle border-slate-200 dark:border-slate-800 focus-within:border-sky-500'
      } ${className}`}
    >
      <div className="pl-3 pr-2 text-slate-400 dark:text-slate-500 flex items-center justify-center">
        <SearchIcon className={isLarge ? 'w-5 h-5 text-sky-600 dark:text-sky-400' : 'w-4 h-4'} />
      </div>

      <input
        type="search"
        value={internalValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || t.searchPlaceholder}
        autoFocus={autoFocus}
        aria-label="Search services or required documents"
        className={`w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none min-h-[44px] ${
          isLarge ? 'text-sm sm:text-base font-normal' : 'text-xs sm:text-sm'
        }`}
      />

      {/* Clear Button */}
      {internalValue && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search query"
          className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* Filter trigger button */}
      {showFiltersTrigger && onOpenFilters && (
        <button
          type="button"
          onClick={onOpenFilters}
          aria-label="Filter search options"
          className="p-2 text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer ml-1"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
