htmlStyles = `<style>
#map {
    min-height: 500px;
    top: 0;
    width: 100%;
}
</style>`

document.querySelector('body').innerHTML += htmlStyles;

var map = L.map('map').setView([4.6790048, -74.0681988], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

document.querySelector('#add').addEventListener('click', function(){
    let lat = document.querySelector('#lat').value;
    let lng = document.querySelector('#lng').value;
    let text = document.querySelector('#text').value;
    addMarket(lat, lng, text)
})

document.querySelector('#my_location').addEventListener('click', function(){
    if (!!navigator.geolocation) {
        //Pedimos los datos de geolocalizacion al navegador
        navigator.geolocation.getCurrentPosition(
            //Si el navegador entrega los datos de geolocalizacion los imprimimos
            function (position) {
                document.querySelector('#lat').value = position.coords.latitude
                document.querySelector('#lng').value = position.coords.longitude
                document.querySelector('#text').value = 'Tu estas aqui'
            },
            //Si no los entrega manda un alerta de error
            function () {
                window.alert("nav no permitido");
            }
        );
    }
})

function addMarket(lat, lng, text){
    L.marker([lat, lng]).addTo(map)
    .bindPopup(text)
    .openPopup();
}

L.Routing.control({ 
    waypoints: [ 
       L.latLng(8.8717707, -75.6176036), 
       L.latLng(8.7521569, -75.87193049999999) ] 
    }).addTo(map);

addMarket(8.8717707, -75.6176036, 'gustavo olmedo')
addMarket(8.7521569, -75.87193049999999, 'tienda olimpica')