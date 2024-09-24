export const getRecommendations = (products, categories, setRecommendations) => {

  const store = localStorage.getItem("searches");
  let searches = store ? JSON.parse(store) : [];
  let recommendation = [];
  
  if (searches) {
    searches.forEach((search) => {
      products?.forEach((product) => {
        if (search === product?.name) {
          categories = categories.concat(product.category[0]?.name);
        }
      });
    });

    products?.forEach((product) => {
      categories.forEach((category) => {
        if (product.category[0]?.name.includes(category) && recommendation.indexOf(product) === -1) {
          recommendation = recommendation.concat(product);
        }
      });
    });
  }
  setRecommendations(recommendation);
};