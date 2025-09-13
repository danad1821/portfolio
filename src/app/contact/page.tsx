import Header from "../../components/header";
import Footer from "../../components/footer";
import ContactForm from "components/contactForm";
export default function Contact() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center w-xxl justify-center">
        <h1>Contact</h1>
        <div className="flex justify-around w-xl">
          <ContactForm />
          <section>
            <h2>Socials</h2>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
