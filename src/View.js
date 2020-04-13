import React from 'react';

class View extends React.Component {
constructor() { //构造函数
super();
this.state = {
}
}
render(){
return(<div>{this.props.text}</div>)
}
}
export default View;
