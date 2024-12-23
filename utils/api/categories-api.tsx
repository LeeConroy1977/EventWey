import axios from "axios";

export const fetchAllTags = async (): Promise<any[]> => {
  try {
    const categoriesResponse = await axios.get(
      `http://localhost:3000/categories`
    );
    const categories = categoriesResponse.data;

    const tags = categories.map((category) => category.tags).flat();
    const uniqueTags = [...new Set(tags)];
    return uniqueTags;
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw error;
  }
};

export const fetchAllCategories = async (): Promise<any[]> => {
  try {
    const categoriesResponse = await axios.get(
      `http://localhost:3000/categories`
    );
    const categories = categoriesResponse.data;

    const categotyArray = categories.map((category) => category.category);

    return categotyArray;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
