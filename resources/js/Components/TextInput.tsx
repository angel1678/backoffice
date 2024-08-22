import React, { forwardRef, useEffect, useImperativeHandle, useRef, InputHTMLAttributes } from 'react';

export default forwardRef(function TextInput(
  { type = 'text', className = '', isFocused = false, ...props }: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean },
  ref
) {
  const localRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus(),
    click: () => localRef.current?.click(),
  }));

  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus();
    }
  }, []);

  return (
    <div className="flex flex-col items-start">
      <input
        {...props}
        type={type}
        className={
          'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
          className
        }
        ref={localRef}
      />
    </div>
  );
});
