import { Button } from 'primereact/button';

export default function SecondaryButton({ type = 'button', className = '', disabled, children, ...props }) {
  return (
    <Button
      {...props}
      type={type}
      className={['!bg-secondary-btn !border-secondary-btn', className].join(' ')}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}
