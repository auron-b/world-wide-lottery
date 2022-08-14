import React, { useState } from "react";
import styles from "./UserCard.module.css";
import { useDispatch } from "react-redux";
import { usersListActions } from "../store/userSlice.js";
import EditIcon from "../assets/icons8-edit.svg";
import SaveIcon from "../assets/save-svgrepo-com.svg";
const UserCard = (props) => {
  const dispatch = useDispatch();
  const user = props.user;
  const [editEmail, setEditEmail] = useState(false);
  const [newEmail, setNewEmail] = useState(user.email);

  const changeEmailView = () => {
    setEditEmail(!editEmail);
  };

  const saveEmailHandler = () => {
    dispatch(
      usersListActions.editEmail({
        id: user.id,
        newEmail: newEmail,
      })
    );
    changeEmailView();
  };

  const editEmailHandler = (e) => {
    setNewEmail(e.target.value);
  };

  let winnerBgColor = user.isWinner && props.winnerBgColor;
  return (
    <div
      className={styles.CurrentUsers}
      style={{ backgroundColor: winnerBgColor }}
    >
      <img src={user.picture} alt="Avatar" className={styles.AvatarImg} />
      <div className={styles.Container}>
        <h4>
          <b>{user.fullName}</b>
        </h4>
        {editEmail ? (
          <div className={styles.Email}>
            <input
              id="emailInput"
              type="text"
              defaultValue={newEmail}
              onChange={editEmailHandler}
            ></input>
            <img
              alt="save"
              src={SaveIcon}
              onClick={saveEmailHandler}
              className={styles.SaveIcon}
            />
          </div>
        ) : (
          <div className={styles.Email}>
            <p>Email: {newEmail}</p>
            <img
              src={EditIcon}
              onClick={changeEmailView}
              alt="edit"
              className={styles.EditIcon}
            />
          </div>
        )}
        <p>Gender: {user.gender}</p>
        <p>Phone: {user.cell}</p>
        <p>Location: {user.location}</p>
        <p>Nat: {user.nat}</p>
      </div>
    </div>
  );
};

export default UserCard;
