"use client";
import ContactForm from "components/contactForm";
import { FaLinkedin, FaGithubSquare } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useRouter } from "next/navigation";
export default function Contact() {
  const router = useRouter();
  return (
    <>
      <main>
        <h1 className="font-bold text-3xl text-center m-3">Contact</h1>
        <div className="flex justify-center my-8 flex-wrap">
          <ContactForm />
          <section className="other-socials-box">
            <h2 className="text-xl font-bold">Other methods:</h2>
            <section>
              <button
                className="flex gap-3 items-center justify-center text-lg"
                onClick={() => {
                  window.open("https://www.linkedin.com/in/dana-dabdoub/", '_blank');
                }}
              >
                <FaLinkedin />
                LinkedIn
              </button>
              <button
                className="flex gap-3 items-center justify-center text-lg"
                onClick={() => {
                  window.open("https://github.com/danad1821", '_blank');
                }}
              >
                <FaGithubSquare />
                GitHub
              </button>
              <button
                className="flex gap-3 items-center justify-center text-lg"
              >
                <MdEmail />
                danadabdoub@gmail.com
              </button>
            </section>
          </section>
        </div>
      </main>
    </>
  );
}
