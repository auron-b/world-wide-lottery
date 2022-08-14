import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import PrimaryButton from "../components/PrimaryButton";
import styles from "./Stats.module.css";
import { sortAscDes, setOrientation } from "../utils/sortAscDes";

const Stats = () => {
  const users = useSelector((state) => state.users.users);
  const [sortOrientation, setSortOrientation] = useState("descending");

  let fromNation = users.reduce((acc, crr) => {
    acc[crr.nat] = (acc[crr.nat] || 0) + 1;
    return acc;
  }, {});

  const [sortedNat, setSortedNat] = useState(fromNation);

  useEffect(() => {
    if (sortOrientation === "descending") {
      setSortedNat(
        Object.entries(fromNation)
          .sort(([, a], [, b]) => b - a)
          .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
      );
    } else {
      setSortedNat(
        Object.entries(fromNation)
          .sort(([, a], [, b]) => a - b)
          .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
      );
    }
  }, [sortOrientation]);

  const changeSort = () => {
    setSortOrientation(setOrientation(sortOrientation));
  };
  return (
    <div className={styles.Stats}>
      <NavBar />
      <PrimaryButton onClick={changeSort}>Sort</PrimaryButton>
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
