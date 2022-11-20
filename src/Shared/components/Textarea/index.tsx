import {forwardRef} from 'react';
import { StyledTextarea } from './Styles';
import TextareaAutosize from 'react-textarea-autosize';
interface TextareaDetails {
    className?: string;
    invalid?: boolean;
    minRows: number;
    value: string;
    onChange: (e: string) => void;
}

const Textarea = forwardRef(({className, invalid, onChange, ...textareaProps}: TextareaDetails, ref: any) => {

    return (
        <StyledTextarea className={className} invalid={invalid}>
            <TextareaAutosize 
            {...textareaProps}
            onChange={e => onChange(e.target.value)}
            ref={ref || undefined}
            />
        </StyledTextarea>
    )
}
);
export default Textarea;