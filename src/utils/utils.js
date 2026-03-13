// Set Session Storage Function //
export const handleSessionStorage = (action, key, target) => {
  // Set to SessionStorage
  if (action === "set") {
    sessionStorage.setItem("grocery_" + key, JSON.stringify(target));
  }
  // Get from SessionStorage
  else if (action === "get") {
    return JSON.parse(sessionStorage.getItem("grocery_" + key));
  }
  // Remove From SessionStorage
  else if (action === "remove") {
    sessionStorage.removeItem("grocery_" + key);
  }
};

export const USD_TO_INR_RATE = 83;

export const convertUsdToInr = (value) => {
  const amount = Number.parseFloat(value);
  if (Number.isNaN(amount)) {
    return 0;
  }

  return Number.parseFloat((amount * USD_TO_INR_RATE).toFixed(2));
};

export const formatInr = (value) => {
  const amount = Number.parseFloat(value);
  if (Number.isNaN(amount)) {
    return "INR 0.00";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
