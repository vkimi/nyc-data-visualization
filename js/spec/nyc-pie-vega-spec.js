const nyc_category ={
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "width": 200,
    "height": 200,
    "autosize": "none",
    "signals": [
       {
          "name": "sort", "value": false,
          "bind": {"input": "checkbox"}
        },
        {
          "name": "ethnicity", "value": true,
          "bind": {"input": "checkbox"}
        },
        {
          "name": "transportation", "value": false,
          "bind": {"input": "checkbox"}
        },
        {
          "name": "employment", "value": false,
          "bind": {"input": "checkbox"}
        }
      ],
    
      "data": [
        {
          "name": "nyc-pie-data",
       //   "condition": {"selection": "paintbrush",
            "values":[
              {"id": "Hispanic", "field": 4}, //this field needs to be the sum of the id
              {"id": "Black", "field": 6},
              {"id": "White", "field": 10},
              {"id": "Asian", "field": 3},
              {"id": "Native", "field": 7}
            ],
          "transform": [
            {
              "type": "pie",
              "field": "field",
              "startAngle": 0,
              "endAngle": 6.29,
              "sort": {"signal": "sort"}
            }
          ]
        }
      ],
    
      "scales": [
        {
          "name": "color",
          "type": "ordinal",
          "domain": {"data": "nyc-pie-data", "field": "id"},
          "range": {"scheme": "category20"}
        }
      ],
    
      "marks": [
        {
          "type": "arc",
          "from": {"data": "nyc-pie-data"},
          "encode": {
            "enter": {
              "fill": {"scale": "color", "field": "id"},
              "x": {"signal": "width / 2"},
              "y": {"signal": "height / 2"}
            },
            "update": {
              "startAngle": {"field": "startAngle"},
              "endAngle": {"field": "endAngle"},
              "innerRadius": {"value":60},
              "outerRadius": {"signal": "width / 2"},
              "cornerRadius": {"value":0},
              "tooltip": {"field": "field"}
            }
          }
        }
      ]
}