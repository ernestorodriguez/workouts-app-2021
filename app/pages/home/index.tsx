import React, { ReactElement } from "react";
import Gallery from "../../components/Gallery";
import Header from "../../components/Header";

const Home = (): ReactElement => (
  <div className="home-page">
    <Header />
    <h1 className="home-page__title">
      <small className="home-page__title--lighter">
        Get Fit & Happy at Home
      </small>
      <br />
      WorkItUp!
    </h1>
    <Gallery />
  </div>
);

export default Home;
