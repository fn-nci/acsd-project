/* Author: Ailsa Prideaux-Mooney, April 2025 */

import React, { useState } from 'react';

const TravelTipForm = ({ onAddTip }) => {
  //declaring variables for storing name, email, travel tip input values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tip, setTip] = useState('');

  //function to handle form submission
  const handleSubmit = (e) => {  
    e.preventDefault();     //stop refresh
    //make sure all fields are filled in
    if (name && email && tip) { 

      //if everything is there, create newTip object  
      const newTip = {
        id: Date.now(),   //timestamp for id  - hmmm I used this but now am wondering what would happen
        name,             //if two posts were created at the same time? but I'll stick with this for now
        email,
        tip,
        likes: 0,   //initialize number of likes to 0
      };

      //if one or more fields is missing, return alert
      if (!name || !email || !tip) {
        alert("Please fill in all fields!");
        return;
      }      

      //call onAddTip function from IrelandTravelTips.js to add the new tip
      onAddTip(newTip);
      //clear input fields after submission
      setName('');
      setEmail('');
      setTip('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="travel-tip-form">
      <h2>Submit Your Travel Tip</h2>
      {/*input field for user name, giving it a placeholder, setting max length and making it required */}
      <input
        className="form-field" type="text" placeholder="Name"
        value={name} onChange={(e) => setName(e.target.value)}   //update state when user types
        required maxLength={280}
      />
      {/*input field for user email, giving it a placeholder, making it required */}
      <input
        className="form-field" type="email" placeholder="Email address"
        value={email} onChange={(e) => setEmail(e.target.value)}  //update when user types
        required
      />
      {/*textarea for the travel tip */}
      <textarea
        className="form-field" placeholder="Your travel tip..."
         value={tip} onChange={(e) => setTip(e.target.value)} //update when user types
        required
      />
      <button type="submit">Submit Travel Tip</button>
    </form>
  );
};

export default TravelTipForm;
