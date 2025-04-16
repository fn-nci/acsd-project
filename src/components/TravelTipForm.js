/* Author: Ailsa Prideaux-Mooney, April 2025 */

import React, { useState } from 'react';

const TravelTipForm = ({ onAddTip }) => {
  //declaring variables for storing name, email, travel tip input values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tip, setTip] = useState('');
  const [submitted, setSubmitted] = useState(false); // adding state for submission feedback

  //function to handle form submission
  const handleSubmit = (e) => {  
    e.preventDefault();     //stop refresh
    const emailIsValid = /\S+@\S+\.\S+/.test(email);  //basic email validation
    //make sure all fields are filled in
    if (name && email && tip) { 

      //if everything is there, create newTip object  
      const newTip = {
        id: Date.now(),   //timestamp for id  - hmmm I used this but now am wondering what would happenif two posts were created 
        name,             //at the same time? these are things that keep me awake at night, but I'll stick with this for now
        email,
        tip,
        likes: 0,   //initialize number of likes to 0
      };

      //if one or more fields is missing, return alert
      if (!name.trim || !email.trim || !tip.trim) {
        alert("Please fill in all fields!");
        return;
      }      
      //validation for email format
      if (!emailIsValid) {
        alert("Please enter a valid email address!");
        return;
      }

      //call onAddTip function from IrelandTravelTips.js to add the new tip
      onAddTip(newTip);
      //clear input fields after submission
      setName('');
      setEmail('');
      setTip('');
      setSubmitted(true); //trigger thank you message

      //hide the thank-you message after 5 seconds
      setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  }
};

  return (
    <form onSubmit={handleSubmit} className="travel-tip-form">
      <h2>Submit Your Travel Tip</h2>

      {/*than you message after successful submission */}
      {submitted && (
        <p className="tip-thank-you" style={{ color: 'green', fontWeight: 'bold' }}>
          Thank you for sharing your travel tip!
        </p>
      )}

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
        required maxLength={800}
      />
      <button type="submit">Submit Travel Tip</button>
    </form>
  );
};

export default TravelTipForm;
