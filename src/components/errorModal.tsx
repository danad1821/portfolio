type ErrorModalProps = {
    title: string;
    text: string;
}

import { RiCloseFill } from "react-icons/ri";

export default function Modal({title, text}: ErrorModalProps){
    return(
        <div>
            <section>
                <h2>{title}</h2>
                <button><RiCloseFill /></button>
            </section>
            <p>{text}</p>
        </div>
    )
}