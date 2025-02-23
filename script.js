document.getElementById('searchForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent form submission that refreshes the page
    await searchPlaces();
});

async function searchPlaces() {
    const placeQuery = document.getElementById('placeSearch').value;
    const url = `https://api.inaturalist.org/v1/places?q=${placeQuery}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        displayPlaceResults(data.results);
    } catch (error) {
        console.error('Error fetching places:', error);
    }
}

function displayPlaceResults(places) {
    const placeResultsDiv = document.getElementById('placeResults');
    placeResultsDiv.innerHTML = ''; // Clear previous results

    places.forEach(place => {
        const placeDiv = document.createElement('div');
        placeDiv.innerHTML = `
            <button onclick="fetchIdentifications(${place.id})">
                ${place.name}
            </button>
        `;
        placeResultsDiv.appendChild(placeDiv);
    });
}

async function fetchIdentifications(placeId) {
    const url = `https://api.inaturalist.org/v1/identifications?place_id=${placeId}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayIdentifications(data.results);
    } catch (error) {
        console.error('Error fetching identifications:', error);
    }
}

function displayIdentifications(identifications) {
    const identificationsResultsDiv = document.getElementById('identificationsResults');
    identificationsResultsDiv.innerHTML = ''; // Clear previous results

    identifications.forEach(identification => {
        const identificationDiv = document.createElement('div');
        identificationDiv.classList.add('identification');
        identificationDiv.innerHTML = `
            <img src="${identification.taxon.default_photo.medium_url}" alt="${identification.taxon.name}">
            <div>
                <strong>${identification.taxon.name}</strong><br>
                Identified by: ${identification.user.login}
            </div>
        `;
        identificationsResultsDiv.appendChild(identificationDiv);
    });
}
