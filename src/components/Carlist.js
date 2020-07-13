import React,{Component} from 'react';

class Carlist extends Component
{
    constructor(props)
    {
      super(props);
      this.state={cars:[]};
    }

    componentDidMount(){
        fetch('http://127.0.0.1:8080/api/cars')
        .then((response)=>response.json())
        .then((responseData)=>{
            this.setState({
                cars:responseData._embedded.cars,
            });
        })
        .catch(err=>console.Console.error(err));
    }

    render(){
        const tableRows=this.state.cars.map((item,index)=>
            <tr key={index}>
                <td>{item.brand}</td>
                <td>{item.model}</td>
                <td>{item.color}</td>
                <td>{item.year}</td>
                <td>{item.price}</td>
            </tr>
        );
        return (<div>
            <table>
            <tbody>{tableRows}</tbody>
            </table>
        </div>);
    }
}

export default Carlist;