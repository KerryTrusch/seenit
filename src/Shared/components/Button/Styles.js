import styled, { css } from 'styled-components';
import Spinner from '../Spinner';
export const StyledButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    vertical-align: middle;
    line-height: 1;
    padding: 0 ${props => (props.iconOnly ? 9 : 12)}px;
    white-space: nowrap;
    border-radius: 3px;
    transition: all 0.1s;
    appearance: none;
    &:disabled {
        opacity: 0.6s;
        cursor: default;
    }
`;

export const StyledSpinner = styled(Spinner)`
    position:relative;
    top: 1px;
`;