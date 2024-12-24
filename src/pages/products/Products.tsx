import { useEffect, useState } from "react";
import { IProduct } from "../../types/product";
import { Link } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const fetchProducts = async () => {
    try {
      const res = await fetch(`https://fakestoreapi.com/products`);
      const data = await res.json();
      console.log(data, "the  data");
      setProducts(data);
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
   <div className="p-5">
     <main className="grid grid-cols-4 place-items-center place-content-center gap-10">
      {currentItems.map((val) => {
        return (
          <section className="cursor-pointer p-2 border w-80 h-96 border-red-400 rounded-md">
            <div className="w-56">
              <img
                src={val.image}
                alt="product image"
                className=" object-cover h-56 w-56"
              />{" "}
            </div>
            <div className="font-semibold text-xl">{val.title}</div>
            <div>${val.price}</div>
            <div>
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
<div className="">
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
