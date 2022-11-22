/*
TODO:
1. Empty value is getting added to the array when switching back to 'Add schema to segment' option   -   Fixed
2. Code optimisation needs to be done
3. function names needs to be updated
4. Some CSS classnames needs to be changed
5. Duplicate html elements needs to be removed
6. Remove option
*/

import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import "../App.css";
import axios from "axios";
import CircleIcon from "@mui/icons-material/Circle";
import Dropdown from "./Dropdown";
import RemoveIcon from "@mui/icons-material/Remove";

const dropdown = [
  { index: 1, label: "First Name", Value: "first_name" },
  { index: 2, label: "Last Name", Value: "last_name" },
  { index: 3, label: "Gender", Value: "gender" },
  { index: 4, label: "Age", Value: "age" },
  { index: 5, label: "Account Name", Value: "account_name" },
  { index: 6, label: "City", Value: "city" },
  { index: 7, label: "State", Value: "state" },
];
function Popup({ setLoad }) {
  //TODO - change useState to useReducer for more readability
  const [valueSetter, setValueSetter] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [localfilterList, setLocafilterList] = useState(dropdown);
  const [error, setError] = useState({
    inputRef: false,
    select: false,
  });
  //   const [response, loadResponse] = useState(false);
  const [dropCount, setDropCount] = useState([]);
  const inputRef = useRef();
  const handleDrop1Change = (e) => {
    const index = e.nativeEvent.target.selectedIndex;
    const { value } = e.target;
    const label = e.nativeEvent.target[index].label;
    setValueSetter({ label: label, Value: value });
  };

  //TODO - code optimisation needed
  const handleDropChange = (e, index1) => {
    const index = e.nativeEvent.target.selectedIndex;
    const { value } = e.target;
    const label = e.nativeEvent.target[index].label;
    const newArr = [...dropCount];
    const newObj = {
      Value: value,
      label: label,
    };
    newArr[index1] = newObj;
    setDropCount(newArr);
    let newArr2 = [];

    //TODO - code optimisation needed
    if (filterList[index1]) {
      newArr2 = [...filterList];
      newArr2[index1].value = value;
    } else {
      newArr2 = [...filterList, { value: value, selectedBy: index1 }];
    }
    setFilterList(newArr2);
  };

  const addNewSchema = () => {
    if (valueSetter.Value === "" || valueSetter.Value === undefined) {
      setError((prev) => ({ ...prev, select: true }));
      return;
    }
    setDropCount([...dropCount, valueSetter]);

    setFilterList([
      ...filterList,
      { value: valueSetter.Value, selectedBy: dropCount.length },
    ]);
    setValueSetter({});
  };
  useEffect(() => {
    setError({ inputRef: false, select: false });
    const local = dropdown.filter((dp) =>
      dropCount.every((dc) => dp.Value !== dc.Value)
    );
    setLocafilterList(local);
  }, [dropCount, valueSetter]);

  const handleSubmit = async () => {
    if (inputRef.current.value === "") {
      setError((prev) => ({ ...prev, inputRef: true }));
      return;
    }
    setError({ inputRef: false, select: false });
    const payload = {
      segment_name: inputRef.current.value,
      schema: dropCount,
    };
    console.log(payload);
    await axios.post(
      "https://webhook.site/fe8e873f-e07d-4033-9667-ea96623729e7", //Replace it
      payload
    );
  };

  //TODO - duplicate dropdown element needs to be removed.
  return (
    <div className="popContainer">
      <Navbar text="Saving Segment" />
      <div className="popWrapper">
        <p className="pTag">Enter the Name of the Segment</p>
        <input
          type="text"
          ref={inputRef}
          placeholder="Name of the segment"
          className="inputBox inputpadding"
        />
        {error.inputRef && (
          <span className="error">Please enter the name of the segment!</span>
        )}
        <p className="pTag">
          To save your segment, you need to add the schemas to build the query
        </p>
        <div className="tagsContainer">
          <div className="tags">
            <CircleIcon className="red circleIcon" />
            <p> - User Traits</p>
          </div>
          <div className="tags">
            <CircleIcon className="green circleIcon" />
            <p> - Group Traits</p>
          </div>
        </div>
        <div className="dropdownList">
          {dropCount.length > 0 && (
            <div className="dropdownLists">
              {dropCount.map((option, index) => (
                <Dropdown
                  key={index}
                  index={index}
                  options={dropdown}
                  onChange={handleDropChange}
                  filterList={filterList}
                  currentValue={option.Value}
                />
              ))}
            </div>
          )}
          <div className="dropdownContainer">
            <CircleIcon className="circleIcon green" />
            <select
              className="dropdown inputpadding"
              value={valueSetter.Value}
              onChange={(e) => handleDrop1Change(e)}
            >
              <option label="Add schema to segment" />
              {localfilterList.map((opt) => (
                <option
                  value={opt.Value}
                  label={opt.label}
                  key={opt.Value}
                ></option>
              ))}
            </select>
            <RemoveIcon className="removeIcon" />
          </div>
          <span className="addNew" onClick={addNewSchema}>
            +<u className="underline bold">Add new schema</u>
          </span>
          {error.select && <span className="error">Select any option!</span>}
        </div>
      </div>
      <div className="bottomMenu">
        <button className="greenButton bold" onClick={handleSubmit}>
          Save the segment
        </button>
        <button className="pinkButton bold" onClick={() => setLoad(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Popup;
