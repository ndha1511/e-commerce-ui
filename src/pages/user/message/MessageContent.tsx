// src/components/MessageText.tsx
import React from "react";
import './message.scss'
interface MessageTextProps {
  text: string;
  sender: string;
}

const MessageContent: React.FC<MessageTextProps> = ({ text, sender }) => {
  const isImage = text.startsWith("blob:") || text.startsWith("https://sales-app-bucket.s3.ap-southeast-1.amazonaws.com/");
  
  return (
    <div className={`message-text-${sender === "minhboy172@gmail.com" ? "sender" : "receiver"}`}>
      {isImage ? (
        <img 
          className="img-message-sender" 
          src={text} 
          alt="Sent Image" 
          style={{ maxWidth: '60%' }} 
        />
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
};

export default MessageContent;
