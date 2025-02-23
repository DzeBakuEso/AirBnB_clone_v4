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

    // API status check
    $.get("http://0.0.0.0:5001/api/v1/status/", function (data) {
        if (data.status === "OK") {
            $("#api_status").addClass("available");
        } else {
            $("#api_status").removeClass("available");
        }
    });

    // Fetch places from API
    $.ajax({
        url: "http://0.0.0.0:5001/api/v1/places_search/",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({}),
        success: function (places) {
            for (let place of places) {
                let placeHTML = `<article>
                    <div class="title_box">
                        <h2>${place.name}</h2>
                        <div class="price_by_night">$${place.price_by_night}</div>
                    </div>
                    <div class="information">
                        <div class="max_guest">${place.max_guest} Guests</div>
                        <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                        <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                    </div>
                    <div class="description">
                        ${place.description}
                    </div>
                </article>`;
                $(".places").append(placeHTML);
            }
        }
    });
});
