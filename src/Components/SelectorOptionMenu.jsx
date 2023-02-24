import React, { useState, useContext } from "react";
import Select, { StylesConfig } from "react-select";
import { GlobalContext } from "./App";

function SelectorOptionMenu({ options }) {
  const { setTemplateTitle } = useContext(GlobalContext);

  function handleChange(e) {
    setTemplateTitle(e.label);
  }

  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "rgb(251, 251, 243)" }),
    option: (styles) => {
      return {
        ...styles,
        backgroundColor: "rgb(251, 251, 243)",
        color: "black",
        textAlign: "center",

        ":hover": {
          ...styles[":active"],
          backgroundColor: "white",
          border: "solid",
          borderRadius: "5px",
        },
      };
    },
    input: (styles) => ({ ...styles }),
    placeholder: (styles) => ({ ...styles }),
    singleValue: (styles) => ({ ...styles }),
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
        styles={colourStyles}
        onChange={handleChange}
      />
    </>
  );
}

export default SelectorOptionMenu;
