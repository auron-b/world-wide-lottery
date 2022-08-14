import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserCard from "../components/UserCard";
import NavBar from "../components/NavBar";
import PrimaryButton from "../components/PrimaryButton";
import styles from "./Winners.module.css";
import { sortAscDes, setOrientation } from "../utils/sortAscDes";
const Winners = () => {
  const winners = useSelector((state) => state.users.winners);
  const [sortOrientation, setSortOrientation] = useState("descending");
  const [sortedWinners, setSortedWinners] = useState(winners);

  useEffect(() => {
    setSortedWinners(sortAscDes(sortOrientation, sortedWinners));
  }, [sortOrientation]);

  const onChange = () => {
    setSortOrientation(setOrientation(sortOrientation));
  };
  return (
    <div className={styles.Winners}>
      <NavBar />
      <PrimaryButton onClick={onChange}>
        Sort {sortOrientation === "descending" ? "Ascending" : "Descending"}
      </PrimaryButton>
      <div className={styles.WinnersContainer}>
        {sortedWinners.map((user) => {
          return <UserCard key={user.id} user={user} />;
        })}
      </div>
    </div>
  );
};

export default Winners;
