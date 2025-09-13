import Footer from "components/footer";
import Header from "components/header";

export default function ProjectPage() {
  return (
    <>
    <Header/>
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Project Page</h1>
      <p className="text-lg">This is the project page content.</p>
    </div>
    <Footer/>
    </>
    
  );
}