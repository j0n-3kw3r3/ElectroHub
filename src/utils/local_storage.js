let localStorage = window.localStorage;



export function storeCartInfo(cartInfo) {
  localStorage.setItem("cartInfo", JSON.stringify(cartInfo));
}

export function getCartInfo() {
  let cartInfo = localStorage.getItem("cartInfo");
  if (cartInfo) {
    try {
      cartInfo = JSON.parse(cartInfo);
    } catch (e) {
      cartInfo = {};
    }
  }

  return cartInfo;
}

export function clearCartInfo() {
  localStorage.removeItem("cartInfo");
}
