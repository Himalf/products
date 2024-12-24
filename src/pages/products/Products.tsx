import { useEffect, useState } from "react";
import { IProduct } from "../../types/product";
import { Link } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const fetchProducts = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      console.log(data, "the resulting data");
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="grid grid-cols-4 place-items-center place-content-center gap-10">
      {(products as IProduct[]).map((val) => {
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
  );
};

export default Products;
