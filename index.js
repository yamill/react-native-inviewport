"use strict";

import React, { useEffect, useState } from "react";
import { View, Dimensions } from "react-native";

const InViewPort = props => {
  let interval;
  let myView;
  let isVisible;

  const [dimensions, setDimensions] = useState({
    rectTop: 0,
    rectBottom: 0,
    rectWidth: 0
  });

  const useIsInViewPort = () => {
    const window = Dimensions.get("window");

    isVisible =
      dimensions.rectBottom != 0 &&
      dimensions.rectBottom >= 0 &&
      dimensions.rectTop <= window.height &&
      dimensions.rectWidth > 0 &&
      dimensions.rectWidth <= window.width;

    props.onChange(isVisible);
  };

  const useStartWatching = () => {
    if (interval) {
      return;
    }

    interval = setInterval(() => {
      if (!myView) {
        return;
      }

      myView.measure((x, y, width, height, pageX, pageY) => {
        setDimensions({
          rectTop: pageY,
          rectBottom: pageY + height,
          rectWidth: pageX + width
        });
      });

      useIsInViewPort();
    }, 100);
  };

  const useStopWatching = () => {
    interval = clearInterval(interval);
  };

  useEffect(() => {
    useStartWatching();
    return () => useStopWatching();
  }, [useStartWatching]);

  return (
    <View
      collapsable={false}
      ref={component => {
        myView = component;
      }}
      {...props}
    >
      {props.children}
    </View>
  );
};

export default InViewPort;
