const nyc_ses_lite = {
    "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
    "data": {
      "url": "https://gist.githubusercontent.com/justinhodev/bbe43324cbf228095e47bb471e5930f2/raw/632f57b671376fa8dcc3a8d5755e3004204da326/nyc_census_tracts.csv"
    },
    "hconcat": [
      {
        "encoding": {
          "color": {
            "condition": {
              "title": "County",
              "field": "County",
              "selection": "brush",
              "type": "nominal"
            },
            "value": "lightgrey"
          },
          "x": {
            "axis": {"title": "Population"},
            "field": "TotalPop",
            "type": "quantitative"
          },
          "y": {
            "axis": {"title": "Income"},
            "field": "Income",
            "type": "quantitative"
          }
        },
        "width": 400,
        "height": 300,
        "mark": "point",
        "selection": {"brush": {"type": "interval"}}
      },
      {
        "transform": [
          { "fold": ["Construction", "Office","Production", "Professional","Service"], "as": ["Industry", "Value"] },
          {"filter": {"selection": "brush"}}
        ],
        "encoding": {
          "x": {"field": "Industry", "type": "ordinal"},
          "y": {"aggregate": "average","field": "Value", "type": "quantitative"}
        },
        "width": 400,
        "height": 300,
        "mark": "bar"
      }
    ]
  }