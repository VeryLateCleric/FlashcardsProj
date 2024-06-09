import React from "react";
import { Link, useMatch } from "react-router-dom";

//Home, Link, Title props to pass to link
function Breadcrumb({ navTitles }) {
    const { url } = useMatch();
    const crumbs = url ? url.split("/") : [];

    const navItems = navTitles
        ? navTitles.map((title, index) => {

            if (index === navTitles.length - 1)
            return (
                <li key={index} className="breadcrumb-item " aria-current="page">
                {title}
                </li>
            );

            const crumb = crumbs.slice(0, 3).join("/");
            return (
            <li key={index} className="breadcrumb-item">
                <Link to={crumb}>{title}</Link>
            </li>
            );
        })
        : navTitles;

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">
            <span
                className="oi oi-home"
                title="Home" 
            ></span>
            Home
          </Link>
        </li>
        {navItems}
      </ol>
    </nav>
  );
}

export default Breadcrumb;