import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
import {Link,Redirect} from 'react-router-dom';
import {userContext} from './UserContext';
import {API} from '../backend';
import axios from 'axios';


class Nav extends React.Component{
    static contextType = userContext;
    constructor(props){
        super(props);
        this.state={
            redirect:false
        }
        this.clearUser = this.clearUser.bind(this)
    }
    
    clearUser(e){
        e.preventDefault()
        this.context.state.updateUser('Guest','','')
        if(this.context.state.userId !== ''){
            this.matchCartAndClear();
        }
        this.setState({
            redirect:true
        })
        
    }

    async matchCartAndClear(){
        var guestCart = this.context.state.cartProd;
        for(let i=0;i<guestCart.length;i++){
            
            await axios.post(API+'/addtocart',{userid:this.context.state.userId,...guestCart[i]});
        }
        var result = await axios.post(API+'/getcart',{userid:this.context.state.userId});
        this.context.state.replaceCart([]);
    }

    render(){
        

        let user = this.context;
        return(
            <React.Fragment>
            <nav className="navbar bg-dark navbar-dark navbar-right fixed-top">
            <Link title='Home' to="/"> 
            <img src='/images/cart.png' alt="Ekart" style={{width:"40px"}}/> <span className='h5' style={{color:'white'}}>Ekart</span>
            </Link>
            <div className='col-4'></div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            
            <div className='col-4' style={{display:'flex'}}>
                <li className="h7" style={{listStyle:'none',color:'white'}}>
                    Hi {user.state.username}&nbsp;!
                </li>
                <li style={{listStyle:'none'}}>
                    <Link className="btn btn-success offset-8" style={{display:'flex',width:'110px'}} to='/cart'>
                        <span className="fa fa-cart-plus"></span>&nbsp;&nbsp;{this.context.state.cartProd.length}&nbsp;items
                    </Link>
                </li>
                
            </div>
           
            {user.state.userId !== ''? <Link to='/updateuser'><span className="fa fa-id-card"></span>&nbsp;profile</Link> : <b></b>}
            <div>
                <ul className="navbar-nav" style={{display:'flex'}}>
                    <li className="nav-item">
                        {
                            user.state.username === 'Guest'?<Link to="/login"> 
                            <button className="btn btn-primary">Login</button> 
                        </Link> : <Link to='/'><button className="btn btn-primary" onClick={this.clearUser}>Logout</button> </Link>
                        }
                            
                    </li>
                    
                </ul>
            </div>
            
            </nav>
            {this.state.redirect?<Redirect to='/login'></Redirect>:<div></div>}
            </React.Fragment>
        )
    }
}

export default Nav;
