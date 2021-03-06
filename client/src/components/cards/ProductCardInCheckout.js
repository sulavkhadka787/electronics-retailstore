import React from 'react';

const ProductCardInCheckout=({p})=>{

    return(
        <tbody>
            <tr>
                <td>Image</td>
                <td>{p.title} </td>
                <td> {p.price}   </td>
                <td> {p.brand}   </td>
                <td> {p.color}   </td>
                <td> {p.count}   </td>
                <td>  Shipping icon  </td>
                <td>  Delete icon  </td>
            </tr>
        </tbody>
    )
}
export default ProductCardInCheckout;