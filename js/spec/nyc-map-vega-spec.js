const nyc_county = {
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "width": 900,
    "height": 560,
    "autosize": "none",
    "signals": [],
    "data": [
        {
            "name": "nyc-county",
            "url": "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/NY-36-new-york-counties.json",
            "format": {
                "type": "topojson",
                "feature": "cb_2015_new_york_county_20m"
            },
            "transform": [
                {
                  "type": "geopath",
                  "projection": "projection"
                }
            ]
        }
    ],
    "scales": [],
    "projections": [
        {
            "name": "projection",
            "type": "mercator",
            "scale": 5000, 
            "center": [-75, 43]
        }
    ],
    "marks": [
        {
            "type": "path",
            "from": {"data": "nyc-county"},
            "encode": {
                "enter": {
                    "fill": {"value": "#dedede"},
                    "stroke": {"value": "white"}
                },
                "update": {
                    "path": {"field": "path"}
                }
            }
        }
    ]
}