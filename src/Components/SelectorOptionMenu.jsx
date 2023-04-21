import React, { useContext } from "react";
import Select, { StylesConfig } from "react-select";
import { GlobalContext } from "./App";

function SelectorOptionMenu({ options }) {
  const { setTemplateTitle, dispatch, templates } = useContext(GlobalContext);

  function handleChange(e) {
    setTemplateTitle(e.label);
    dispatch({ type: "loadTEMPLATE", payload: templates[e.label] });
  }

  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "rgb(251, 251, 243)",
      color: "rgb(65, 65, 65)",
      fontFamily: "Courier New",
      ":hover": {
        backgroundColor: "white",
      },
      ":active": {
        backgroundColor: "#989534",
        color: "rgb(251, 251, 243)",
      },
    }),
    option: (styles) => {
      return {
        ...styles,
        backgroundColor: "rgb(251, 251, 243)",
        color: "rgb(65, 65, 65)",
        fontFamily: "Courier New",
        textAlign: "center",

        ":hover": {
          ...styles[":active"],
          border: "solid",
          backgroundColor: "white",
          borderRadius: "4px",
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
