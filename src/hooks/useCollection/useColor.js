import { useCallback, useState } from "react";

const useColor = () => {
  const [listColors] = useState(() => [
    "pink",
    "yellow",
    "orange",
    "red",
    "purple",
    "blue",
  ]);
  const [colorValue, setColorValue] = useState("");

  const handleChangeColor = useCallback(
    (color) => (event) => {
      setColorValue(color);
    },
    []
  );

  return { handleChangeColor, listColors, colorValue };
};

export default useColor;
