i#!/usr/bin/python3
"""
Flask web application for AirBnB clone.
This module sets up the Flask application for the dynamic version of HBNB.
"""
from flask import Flask, render_template
from models import storage
from os import getenv

app = Flask(__name__)
app.url_map.strict_slashes = False

@app.teardown_appcontext
def teardown_db(exception):
    """Remove the current SQLAlchemy session."""
    storage.close()

@app.route('/101-hbnb')
def hbnb():
    """Display the HBNB main page with dynamic data."""
    states = storage.all("State")
    amenities = storage.all("Amenity")
    return render_template('101-hbnb.html', states=states, amenities=amenities, api_host=getenv('HBNB_API_HOST', '0.0.0.0'), api_port=getenv('HBNB_API_PORT', '5001'))

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
