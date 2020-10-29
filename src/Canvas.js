import React from "react"
import ColourSelector from "./ColourSelector"



const styles = {
  border: "6px solid black"
};

class Canvas extends React.Component {

  state = { 
    hex: "#f4424b",
    coords: null,
    height: 400,
    width: 400 
}

  //! In react, we refer DOM elements using React.createRef() 
  constructor(props){
    super(props);
    this.canvasRef = React.createRef();
    this.context = null

  }

  componentDidMount() {
    console.log("canvas ref", this.canvasRef);
}

  componentDidUpdate = () => {
    this.setContext()
  }

  setContext() {
    this.context = this.canvasRef.current.getContext('2d');
    this.context.strokeStyle = this.state.hex;
    this.context.lineJoin = "round";
    this.context.lineWidth = 3;
}
onCanvasMouseMove = (event) => {
  const x = event.nativeEvent.offsetX;
  const y = event.nativeEvent.offsetY;
  const coords = this.state.coords;
  const { height, width } = this.state;
  if (x > 0 && x < width && y > 0 && y < height) {
      if (coords) {
          this.context.beginPath();
          this.context.moveTo(coords[0], coords[1]);
          this.context.lineTo(x, y);
          this.context.closePath();
          this.context.stroke();
          this.setState({ coords: [x,y]});
      }
  } else {
      this.setState({ coords: null });
  }
}  
onCanvasMouseUp = () => {
  this.setState({ coords: null });
}

onCanvasMouseDown = (event) => {
  const x = event.nativeEvent.offsetX;
  const y = event.nativeEvent.offsetY;
  this.setState({ coords: [x,y]})
}
// !below is the callback func which is passed as prop to ColourSelector and it will change the state in Canvas class from ColourSelector because we are using ES6 syntax for defining the func , as a result this.setState bound to Canvas class, no matter if it is passed as prop to ColourSelector
// !this is called lifting state as parent component Canvas's state is being changed by from child component ColourSelector
  // onColourSelectorChange = (event) => {
  //   this.setState({hex: event.target.value})
  //   // console.log("event.target.value", event.target.value)
  // }

  onColourSelectorChange = (hex) => {
      this.setState({hex})
    
    }
  render() {
    const { hex } = this.state
    return(
      <>
        <div>
            <ColourSelector 
            hex = {hex} 
            onColourSelectorChange={this.onColourSelectorChange}/> 
        </div>  
        {/* //canvas is a HTML5 element which is self closing , below we are using ref to to get reference of rendered DOM element */}
        <canvas
          ref={this.canvasRef}
          width="400"
          height="400"
          style={styles}
          onMouseMove={this.onCanvasMouseMove}
          onMouseUp={this.onCanvasMouseUp}
          onMouseDown={this.onCanvasMouseDown}

        />
      </>
        
       
    )
  }

}

export default Canvas

// {/* <div style={canvasStyles}>
// <canvas
//   ref={this.canvas.Ref}
//   width="400"
//   height="400"
// />
// </div> */}