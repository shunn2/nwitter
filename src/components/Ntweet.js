import { dbService, storageService } from "fbase";
import React, { useState } from "react";

const Ntweet = ({ ntweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNtweet, setNewNtweet] = useState(ntweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this ntweet?");
    if (ok) {
      await dbService.doc(`ntweets/${ntweetObj.id}`).delete();
      await storageService.refFromURL(ntweetObj.attachmentUrl).delete();
    } //`~
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`ntweets/${ntweetObj.id}`).update({
      text: newNtweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNtweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input type="text" placeholder="Edit your ntweet" value={newNtweet} required onChange={onChange} />
            <input type="submit" value="Update ntweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{ntweetObj.text}</h4>
          {ntweetObj.attachmentUrl && <img src={ntweetObj.attachmentUrl} width="50px" height="50px" />}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Ntweet</button>
              <button onClick={toggleEditing}>Edit Ntweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Ntweet;
