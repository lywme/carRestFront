import React,{Component} from 'react';
import SkyLight from 'react-skylight';
import { toast } from 'react-toastify';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class UpdateCar extends Component{
    constructor(props)
    {
        super(props);
        this.state={brand:'',model:'',color:'',year:'',price:''};
    }

    // componentDidMount(){
    //     console.log(this.props.id);
    // }

    showUp=()=>{
        //console.log(this.props.linkurl);
        //拿到link
        const linkurl=this.props.linkurl;
        //根据id获取相应数据 get请求
        this.fetchacar(linkurl);

        this.updateform.show();
    }

    fetchacar=(linkurl)=>
    {
        fetch(linkurl)
        .then((response)=>response.json())
        .then((responseData)=>{
            this.setState(responseData)
        })
        .catch(err=>console.Console.error(err));
    }

  

    handleChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    cancelSubmit=(event)=>{
        event.preventDefault();
        this.updateform.hide();
    }

    handleSubmit=(event)=>{
        event.preventDefault();
        
        //发送put更新数据
        this.props.updateCar(this.state,this.props.linkurl);

        
        this.updateform.hide();
        
    }

    render(){
        return (
            <div>
                <Button size="small" variant="text" color="primary" onClick={()=>this.showUp()}>edit</Button>
                <SkyLight hideOnOverlayClicked ref={ref=>this.updateform=ref}>
                    <form>
                    <h3>Update a car:</h3>
                    <TextField type="text" name="brand" value={this.state.brand} onChange={this.handleChange} placeholder="Brand" /><br/>
                    <TextField type="text" name="model" value={this.state.model} onChange={this.handleChange} placeholder="Model" /><br/>
                    <TextField type="text" name="color" value={this.state.color} onChange={this.handleChange} placeholder="Color" /><br/>
                    <TextField type="text" name="year" value={this.state.year} onChange={this.handleChange} placeholder="Year" /><br/>
                    <TextField type="text" name="price" value={this.state.price} onChange={this.handleChange} placeholder="Price" /><br/>
                    <Button variant="outlined" style={{margin:'10px'}} color="primary" onClick={this.handleSubmit}>Update</Button>
                    <Button variant="outlined" color="secondary" onClick={this.cancelSubmit}>Cancel</Button>
                    </form>
                </SkyLight>
            </div>
        );
    }
}

export default UpdateCar;
