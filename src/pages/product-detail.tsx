import React, { useEffect, useState } from 'react'
import { CgFormatLineHeight } from 'react-icons/cg';
import { useParams } from 'react-router-dom'
import { IProduct } from '../types/product';
 type Props = {}

export default function ProductDetail({}: Props) {
    const [products, setProducts] = useState<IProduct[]>([]);
    const id = useParams();
        console.log(id)
    const fetchProducts = async()=>{
        const res = await fetch(`https://fakestoreapi.com/products/${id}`)
        const data = await res.json();
        setProducts(data);
    }
    useEffect(()=>{
        fetchProducts();
    })
  return (
    <main>
        <section>
            {(products).map((val)=>{
                return(
                    <div>
                         <div>{val.title}</div>
                    </div>
                   
                )
            })}
        </section>
    </main>
  )
}