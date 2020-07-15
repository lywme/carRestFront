import React,{Component} from 'react';
import SkyLight from 'react-skylight'
import { toast } from 'react-toastify';


class AddCar extends Component{
    constructor(props)
    {
        super(props);
        this.state={brand:'',model:'',color:'',year:'',price:''};
    }

    handleChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    cancelSubmit=(event)=>{
        event.preventDefault();
        this.addform.hide();
    }

    handleSubmit=(event)=>{
        //发送post请求
        event.preventDefault();
        this.props.addCar(this.state);
        this.setState({brand:'',model:'',color:'',year:'',price:''});
        this.addform.hide();
        toast.success("Car added",{position:toast.POSITION.BOTTOM_LEFT});
    }



    render(){
        return (
            <div>
                <SkyLight hideOnOverlayClicked ref={ref=>this.addform=ref} title="Add car">
                    <form>
                    <input type="text" name="brand" value={this.state.brand} onChange={this.handleChange} placeholder="Brand" /><br/>
                    <input type="text" name="model" value={this.state.model} onChange={this.handleChange} placeholder="Model" /><br/>
                    <input type="text" name="color" value={this.state.color} onChange={this.handleChange} placeholder="Color" /><br/>
                    <input type="text" name="year" value={this.state.year} onChange={this.handleChange} placeholder="Year" /><br/>
                    <input type="text" name="price" value={this.state.price} onChange={this.handleChange} placeholder="Price" /><br/>
                    <button onClick={this.handleSubmit}>Save</button>
                    <button onClick={this.cancelSubmit}>Cancel</button>
                    </form>
                </SkyLight>
                <button style={{margin:'10px'}} onClick={()=>this.addform.show()}>New Car</button>
            </div>
        );
    }
}

export default AddCar;