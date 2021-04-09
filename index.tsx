import * as React from 'react'
import { Component, useState, useEffect, useRef, useMemo } from 'react'
import { View, Dimensions, ViewProps } from 'react-native'

export interface InViewPortProps extends ViewProps {
  disabled?: boolean;
  interval?: number;
  onChange?: (visible: boolean, layout: Rect) => void;
  children?: React.ReactNode;
}

export interface Rect {
  top: number;
  bottom: number;
  width: number;
}

const isInWindow = (viewSize: Rect) => {
  const window = Dimensions.get('window');
  const isVisible =
    viewSize.bottom != 0 &&
    viewSize.top >= 0 &&
    viewSize.bottom <= window.height &&
    viewSize.width > 0 &&
    viewSize.width <= window.width
  return isVisible;
}

export default function InViewPort(props: InViewPortProps) {
  const { disabled, interval, ...viewProps } = props;

  const [rect, setRect] = useState<Rect>({ top: 0, bottom: 0, width: 0 });
  const viewRef = useRef<View>(null);
  const wasVisible = useRef<boolean | null>(null);

  useEffect(() => {
    if (props.disabled) return;

    const timer = setInterval(() => {
      if (!viewRef.current) return;

      viewRef.current.measure((x, y, width, height, pageX, pageY) => {
        let rect: Rect = {
          top: pageY,
          bottom: pageY + height,
          width: pageX + width
        };
        setRect(rect);

        const visible = isInWindow(rect);
        if (visible !== wasVisible.current) {
          props.onChange?.(visible, rect);
          wasVisible.current = visible;
        }
      });
    }, props.interval || 100);

    return () => {
      wasVisible.current = null;
      clearInterval(timer);
    }
  }, [props.interval, props.disabled]);

  return <View ref={viewRef} collapsable={false} {...viewProps}>
    {props.children}
  </View>
}
