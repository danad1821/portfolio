export default function Footer() {
  return (
    <footer className="bg-color-pink text-black py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Dana Dabdoub. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Built with Next.js and Tailwind CSS
        </p>
      </div>
    </footer>
  );
}