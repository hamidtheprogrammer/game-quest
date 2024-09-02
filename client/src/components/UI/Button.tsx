import { ButtonHTMLAttributes } from "react";

interface ButtonProps {
  click?: () => void; // function type for click handler
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"]; // restrict type to valid button types
  styles?: string; // class name(s) for styling
  name: string; // button text
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  click,
  type,
  styles,
  name,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`${styles} btn-bg px-5 py-2 rounded-full uppercase hover:opacity-80 transition-opacity duration-300`}
      onClick={click}
    >
      {name}
    </button>
  );
};

export default Button;
