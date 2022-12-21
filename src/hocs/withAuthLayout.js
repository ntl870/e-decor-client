import Footer from "components/layout/Footer";
import Header from "components/layout/Header";
import React from "react";
import "./styles.css";
const withAuthLayout = (Component) => (props) => {
  return (
    <div className="app">
      {/* {!(getAuth() && getAuth().token) ? ( */}
      <>
        <Header />
        <div
          className="app__body"
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100vw",
            minHeight: "calc(100vh - 406.8px)",
            // paddingBottom: 500,
          }}
        >
          <Component {...props} />
        </div>
        <Footer />
      </>
    </div>
  );
};

export default withAuthLayout;
