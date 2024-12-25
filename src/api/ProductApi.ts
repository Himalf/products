const API_URL = import.meta.env.VITE_API_URL;
export const fetchProducts = async () => {
  try {
    const res = await fetch(`${API_URL}`);
    const data = await res.json();
    return data.products;
  } catch (error) {
    console.error("Error while fetching ", error);
  }
};

export const fetchProductById = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error while fetching ", error);
  }
};
