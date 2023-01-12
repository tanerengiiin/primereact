/**
 *
 * Divider is an input component that provides real-time suggestions when being typed.
 *
 * [Live Demo](https://www.primefaces.org/primereact/divider/)
 *
 * @module divider
 *
 */
import * as React from 'react';

/**
 * Defines valid properties in Divider component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface DividerProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * Alignment of the content, options are "left", "center", "right" for horizontal layout and "top", "center", "bottom" for vertical.
     */
    align?: 'center' | 'left' | 'right' | 'bottom' | 'top' | undefined;
    /**
     * Specifies the orientation, valid values are "horizontal" and "vertical".
     * @defaultValue horizontal
     */
    layout?: 'vertical' | 'horizontal' | undefined;
    /**
     * Border style type, default is "solid" and other options are "dashed" and "dotted".
     * @defaultValue solid
     */
    type?: 'solid' | 'dashed' | 'dotted' | undefined;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
}

/**
 * @group Component
 */
export declare class Divider extends React.Component<DividerProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLDivElement} Container element
     */
    public getElement(): HTMLDivElement;
}
