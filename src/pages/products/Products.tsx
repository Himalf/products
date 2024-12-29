import { useEffect, useState } from "react";
import { IProduct } from "../../types/product";
import { Link } from "react-router-dom";
// import { FaStar } from "react-icons/fa";
import Pagination from "../../components/Pagination";
// import { fetchProducts as fetchProduct } from "../../api/ProductApi";
import { fetchWithAuth } from "../../api/api";
const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  //  Pagination logics and maths
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = products.slice(startIndex, endIndex);

  // fetching the products
  const fetchProducts = async () => {
    try {
      const data = await fetchWithAuth("products");
      console.log(data, "the  data");
      setProducts(data);
    } catch (error) {
      console.error("Error while fetching ", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [itemsPerPage, currentPage]);

  return (
    <div className="p-5 bg-gray-200 min-h-screen">
      <h1 className="capitalize  text-2xl p-2 my-2 font-semibold text-blue-400">
        our products
      </h1>
      <main className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1  place-items-center place-content-center gap-10">
        {currentItems.map((val) => {
          return (
            <section className="cursor-pointer p-4 border w-full h-auto bg-white shadow-md rounded-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-full h-56 overflow-hidden flex justify-center items-center">
                <img
                  src={val.image}
                  alt="product image"
                  className=" object-cover h-56 w-56"
                />{" "}
              </div>
              <div className="font-semibold text-xl mt-4">{val.title}</div>
              <div className="flex justify-between items-center mt-2">
                <div>${val.price}</div>
                {/* <div className="flex items-center">
                  {val.rating} <FaStar className="text-yellow-400" /> (
                  {val.reviews.length})
                </div> */}
              </div>
              <Link to={`/products/${val.productId}`} className="">
                <button className="mt-4 w-full object-cover bg-blue-600 text-white font-semibold text-lg rounded-md py-1">
                  Show More
                </button>
              </Link>
            </section>
          );
        })}
      </main>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onpageChange={setCurrentPage}
      />
    </div>
  );
};

export default Products;
