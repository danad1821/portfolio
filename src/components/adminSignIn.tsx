import { useState } from "react";
import Form from "next/form";
import { RiCloseFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
type SignInInfo = {
  email: string;
  password: string;
};

type AdminSignInProps = {
  closeAdminSignIn: () => void;
};

export default function AdminSignIn({ closeAdminSignIn }: AdminSignInProps) {
  const router = useRouter();
  const [signInInfo, setSignInInfo] = useState<SignInInfo>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setSignInInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePopupClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents the click from bubbling up to the parent elements
  };

  return (
    <section>
      {/* Overlay - covers the entire screen */}
      <div className="fixed inset-0 z-10 bg-black opacity-50"></div>

      {/* Popup - centered over the overlay */}
      <div className="fixed inset-0 z-20 flex items-center justify-center">
        {/* Add the onClick handler to stop propagation */}
        <section
          className="bg-color-pink text-white rounded-lg py-6 px-4 shadow-lg flex flex-col justify-center w-90"
          onClick={handlePopupClick}
        >
          <section className="flex justify-between">
            <h2 className="font-bold text-2xl">Admin Sign In</h2>
            <button className="text-2xl" onClick={closeAdminSignIn}>
              <RiCloseFill />
            </button>
          </section>
          <Form
            action="/send-message"
            className="flex flex-col gap-4 items-center"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="flex flex-col gap-4 w-70">
              <label htmlFor="email" className="mt-2">
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className="border-[#568F87] border-2 rounded-lg p-4 bg-white text-black"
                placeholder="e.g. johndoe@gmail.com"
                value={signInInfo.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col gap-4 w-70">
              <label htmlFor="password-input" className="mt-2">
                Password
              </label>
              <input
                type="password"
                name="password" // Corrected name to match state key
                id="password-input"
                className="border-[#568F87] border-2 rounded-lg p-4 bg-white text-black"
                placeholder=""
                value={signInInfo.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="bg-color-primary-green rounded-lg p-2" onClick={()=>{router.push('/admin')}}>Sign In</button>
          </Form>
        </section>
      </div>
    </section>
  );
}