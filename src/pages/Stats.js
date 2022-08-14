import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import PrimaryButton from "../components/PrimaryButton";
import styles from "./Stats.module.css";
import { setOrientation } from "../utils/sorting";

const Stats = () => {
  const users = useSelector((state) => state.users.users);
  const [sortOrientation, setSortOrientation] = useState("descending");

  let nations = users.reduce((acc, current) => {
    acc[current.nat] = (acc[current.nat] || 0) + 1;
    return acc;
  }, {});

  const [sortedNat, setSortedNat] = useState(nations);
  useEffect(() => {
    let condition;
    if (sortOrientation === "descending") {
      condition = ([, current], [, next]) => next - current;
    } else {
      condition = ([, current], [, next]) => current - next;
    }
    setSortedNat(
      Object.entries(nations)
        .sort(condition)
        .reduce((acc, [nat, count]) => ({ ...acc, [nat]: count }), {})
    );
  }, [sortOrientation]);

  const changeSort = () => {
    setSortOrientation(setOrientation(sortOrientation));
  };
  return (
    <div className={styles.Stats}>
      <NavBar />
      <PrimaryButton onClick={changeSort}>
        Sort {sortOrientation === "descending" ? "Ascending" : "Descending"}
      </PrimaryButton>
      <div className={styles.StatsContainer}>
        {Object.keys(sortedNat).map((user) => {
          return (
            <div className={styles.Nat} key={user}>
              <h1>NAT: {user}</h1>
              <p>Number of players: {sortedNat[user]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stats;
