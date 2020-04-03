import React,{Component, createRef} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {userContext} from './UserContext';
import { API } from '../backend';

class Login extends Component{
    constructor(){
        super();
        this.validateUser = this.validateUser.bind(this);
        this.emailref = createRef();
        this.passwordref = createRef();
        this.state = {
            message :'',
            data:{}
        }
    }

    validateUser(e){
        e.preventDefault();
        let val={email:this.emailref.current.value,password:this.passwordref.current.value};
        axios.post(API+'/signin',val)
        .then(result => {
            if(result.data !== null){
                this.context.state.updateUser(result.data.name,result.data._id,result.data.mobile)
                this.props.history.push('/')
            }
            else{
                this.setState({
                    message:'Invalid Credentials'
                })
            }
        }
        )
        .catch(error => 
            this.setState({
                error
            })
        );
        

    }
    static contextType = userContext;
    
    render(){
        return(
            <React.Fragment>
            
            <div style={{padding:'15% 30%'}}>
                <div className = 'card'>
                    <div className='card-header'>
                        <h2>Login</h2>
                    </div>
                    <div className='card-body'>
                    <div style={{color:'red'}}>{this.state.message}</div>
                        <form onSubmit={this.validateUser}>
                            <div className="form-group">
                                <div className=" ">
                                    <label>Email : </label>
                                </div>
                                <div className=" ">
                                    <input className='form-control' required ref={this.emailref}></input>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className=" ">
                                    <label>Password : </label>
                                </div>
                                <div className=" ">
                                    <input className='form-control' required ref={this.passwordref}></input>
                                </div>
                            </div>
                            <div className="form-group">
                            <div className=' '>
                            <button className="btn btn-primary" type="submit">Login</button>
                            </div>
                            
                            </div>
                            
                            <div style={{textAlign:'right'}} className =  'card-footer'>
                                New user? <Link to='/RegisterUser'>{"Register"}</Link>
                            </div>
                            

                        </form>
                    </div>
                </div>
                
            </div>
            
                

                
            </React.Fragment>
        )
    }
}

export default Login;