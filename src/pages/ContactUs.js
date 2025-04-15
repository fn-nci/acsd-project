import { useState } from "react";
import Logo from '../components/Logo';
import '../styles/ContactUs.scss';

function ConatctUs() {
    const [contactData, setContactData] = useState({ // using useStated hook, create state variable / object with 3 properties, setContactData - function to update the state
        name: "",
        email: "",
        message: "",
    });
    const [messageAlert, setMessageAlert] = useState(""); // using them to be able to customize the alert message and not use the default one

    function handleChange(e) {
        var {name, value} = e.target; // get the name and value of the target element (the input fields)
        
        setContactData((prevStateContactData) => {
            var updatedContactData = {
                ...prevStateContactData, // spread the existing contactData to keep all of the fields information intact
                [name]: value, // updating the specific field with the new value
            };
            console.log('Check if data is updated:', updatedContactData);
            return updatedContactData;
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
        //alert("Thank you, your request was submitted!");
        //console.log(contactData);
        setMessageAlert("Thank you, your request was submitted!");
    };

    return (
        <div className="contact-us-container">
            {/*Customer alert message*/}
            {messageAlert && (
                <div className="custom-alert-message">
                    <p>{messageAlert}</p>
                    <button onClick={() => setMessageAlert ("")} className="alert-button">Close</button>
                </div>
            )}
            <div className="contact-us-card">
            {/*adding the logo for consistancy*/}
                <div className="contact-us-logo">
                    <Logo />
                </div>
                <h1>Contact Us</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={contactData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={contactData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <label>Message:</label>
                        <textarea
                            name="message"
                            value={contactData.message}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="contact-us-button">Submit</button>
                </form>
            </div>    
        </div>
    )
}

export default ConatctUs;