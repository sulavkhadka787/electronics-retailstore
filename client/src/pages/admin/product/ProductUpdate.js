import React,{useState,useEffect} from 'react';
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {getProduct} from "../../../functions/product";
import {getCategories,getCategorySubs} from "../../../functions/category";
import FileUpload from '../../../components/forms/FileUpload';
import {LoadingOutlined} from '@ant-design/icons';
//import {useParams} from 'react-router-dom';
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

const initialState={
    title:'',
    description:'',
    price:'',
    category:'',
    subs:[],
    shipping:'',
    quantity:'',
    images:[],
    colors:["Black","Brown","Silver","White","Blue"],
    brands:["Apple","Samsung","Microsoft","Lenevo","Asus"],
    color:'',
    brand:''
}

const ProductUpdate=({match})=>{
    //state
    const [values,setValues]=useState(initialState);
    const [categories,setCategories]=useState([]);
    const [subOptions,setSubOptions]=useState([]);

    const {user}=useSelector((state)=>({...state}));

    // let params=useParams();
    const {slug}=match.params;

    useEffect(()=>{
        loadProduct();
        loadCategories();
    },[]);

    const loadProduct=()=>{
        getProduct(slug)
            .then(p=>{
               // console.log('single product',p)
               setValues({...values,...p.data});
            })
    }

    const loadCategories=()=>
        getCategories().then((c)=>{
            console.log('GET CATEGORIES IN UPDATE PRODUCT',c.data);
            setCategories(c.data);
    });

    const handleSubmit=(e)=>{
        e.preventDefault();
        //
    }

    const handleChange=(e)=>{
        setValues({...values,[e.target.name]:e.target.value});
        //console.log(e.target.name,"======",e.target.value);
    }

    const handleCategoryChange=(e)=>{
        e.preventDefault();
        console.log('Clicked Category',e.target.value);
        setValues({...values,subs:[],category:e.target.value});
        getCategorySubs(e.target.value)
            .then(res=>{
                console.log("Sub Options on category click",res);
                setSubOptions(res.data);
            });
    }

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">
                    <h4>Product update</h4>
                    {/* {JSON.stringify(match.params.slug)} */}
                    {/* {JSON.stringify(values)} */}
                    <hr/>                    
                    <ProductUpdateForm 
                        handleSubmit={handleSubmit} 
                        handleChange={handleChange} 
                        setValues={setValues}
                        values={values}
                        handleCategoryChange={handleCategoryChange}
                        categories={categories}
                        subOptions={subOptions}
                    />
                </div>
            </div>
            
        </div>
    )
}

export default ProductUpdate;