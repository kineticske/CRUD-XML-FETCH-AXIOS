import HamburguerMenu from "./menu-hamb.js";

const D=document;

D.addEventListener("DOMContentLoaded", (e)=>{
    HamburguerMenu(".panel-btn", ".panel", ".menu a")
});