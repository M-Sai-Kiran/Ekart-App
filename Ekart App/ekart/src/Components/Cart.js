import React,{Component} from 'react';
import {userContext} from './UserContext';
import {API} from '../backend';
import axios from 'axios';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Cart extends Component{
    static contextType = userContext;
    constructor(){
        super();
        this.updateCart = this.updateCart.bind(this);
        this.placeOrder = this.placeOrder.bind(this);
        this.state={
            total:0
        }
    }

    goHome=()=>{
        this.props.history.push('/')
    }

    async placeOrder(){
        if(this.context.state.userId !== '') await axios.post(API+'/deleteitem',{userid:this.context.state.userId});
        this.context.state.replaceCart([])
        alert('Thank you for placing order with us.')
        this.props.history.push('/')
    }

    componentDidMount(){
        if(this.context.state.userId !== ''){
            this.matchCart();
        }
        this.calcTotal();
    }

    async matchCart(){
        var guestCart = this.context.state.cartProd;
        for(let i=0;i<guestCart.length;i++){
            
            await axios.post(API+'/addtocart',{userid:this.context.state.userId,...guestCart[i]});
        }
        var result = await axios.post(API+'/getcart',{userid:this.context.state.userId});
        this.context.state.replaceCart(result.data);
    }

    updateCart=(id,quant,act)=>{
        quant = act=='i'? quant+1:quant-1
        quant = quant>4?4:quant;
        quant= quant<1?1:quant;
        var val = {
            productId : id,
            quantity: quant
        }
        this.context.state.updateCart(val)
        this.calcTotal();
    }

    calcTotal(){
        var cart = this.context.state.cartProd;
        var total =0;
        for(let i=0;i<cart.length;i++) total+= (cart[i].price*cart[i].quantity)
        this.setState({
            total : total
        });
    }

    deleteItem=(id,sum)=>{
        var cart = this.context.state.cartProd;
        if(this.context.state.userId !== ''){
            axios.post(API+'/deleteitem',{userid:this.context.state.userId,productId:id});
        }
        
        cart = cart.filter(item=>{
            if(item.productId !== id) return item;
        })
        this.context.state.replaceCart(cart)
        this.setState({
            total : this.state.total-sum
        });
    }

    render(){
        var cart = this.context.state.cartProd;
        return (
        
            <React.Fragment>
            
            <div style={{padding:'15% 30%'}}>
                <div className = 'card'>
                    <div className='card-header'>
                        <h2>Cart Details</h2>
                    </div>
                    <div className="card-body">
                        <table className="table">
                        <thead style={{color:'blue',fontSize:'15px'}}>
                            <tr><th>Product</th><th>Quantity</th><th>Price</th><th>Total Price</th><th></th></tr>
                        </thead>
                        <tbody>
                            {cart.length>0? cart.map(item=>{
                                return(
                                    <tr key={item.productId}>
                                    <td>{item.productName}</td>
                                    <td>&nbsp;<i style={{color:'red'}} className="fa fa-minus-circle" onClick={this.updateCart.bind(this,item.productId,item.quantity,'d')}></i>&nbsp;<span style={{width:'50px',height:'30px'}}>{item.quantity}</span>&nbsp;<i style={{color:'green'}} className="fa fa-plus-circle" onClick={this.updateCart.bind(this,item.productId,item.quantity,'i')}></i></td>
                                    <td>&#8377;{item.price}</td>
                                    <td>&#8377;{item.quantity*item.price}</td>
                                    <td><i title="Delete" onClick={this.deleteItem.bind(this,item.productId,item.price*item.quantity)} className="fa fa-trash-o" style={{color:'red'}} aria-hidden="true"></i></td>
                                    </tr>
                                )
                            })
                            
                            :<tr><td><center><h5>No Items to show</h5></center></td></tr>}
                            <tr hidden={cart.length===0}>
                            <td></td>
                            <td></td>
                            <td style={{color:'blue',fontSize:'15px',fontWeight:'bold'}}>Total </td>
                            <td>&#8377;{this.state.total}</td>
                            <td></td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    <div style={{textAlign:'left'}} className =  'card-footer'>
                        <button onClick={this.goHome} className="btn btn-primary">Continue Shopping</button>
                        <button hidden={cart.length===0} onClick={this.placeOrder} className="btn btn-primary offset-5">Place Order</button>
                    </div>
                </div>
                
            </div>
            </React.Fragment>
        
            
            
            
        )
    }
}

export default Cart;