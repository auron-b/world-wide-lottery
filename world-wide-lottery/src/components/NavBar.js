import React from "react";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import CustomLink from "../utils/CustomLink";

const NavBar = () => {
  return (
    <nav className={styles.NavBar}>
      <Link to="/" className={styles.Title}>
        World Wide Lottery
      </Link>
      <ul>
        <CustomLink to="/home" active={styles.Active}>
          Home
        </CustomLink>
        <CustomLink to="/winners" active={styles.Active}>
          Winners
        </CustomLink>
        <CustomLink to="/session-players" active={styles.Active}>
          Session Players
        </CustomLink>
        <CustomLink to="/stats" active={styles.Active}>
          Statistics
        </CustomLink>
      </ul>
    </nav>
  );
};

export default NavBar;
