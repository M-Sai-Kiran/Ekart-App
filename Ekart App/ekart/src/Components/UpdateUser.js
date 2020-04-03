import React,{Component, createRef} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {userContext} from './UserContext';
import { API } from '../backend';

class UpdateUser extends Component{
    static contextType = userContext;
    
    constructor(){
        super();
        this.nameref = createRef();
        this.mobileref = createRef('');
        this.passwordref = createRef();
        this.cpasswordref = createRef('');
        this.validateUser = this.validateUser.bind(this);
        this.state = {
            message :'',
            messColor:'red'
        }
    }

    componentDidMount(){
        if(this.context.state.userId === ''){
            this.props.history.push('/login')
        }
        else{
            this.nameref.current.value = this.context.state.username;
            this.passwordref.current.value = this.context.state.password;
            this.mobileref.current.value = this.context.state.mobile;
        }
    }

    validateUser(e){
        e.preventDefault();
        var name = this.nameref.current.value.trim();
        var password = this.passwordref.current.value.trim();
        var cpassword = this.cpasswordref.current.value.trim();
        var mobile = this.mobileref.current.value.trim();
        this.setState({message : '',messColor:'red'});
        if(name === '' || mobile === '' || password === '' || cpassword === '' || mobile === '') this.setState({message : 'All the fields are mandatory.'});
        else if(/[^a-z\s]/i.test(name)) this.setState({message : 'Name contains invalid character.'});
        else if(!(/[0-9]/).test(password) || !(/[a-z]/).test(password)|| !(/[A-Z]/).test(password)|| !(/[!@#$%^&*?><,\.]/).test(password)) this.setState({message : 'Password should contain at least an uppercase and a lower case character, a number and a special character.'});
        else if(password !== cpassword) this.setState({message : 'Password and Confirm Password are not matching.'});
        else{
            axios.post(API+'/updateuser',{
                id : {"_id" : this.context.state.userId},
                updateObj : {
                    "name" : name,
                    "password":password,
                    "mobile":mobile
                }
            }).then(result=>{
                this.context.state.updateUser(name,this.context.state.userId,mobile)
                this.setState({
                    message : 'You have Updated your details successfully.',messColor:'green'
                })
            }).catch(err=>console.log(err));
        }
    }

    render(){
        
        
        return (
        
            <React.Fragment>
            
            <div style={{padding:'15% 30%'}}>
                <div className = 'card'>
                    <div className='card-header'>
                        <h2>Update Details</h2>
                    </div>
                    <div className='card-body'>
                    <div style={{color:this.state.messColor}}>{this.state.message}</div>
                        <form onSubmit={this.validateUser}>
                            <div className="form-group">
                                <label>Name : </label>
                                <input className='form-control' type='text' name='name' required ref={this.nameref}></input>
                            </div>

                            <div className="form-group">
                                <div className=" ">
                                    <label>Mobile : </label>
                                </div>
                                <div className=" ">
                                    <input required className='form-control' ref={this.mobileref}></input>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className=" ">
                                    <label>Password : </label>
                                </div>
                                <div className=" ">
                                    <input required className='form-control' ref={this.passwordref}></input>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Confirm Password : </label>
                                <input className='form-control' required type='text' name='confirmPassword' ref={this.cpasswordref}></input>
                            </div>
                            <div className="form-group">
                            <div style={{textAlign:'right'}} >
                            <button className="btn btn-primary" type="submit">Update</button>
                            </div>
                            
                            </div>
                            
                            

                        </form>
                    </div>
                    
                    <div style={{textAlign:'left'}} className =  'card-footer'>
                        <Link to='/'><button className="btn btn-primary">back</button></Link>
                    
                    </div>
                </div>
                
            </div>
            </React.Fragment>
        
            
            
        )
    }
}

export default UpdateUser;