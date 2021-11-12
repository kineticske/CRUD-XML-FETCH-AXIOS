d=document;
$table=d.querySelector(".crud-table"),
$form=d.querySelector(".crud-form"),
$title=d.querySelector(".crud-title"),
$template=d.querySelector("#crud-template").content, //content 

$fragment=d.createDocumentFragment(); //the major function is pass content to the HTML

const ajax =(options)=>{
    let{url, method, success, error, data}=options; //lo desestructuro en un objeto con esas propiedades
    const xhr=new XMLHttpRequest(); //creando objeto ajax

    xhr.addEventListener("readystatechange", e=>{
        if(xhr.readyState!==4) return; //state validation
        if(xhr.status>=200 && xhr.status<300){
            let json=JSON.parse(xhr.responseText);// trayendo la respuesta y conviertiendola a json
            success(json); //lo paso como parametro a la funcion success
        }else{
            let message=xhr.statusText||"error"; // mensaje con cortocircuito
            error(`Error ${xhr.status} : ${message}`); // lo paso como param a la funcion error proveniente de la desestructuracion 
        }
    });
    xhr.open(method||"GET", url); //open with url that users give us in the object when he instance the function.
    xhr.setRequestHeader("Content-Type", "application/json"); // establecemos cabeceras;
    xhr.send(JSON.stringify(data)); // we send the data in JSON format
}
// method for get all saints
const getAllSaints=()=>{
    ajax({ //cuerpo del obj options
        method: "GET",
        url:"http://localhost:3000/santos",
        success:(res)=>{
            console.log(res);
            res.forEach((el)=>{
                $template.querySelector(".name").textContent=el.nombre;
                $template.querySelector(".constellation").textContent=el.Constelacion;
                $template.querySelector(".edit").dataset.id=el.id;
                $template.querySelector(".edit").dataset.nombre=el.nombre;
                $template.querySelector(".edit").dataset.Constelacion=el.Constelacion;
                $template.querySelector(".delete").dataset.id=el.id;

                let $clone=d.importNode($template, true);
                $fragment.appendChild($clone);
            } ); $table.querySelector("tbody").appendChild($fragment)
        },
        error: (err)=>{
            console.warn(err)
            $table.insertAdjacentHTML("afterend", `<p> <b>  ${err} </b> </p>`);
        },
        data: null
    })
}


// calling GET method
d.addEventListener("DOMContentLoaded", getAllSaints);

//calling POST and PUT method (create) and (update)
d.addEventListener("submit", (e)=>{
    if(e.target===$form){ 
        e.preventDefault();
    }
    if(!e.target.id.value){ //POST
        ajax({
            url:"http://localhost:3000/santos",
            method: "POST",
            success: (res)=>{
                location.reload();
            },
            error: (err)=>{
                console.log(`se ha producido el error ${err}`);
                $form.insertAdjacentHTML("afterend", `<p> <b>  ${err} </b> </p>`);
            },
            data:{
                nombre: e.target.nombre.value,
                Constelacion: e.target.constelacion.value
            }
        })
    }else{ //PUT
        ajax({
            url:`http://localhost:3000/santos/${e.target.id.value}`, //el que mande el submit 
            method: "PUT",
            success: (res)=>{
                location.reload();
            },
            error: (err)=>{
                console.log(`se ha producido el error ${err}`);
                $form.insertAdjacentHTML("afterend", `<p> <b>  ${err} </b> </p>`);
            },
            data:{
                nombre: e.target.nombre.value,
                Constelacion: e.target.constelacion.value
            }
        })
    };
});

//method for the boton (REMEMBER: They should be in the document)
d.addEventListener("click", (e)=>{
    if(e.target.matches(".edit")){
        $title.textContent="Editar Santo";
        $form.nombre.value=e.target.dataset.nombre;
        $form.constelacion.value=e.target.dataset.Constelacion;
        $form.id.value=e.target.dataset.id;
        console.log('funciona el boton compadrito!!!!');
    }
    if(e.target.matches(".delete")){
        $title.textContent="Eliminar Santo";
        console.log('este otro tambien carnal !!!! oraleee!');
        let isDelete=confirm(`¿Estas seguro de eliminar el ${e.target.dataset.id}`);
        if (isDelete){
            ajax({
                url:`http://localhost:3000/santos/${e.target.dataset.id}`, //el que mande el submit 
                method: "DELETE",
                success: (res)=>{
                    location.reload();
                },
                error: (err)=>{
                    console.log(`se ha producido el error ${err}`);
                }
            })
        }
    }
});

//finish With Object XML