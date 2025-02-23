#!/usr/bin/python3
"""
Flask web application that serves dynamic content.
"""
from flask import Flask, render_template
from models import storage
from os import getenv

app = Flask(__name__)
app.url_map.strict_slashes = False

@app.route('/3-hbnb')
def hbnb():
    """Render the 3-hbnb template with required data."""
    states = storage.all("State")
    amenities = storage.all("Amenity")
    places = storage.all("Place")
    return render_template('3-hbnb.html', states=states, amenities=amenities, places=places)

@app.teardown_appcontext
def teardown_db(exception):
    """Close the current SQLAlchemy session."""
    storage.close()

if __name__ == "__main__":
    host = getenv("HBNB_MYSQL_HOST", "0.0.0.0")
    port = int(getenv("HBNB_MYSQL_PORT", 5000))
    app.run(host=host, port=port, debug=True)
