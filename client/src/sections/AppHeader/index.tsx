import React from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";

import logo from "./assets/anton-logo.png";

const { Header } = Layout;

export const AppHeader = () => {
  return (
    <Header className="app-header">
      <div className="app-header__logo-search-section">
        <div className="app-header__logo">
          <Link to="/">
            <img src={logo} alt="App logo" />
          </Link>
        </div>
      </div>
    </Header>
  );
};