import React, { useCallback, useContext, useEffect, useState } from "react";
import Select from "react-select";
import { GlobalContext } from "./App";

function SidebarTemplateMenu({ options }) {
  const { setTemplateTitle, templateTitle, dispatch, templates } = useContext(GlobalContext);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  useEffect(() => {
    // Find the index of the currently selected option
    const index = options.findIndex((option) => option.label === templateTitle);
    // If the index is valid, update the selected option
    if (index !== -1) {
      setSelectedOption(options[index]);
    }
  }, [templateTitle, options]);

  function handleChange(selectedOption) {
    setSelectedOption(selectedOption);
    setTemplateTitle(selectedOption.label);
    dispatch({
      type: "loadTEMPLATE",
      payload: { key: selectedOption.label, value: templates[selectedOption.label] }
    });
  }

  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "rgb(251, 251, 243)",
      color: "rgb(65, 65, 65)",
      fontFamily: "Courier New",
      ":hover": {
        backgroundColor: "white"
      },
      ":active": {
        backgroundColor: "#989534",
        color: "rgb(251, 251, 243)"
      }
    }),
    option: (styles) => ({
      ...styles,
      backgroundColor: "rgb(251, 251, 243)",
      color: "rgb(65, 65, 65)",
      fontFamily: "Courier New",
      textAlign: "center",
      ":hover": {
        ...styles[":active"],
        border: "solid",
        backgroundColor: "white",
        borderRadius: "4px"
      }
    }),
    input: (styles) => ({ ...styles }),
    placeholder: (styles) => ({ ...styles }),
    singleValue: (styles) => ({ ...styles })
  };

  return (
    <>
      <Select
        className="basic-single"
        classNamePrefix="select"
        value={selectedOption}
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

export default SidebarTemplateMenu;
