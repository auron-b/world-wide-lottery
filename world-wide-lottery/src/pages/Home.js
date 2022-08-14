import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
// import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { usersListActions } from "../store/userSlice.js";
import UserCard from "../components/UserCard";
import victorySound from "../assets/Victory.mp4";
import NavBar from "../components/NavBar";
import PrimaryButton from "../components/PrimaryButton";
const Home = () => {
  const dispatch = useDispatch();
  const sound = new Audio(victorySound);
  let [isWinner, setIsWinner] = useState(false);
  const [loading, setloading] = useState(false);

  const lastUser = useSelector((state) => state.users.currentUser);

  const getRandomUser = () => {
    setloading(true);
    axios
      .get("https://randomuser.me/api?page={pageIndex}")
      .then((response) => {
        console.log(response);
        let randomNr = Math.floor(Math.random() * 100);
        let res = response.data.results[0];
        // when the id value is null use email value as id
        let crrid = res.id.value != null ? res.id.value : res.email;
        // console.log(res, crrid);
        const currentUsr = {
          picture: res.picture.thumbnail,
          fullName: res.name.title + " " + res.name.first + " " + res.name.last,
          email: res.email,
          gender: res.gender === "male" ? "M" : "F",
          cell: res.cell,
          phone: res.phone,
          location:
            res.location.country +
            "/" +
            res.location.city +
            "/" +
            res.location.street.number +
            "-" +
            res.location.street.name,
          nat: res.nat,
          //   nat: "CH",
          isWinner: res.registered.age === randomNr,
          // isWinner: true,
          age: res.registered.age,
          timesPlayed: 1,
          time: res.registered.date,
          id: crrid,
        };
        setIsWinner(currentUsr.isWinner);
        dispatch(usersListActions.upsertUser(currentUsr));
        setloading(false);
      })
      .catch((error) => {
        alert(error);
        setloading(false);
      });
  };

  const clearSession = () => {
    dispatch(usersListActions.clearUsersList());
  };

  useEffect(() => {
    if (isWinner) {
      sound.play();
    }
  }, [isWinner]);
  return (
    <div className={styles.Home}>
      <NavBar />
      <div className={styles.Button}>
        <PrimaryButton type="button" onClick={getRandomUser}>
          Generate User
        </PrimaryButton>
        {loading && <div className={styles.Loader}></div>}
      </div>
      <div>{!!lastUser && <UserCard key={lastUser.id} user={lastUser} />}</div>
      <PrimaryButton type="button" onClick={clearSession}>
        Clear Session
      </PrimaryButton>
      <div
        id="myModal"
        className={styles.Modal}
        style={{ display: isWinner ? "block" : "" }}
      >
        <div className={styles.ModalContent}>
          <span className={styles.Close} onClick={() => setIsWinner(false)}>
            &times;
          </span>
          <p>{lastUser && lastUser.fullName} is a Winner</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
