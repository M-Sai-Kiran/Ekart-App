import React,{Component, createRef} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {userContext} from './UserContext';

class Product extends Component{
    static contextType = userContext;
    constructor(){
        super();
        this.state={
            product:[],
            quant:1
        }
        this.filterProduct = this.filterProduct.bind(this);
    }
    
    
    filterProduct(prod){
        console.log(prod.productId)
        if(prod.productId.toString() === this.props.match.params.prodId.toString()) return prod;
    }

    componentDidMount(){
        
        axios.get('http://localhost:3000/Products.json')
        .then(result => 
            this.setState({
                product:result.data.filter(prod=>{
                    if(prod.productId.toString().trim() === this.props.match.params.prodId.toString().trim()) return prod;
                })
            })
        )
        .catch(error => 
            this.setState({
                error
            })
        );
    }

    quantcheck =(e)=>{
        let value = e.target.value;
        value = value>4?4:value;
        const field = e.target.name;
        this.setState({[field]:value});
    }
    
    updateCart=()=>{
        var val = {
            productId : this.state.product[0].productId,
            productName:this.state.product[0].productName,
            productImage:this.state.product[0].imageUrl,
            quantity:this.state.quant,
            price:this.state.product[0].price
        }
        this.context.state.updateCart(val)
    }
    render(){
        return(
            <React.Fragment>
                <div >
                    { this.state.product.length>0?
                        <div style={{padding:'15% 30%'}}>
                            <div className = 'card'>
                                <div className='card-header'>
                                    <h2>Product Details</h2>
                                </div>
                                <div className='card-body'>
                                    <div className='row'>
                                        <div className='col-4'><br/>
                                        <img src ={'http://localhost:3000/'+this.state.product[0].imageUrl} alt='prod 1' title='product 1' style={{width:'80px',height:'120px',margin:'12px'}} />
                                        </div>
                                        <div className='col-8'>
                                        <h4>{this.state.product[0].productName}</h4>
                                        by {this.state.product[0].manufacturer}<br/><br/>
                                        <b>actual price</b> : &#8377;{this.state.product[0].price}<br/>
                                        <b>price after discount : </b>&#8377;{this.state.product[0].price - 200}<br/>
                                        <b>description : </b>{this.state.product[0].description}<br/>
                                        <b>rating : </b>{this.state.product[0].rating}
                                        </div>
                                    </div>
                                    {
                                        this.state.product[0].reviews.length>0?
                                        <div className="row">
                                        
                                            <div className="ul">
                                            <div className='li'><b>reviews :</b></div>
                                            {
                                                this.state.product[0].reviews.map(rev=>{
                                                    return(
                                                        <div className="li" key={Math.random()}>
                                                        <b>{rev.author} : </b><br></br>
                                                        {rev.review}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        </div> :
                                        <div></div>
                                    }
                                    
                                </div>
                                
                                <div style={{textAlign:'left',display:'flex'}} className =  'card-footer'>
                                    <Link to='/'><button className="btn btn-primary">back</button></Link>
                                    <span style={{display:'flex'}} className="offset-5">
                                        Qty:&nbsp; <input className="form-control" min="1" max="4" onChange={this.quantcheck} name="quant" value={this.state.quant} style={{width:'50px',height:'30px'}} type="number"></input>
                                        &nbsp;&nbsp;&nbsp;<button className="btn btn-primary" onClick={this.updateCart}>add to cart</button>
                                    </span>
                                </div>
                            </div>
                            
                        </div>
                        
                    :<center>&nbsp;&nbsp;&nbsp;&nbsp;<span className='h1'>No Data Found</span></center>
                    }
                </div>
            </React.Fragment>
        )
    }
}

export default Product;