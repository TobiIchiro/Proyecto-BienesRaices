(function() {
    const lat = 18.9194313;
    const lng = -99.2258869;
    const mapa = L.map('mapHome').setView([lat, lng ], 16);

    let markers = new L.FeatureGroup().addTo(mapa)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    const getProperties = async () => {
        try {
            const url = '/api/properties'
            const response = await fetch(url)
            const properties = await response.json()

            showProperties(properties)

        } catch (error) {
            console.log(error)
        }
    }

    getProperties()

    const showProperties = properties => {
        properties.forEach(property => {
            const marker = new L.marker([property?.lat, property?.lng], {
                autoPan: true
            })
            .addTo(mapa)
            .bindPopup(`
                <p class="text-gray-800 font-bold">${property.category.name}</p>
                <h1 class="text-xl font-extrabold uppercase mt-2">${property?.title} </h1>
                <img src="/uploads/${property?.imagen}" alt="Imagen de la propiedad ${property?.title}">
                <p class="text-gray-600 font-bold">${property.price.name}</p>
                <a href="/property/${property?.id}" class="bg-gray-500 block p-2 text-center font-bold uppercase rounded rounded-bg">Ver Propiedad</a>
                `)
            
        });
    }
})()