/* Author: Ailsa Prideaux-Mooney, April 2025 */

import React, { useState, useEffect } from 'react';
import TravelTipForm from '../components/TravelTipForm';
import TravelTipPost from '../components/TravelTipPost';
import '../styles/IrelandTravelTips.scss'; // styles

const IrelandTravelTips = () => {
   //state to store the list of submitted travel tips
  const [tips, setTips] = useState([]);
  //state to store whether the component has finished its first load (I added this cos it kept overwriting localStorage)
  const [isInitialized, setIsInitialized] = useState(false);

  //load tips from localStorage
  useEffect(() => {
    //parse JSON if present
    const savedTips = JSON.parse(localStorage.getItem('travelTips')) || [];
    //set tips
    setTips(savedTips);
    //set isInitialized to true to stop localStorage being overwritten
    setIsInitialized(true); 
  }, []);   //empty array - only run once on mount

  //save to localStorage only after initial load
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('travelTips', JSON.stringify(tips));
    }
  }, [tips, isInitialized]);  //run when tips change but only after initialization

  //add new tip
  const addTip = (newTip) => {
    //add new tip to beginning of array and spread existing tips after it
    setTips([newTip, ...tips]);
  };

  //like a tip, increment the like count
  const likeTip = (id) => {
    //iterate thru tips array to find matching id, spread operator maintains values, increment likes count by 1
    setTips(tips.map(tip => tip.id === id ? { ...tip, likes: tip.likes + 1 } : tip));  //leave non-matching tips unchanged
  };

  //delete a tip, ask user to enter email to check it's the same as the one entered when creating post
  const deleteTip = (id) => {
    //find tip by ID
    const tipToDelete = tips.find(tip => tip.id === id);
    //before any action taken, prompt user to enter email
    const enteredEmail = prompt('Please enter your email to delete this post:');
    //check entered email against the .email part of the tip to be deleted, optional chaining to protect against error if undefined
    if (enteredEmail === tipToDelete?.email) {
      //if emails match iterate thru array, keep all except matching id, update tips state with new array
      setTips(tips.filter(tip => tip.id !== id));
    //if emails don't match, return an alert and don't delete
    } else {
      alert("Email does not match. You can only delete your own posts.");
    }
  };

  //edit a tip, and just as with delete, ask user to enter email to check it's the same as the one entered when creating post
  const editTip = (id, updatedTip) => {
    //find tip by ID
    const tipToEdit = tips.find(tip => tip.id === id);
    //ask user to enter email to confirm edit
    const enteredEmail = prompt('Please enter your email to edit this post:');
    //if emails match, update the tip
    if (enteredEmail === tipToEdit?.email) {
      setTips(tips.map(tip => tip.id === id ? { ...tip, tip: updatedTip } : tip));
    //if emails don't match, return an alert and don't update
    } else {
      alert("Email does not match. You can only edit your own posts.");
    }
  };

  return (

    <>
    <div className="tips-page-header">
    <h2>Travel Tips</h2>
     <div className="tip-info">
       <p>
       Got a favourite Irish destination? Share your travel tips and discover others here.
       </p>
     </div>  
  </div> 

    <div className="travel-tips-page">

      {/*form to submit a new travel tip */}
      <TravelTipForm onAddTip={addTip} />

      {/*list of travel tip posts */}
        <div className="tips-list">
        {/*use map to iterate through tips array and dispay a TravelTipPost component for each tip*/}
            {tips.map(tip => (
            <TravelTipPost
                key={tip.id}  //unique identifier
                post={tip}    //passing tip object to post prop so details can be displayed 
                onLike={likeTip}  //passing likeTip function to onLike prop
                onDelete={deleteTip} //passing deleteTip function to onDelete prop
                onEdit={editTip}   //passing editTip function to onEdit prop
                />
            ))}
        </div>
    </div>
    </>
  );
};

export default IrelandTravelTips;

