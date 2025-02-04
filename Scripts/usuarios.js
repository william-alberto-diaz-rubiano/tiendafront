const D = document,
    $tabla = D.getElementById("tabla_usuarios"),
    $template = D.getElementById("listado_usuarios").content,
    $fragmento = D.createDocumentFragment(),
    $buscar = D.getElementById("buscarUsuario"),
    $codigo = D.getElementById("cedulaUsuario").nodeValue,
    $formulario = D.getElementById("datos_usuario");

// Metodo GET listar
const listaU = async () => {
    try {
        let res = await fetch("http://backend181-env.eba-wzp6p6pz.us-east-2.elasticbeanstalk.com/usuarios/listar"),
            json = await res.json();
        if (!res.ok) throw { status: res.status, statusText: res.statusText };
        console.log(json);
        json.forEach(usuario => {
            $template.getElementById("cedula_usuario").textContent = usuario.cedula_usuario;
            $template.getElementById("mail_usuario").textContent = usuario.email_usuario;
            $template.getElementById("nombre_usuario").textContent = usuario.nombre_usuario;
            $template.getElementById("password_usuario").textContent = usuario.password;
            $template.getElementById("usuario_usuario").textContent = usuario.usuario;
            $template.getElementById("eliminar_usuario").dataset.cedula_usuario = usuario.cedula_usuario;

            $template.getElementById("modificar_usuario").dataset.cedula_usuario = usuario.cedula_usuario;
            $template.getElementById("modificar_usuario").dataset.email_usuario = usuario.email_usuario;
            $template.getElementById("modificar_usuario").dataset.nombre_usuario = usuario.nombre_usuario;
            $template.getElementById("modificar_usuario").dataset.password_usuario = usuario.password;
            $template.getElementById("modificar_usuario").dataset.usuario_usuario = usuario.usuario;

            let $clone = D.importNode($template, true);
            $fragmento.appendChild($clone);
        });
        $tabla.querySelector("tbody").appendChild($fragmento);
    } catch (err) {
        console.log(err.name);
        console.log(err.message);
    }
}
D.addEventListener("DOMContentLoaded", listaU);

// Metodo GET by Id
D.addEventListener("submit", async (e) => {
    if (e.target == $buscar) {
        $tabla.querySelector("tbody").textContent = "";
        e.preventDefault();
        try {
            let res = await fetch(`http://backend181-env.eba-wzp6p6pz.us-east-2.elasticbeanstalk.com/usuarios/buscar/${e.target.cedulaUsuario.value}`),
                json = await res.json();
            if (!res.ok) throw { status: res.status, statusText: res.statusText };
            console.log(json);
            $template.getElementById("cedula_usuario").textContent = json.cedula_usuario;
            $template.getElementById("mail_usuario").textContent = json.email_usuario;
            $template.getElementById("nombre_usuario").textContent = json.nombre_usuario;
            $template.getElementById("password_usuario").textContent = json.password;
            $template.getElementById("usuario_usuario").textContent = json.usuario;
            $template.getElementById("eliminar_usuario").dataset.cedula_usuario = json.cedula_usuario;

            $template.getElementById("modificar_usuario").dataset.cedula_usuario = json.cedula_usuario;
            $template.getElementById("modificar_usuario").dataset.email_usuario = json.email_usuario;
            $template.getElementById("modificar_usuario").dataset.nombre_usuario = json.nombre_usuario;
            $template.getElementById("modificar_usuario").dataset.password_usuario = json.password;
            $template.getElementById("modificar_usuario").dataset.usuario_usuario = json.usuario;

            let $clone = D.importNode($template, true);
            $fragmento.appendChild($clone);
            $tabla.querySelector("tbody").appendChild($fragmento);
        } catch (err) {
            alert("Usuario Inexistente");
            D.getElementById("cedulaUsuario").value = "";
            console.log(err.name);
            console.log(err.message);
        }
    }
    D.getElementById("cedulaUsuario").value = "";
});

// Cargar listado
D.addEventListener("click", async e => {
    if (e.target.matches("#ver_todos")) {
        $tabla.querySelector("tbody").textContent = "";
        listaU();
    }
});

// Metodo DELETE 
D.addEventListener("click", async e => {
    if (e.target.matches("#eliminar_usuario")) {
        let borrar = confirm(`Esta seguro de eliminar el usuario con cédula: ${e.target.dataset.cedula_usuario}?`);
        if (borrar) {
            try {
                let datosU = {
                    method: "DELETE",
                    headers: {
                        "Accept": 'application/json',
                        'Content-Type': 'application/json',
                    }
                },
                    res = await fetch(`http://backend181-env.eba-wzp6p6pz.us-east-2.elasticbeanstalk.com/usuarios/eliminar/${e.target.dataset.cedula_usuario}`, datosU),
                    json = await res.text();
                if (!res.ok) throw { status: res.status, statusText: res.statusText };
                location.reload();
            } catch (err) {
                console.log(err.name);
                console.log(err.message);
            }
        }
    }
});

// Guardar y actualizar
D.addEventListener("submit", async e => {
    if (e.target === $formulario) {
        e.preventDefault();
        if (!e.target.id.value) {

            // metodo POST guardar
            try {
                let datosU = {
                    method: "POST",
                    headers: {
                        "Accept": 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                        {
                            cedula_usuario: e.target.InputCedula.value,
                            email_usuario: e.target.InputEmail.value,
                            nombre_usuario: e.target.InputNombre.value,
                            password: e.target.InputPassword.value,
                            usuario: e.target.InputUsuario.value
                        }
                    )
                },
                    res = await fetch("http://backend181-env.eba-wzp6p6pz.us-east-2.elasticbeanstalk.com/usuarios/guardar", datosU),
                    json = await res.json();
                console.log(res);
                if (!res.ok) throw { status: res.status, statusText: res.statusText };
                location.reload();
                console.log("Usuario CREADO");
                alert("Datos de usuario guardados exitosamente");
            } catch (err) {
                console.log(err.name);
                console.log(err.message);
            }
        } else {

            // metodo PUT actualizar
            try {
                let datosU = {
                    method: "PUT",
                    headers: {
                        "Accept": 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                        {
                            cedula_usuario: e.target.InputCedula.value,
                            email_usuario: e.target.InputEmail.value,
                            nombre_usuario: e.target.InputNombre.value,
                            password: e.target.InputPassword.value,
                            usuario: e.target.InputUsuario.value
                        }
                    )
                },
                    res = await fetch(`http://backend181-env.eba-wzp6p6pz.us-east-2.elasticbeanstalk.com/usuarios/actualizar/${e.target.InputCedula.value}`, datosU),
                    json = await res.json();
                console.log(res);
                if (!res.ok) throw { status: res.status, statusText: res.statusText };
                location.reload();
                console.log("Usuario MODIFICADO");
                alert("Datos de Usuario Actualizados");
            } catch (err) {
                console.log(err.name);
                console.log(err.message);
            }
        }
    }
});

D.addEventListener("click", async (e) => {
    if (e.target.matches("#modificar_usuario")) {
        console.log("Click en MODIFICAR");
        $formulario.InputCedula.value = e.target.dataset.cedula_usuario;
        $formulario.InputEmail.value = e.target.dataset.email_usuario;
        $formulario.InputNombre.value = e.target.dataset.nombre_usuario;
        $formulario.InputPassword.value = e.target.dataset.password_usuario;
        $formulario.InputUsuario.value = e.target.dataset.usuario_usuario;
    }
});