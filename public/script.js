function enviarRespuesta(opcion) {
  fetch('/api/enviar-respuesta', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ respuesta: opcion })
  })
  .then(response => response.json())
  .then(data => alert(data.mensaje))
  .catch(error => console.error('Error:', error));
}
