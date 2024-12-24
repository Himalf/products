import { useEffect, useState } from "react";
import { IProduct } from "../../types/product";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const fetchProducts = async () => {
    try {
      const res = await fetch(`https://dummyjson.com/products`);
      const data = await res.json();
      console.log(data.products, "the  data");
      setProducts(data.products);
    } catch (error) {
      console.error("Error while fetching ", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [itemsPerPage,currentPage]);
  const totalPages = Math.ceil(products.length/itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = products.slice(startIndex, endIndex);

  return (
   <div className="p-5 bg-gray-200 min-h-screen">
     <main className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1  place-items-center place-content-center gap-10">
      {currentItems.map((val) => {
        return (
          <section className="cursor-pointer p-4 border w-80 h-auto bg-white shadow-md rounded-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-full h-56 overflow-hidden flex justify-center items-center">
              <img
                src={val.images[0]}
                alt="product image"
                className=" object-cover h-56 w-56"
              />{" "}
            </div>
            <div className="font-semibold text-xl mt-4">{val.title}</div>
           <div className="flex justify-between items-center mt-2" >
           <div>${val.price}</div>
           <div>{val.rating}({val.reviews.length})</div>
           </div>
            <div className="mt-4">
              <Link
                to={`/products/${val.id}`}
                className="bg-blue-600 text-white font-bold text-md px-5 py-1 rounded-md"
              >
                Show More
              </Link>       
            </div>
          </section>
        );
      })}
    </main>
{/* for pagination buttons  */}
<div className="flex justify-center items-center gap-3 p-2 my-2">
{Array.from({length:totalPages},(_,index)=>(
     <button key={index} className={`px-4 py-2 rounded-md ${currentPage=== index+1?"bg-blue-500 text-white": "bg-gray-200 text-blue-500"}`}
     onClick={()=>{
        setCurrentPage(index+1)
     }}
     >
        {index+1}

     </button>
))}
</div>

   </div>
  );
};

export default Products;
