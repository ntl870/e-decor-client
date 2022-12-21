import { withAuthLayout } from "hocs";
import AddBlog from "pages/blog/addBlog";
import EditBlog from "pages/blog/editBlog";
import MyBlogs from "pages/blog/myBlogs";
import MyFavorite from "pages/blog/myFavorite";
import withBlog from "pages/blog/withBlog";
import Cart from "pages/cart";
import Checkout from "pages/checkout";
import NotFound from "pages/NotFound";
import withSeller from "pages/seller";
import Dashboard from "pages/seller/dashboard";
import SellerOrderDetail from "pages/seller/orderDetail";
import SellerOrders from "pages/seller/orders";
import Products from "pages/seller/products";
import CategoryProducts from "pages/seller/products/categoryProducts";
import NewProduct from "pages/seller/products/newProduct";
import ViewProduct from "pages/seller/products/viewProduct";
import Promotions from "pages/seller/promotions";
import Settings from "pages/seller/settings";
import withUser from "pages/user";
import Address from "pages/user/address";
import ChangePassword from "pages/user/changePass";
import OrderDetail from "pages/user/orderDetail";
import Orders from "pages/user/orders";
import PaymentMethods from "pages/user/paymentMethods";
import Profile from "pages/user/profile";
import Support from "pages/user/support";
import Wishlist from "pages/user/wishlist/Wishlist";
import React from "react";
import { Route, Switch } from "react-router-dom";

const Main = () => {
  return (
    <Switch>
      <Route path={"/cart"} component={withAuthLayout(Cart)} exact />
      <Route path={"/checkout"} component={withAuthLayout(Checkout)} exact />

      {/* user */}

      <Route path={"/profile"} component={withUser(Profile)} exact />
      <Route path={"/orders"} component={withUser(Orders)} exact />
      <Route path={"/orders/:id"} component={withUser(OrderDetail)} exact />
      <Route path={"/wishlist"} component={withUser(Wishlist)} exact />
      <Route path={"/support"} component={withUser(Support)} exact />
      <Route
        path={"/payment-methods"}
        component={withUser(PaymentMethods)}
        exact
      />
      <Route path={"/address"} component={withUser(Address)} exact />
      <Route path={"/address/:id"} component={withUser(Address)} exact />
      <Route
        path={"/change-password"}
        component={withUser(ChangePassword)}
        exact
      />

      {/* shop */}

      <Route path={"/shop/dashboard"} component={withSeller(Dashboard)} exact />
      <Route path={"/shop/settings"} component={withSeller(Settings)} exact />
      <Route
        path={"/shop/promotions"}
        component={withSeller(Promotions)}
        exact
      />
      <Route
        path={"/shop/promotions/:id"}
        component={withSeller(Promotions)}
        exact
      />
      <Route path={"/shop/products"} component={withSeller(Products)} exact />
      <Route
        path={"/shop/products/:categoryName"}
        component={withSeller(CategoryProducts)}
        exact
      />
      <Route
        path={"/shop/products/:categoryName/:productId"}
        component={withSeller(ViewProduct)}
        exact
      />
      <Route
        path={"/shop/add-product"}
        component={withSeller(NewProduct)}
        exact
      />
      <Route
        path={"/shop/add-product/:categoryName"}
        component={withSeller(NewProduct)}
        exact
      />
      <Route path={"/shop/orders"} component={withSeller(SellerOrders)} exact />
      <Route
        path={"/shop/orders/:id"}
        component={withSeller(SellerOrderDetail)}
        exact
      />

      {/* blog */}

      <Route path="/blog/my-posts" component={withBlog(MyBlogs)} exact />
      {/* <Route
        path="/blog/my-posts/:blogId"
        component={withBlog(MyBlogDetail)}
        exact
      /> */}
      <Route path="/blog/my-posts/add" component={withBlog(AddBlog)} exact />
      <Route
        path="/blog/my-posts/edit/:postId"
        component={withBlog(EditBlog)}
        exact
      />
      <Route path="/blog/my-favorite" component={withBlog(MyFavorite)} exact />

      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Main;
