$(document).ready(function () {
    let selectedAmenities = {};

    // Listen for changes on each input checkbox tag
    $('.amenities input[type="checkbox"]').change(function () {
        const amenityId = $(this).attr('data-id');
        const amenityName = $(this).attr('data-name');

        if ($(this).is(':checked')) {
            selectedAmenities[amenityId] = amenityName;
        } else {
            delete selectedAmenities[amenityId];
        }

        // Update the h4 tag inside the div Amenities with the list of selected amenities
        $('.amenities h4').text(Object.values(selectedAmenities).join(', ') || '\u00A0');
    });

    // Fetch places when button is clicked
    $('button').click(function () {
        fetchPlaces();
    });

    // Initial fetch of all places
    fetchPlaces();

    function fetchPlaces() {
        $('.places').empty();
        $.ajax({
            type: 'POST',
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            contentType: 'application/json',
            data: JSON.stringify({ amenities: Object.keys(selectedAmenities) }),
            success: function (data) {
                for (const place of data) {
                    const placeHtml = `
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
});
