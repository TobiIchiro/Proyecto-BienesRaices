(function() {
    const lat = 18.9194313;
    const lng = -99.2258869;
    const mapa = L.map('mapHome').setView([lat, lng ], 16);

    let markers = new L.FeatureGroup().addTo(mapa)

    let properties = []

    const categoriesSelect = document.querySelector('#categories')
    const pricesSelect = document.querySelector('#prices')
    const filters = {
        category : '',
        price : ''
    }

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    categoriesSelect.addEventListener('change', e => {
        filters.category = +e.target.value
        filtrerPropeties()
    })
    pricesSelect.addEventListener('change', e => {
        filters.price = +e.target.value
        filtrerPropeties()
    })

    

    const getProperties = async () => {
        try {
            const url = '/api/properties'
            const response = await fetch(url)
            properties = await response.json()

            showProperties(properties)

        } catch (error) {
            console.log(error)
        }
    }

    const filtrerPropeties = () => {
        const result = properties.filter(filterByCategory).filter(filterByPrice)
        showProperties(result)
    }

    const filterByCategory = (property) => {
        return filters.category ? property.categoryId === filters.category : property
    }
    const filterByPrice = (property) => {
        return filters.price ? property.priceId === filters.price : property
    }

    getProperties()

    const showProperties = properties => {

        markers.clearLayers()

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
            markers.addLayer(marker)
        });
        
    }
})()