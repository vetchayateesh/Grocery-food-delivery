import { Outlet } from "react-router-dom";
import Navbar, { userLoggedIn } from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { createContext, useState } from "react";
import { convertUsdToInr, handleSessionStorage } from "../../utils/utils";

export const groceryContext = createContext();
const Layout = () => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(userLoggedIn);
    const [cartItems, setCartItems] = useState(cartItemsFromSessionStorage);

    return (
        <groceryContext.Provider value={{
            userLoggedInState: [isUserLoggedIn, setIsUserLoggedIn],
            cartItemsState: [cartItems, setCartItems]
        }}>
            <Navbar />
            <section className="min-h-screen">
                <Outlet />
            </section>
            <Footer />
        </groceryContext.Provider>
    );
};

// Get CartItems from SessionStorage
const cartItemsFromSessionStorage = (handleSessionStorage('get', 'cartItems') || []).map((item) => {
    if (item.currency === 'INR') {
        return item;
    }

    const inrPrice = convertUsdToInr(item.price);
    const quantity = Number.parseFloat(item.quantity) || 1;

    return {
        ...item,
        price: inrPrice,
        total: (inrPrice * quantity).toFixed(2),
        currency: 'INR',
    };
});

export default Layout;