"use client";
import { useState } from "react";
import Form from "next/form";
import axios from "axios";

export default function ContactForm() {
  const [messageData, setMessageData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const submitMessage = async () =>{
    try{
      const msData = JSON.stringify(messageData);
      await axios.post(`http://localhost:5000/messages/send/${msData}`)
      console.log("sending successful")
    } catch (er){
      console.error(er);
    }
  }

  return (
    <Form
      action="/send-message"
      className="flex flex-col gap-4 py-8 px-6 bg-color-teal text-white rounded-lg items-center max-w-lg"
      onSubmit={(e)=> {e.preventDefault()}}
    >
      <div className="flex flex-col gap-4 w-md">
        <label htmlFor="" className="mt-2">
          Email
        </label>
        <input
          type="text"
          name="email"
          id=""
          className="border-[#568F87] border-2 rounded-lg p-4 bg-white text-black"
          placeholder="e.g. johndoe@gmail.com"
          value={messageData.email}
          onChange={(e) =>
            setMessageData({
              email: e.target.value,
              subject: messageData.subject,
              message: messageData.message,
            })
          }
        />
      </div>
      <div className="flex flex-col gap-4 w-md">
        <label htmlFor="" className="mt-2">
          Subject
        </label>
        <input
          type="text"
          name="subject"
          id=""
          className="border-[#568F87] border-2 rounded-lg p-4 bg-white text-black"
          placeholder="e.g. Website Development"
          value={messageData.subject}
          onChange={(e) =>
            setMessageData({
              email: messageData.email,
              subject: e.target.value,
              message: messageData.message,
            })
          }
        />
      </div>
      <div className="flex flex-col gap-4 w-md">
        <label htmlFor="" className="mt-2">
          Message
        </label>
        <textarea
          name="message"
          id=""
          className="border-[#568F87] border-2 rounded-lg p-4 bg-white text-black"
          placeholder="Are you available to create a website for ..."
          value={messageData.message}
          onChange={(e) =>
            setMessageData({
              email: messageData.email,
              subject: messageData.subject,
              message: e.target.value,
            })
          }
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-color-pink cursor-pointer rounded-lg px-4 py-2 mt-3 text-center text-black w-50"
        onClick={submitMessage}
      >
        Send
      </button>
    </Form>
  );
}
