import React from 'react';
import ReactDOM from 'react-dom';

class Customer extends React.Component{
    constructor(props){
        super(props);
        
        this.state={
            name:"" ,
            request:"" ,
        pin:""};
    }


submitHandler=(e)=>{
	let name=document.getElementsByTagName("input");
	
	alert(name[0].value+" has requested"+""+""+name[1].value);

}	


    


render(){
    return(
        
        
        <fieldset>
        <legend>Enter your details Here</legend> 
        
         <ul>
        <li>{this.state.name}</li>
         <li>{this.state.request}</li>
         <li>{this.state.pin}</li>
         </ul>  
        
        <form onSubmit={this.submitHandler} >
        <label>Input Your Name:</label>
        <input name="name" type="text" onChange={(e) => {this.setState({name:e.target.value})}} />
        <label>Amount to Withdraw</label>
        <input name="request" type="text" onChange={(e) => {this.setState({request:e.target.value})}} />
        <label>Enter Your PIN Here</label>
        <input name="pin" type="text" onChange={(e) => {this.setState({pin:e.target.value})}} />
        <input type="submit" value="submit"  />
        </form>
        </fieldset>
        
    );
}
}
  
  ReactDOM.render(<Customer />, document.getElementById('root'));


