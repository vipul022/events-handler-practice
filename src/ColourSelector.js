import React from "react";

class ColourSelector extends React.Component {
  //!below is an alternate way to assign default properties using class function with static keyword. This can also be done // ColourSelector.defaultProps = {
// !    hex: "#f4424b"
    
//! }
  static defaultProps = {
    hex: "#f4424b"
  }

 
  // !onInputChange is called whenever there is a change of input and  onChange event passes event to onInputChange function
  //! Always use ES6 syntax for defining function if we want to use this key word inside functions. In this way we don't have to bind it it constructor function
 onInputChange= (event) => {
   const {onColourSelectorChange} = this.props;
   const hex = event.target.value;
   onColourSelectorChange(hex);

}

  render() {
    // console.log("this.props", this.props)
    // !hex and onColourSelectorChange callback are passed as props from Canvas
    const {hex} = this.props;
    

    return (
      <input
       type = "color"
        // defaultValue = {hex}
        // onChange={this.onInputChange}
        onChange={this.onInputChange}
        value={hex}
        />
    )
  }

}
export default ColourSelector