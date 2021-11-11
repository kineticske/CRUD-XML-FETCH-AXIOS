import HamburguerMenu from "./menu-hamb.js";
import { digitalClock, alarm } from "./reloj.js";
const D=document;

D.addEventListener("DOMContentLoaded", (e)=>{
    HamburguerMenu(".panel-btn", ".panel", ".menu a");
    digitalClock("#reloj", "#activar-reloj", "#desactivar-reloj" );
});