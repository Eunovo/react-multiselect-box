import React from "react";
import MultiSelectBox from "../lib";
import "./styles.css";

const getOptions = qty => {
  let options = [];
  for (let i = 0; i < qty; i++) {
    options.push({
      desc: "Item " + i,
      value: i
    });
  }
  return options;
};

const App = () => (
  <div className="container">
    <h5>Example 1</h5>
    <MultiSelectBox
      options={[
        { desc: "Item 1", value: "1" },
        { desc: "Item 2", value: "2" },
        { desc: "Item 3", value: "3" }
      ]}
      labelKey="desc"
      valueKey="value"
      onChange={selectedValues => {
        console.log(selectedValues);
      }}
    />
    <h5>Example 2</h5>
    <MultiSelectBox
      options={getOptions(2000)}
      labelKey="desc"
      valueKey="value"
      onChange={selectedValues => {
        console.log(selectedValues);
      }}
    />
  </div>
);

export default App;
