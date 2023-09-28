import { Button } from 'primereact/button';

export default function PrimaryButton({ className = '', disabled, children, ...props }) {
  return (
    <Button
      {...props}
      className={['!bg-primary-btn !border-primary-btn', className].join(' ')}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}
