$(document).ready(function () {
    let selectedAmenities = {};
    let selectedStates = {};
    let selectedCities = {};

    function updateFilters() {
        let locations = Object.values(selectedStates).concat(Object.values(selectedCities)).join(', ');
        $('.locations h4').text(locations || '\u00A0');
        let amenities = Object.values(selectedAmenities).join(', ');
        $('.amenities h4').text(amenities || '\u00A0');
    }

    $('.amenities input[type="checkbox"]').change(function () {
        const amenityId = $(this).attr('data-id');
        const amenityName = $(this).attr('data-name');
        if ($(this).is(':checked')) {
            selectedAmenities[amenityId] = amenityName;
        } else {
            delete selectedAmenities[amenityId];
        }
        updateFilters();
    });

    $('.locations input[type="checkbox"]').change(function () {
        const locationId = $(this).attr('data-id');
        const locationName = $(this).attr('data-name');
        if ($(this).is(':checked')) {
            if ($(this).closest('ul').hasClass('states')) {
                selectedStates[locationId] = locationName;
            } else {
                selectedCities[locationId] = locationName;
            }
        } else {
            delete selectedStates[locationId];
            delete selectedCities[locationId];
        }
        updateFilters();
    });

    function fetchPlaces() {
        let filters = {
            amenities: Object.keys(selectedAmenities),
            states: Object.keys(selectedStates),
            cities: Object.keys(selectedCities)
        };
        
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(filters),
            success: function (data) {
                $('.places').empty();
                for (let place of data) {
                    let placeHtml = `
                        <article>
                            <div class="title_box">
                                <h2>${place.name}</h2>
                                <div class="price_by_night">$${place.price_by_night}</div>
                            </div>
                            <div class="information">
                                <div class="max_guest">${place.max_guest} Guest(s)</div>
                                <div class="number_rooms">${place.number_rooms} Bedroom(s)</div>
                                <div class="number_bathrooms">${place.number_bathrooms} Bathroom(s)</div>
                            </div>
                            <div class="description">${place.description}</div>
                        </article>`;
                    $('.places').append(placeHtml);
                }
            }
        });
    }

    $('button').click(fetchPlaces);

    fetchPlaces();
});
