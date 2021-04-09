import * as React from 'react';
import { ViewProps } from 'react-native';
export interface Constraints {
    aboveScreen?: boolean;
    belowScreen?: boolean;
}
export interface InViewPortProps extends ViewProps {
    disabled?: boolean;
    interval?: number;
    onChange?: (visible: boolean) => void;
    children?: React.ReactNode;
    constraints?: Constraints;
}
export interface Rect {
    top: number;
    bottom: number;
    width: number;
}
export default function InViewPort(props: InViewPortProps): any;
