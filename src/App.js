import { withAuthLayout } from "hocs";
import withoutAuth from "hocs/withoutAuth";
import Blog from "pages/blog/Blog";
import Posts from "pages/blog/Posts";
import ViewPost from "pages/blog/ViewPost";
import withBlogGuess from "pages/blog/withBlogGuess";
import ForgotPassword from "pages/ForgotPassword";
import Home from "pages/Home";
import Login from "pages/Login";
import Main from "pages/Main";
import Product from "pages/product";
import Search from "pages/product/search";
import ResetPassword from "pages/ResetPassword";
import Shops from "pages/shops";
import ShopDetail from "pages/shops/shop";
import SignUp from "pages/SignUp";
import VerifyEmail from "pages/VerifyEmail";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import PrivateRoute from "route/PrivateRoute";

function App() {
  return (
    <Switch>
      <Route path="/" component={withAuthLayout(Home)} exact />
      <Redirect from={"/home"} to={"/"} />

      <Route path={"/login"} component={withoutAuth(Login)} exact />
      <Route path={"/sign-up"} component={withoutAuth(SignUp)} exact />
      <Route
        path={"/verify-email"}
        component={withoutAuth(VerifyEmail)}
        exact
      />
      <Route
        path={"/forgot-password"}
        component={withoutAuth(ForgotPassword)}
        exact
      />
      <Route
        path={"/reset-password"}
        component={withoutAuth(ResetPassword)}
        exact
      />

      <Route path={"/shops"} component={withAuthLayout(Shops)} exact />
      <Route path={"/shops/:id"} component={withAuthLayout(ShopDetail)} exact />
      <Route path={"/product/:id"} component={withAuthLayout(Product)} exact />

      <Route path={"/products"} component={withAuthLayout(Search)} exact />
      <Route
        path={"/products/:categoryName"}
        component={withAuthLayout(Search)}
        exact
      />

      <Route path="/blog" component={withBlogGuess(Blog)} exact />
      <Route path="/blog/posts" component={withBlogGuess(Posts)} exact />
      <Route
        path="/blog/posts/:postId"
        component={withBlogGuess(ViewPost)}
        exact
      />

      <PrivateRoute path="/">
        <Main />
      </PrivateRoute>
    </Switch>
  );
}

export default App;
