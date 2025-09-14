export default function Header() {
  return (
    <header className="bg-color-secondary-green text-black sticky top-0 bottom-frame-border">
      <nav className="bg-color-secondary-green">
        <ul className="flex gap-4 text-white">
          <li className="p-4 ">
            <a href="/">Home</a>
          </li>
          <li className="p-4 ">
            <a href="/projects">Projects</a>
          </li>
          <li className="p-4 ">
            <a href="/about">About</a>
          </li>
          <li className="p-4 ">
            <a href="/contact">Contact</a>
          </li>
          <li className="p-4 ">
            <a href="/resume"> Resume</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
