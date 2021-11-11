import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import Ntweet from "components/Ntweet";
import NtweetFac from "components/NtweetFac";

const Home = ({ userObj }) => {
  const [ntweets, setNtweets] = useState([]);
  // 이 방법을 하면 리렌더링되서 실시간 반영이 안됨.
  //   const getNtweets = async () => {
  //     const dbntweets = await dbService.collection("ntweets").get();
  //     dbntweets.forEach((document) => {
  //       const ntweetObject = {
  //         ...document.data(),
  //         id: document.id,
  //       };
  //       setNtweets((prev) => [ntweetObject, ...prev]);
  //     }); // 새로 작성한 것들과 이전의 것들을 합쳐서 배열로 리턴함.
  //   };
  useEffect(() => {
    // getNtweets();
    dbService.collection("ntweets").onSnapshot((snapshot) => {
      const ntweetArray = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setNtweets(ntweetArray);
    });
  }, []);
  //   useEffect(() => {
  //     dbService.collection("ntweets").get();
  //   }, []);
  return (
    <div>
      <NtweetFac userObj={userObj} />
      <div>
        {ntweets.map((ntweet) => (
          <Ntweet key={ntweet.id} ntweetObj={ntweet} isOwner={ntweet.creatorId === userObj.uid} />
        ))}
      </div>
    </div>
  );
};

export default Home;
