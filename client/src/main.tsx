import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { GlobalContext } from "./Context/GlobalContext.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductState from "./Context/ProductContext.tsx";
import CartFavouritesState from "./Context/CartFavouritesContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <GlobalContext>
          <ProductState>
            <CartFavouritesState>
              <App />
            </CartFavouritesState>
          </ProductState>
        </GlobalContext>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
