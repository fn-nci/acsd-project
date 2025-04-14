/* Author: Ailsa Prideaux-Mooney, April 2025 */

import React, { useState } from 'react';

//get props from IrelandTravelTips.js (post - tip object, onLike - fx to handle likes, onDelete - to handle delete and onEdit to handle Edit) 
const TravelTipPost = ({ post, onLike, onDelete, onEdit }) => {
  //to track if tip is in edit mode
  const [isEditing, setIsEditing] = useState(false);
  //to store updated version of tip when editing
  const [updatedTip, setUpdatedTip] = useState(post.tip);

  //function to handle submission of updated tip
  const handleEditSubmit = (e) => {  
    e.preventDefault();    //stop refresh on submit
    onEdit(post.id, updatedTip);   //call onEdit fx, passed as prop
    setIsEditing(false);  //exit edit mode by setting state to false
  };

  return (
    <div className="tip-card">  
      <h3>{post.name}'s Travel Tip</h3>   {/* show author name in title */}
      {isEditing ? (     //if editing mode is enabled
        <form onSubmit={handleEditSubmit}>   
          <textarea value={updatedTip}   //attach textarea value to updatedTip state
            onChange={(e) => setUpdatedTip(e.target.value)} />  {/* update state on user input*/}
          <button type="submit">Save</button>   {/*button to save changes */}
        </form>
      ) : (   // otherwise, if not editing, show tip content and action buttons
        <>
          <p>{post.tip}</p> {/*show travel tip text */}
          <div className="tip-actions">  {/*div for action buttons */}
            {/*call onLike when clicked*/}
            <button className="like-btn" onClick={() => onLike(post.id)}>❤️ Like ({post.likes})</button>  {/*show current number of likes */}
            {/*enter edit mode when clicked by setting IsEditing to true*/}
            <button className="edit-btn" onClick={() => setIsEditing(true)}>✏️ Edit</button>
            {/*call onDelete when clicked*/}
            <button className="delete-btn" onClick={() => onDelete(post.id)}>🗑️ Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default TravelTipPost;
