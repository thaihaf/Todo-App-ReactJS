import { useState } from "react";

const useColor = () => {
  const listColors = ["pink", "yellow", "orange", "red", "purple", "blue"];
  const [colorValue, setColorValue] = useState("");

  const handleChangeColor = (color) => (event) => {
    setColorValue(color);
  };

  return { handleChangeColor, listColors, colorValue };
};

export default useColor;
