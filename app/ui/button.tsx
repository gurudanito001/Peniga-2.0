import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className,  ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'btn w-full bg-primary rounded-lg mt-12 text-white hover:bg-primary hover:text-white hover:shadow-xl',
        className,
      )}
    >
      {children}
    </button>
  );
}


