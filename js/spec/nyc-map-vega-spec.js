const nyc_county = {
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "width": 900,
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
                    // ! DEVELOPMENT ONLY
                    // * only look at 2017 data to reduce load time
                    "expr": "datum.Year == 2017"
                }
            ]
        },
        {
            "name": "nyc-county",
            "url": "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/NY-36-new-york-counties.json",
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
                    "as": ["population"],
                    "values": ["Population"] // ! DEVELOPMENT ONLY
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
            "type": "shape",
            "style": ["geoshape"],
            "from": {"data": "nyc-county"},
            "encode": {
                "enter": {
                        "tooltip": {
                            // "signal": "datum.properties.NAME"
                            "signal": "\'Population: \' + datum.population"
                    }
                },
                "update": {
                    "strokeWidth": {"value": 0.5},
                    "stroke": {"value": "#bbbbbb"},
                    "fill": {"value": "#eeeeee"},
                    "zindex": {"value": 0}
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