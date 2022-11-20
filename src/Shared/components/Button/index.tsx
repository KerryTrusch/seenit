import {forwardRef} from 'react';
import { StyledButton, StyledSpinner } from './Styles';
import Icon from '../Icon';
interface ButtonDetails {
    className: string;
    children?: any;
    icon?: any | undefined;
    iconSize?: number;
    disabled?: boolean;
    isWorking?: boolean;
    onClick: () => void;
}

const Button = forwardRef(({className, children, icon, iconSize=16, disabled = false, isWorking = false, onClick, ...buttonProps }: ButtonDetails, ref: any) => {
    const handleClick = () => {
        if (!disabled && !isWorking) {
            onClick();
        }
    }
    return (
        <StyledButton
        {...buttonProps}
        onClick={handleClick}
        disabled={disabled || isWorking}
        isWorking={isWorking}
        iconOnly={!children}
        ref={ref}
        >
            {isWorking && <StyledSpinner size={26} />}

            {!isWorking && icon && typeof icon === 'string' ? (
                <Icon icon={icon} className={className} />
            ) : (
                icon
            )}

            {children && <span className={className}>{children}</span>}
        </StyledButton>
    )
}
);

export default Button;