import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import RemoveIcon from "@mui/icons-material/Remove";
function Dropdown(props) {
  const filteredList = props.options.filter((op) =>
    props.filterList.every(
      (fl) => fl.value !== op.Value || fl.selectedBy === props.index
    )
  );

  return (
    <div className="dropdownContainer">
      <CircleIcon className="circleIcon green" />
      <select
        className="dropdown inputpadding"
        id=""
        value={props.currentValue}
        onChange={(e) => props.onChange(e, props.index)}
      >
        {filteredList.map((opt) => (
          <option value={opt.Value} label={opt.label} key={opt.Value}></option>
        ))}
      </select>
      <RemoveIcon
        className="removeIcon"
        onClick={() => props.removeDropDown(props.index)}
      />
    </div>
  );
}

export default Dropdown;
