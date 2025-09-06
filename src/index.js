import "./styles.css"
import { greeting } from "./greeting.js";

function component(){
    const h1 = document.createElement("h1");
    h1.textContent = greeting;
    return h1;
}

document.body.appendChild(component());