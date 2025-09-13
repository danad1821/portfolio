export default function Header(){
    return(
        <header className="bg-color-pink text-black p-4 sticky top-0 bottom-frame-border">
            <nav className="bg-color-pink">
                <ul className="flex gap-4">
                    <li className="hover: bg-blue"><a href="/">Home</a></li>
                    <li><a href="/projects">Projects</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/resume">Resume</a></li>
                </ul>
            </nav>
        </header>
    )
}