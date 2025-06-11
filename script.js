function enviarRespuesta(opcion) {
    fetch('http://localhost:3000/enviar-respuesta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            respuesta: opcion
        })
    })
    .then(response => response.json())
    .then(data => alert(data.mensaje))
    .catch(error => console.error('Error:', error));
}

