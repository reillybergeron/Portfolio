import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Name:', name);
    console.log('Message:', message);
  };

  return (
    <div className="container py-4"style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      color: "white",
      textAlign: "center", // Ensures buttons are centered under the title
    }}>
      <h1 style={{ color: 'white'}}>Feel free to contact me!</h1>
      <p style={{ color: 'white'}}>Using the message box below, you can easily send messages that I will receive in my email.</p>
      <p style={{ color: 'white'}}>However, I won't be able to respond unless you give me a means to in your message.</p> 
      <p style={{ color: 'white'}}>Try not to be too mean, I'm sensitive.</p>
      <form onSubmit={handleSubmit} style={{ width: "1000px" }}>
        <div>
          <label htmlFor="name"></label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Name (optional)"
            style={{ width: "100%", height: "40px", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label htmlFor="message"></label>
          <textarea
            id="message"
            value={message}
            onChange={handleMessageChange}
            placeholder="Message"
            style={{ width: "100%", height: "350px" }}
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>Submit</button>
      </form>
      <p style={{ marginTop: "20px", color: 'white'}}>Alternatively, you can reach me at <a href="mailto:BergeronReilly@gmail.com" style={{ color: 'red', textDecoration: 'none'}}>BergeronReilly@gmail.com</a></p>
    </div>
  );
};

export default Contact;
