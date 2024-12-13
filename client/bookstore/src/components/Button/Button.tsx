import React from 'react';
import { ButtonProps } from '../../types';
import classNames from 'classnames';
import "./button.css";

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  type = 'button',
  className = '',
  disabled = false,
  variant = 'primary',
  size = 'medium',
}) => {
  const buttonClass = classNames(
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    { disabled },
    className
  );

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;