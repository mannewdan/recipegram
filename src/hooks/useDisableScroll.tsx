import React from "react";

export default function useDisableScroll() {
  const [disableScroll, setDisableScroll] = React.useState(false);

  React.useEffect(() => {
    if (disableScroll) {
      window.document.body.classList.add("disable-scroll");
    } else {
      window.document.body.classList.remove("disable-scroll");
    }

    return () => {
      window.document.body.classList.remove("disable-scroll");
    };
  }, [disableScroll]);

  return [setDisableScroll];
}
