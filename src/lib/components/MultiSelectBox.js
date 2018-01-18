import React, { Component } from "react";
import PropTypes from "prop-types";
import ItemRow from "./ItemRow";
import { List, AutoSizer } from "react-virtualized";
import "./MultiSelectBox.css";

class MultiSelectBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedList: [],
      filterText: ""
    };
  }

  getFilteredOptions() {
    const { valueKey, labelKey, options } = this.props;
    const { filterText, selectedList } = this.state;
    return options
      .filter(
        item =>
          selectedList.findIndex(
            selectedItem =>
              selectedItem[valueKey || labelKey] === item[valueKey || labelKey]
          ) < 0
      )
      .filter(item =>
        item[labelKey]
          .toLocaleLowerCase()
          .includes(filterText.toLocaleLowerCase())
      );
  }

  handleAddClick = selectedItem => {
    const { selectedList } = this.state;
    this.setState(
      {
        selectedList: [...selectedList, selectedItem]
      },
      () => {
        this.onChangeEvent();
      }
    );
  };

  handleRemoveClick = (selectedItem, index) => {
    const { selectedList } = this.state;
    this.setState(
      {
        selectedList: selectedList.filter((item, i) => i !== index)
      },
      () => {
        this.onChangeEvent();
      }
    );
  };

  handleSelectAllClick = () => {
    const { selectedList } = this.state;
    this.setState(
      {
        selectedList: [...selectedList, ...this.getFilteredOptions()],
        filterText: ""
      },
      () => {
        this.onChangeEvent();
      }
    );
  };

  handleRemoveAllClick = () => {
    this.setState(
      {
        selectedList: [],
        filterText: ""
      },
      () => {
        this.onChangeEvent();
      }
    );
  };

  handleFilterChange = event => {
    this.setState({ filterText: event.target.value });
  };

  onChangeEvent = () => {
    const { onChange, valueKey, labelKey } = this.props;
    const { selectedList } = this.state;
    const selectedValues = selectedList.map(item => item[valueKey || labelKey]);
    if (onChange) onChange(selectedValues);
  };

  render() {
    const {
      labelKey,
      addAllLabel,
      removeAllLabel,
      searchPlaceHolder,
      selectedLabel
    } = this.props;
    const { selectedList, filterText } = this.state;
    const availableData = this.getFilteredOptions();
    return (
      <div className="multi-select">
        <div className="available-list">
          <div className="header">
            <input
              type="text"
              className="input"
              value={filterText}
              onChange={this.handleFilterChange}
              placeholder={searchPlaceHolder}
            />
            <button onClick={this.handleSelectAllClick}>{addAllLabel}</button>
          </div>
          <AutoSizer disableHeight>
            {({ width }) => (
              <List
                className="list-container"
                height={173}
                rowCount={availableData.length}
                rowHeight={25}
                width={width}
                rowRenderer={props => (
                  <ItemRow
                    key={props.key}
                    itemData={availableData[props.index]}
                    labelKey={labelKey}
                    onItemClick={this.handleAddClick}
                    icon="icon icon-plus"
                    {...props}
                  />
                )}
              />
            )}
          </AutoSizer>
        </div>

        <div className="selected-list">
          <div className="header">
            <div className="count">
              <span>
                {selectedList.length} {selectedLabel}
              </span>
            </div>
            <button onClick={this.handleRemoveAllClick}>
              {removeAllLabel}
            </button>
          </div>
          <AutoSizer disableHeight>
            {({ width }) => (
              <List
                className="list-container"
                height={173}
                rowCount={selectedList.length}
                rowHeight={25}
                width={width}
                rowRenderer={props => (
                  <ItemRow
                    key={props.key}
                    itemData={selectedList[props.index]}
                    labelKey={labelKey}
                    onItemClick={this.handleRemoveClick}
                    icon="icon icon-minus"
                    {...props}
                  />
                )}
              />
            )}
          </AutoSizer>
        </div>
      </div>
    );
  }
}

MultiSelectBox.defaultProps = {
  addAllLabel: "Add All",
  removeAllLabel: "Remove All",
  searchPlaceHolder: "Search...",
  selectedLabel: "Items selected"
};

MultiSelectBox.propTypes = {
  options: PropTypes.array.isRequired,
  id: PropTypes.string,
  labelKey: PropTypes.string,
  valueKey: PropTypes.string,
  addAllLabel: PropTypes.string,
  removeAllLabel: PropTypes.string,
  onChange: PropTypes.func
};

export default MultiSelectBox;
