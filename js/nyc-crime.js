// Vega json spec for creating visual, see https://vega.github.io/vega/docs/
const crime = {
    "width": 600,
    "height": 400,
    "padding": 5,
    "data": [
        {
            "name": "nyc-crime-data",
            "format": { "type": "csv" },
            "url": "https://gist.githubusercontent.com/justinhodev/67f817e910a0deeba5b411bbde85bf2c/raw/037acd30da146cd0fe5c153a29a1b0447d9461af/ny-crime-data.csv"
        }
    ],
    "scales": [
        {
            "name": "xscale",
            "type": "band",
            "domain": { 
                "data": "nyc-crime-data",
                "field": "County",
            },
            "range": "width",
            "padding": 0.05,
            "round": true,
        },
        {
            "name": "yscale",
            "domain": { 
                "data": "nyc-crime-data",
                "field": "Index Total",
            },
            "nice": true,
            "range": "height",
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
                },
            }
        }
    ]
}

// render visualization to div id="nyc-crime"
const view = new vega.View(vega.parse(crime), { renderer: 'canvas' }).initialize('#nyc-crime').hover().run();