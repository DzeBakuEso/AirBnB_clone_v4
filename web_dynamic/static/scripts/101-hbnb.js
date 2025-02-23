$(document).ready(function () {
    let selectedAmenities = {};
    let selectedStates = {};
    let selectedCities = {};
    let reviewsLoaded = false;
    
    // Handle Amenities selection
    $('.amenities input[type="checkbox"]').change(function () {
        if ($(this).is(':checked')) {
            selectedAmenities[$(this).data('id')] = $(this).data('name');
        } else {
            delete selectedAmenities[$(this).data('id')];
        }
        $('.amenities h4').text(Object.values(selectedAmenities).join(', '));
    });
    
    // Handle States and Cities selection
    $('.locations input[type="checkbox"]').change(function () {
        if ($(this).hasClass('state')) {
            if ($(this).is(':checked')) {
                selectedStates[$(this).data('id')] = $(this).data('name');
            } else {
                delete selectedStates[$(this).data('id')];
            }
        } else if ($(this).hasClass('city')) {
            if ($(this).is(':checked')) {
                selectedCities[$(this).data('id')] = $(this).data('name');
            } else {
                delete selectedCities[$(this).data('id')];
            }
        }
        $('.locations h4').text(Object.values(selectedStates).concat(Object.values(selectedCities)).join(', '));
    });
    
    // Fetch places on search button click
    $('button').click(function () {
        let filters = {
            amenities: Object.keys(selectedAmenities),
            states: Object.keys(selectedStates),
            cities: Object.keys(selectedCities)
        };
        $.ajax({
            type: 'POST',
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            data: JSON.stringify(filters),
            contentType: 'application/json',
            success: function (data) {
                $('.places').empty();
                for (let place of data) {
                    $('.places').append(`<article><h2>${place.name}</h2><div class="price_by_night">$${place.price_by_night}</div></article>`);
                }
            }
        });
    });
    
    // Toggle reviews
    $('.toggle-reviews').click(function () {
        if ($(this).attr('data-status') === 'hidden') {
            $.get('http://0.0.0.0:5001/api/v1/reviews/', function (data) {
                $('.review-list').empty();
                for (let review of data) {
                    $('.review-list').append(`<li>${review.text} - ${review.user.first_name} ${review.user.last_name}</li>`);
                }
                $('.toggle-reviews').text('hide').attr('data-status', 'visible');
                reviewsLoaded = true;
            });
        } else {
            $('.review-list').empty();
            $('.toggle-reviews').text('show').attr('data-status', 'hidden');
        }
    });
});
