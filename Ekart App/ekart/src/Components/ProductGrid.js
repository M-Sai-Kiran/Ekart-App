import React,{Component} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link} from 'react-router-dom';
import axios from 'axios';
import {userContext} from './UserContext';
import {API} from '../backend';

class ProductGrid extends Component{
    static contextType = userContext;
    constructor() {
        super()
        this.state = {
            products: [],
            cartProd:[],
            "cartValue":0,
            todaysDeals:[]
        }
        this.filterProducts = this.filterProducts.bind(this);
        this.searchRef = React.createRef();
    }

    //initializing the products when page dom loads.
    componentDidMount(){
        this.FetchProducts();
        this.deals()
        if(this.context.state.userId !== ''){
            this.matchCart();
        }
        //match cart
        //product recomendations
    }

    async matchCart(){
        var guestCart = this.context.state.cartProd;
        for(let i=0;i<guestCart.length;i++){
            
            await axios.post(API+'/addtocart',{userid:this.context.state.userId,...guestCart[i]});
        }
        var result = await axios.post(API+'/getcart',{userid:this.context.state.userId});
        this.context.state.replaceCart(result.data);
    }

    FetchProducts(){
        axios.get('Products.json')
        .then(result => 
            this.setState({
                products:result.data
            })
        )
        .catch(error => 
            this.setState({
                error
            })
        );
    }

    //filtering the products based on search term
    filterProducts(){
        var keyWord = this.searchRef.current.value;
        console.log(keyWord);
        if(keyWord.trim() === ''){
            this.FetchProducts();
        }
        else{
            this.setState({
                products:this.state.products.filter(prod=>{
                    if(prod.productName.toLowerCase().includes(keyWord.toLowerCase())) return prod;
                })
            })
        }
    }

    //fetch daily deals
    deals(){
        axios.get('Products.json')
        .then(result => {
            var n = Math.min(4,result.data.length);
            this.setState({
                todaysDeals:result.data.slice(0,n)
            })
        }
            
        )
        .catch(error => 
            this.setState({
                error
            })
        );
        
    }

    rerouteToCart = ()=>{
        let addCart = {cartProd:this.state.cartProd,cartValue:this.state.cartValue}
        this.context.state.updateCart(addCart);
        this.props.history.push('/cart');
    }

    render(){
        //todays deals
        var todaysDeals = this.state.todaysDeals 

        //recomendations based on past orders
        var recomendations = [];

        return(
            <React.Fragment>
                <br></br><br></br><br></br>
                <div className="row" style={{padding:'5px'}}>
                    <div className='col-4'></div>
                    <div className='col-4' style={{display:'flex'}}>
                        
                        <input ref={this.searchRef} className="form-control mr-sm-2" type="text" placeholder="Search Products"></input>
                        
                        <button className="btn btn-primary" onClick={this.filterProducts}>
                            <i className="fa fa-search"></i>
                        </button>
                        
                        
                    </div>
                    <div className='col-4'>
                        
                    </div>
                    
                </div>
                
                <br></br>
                <h4 hidden={todaysDeals.length === 0} className='row'>&nbsp;&nbsp;&nbsp;Todays deals</h4>
                <div className='row'>
                
                {todaysDeals.length>0? 
                    todaysDeals.map(product=>{
                        return(
                            <div key={product.productId} className="col-3" style={{padding:'5px'}}>
                                <div className="card" >
                                    <div className="card-body text-center">
                                        <div>
                                            <img src ={product.imageUrl} alt='prod 1' title='product 1' style={{width:'80px',height:'120px',margin:'12px'}} />
                                        </div>
                                        <div className="caption">
                                            <div>
                                                <Link to={'/product/'+product.productId} >
                                                    { product.productName}
                                                </Link>
                                            </div>
                                            <div>Actual price: &#8377;{product.price+2000}</div>
                                            <div>Todays price: &#8377;{product.price}</div>
                                            <div></div>
                                            {/*<app-rating  class="ratingcolor" [rate]='product.rating'></app-rating>*/}									
                                            
                                        </div>
                                    </div>
                                </div>
                        
                            </div>
                            
                        )
                    })
                    : <b></b>
                }
                </div><br></br>
                
                

                <h4 hidden={this.state.products.length === 0} className='row'>&nbsp;&nbsp;&nbsp;All Products</h4>
                <div className='row'>
                {
                    this.state.products.length>0?
                    this.state.products.map(product=>{
                        return(
                            <div key={Math.random()} className="col-3" style={{padding:'5px'}}>
                                <div className="card" >
                                    <div className="card-body text-center">
                                        <div>
                                            <img src ={product.imageUrl} alt='prod 1' title='product 1' style={{width:'80px',height:'120px',margin:'12px'}} />
                                        </div>
                                        <div className="caption">
                                            <div>
                                                <Link to={'/product/'+product.productId} >
                                                    { product.productName}
                                                </Link>
                                            </div>
                                            <div>Category:&nbsp;{product.category}</div>
                                            <div>Rating:&nbsp;{product.rating}/5</div>
                                            <div>&#8377;{product.price}</div>
                                            <div></div>
                                            {/*<app-rating  class="ratingcolor" [rate]='product.rating'></app-rating>*/}									
                                            
                                        </div>
                                    </div>
                                </div>
                        
                            </div>
                            
                        )
                    }):<center>&nbsp;&nbsp;&nbsp;&nbsp;<span className='h1'>No Data Found</span></center>
                }
                   
                </div>
               
            </React.Fragment>
           )
    }
}

export default ProductGrid;