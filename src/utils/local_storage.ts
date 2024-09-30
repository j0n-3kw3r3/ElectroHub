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


export function storeBusinessAuthInfo(authInfo) {
  localStorage.setItem("businessAuthInfo", JSON.stringify(authInfo));
}

export function getBusinessAuthInfo() {
  let authInfo = localStorage.getItem("businessAuthInfo");
  if (authInfo) {
    try {
      authInfo = JSON.parse(authInfo);
    } catch (e) {
      authInfo = {};
    }
  }

  return authInfo;
}

export function clearBusinessAuthInfo() {
  localStorage.removeItem("businessAuthInfo");
}
