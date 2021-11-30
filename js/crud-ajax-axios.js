const d=document,
    $table=d.querySelector(".crud-table"),
    $form=d.querySelector(".crud-form"),
    $title=d.querySelector(".crud-title"),
    $template=d.querySelector("#crud-template").content,
    $fragment=d.createDocumentFragment();

const getAll = async () => {
    try {
        let res = await axios.get("http://localhost:3000/santos"),
            json = await res.data;
            console.log(res);
            console.log(json)
            
            json.forEach((el)=>{
                $template.querySelector(".name").textContent=el.nombre;
                $template.querySelector(".constellation").textContent=el.Constelacion;
                $template.querySelector(".edit").dataset.id=el.id;
                $template.querySelector(".edit").dataset.nombre=el.nombre;
                $template.querySelector(".edit").dataset.constelacion=el.Constelacion;
                $template.querySelector(".delete").dataset.id=el.id;

                let $clone=d.importNode($template, true);
                $fragment.appendChild($clone);
            })

            $table.querySelector("tbody").appendChild($fragment);
    }catch(err){
        console.log(err)
        let message= err.statusText|| 'Ocurrió un error';
        $table.insertAdjacentHTML('afterend', `<p> Error : ${message}</p>`);
    }
}

d.addEventListener("DOMContentLoaded", getAll);

//method put and post
d.addEventListener("submit", async (e)=>{
    if (e.target===$form){
        e.preventDefault();
    }
    if(!e.target.id.value){ //post
        try {
            let options = {
                method: "POST",
                headers: {"Content-type": "application/json; charset=utf-8"},
                data: JSON.stringify({
                    nombre: e.target.nombre.value,
                    Constelacion: e.target.constelacion.value
                })
            },
                res=await axios("http://localhost:3000/santos", options),
                json= await res.data;
                location.reload();
        } catch (err) {
            console.log(err)
            let message= err.statusText|| 'Ocurrió un error';
            $form.insertAdjacentHTML('afterend', `<p> Error : ${message}</p>`);
    }
        }else{ 
        try {
            let options = {
                method: "PUT",
                headers: {"Content-type": "application/json; charset=utf-8"},
                data: JSON.stringify({
                    nombre: e.target.nombre.value,
                    Constelacion: e.target.constelacion.value
                })
            },
                res=await axios(`http://localhost:3000/santos/${e.target.id.value}`, options), //because is on input button
                json=await res.data;

                location.reload();
        } catch (err) {
            console.log(err)
            let message= err.statusText|| 'Ocurrió un error';
            $form.insertAdjacentHTML('afterend', `<p> Error : ${message}</p>`);
    }
    }
    
}
)

d.addEventListener('click', async (e)=>{
    console.log(e)
    console.log(e.target.id.value)
    if(e.target.matches(".edit")){
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
                    headers: {"Content-type": "application/json ; charset=utf-8"},
                }
                //DELETE
                let res= await axios(`http://localhost:3000/santos/${e.target.dataset.id}`, options),
                json=await res.data;
                
                
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