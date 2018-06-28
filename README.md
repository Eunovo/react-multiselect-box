# React Multi-Select-Box

## Description

A multiselect box component for <a href="https://reactjs.org/" target="_blank">React</a>. This use <a href="">react-virtualized</a> and is based on an old jquery plugin.

## Demo

Live demo: [https://facuesr.github.io/react-multiselect-box/](https://facuesr.github.io/react-multiselect-box/)

## Installation

`npm install react-multiselect-box --save`

Then, you can import react-multiselect-box in your app as follows:

```js
import MultiSelectBox from 'react-multiselect-box'
import 'react-multiselect-box/build/css/index.css'
```

## Usage

```js
<MultiSelectBox
  options={[
    { desc: 'Item 1', value: '1' },
    { desc: 'Item 2', value: '2' },
    { desc: 'Item 3', value: '3' }
  ]}
  labelKey="desc"
  valueKey="value"
  onAdd={selectedItem => {

  }}
  onRemove={(removedItem, index) => {

  }}
  onSelectAll={selectedItems => {

  }}
  onRemoveAll={() =>

  }
  valueArray={[2,3]}
/>
```

## Contributors

Thanks <a href="">Federico Vicente</a> for help with the styles.

## License

MIT Licensed.
