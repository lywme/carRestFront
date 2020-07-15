import React,{Component} from 'react';
import SkyLight from 'react-skylight'
import { toast } from 'react-toastify';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


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
                <SkyLight style={{margin:'auto',textAlign:'center'}} hideOnOverlayClicked ref={ref=>this.addform=ref}>
                    <form style={{margin:'auto',textAlign:'center'}}>
                    <h3>Add new car:</h3>
                    <TextField type="text" name="brand" value={this.state.brand} onChange={this.handleChange} placeholder="Brand" /><br/>
                    <TextField type="text" name="model" value={this.state.model} onChange={this.handleChange} placeholder="Model" /><br/>
                    <TextField type="text" name="color" value={this.state.color} onChange={this.handleChange} placeholder="Color" /><br/>
                    <TextField type="text" name="year" value={this.state.year} onChange={this.handleChange} placeholder="Year" /><br/>
                    <TextField type="text" name="price" value={this.state.price} onChange={this.handleChange} placeholder="Price" /><br/>
                    <Button variant="outlined" style={{margin:'10px'}} color="primary" onClick={this.handleSubmit}>Save</Button>
                    <Button variant="outlined" color="secondary" onClick={this.cancelSubmit}>Cancel</Button>
                    </form>
                </SkyLight>
                <Button style={{margin:'10px'}} variant="contained" color="primary" onClick={()=>this.addform.show()}>New Car</Button>
            </div>
        );
    }
}

export default AddCar;