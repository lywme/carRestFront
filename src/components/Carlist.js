import React,{Component} from 'react';
import './Carlist.css';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {SERVER_URL} from '../Constant.js';
import AddCar from './AddCar';
import UpdateCar from './UpdateCar';

class Carlist extends Component
{
    constructor(props)
    {
      super(props);
      this.state={cars:[]};
    }

    componentDidMount(){
        this.fetchcar();
    }

    fetchcar=()=>
    {
        fetch('http://127.0.0.1:8080/api/cars')
        .then((response)=>response.json())
        .then((responseData)=>{
            this.setState({
                cars:responseData._embedded.cars,
            });
        })
        .catch(err=>console.Console.error(err));
    }

    addCar=(car)=>{
        fetch(SERVER_URL+'/api/cars',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(car)
        })
        .then(res=>this.fetchcar())
        .catch(err=>console.error(err))
    }

    updateCar=(car,linkurl)=>{
        fetch(linkurl,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(car)})
        .then(
            res=>{
                toast.success("Changes saved",{position:toast.POSITION.BOTTOM_LEFT});
                this.fetchcar();
        }
    )
    }  

    confirmDelete=(link)=>{
        confirmAlert({
            message:'Are you sure to delete?',
            buttons:[
                {
                    label:'Yes',
                    onClick:()=>this.delcar(link)
                },
                {
                    label:'No',
                }
            ]
        })
    }

    delcar=(link)=>
    {
        fetch(link,{method:'DELETE'})
        .then(res=>{
            toast.success("Car deleted",{position:toast.POSITION.BOTTOM_LEFT});
            this.fetchcar();
        })
        .catch(err=>console.error(err))
    }

    edit=(index)=>{
        //console.log(index);
        //显示Update的输入框
        this.updateform.show();
    }

    render(){
        const tableRows=this.state.cars.map((item,index)=>
            <tr key={index}>
                <td>{item.brand}</td>
                <td>{item.model}</td>
                <td>{item.color}</td>
                <td>{item.year}</td>
                <td>{item.price}</td>
                <td><UpdateCar linkurl={item._links.self.href} updateCar={this.updateCar}/></td>
                <td><button onClick={()=>this.confirmDelete(item._links.self.href)}>delete</button></td>
            </tr>
        );
        return (<div>
            <AddCar addCar={this.addCar} fetchCar={this.fetchcar} />
            
            <table className="carTable">
            <thead><tr><th>Brand</th><th>Model</th><th>Color</th><th>Year</th><th>Price</th><th></th><th></th></tr></thead>
            <tbody>{tableRows}</tbody>
            </table>
            <ToastContainer autoClose={1500} />
        </div>);
    }
}

export default Carlist;