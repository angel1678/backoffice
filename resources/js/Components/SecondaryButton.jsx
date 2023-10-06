import { Button } from 'primereact/button';

export default function SecondaryButton({ type = 'button', severe = 'normal', className = '', disabled, children, ...props }) {
  const classNames = {
    normal: '!bg-secondary-btn !border-secondary-btn',
    info: '!bg-info-btn !border-info-btn',
    help: '!bg-help-btn !border-help-btn',
  }

  return (
    <Button
      {...props}
      type={type}
      className={[classNames[severe], className].join(' ')}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}
