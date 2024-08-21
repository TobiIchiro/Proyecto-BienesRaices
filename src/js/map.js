(function() {
    const lat = document.querySelector('#lat').value || 18.9194313;
    const lng = document.querySelector('#lng').value || -99.2258869;
    const mapa = L.map('map').setView([lat, lng ], 16);
    let marker;
    
    //Provider y geocoder
    const geocodeService = L.esri.Geocoding.geocodeService();

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    marker = L.marker([lat, lng], {
        draggable: true,
        autoPan: true
    })
    .addTo(mapa)

    marker.on('moveend', function(e){
        marker = e.target

        const coords = marker.getLatLng();
        mapa.panTo(new L.LatLng(coords.lat, coords.lng))

        //obtener informacion de calle
        geocodeService.reverse().latlng(coords,13).run(function(error, result) {
            marker.bindPopup(result.address.LongLabel)

            //Llenar los campos
            document.querySelector('.calle').textContent = result?.address?.Address ?? '';
            document.querySelector('#street').value = result?.address?.Address ?? '';
            document.querySelector('#lat').value = result?.latlng?.lat ?? '';
            document.querySelector('#lng').value = result?.latlng?.lng ?? '';
        })

        
    })

})()