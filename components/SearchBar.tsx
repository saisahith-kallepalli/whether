"use client";
import React, { useEffect, useState } from "react";
import styles from "../styles/SearchBar.module.scss";


const SearchBar = ({ onSearch }: any) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search for a city..."
        value={searchTerm}
        style={{ color: "#000000" }}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
