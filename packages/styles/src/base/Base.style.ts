import type { StylesOptions, StyleType } from '@primereact/types/styles';
import { style } from '@primeuix/styles/base';

const css = ({ dt }: StyleType) => `
.p-hidden-accessible {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    opacity: 0;
    overflow: hidden;
    padding: 0;
    pointer-events: none;
    position: absolute;
    white-space: nowrap;
    width: 1px;
}

.p-overflow-hidden {
    overflow: hidden;
    padding-right: ${dt('scrollbar.width')};
}
`;

const classes = {};

const inlineStyles = {};

export const styles = {
    name: 'base',
    css,
    style,
    classes,
    inlineStyles
} satisfies StylesOptions;
