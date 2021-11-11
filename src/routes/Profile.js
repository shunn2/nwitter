import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default ({ refreshUser, userObj }) => {
  const history = useHistory();
  const [NewDisplay, setNewDisplay] = useState(userObj.displayName);
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplay(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== NewDisplay) {
      await userObj.updateProfile({
        displayName: NewDisplay,
      });
      refreshUser();
    }
  };

  const getMyntweet = async () => {
    const getntweet = await dbService.collection("ntweets").where("creatorId", "==", userObj.uid).orderBy("createdAt", "desc").get();
    console.log(getntweet.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    getMyntweet();
  }, []);
  return (
    <>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} type="text" placeholder="Display Name" value={NewDisplay} />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
