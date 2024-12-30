import { Link, useNavigate } from "react-router-dom";

type Props = {};

export default function LandingPage({}: Props) {
  const navigate = useNavigate();
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to Our Store</h1>
      <p className="text-lg mb-8">Browse our amazing products!</p>

      <Link to="/products">
        <button className="px-6 py-3 bg-blue-500 text-white font-semibold text-xl rounded-lg shadow-lg hover:bg-blue-600 transition duration-300">
          Go to Products
        </button>
      </Link>
      <button
        className="px-6 py-3 bg-blue-500 mt-3 text-white font-semibold text-xl rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        Logout
      </button>
    </main>
  );
}
