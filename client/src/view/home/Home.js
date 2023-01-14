import React, { useEffect } from "react";
import "./_home.scss";
import SearchForm from "../../component/search/SearchForm";
import logo from "../../asset/logo192.png";
function Home() {
   useEffect(() => {
    localStorage.removeItem("search");
   }, []);
  return (
    <section className="hero">
      <div className="logo-container">
        <div className="title">
          <h1>Travelo</h1>
        </div>
      </div>
      <div className="hero-content">
        <SearchForm class="search-form" />
      </div>
    </section>
  );
}

export default Home;
