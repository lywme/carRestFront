import React,{Component} from 'react';
import './Carlist.css';

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

    delcar=(link)=>
    {
        fetch(link,{method:'DELETE'})
        .then(res=>this.fetchcar())
        .catch(err=>console.error(err))
    }

    render(){
        const tableRows=this.state.cars.map((item,index)=>
            <tr key={index}>
                <td>{item.brand}</td>
                <td>{item.model}</td>
                <td>{item.color}</td>
                <td>{item.year}</td>
                <td>{item.price}</td>
                <td><button onClick={()=>this.delcar(item._links.self.href)}>delete</button></td>
            </tr>
        );
        return (<div>
            <table className="carTable">
            <thead><tr><th>Brand</th><th>Model</th><th>Color</th><th>Year</th><th>Price</th><th></th></tr></thead>
            <tbody>{tableRows}</tbody>
            </table>
        </div>);
    }
}

export default Carlist;