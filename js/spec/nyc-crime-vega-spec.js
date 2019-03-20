// ! FOR DEVELOPMENT USE
// ? consider moving to JSON file
const nyc_crime_spec = {
    "width": 600,
    "height": 400,
    "padding": 5,
    "data": [
        {
            "name": "nyc-crime-data"
        }
    ],
    "scales": [
        {
            "name": "xscale",
            "type": "band",
            "domain": { 
                "data": "nyc-crime-data",
                "field": "County"
            },
            "range": "width",
            "padding": 0.05,
            "round": true
        },
        {
            "name": "yscale",
            "domain": { 
                "data": "nyc-crime-data",
                "field": "Index Total"
            },
            "nice": true,
            "range": "height"
        }
    ],
    "axes": [
        { "orient": "bottom", "scale": "xscale" },
        { "orient": "left", "scale": "yscale" }
    ],
    "marks": [
        {
            "type": "rect",
            "from": { "data": "nyc-crime-data" },
            "encode": {
                "enter": {
                    "x": {"scale": "xscale", "field": "County"},
                    "width": {"scale": "xscale", "band": 1},
                    "y": {"scale": "yscale", "field": "Index Total"},
                    "y2": {"scale": "yscale", "value": 0}
                },
                "update": {
                  "fill": {"value": "steelblue"}
                },
                "hover": {
                  "fill": {"value": "red"}
                }
            }
        }
    ]
};