import React, { useState, useContext } from "react";
import Select, { StylesConfig } from "react-select";
import { GlobalContext } from "./App";

function SelectorOptionMenu({ options }) {
  const { setTemplateTitle } = useContext(GlobalContext);

  function handleChange(e) {
    setTemplateTitle(e.label);
  }

  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "yellow" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : undefined,
        color: isDisabled
          ? "#ccc"
          : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.color,
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    input: (styles) => ({ ...styles }),
    placeholder: (styles) => ({ ...styles }),
    singleValue: (styles, { data }) => ({ ...styles }),
  };

  return (
    <>
      <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue={options[0]}
        isDisabled={false}
        isLoading={false}
        isClearable={false}
        isRtl={false}
        isSearchable={false}
        name="color"
        options={options}
        onChange={handleChange}
      />
    </>
  );
}

export default SelectorOptionMenu;
