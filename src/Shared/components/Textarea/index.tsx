import {forwardRef, HTMLAttributes} from 'react';
import { StyledTextarea } from './Styles';
import TextareaAutosize from 'react-textarea-autosize';
import { TextareaAutosizeProps } from 'react-textarea-autosize';
interface TextareaDetails extends TextareaAutosizeProps {
    className?: string;
    invalid?: boolean;
    minRows?: number;
    value: string;
    onChange: any;
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