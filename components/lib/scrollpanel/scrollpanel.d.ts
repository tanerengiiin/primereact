/**
 *
 * ScrollPanel is a cross browser, lightweight and skinnable alternative to native browser scrollbar.
 *
 * [Live Demo](https://www.primereact.org/scrollpanel/)
 *
 * @module scrollpanel
 *
 */
import * as React from 'react';
import { ComponentHooks } from '../componentbase/componentbase';
import { PassThroughOptions } from '../passthrough';
import { PassThroughType } from '../utils/utils';

export declare type ScrollPanelThroughType<T> = PassThroughType<T, ScrollPanelThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface ScrollPanelThroughMethodOptions {
    props: ScrollPanelProps;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link ScrollPanelProps.pt}
 */
export interface ScrollPanelPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: ScrollPanelThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the wrapper's DOM element.
     */
    wrapper?: ScrollPanelThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the content's DOM element.
     */
    content?: ScrollPanelThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the horizontal panel's DOM element.
     */
    barX?: ScrollPanelThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the vertical panel's DOM element.
     */
    barY?: ScrollPanelThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
}

/**
 * Defines valid properties in ScrollPanel component. In addition to these, all properties of HTMLDivElement can be used in this component.
 * @group Properties
 */
export interface ScrollPanelProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {ScrollPanelPassThroughOptions}
     */
    pt?: ScrollPanelPassThroughOptions;
    /**
     * Used to configure passthrough(pt) options of the component.
     * @type {PassThroughOptions}
     */
    ptOptions?: PassThroughOptions;
    /**
     * When enabled, it removes component related styles in the core.
     * @defaultValue false
     */
    unstyled?: boolean;
}

/**
 * **PrimeReact - ScrollPanel**
 *
 * _ScrollPanel is a cross browser, lightweight and skinnable alternative to native browser scrollbar._
 *
 * [Live Demo](https://www.primereact.org/scrollpanel/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class ScrollPanel extends React.Component<ScrollPanelProps, any> {
    /**
     * Used to get container element.
     * @return {HTMLDivElement | null} Container element
     */
    public getElement(): HTMLDivElement | null;
    /**
     * Used to get content of the scrollpanel.
     * @return {HTMLDivElement | null} Content element
     */
    public getContent(): HTMLDivElement | null;
    /**
     * Used to get horizontal scrollbar of the panel.
     * @return {HTMLDivElement | null} Horizontal bar element
     */
    public getXBar(): HTMLDivElement | null;
    /**
     * Used to get vertical scrollbar of the panel.
     * @return {HTMLDivElement | null} Vertical bar element
     */
    public getYBar(): HTMLDivElement | null;
}
