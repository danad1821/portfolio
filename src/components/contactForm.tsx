"use client";
import { useState } from "react";
import Form from "next/form";

export default function ContactForm() {
  const [messageData, setMessageData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setMessageData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitMessage = async () => {
    if (messageData.message != "") {
      setError("Please enter a message!");
      return;
    }
    if (messageData.subject != "") {
      setError("Please specify the subject!");
      return;
    }
    if (
      !messageData.email
        .trim()
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setError("Please enter a valid email!");
      return;
    }

    const msData = JSON.stringify(messageData);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: msData,
      });

      if (response.ok) {
        // Handle success
        const data = await response.json();
        console.log("Email sent successfully:", data);
        setMessageData({
          email: "",
          subject: "",
          message: "",
        });
      } else {
        // Handle errors
        setError("Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <Form
      action="/send-message"
      className="flex flex-col gap-4 py-6 px-4 bg-color-primary-green text-white rounded-lg items-center max-w-lg"
      onSubmit={(e) => {
        e.preventDefault();
      }}
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
          onChange={handleInputChange}
          required
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
          onChange={handleInputChange}
          required
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
          onChange={handleInputChange}
          required
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
