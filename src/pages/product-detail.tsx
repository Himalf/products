import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProduct } from "../types/product";
import { FaStar } from "react-icons/fa";
import { fetchProductById } from "../api/ProductApi";
type Props = {};

export default function ProductDetail({}: Props) {
  const [product, setProduct] = useState<IProduct | null>(null);
  const { id } = useParams<{ id: string }>();

  const fetchProduct = async () => {
    if (id) {
      const data = await fetchProductById(id);
      setProduct(data);
      console.log(data, "single product");
    } else {
      console.error("Product ID is undefined");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <section className="flex flex-col items-center justify-center">
        {product ? (
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 max-w-4xl px-4">
            <div className="w-full md:w-1/2">
              <img
                src={product.images[0]}
                alt="product detail"
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="w-full md:w-2/3 space-y-6">
              <div className="text-2xl font-semibold text-gray-800">
                {product.title}
              </div>
              <div className="text-xl text-gray-600">{product.description}</div>
              <div className="text-lg text-gray-700 mt-4">
                <strong>Category:</strong> {product.category}
              </div>
              <div className="text-lg text-gray-700 mt- flex items-center gap-1">
                <strong>rating:</strong> {product.rating}{" "}
                <FaStar className="text-sm text-yellow-400" /> (
                {product.reviews.length} Reviews)
              </div>
              <div className="text-lg text-gray-700 ">
                <strong>Price:</strong> ${product.price}
              </div>
              <div className="mt-6 gap-4 flex item-center">
                <button className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-all">
                  Add to Cart
                </button>
                <button className="bg-red-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-red-600 transition-all">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>loading</div>
        )}
      </section>
    </main>
  );
}
