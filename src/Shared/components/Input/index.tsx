import { forwardRef } from "react";
import { StyledInput, StyledIcon, InputElement } from "./Styles";
interface InputDetails {
    icon?: any;
    className?: string;
    onChange: any;
    onKeyUp: any;
    onClick?: any;
    value: string;
}

const Input = forwardRef(({icon, className, onChange, onKeyUp, onClick, value, ...inputProps}: InputDetails, ref: any) => {
    const handleChange = (e: any) => {
        onChange(e.target.value);
    }
    return (
        <StyledInput>
            {icon && <StyledIcon type={icon} size={15} />}
            <InputElement {...inputProps} onChange={handleChange} hasIcon={!!icon} ref={ref} onClick={onClick} className={className} value={value} />
        </StyledInput>
    )
})

export default Input;