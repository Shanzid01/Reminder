import React, {Component} from 'react';
import '../styles/app.css';

class Tab extends Component{
    constructor(props){
        super(props);
        this.state=this.props.data;
    }
    getDaysLeft(){
        const time=Date.parse(this.state.date)-Date.parse(new Date());
        return Math.floor(time/(1000*60*60*24));
    }
    render(){return(
        <div className="tab-details">
            <span className='tab-name'>{this.state.name}</span><br/>
            <span className='tab-date'>{this.state.date}</span>
            <span className='tab-daysLeft'>(<i>{this.getDaysLeft()} days</i>)</span>
            <span className="material-icons waves-effect waves-red clear-btn" onClick={()=>this.props.deleteTask(this.state.id)}>clear</span>
        </div>
    );}
}
export default Tab;