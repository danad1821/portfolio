export default function Header() {
  return (
    <header className="bg-color-secondary-green text-black sticky top-0 bottom-frame-border">
      <nav className="bg-color-secondary-green">
        <ul className="flex gap-4 text-white items-center justify-center">
          <li className="p-1 jusitfy-self-start">
            <img src="/logo.png" className="w-20 h-20" alt="" />
          </li>
          <li className="p-4 nav-link">
            <a href="/">Home</a>
          </li>
          <li className="p-4 nav-link">
            <a href="/projects">Projects</a>
          </li>
          <li className="p-4 nav-link">
            <a href="/resume">Resume</a>
          </li>
          <li className="p-4 nav-link">
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
