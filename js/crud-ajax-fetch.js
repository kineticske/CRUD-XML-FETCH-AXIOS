const d=document,
    $table=d.querySelector(".crud-table"),
    $form=d.querySelector(".crud-form"),
    $title=d.querySelector(".crud-title"),
    $template=d.querySelector("#crud-template").content,
    $fragment=d.createDocumentFragment();

// METHOD GET 
const getAll= async()=>{
    try{
        let res= await fetch("http://localhost:3000/santos"),
        json=await res.json();
        if(!res.ok) throw {status: res.status, statusText:res.statusText};

        json.forEach((el)=>{
            $template.querySelector(".name").textContent=el.nombre;
            $template.querySelector(".constellation").textContent=el.Constelacion;
            $template.querySelector(".edit").dataset.id=el.id;
            $template.querySelector(".edit").dataset.nombre=el.nombre;
            $template.querySelector(".edit").dataset.constelacion=el.Constelacion;
            $template.querySelector(".delete").dataset.id=el.id;
            let $clone= d.importNode($template, true);
            $fragment.appendChild($clone);
        });
        $table.querySelector("tbody").appendChild($fragment);
    }
    catch (err){ 
        let message= err.statusText|| "Ocurrio un error";
        $table.insertAdjacentHTML("afterend", `<p> Error ${err.status}: ${message} </p>`);
    }
}

d.addEventListener("DOMContentLoaded", getAll);

//METHOD PUT AND POST
d.addEventListener("submit", async (e)=>{
    if(e.target===$form){ 
        e.preventDefault();
    }
    if(!e.target.id.value){
        try {
            let options={
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=utf-8"
                },
                body: JSON.stringify({
                    nombre: e.target.nombre.value,
                    Constelacion: e.target.constelacion.value
                })
            }
            //POST
            let res= await fetch("http://localhost:3000/santos", options),
            json=await res.json();
            if(!res.ok) throw {status: res.status, statusText:res.statusText};
            location.reload();

        } catch (err) {
            console.log(err)
            let message= err.statusText|| "Ocurrio un error";
            console.log(err.status)
            $table.insertAdjacentHTML("afterend", `<p> Error ${err.status}: ${message} </p>`);
        }
    } else{
        
        try {
            let options={
                method: "PUT",
                headers: {
                    "Content-type": "application/json; charset=utf-8"
                },
                body: JSON.stringify({
                    nombre: e.target.nombre.value,
                    Constelacion: e.target.constelacion.value
                })
            }
            //PUT
            let res= await fetch(`http://localhost:3000/santos/${e.target.id.value}`, options),
            json=await res.json();
            if(!res.ok) throw {status: res.status, statusText:res.statusText};
            location.reload();
        } catch (err) {
            console.log(err)
            let message= err.statusText|| "Ocurrio un error";
            console.log(err.status)
            $table.insertAdjacentHTML("afterend", `<p> Error ${err.status}: ${message} </p>`);
        }

    }
});

d.addEventListener("click", async (e)=>{
    if(e.target.matches(".edit")){
        console.log(e)
        $title.textContent="Editar Santo";
        $form.nombre.value=e.target.dataset.nombre;
        $form.constelacion.value=e.target.dataset.constelacion;
        $form.id.value=e.target.dataset.id;
};
    if(e.target.matches(".delete")){
    console.log(e)
    $title.textContent="Eliminar Santo";
    let confirmDelete=confirm(`eliminar el id ${e.target.dataset.id}?`);
    if(confirmDelete){
        try {
            let options={
                method: "DELETE",
                headers: {
                    "Content-type": "application/json; charset=utf-8"
                }
            }
            //DELETE
            let res= await fetch(`http://localhost:3000/santos/${e.target.dataset.id}`, options),
            json=await res.json();
            if(!res.ok) throw {status: res.status, statusText:res.statusText};
            
            location.reload();
        } catch (err) {
            console.log(err)
            let message= err.statusText|| "Ocurrio un error";
            console.log(err.status)
            $table.insertAdjacentHTML("afterend", `<p> Error ${err.status}: ${message} </p>`);
        }
    }
}
})