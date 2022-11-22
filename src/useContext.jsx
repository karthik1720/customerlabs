import { createContext, useContext, useState } from "react";
const useData = createContext();
const [currentVal, setCurrentVal] = useState({
  Value: "",
  label: "",
});
const list = [
  { index: 1, label: "First Name", Value: "first_name" },
  { index: 2, label: "Last Name", Value: "last_name" },
  { index: 3, label: "Gender", Value: "gender" },
  { index: 4, label: "Age", Value: "age" },
  { index: 5, label: "Account Name", Value: "account_name" },
  { index: 6, label: "City", Value: "city" },
  { index: 7, label: "State", Value: "state" },
];

const [dropdown, setDropdown] = useState([]);
const [filterList, setFilterList] = useState([]);

const [filtered, setFiltered] = useState(filteredList);

const handleFilter = () => {
  const filteredList = dropdown.filter((op) =>
    filterList.every((fl) => fl.Value !== op.Value)
  );
};
