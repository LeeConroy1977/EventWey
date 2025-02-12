import axios from "axios";
const API = "https://eventwey.glitch.me";

export const fetchAllTags = async (): Promise<any[]> => {
  try {
    const categoriesResponse = await axios.get(`${API}/categories`);
    const categories = categoriesResponse.data;

    const tags = categories.map((category: any) => category.tags).flat();
    const uniqueTags = [...new Set(tags)];
    return uniqueTags;
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw error;
  }
};

export const fetchAllCategories = async (): Promise<string[]> => {
  try {
    const categoriesResponse = await axios.get(`${API}/categories`);

    const categories = categoriesResponse.data;

    if (!Array.isArray(categories)) {
      throw new Error("Unexpected categories format");
    }

    const categoryArray = categories.map((category) => {
      if (!category.category) {
        throw new Error(`Invalid category object: ${JSON.stringify(category)}`);
      }
      return category.category;
    });

    return categoryArray;
  } catch (error) {
    console.error("Error fetching categories:", error);
    // @ts-ignore
    throw new Error(`Error fetching categories: ${error.message}`);
  }
};
