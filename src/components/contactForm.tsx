import Form from "next/form";
export default function ContactForm() {
  return (
    <Form action="/send-message">
      <div className="flex flex-col gap-4">
        <label htmlFor="" className="mt-2">Email</label>
        <input
          type="text"
          name="email"
          id=""
          className="border-[#568F87] border-2 rounded-lg p-4"
        />
      </div>
      <div className="flex flex-col gap-4">
        <label htmlFor="" className="mt-2">Subject</label>
        <input
          type="text"
          name="subject"
          id=""
          className="border-[#568F87] border-2 rounded-lg p-4"
        />
      </div>
      <div className="flex flex-col gap-4">
        <label htmlFor="" className="mt-2">Message</label>
        <textarea
          name="message"
          id=""
          className="border-[#568F87] border-2 rounded-lg p-4"
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-color-teal cursor-pointer rounded-lg px-4 py-2 mt-3 text-center text-white"
      >
        Send
      </button>
    </Form>
  );
}
