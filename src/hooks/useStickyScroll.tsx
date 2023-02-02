import React from "react";

export default function useStickyScroll(threshold: number) {
  const [scrollHeight, setScrollHeight] = React.useState(0);
  const [positionMode, setPositionMode] = React.useState("unset");
  const [positionOffset, setPositionOffset] = React.useState(0);
  const [transitionSpeed, setTransitionSpeed] = React.useState(0);

  const update = () => {
    const downLast = window.scrollY >= scrollHeight;

    let mode = null;
    let offset = 0;
    if (window.scrollY <= 0) {
      //reset at 0
      mode = "unset";
      setTransitionSpeed(0);
    } else if (window.scrollY > threshold) {
      //begin fixed positioning past threshold
      mode = "fixed";
      offset = downLast ? -threshold : 0;
      if (!downLast) setTransitionSpeed(200);
    }

    setScrollHeight(window.scrollY);
    setPositionOffset(offset);
    if (mode) setPositionMode(mode);
  };
  React.useEffect(() => {
    window.addEventListener("scroll", update);
    return () => {
      window.removeEventListener("scroll", update);
    };
  }, [scrollHeight]);

  return {
    positionMode,
    positionOffset,
    transitionSpeed,
  };
}
