import React, { useState, useEffect } from 'react';
import {getProduct,productStar} from '../functions/product';
import SingleProduct from "../components/cards/SingleProduct";
import {useSelector} from 'react-redux';
import {showAverage} from "../functions/rating";

const Product=({match})=>{
    const[product,setProduct]=useState({});
    const [star,setStar]=useState(0);

    //redux
    const {user}=useSelector((state)=>({...state}));

    const {slug}=match.params;
    

    useEffect(()=>{
        loadSingleProduct();
    },[slug]);

    useEffect(()=>{
        if(product.ratings && user){
            let existingRatingObject=product.ratings.find(
                (ele)=>ele.postedBy.toString()===user._id.toString()
            );
            existingRatingObject && setStar(existingRatingObject.star);
        }
    });

    const loadSingleProduct=()=>getProduct(slug).then(res=>setProduct(res.data));

    const onStarClick=(newRating,name)=>{
        setStar(newRating);
        console.log('newrating-name',newRating,name);
        productStar(name,newRating,user.token)
            .then(res=>{
                console.log("res==",res);
                console.log("res==data",res.data);
                loadSingleProduct(); //if you want to show updated rating in real time
            })
    }

    return(
        <>
            <div className="container-fluid">
                <div className="row pt-4">
                    <SingleProduct 
                        product={product} 
                        onStarClick={onStarClick}
                        star={star}
                    />
                </div>

                <div className="row">
                    <div className="col text-center pt-5 pb-5">
                        <hr/>
                            <h4>Related Products</h4>
                        <hr/>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Product;