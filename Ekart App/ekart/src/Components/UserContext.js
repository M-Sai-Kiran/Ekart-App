import React,{createContext,Component} from 'react';

//context creation
export const userContext = createContext();

//provider class creation
class UserProvider extends Component{
    state = {
        userId : '',
        "username" : "Guest",
        "email":"guest@guest.com",
        mobile:'',
        "password":"",
        cartProd:[],
        "cartValue":0,
        updateUser : (name,id,mobile)=> {
            this.setState({
                username : name,
                userId : id,
                mobile : mobile
            })
        },
        updateCart : (addProd)=>{
            var cartarr = this.state.cartProd;
            let added =false;
            for(let i=0; i<cartarr.length;i++){
                if(cartarr[i].productId === addProd.productId){
                    added =true;
                    cartarr[i].quantity = addProd.quantity;

                }
            }
            if(!added) cartarr.push(addProd);
            this.setState({
                cartProd:cartarr
            })
        },
        replaceCart : (cartarr)=>{
            this.setState({
                cartProd:cartarr
            })
        }
    }

    render(){
        return(
            <userContext.Provider value={{
                state:this.state
            }}>
                {this.props.children}
            </userContext.Provider>
        )
    }
}

export default UserProvider;