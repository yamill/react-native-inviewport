import React from 'react';
import { ViewProps } from 'react-native';
export interface InViewPortProps extends ViewProps {
    disabled?: boolean;
    interval?: number;
    onChange?: (visible: boolean) => void;
    children?: React.ReactNode;
}
export interface Rect {
    top: number;
    bottom: number;
    width: number;
}
export default function InViewPort(props: InViewPortProps): any;
