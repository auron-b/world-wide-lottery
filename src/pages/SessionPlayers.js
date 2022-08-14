import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserCard from "../components/UserCard";
import { ExportCSV } from "../components/ExportCSV";
import NavBar from "../components/NavBar";
import PrimaryButton from "../components/PrimaryButton";
import styles from "./SessionPlayers.module.css";
import { sortByOrientation, setOrientation } from "../utils/sorting";

const SessionPlayers = () => {
  const users = useSelector((state) => state.users.users);
  const [sortOrientation, setSortOrientation] = useState("descending");
  const [sortedUsers, setSortedUsers] = useState(users);

  useEffect(() => {
    setSortedUsers(sortByOrientation(sortOrientation, sortedUsers));
  }, [sortOrientation]);

  const onChange = () => {
    setSortOrientation(setOrientation(sortOrientation));
  };

  return (
    <div className={styles.SessionPlayers}>
      <NavBar />
      <PrimaryButton onClick={onChange}>
        Sort {sortOrientation === "descending" ? "Ascending" : "Descending"}
      </PrimaryButton>
      <ExportCSV csvData={users} fileName={"session-players"} />
      <div className={styles.SessionPlayersContainer}>
        {sortedUsers.map((user) => {
          return <UserCard winnerBgColor={"green"} key={user.id} user={user} />;
        })}
      </div>
    </div>
  );
};

export default SessionPlayers;
