const nyc_county = {
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "width": 800,
    "height": 560,
    "autosize": "none",
    "signals": [],
    "data": [
        {
            "name": "nyc-crime-index",
            "url": "https://gist.githubusercontent.com/justinhodev/349f8d1f62c7568b65124e3e5065c905/raw/bb726161d66c3537e3e1e5f3e5775c3a5a4fbb43/nyc-crime-index.csv",
            "format": {"type": "csv", "parse": "auto"},
            "transform": [
                {
                    "type": "filter",
                    "expr": "datum.Year == 2017"
                }
            ]
        },
        {
            "name": "nyc-county",
            "url": "https://gist.githubusercontent.com/justinhodev/99035dd734b7ed2c989531018c124365/raw/b2bfc8a3fb77c9b28e85c41c8607954da41d4a28/nyc-county-map.json",
            "format": {
                "type": "topojson",
                "feature": "cb_2015_new_york_county_20m"
            },
            "transform": [
                {
                    "type": "lookup",
                    "from": "nyc-crime-index",
                    "key": "County",
                    "fields": ["properties.NAME"],
                    "as": ["info"]
                }
            ]
        }
    ],
    "scales": [
        {
            "name": "color",
            "type": "linear",
            "range": {"scheme": "blues"},
            "domain": {"data": "nyc-county", "field": "info[Index Count]"},
            "zero": false,
            "nice": true
        }
    ],
    "projections": [
        {
            "name": "projection",
            "type": "mercator",
            "scale": 5000, 
            "center": [-75, 43]
        }
    ],
    "legends": [
        {
            "fill": "color",
            "orient": "top-right",
            "title": "Total Crime"
        }
    ],
    "marks": [
        {
            "type": "shape",
            "style": ["geoshape"],
            "from": {"data": "nyc-county"},
            "encode": {
                "update": {
                    "strokeWidth": {"value": 0.5},
                    "stroke": {"value": "#bbbbbb"},
                    "fill": {"scale": "color", "field": "info[\"Index Count\"]"},
                    "zindex": {"value": 0},
                    "tooltip": { 
                        "signal": "{title: datum.info.County, 'Total Crime Count': datum.info[\"Index Count\"], 'Property Crimes': datum.info[\"Property Count\"], 'Violent Crimes': datum.info[\"Violent Count\"], 'Firearm Crimes': datum.info[\"Firearm Count\"]}"
                    }
                },
                "hover": {
                    "strokeWidth": {"value": 1},
                    "stroke": {"value": "#999999"},
                    "zindex": {"value": 1}
                }
            },
            "transform": [
                { "type": "geoshape", "projection": "projection"}
            ]
        }
    ]
}