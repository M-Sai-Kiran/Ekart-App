import React,{Component} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { API } from '../backend';

class RegisterUser extends Component{
    constructor(){
        super();
        this.state = {
            name:'',
            email:'',
            password:'',
            confirmPassword:'',
            mobile:'',
            message:'',
            messageColor:'red',
            allemails:[]
        }
        this.validateUserAndRegister = this.validateUserAndRegister.bind(this);
    }

    componentDidMount(){
        axios.get(API+'/allemail').then(result=>{
            if(result.data.length>0){
                var arr =result.data;
                var newarr = [];
                for(var i=0 ;i< arr.length;i++){
                    newarr.push(arr[i].email)
                }
                this.setState({
                    allemails : newarr
                })
            }
            
        })
    }

    setRegisterState = (e)=>{
        const value = e.target.value;
        const field = e.target.name;
        this.setState({[field]:value});
    }

    validateUserAndRegister(e){
        e.preventDefault();
        this.setState({message : ''});
        if(this.state.name.trim() === '' || this.state.mobile.trim() === '' || this.state.email.trim() === '' || this.state.password.trim() === '' || this.state.confirmPassword.trim() === '') this.setState({message : 'All the fields are mandatory.'});
        else if(/[^a-z\s]/i.test(this.state.name)) this.setState({message : 'Name contains invalid character.'});
        else if(!(/^[a-zA-Z0-9]+\.*\_*[a-zA-Z0-9]*@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email)))  this.setState({message : 'Please enter valid Email.'});
        else if(this.state.allemails.includes(this.state.email)) this.setState({message : 'Email id is already used.'});
        else if(!(/[0-9]/).test(this.state.password) || !(/[a-z]/).test(this.state.password)|| !(/[A-Z]/).test(this.state.password)|| !(/[!@#$%^&*?><,\.]/).test(this.state.password)) this.setState({message : 'Password should contain at least an uppercase and a lower case character, a number and a special character.'});
        else if(this.state.password !== this.state.confirmPassword) this.setState({message : 'Password and Confirm Password are not matching.'});
        else{
            axios.post(API+'/register',{
                "name":this.state.name,
                "email" :this.state.email,
                "password":this.state.password,
                "role":0,
                "mobile" :this.state.mobile
            }).then(result=>{
                alert('You have registered successfully. Please continue to login');
                this.props.history.push('/login')
            }).catch(err=>console.log(err));
        }
        //if(/[1-9][0-9]+/.test(this.state.mobile)) this.setState({message : 'contains int.'});
    }
    
    render(){
        return(
            <React.Fragment>
                <div style={{padding:'15% 30%'}}>
                    <div className='card'>
                        <div className='card-header'>
                            <h2>Register</h2>
                        </div>
                        <div className='card-body'>
                            <div className="form-group">
                                <label style={{color:this.state.messageColor}}>{this.state.message}</label>
                            </div>
                            <form onSubmit={this.validateUserAndRegister}>
                                <div className="form-group">
                                    <label>Name : </label>
                                    <input className='form-control' type='text' name='name' required onChange={this.setRegisterState} value={this.state.name}></input>
                                </div>
                                <div className="form-group">
                                    <label>Email : </label>
                                    <input className='form-control' required type='email' name='email' onChange={this.setRegisterState} value={this.state.email}></input>
                                </div>
                                <div className="form-group">
                                    <label>Password : </label>
                                    <input className='form-control' required type='password' name='password' onChange={this.setRegisterState} value={this.state.password}></input>
                                </div>
                                <div className="form-group">
                                    <label>Confirm Password : </label>
                                    <input className='form-control' required type='text' name='confirmPassword' onChange={this.setRegisterState} value={this.state.confirmPassword}></input>
                                </div>
                                <div className="form-group">
                                    <label>Mobile : </label>
                                    <input className='form-control' name='mobile' type='number' required onChange={this.setRegisterState} value={this.state.mobile}></input>
                                </div>
                                <div className="form-group">
                                    <button className='btn btn-primary' type='submit'>Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default RegisterUser;