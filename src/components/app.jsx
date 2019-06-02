import React, {Component} from 'react';
import '../styles/app.css';
import Tab from './tab';
import Cookie from '../helper/cookies'

class App extends Component{
    constructor(props){
        super(props);
        this.state={
            tasks:[]
        }
    }
    addItem(){
        let allTasks=this.getAllTasks();
        let nameField=document.getElementById('task-name');
        let dateField=document.getElementById('task-date');
        let newTask={
            id: Math.floor(Math.random() * Math.floor(10000)),
            name: nameField.value,
            date: dateField.value
        }
        if(newTask.name.length>0 && newTask.date.length>0){
            allTasks.push(newTask);
            this.setState({tasks:allTasks});
            nameField.value='';
            dateField.value='';
            Cookie.setCookie('allTasks', JSON.stringify(allTasks), 10);
        }
    }
    componentWillMount(){
        let allTasks=JSON.parse(Cookie.getCookie('allTasks'));
        if(allTasks.length>0){
            this.setState({tasks:allTasks});
        }
    }
    getAllTasks(){
        return this.state.tasks;
    }
    removeTask(id){
        let allTasks=this.getAllTasks();
        let newTasks=[];
        for(let index in allTasks){
            if(allTasks[index].id!==id){
                newTasks.push(allTasks[index]);
            }
        }
        console.log(newTasks);
        this.setState({tasks:newTasks});
        Cookie.setCookie('allTasks', JSON.stringify(newTasks), 10);
    }
 render(){
    return(
    <div className="container center">
        <div className="app-title">ReminderPro</div>
        <div className="row">
            <input id="task-name" className="col s5" type="text" placeholder="I have to..."></input>
            <input id="task-date" className="col s5 datepicker offset-s1" type="date"></input>
            <div className="col s1">
                <button onClick={()=>this.addItem()} className="btn-floating waves-effect waves-light blue"><i className="material-icons">add</i></button>
            </div>
            <div className="container col s12 center">
                {this.state.tasks.map((item, key) =>{
                    return <Tab key={item.id} deleteTask={(id)=>this.removeTask(id)} data={item}/>
                })}
            </div>
        </div>
    </div>
 );}
}
export default App;