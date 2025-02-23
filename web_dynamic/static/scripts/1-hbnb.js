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
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });
});
