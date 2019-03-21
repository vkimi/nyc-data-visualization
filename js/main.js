const DataFrame = dfjs.DataFrame;

function crime_bar_graph() {
    DataFrame.fromCSV('https://gist.githubusercontent.com/justinhodev/67f817e910a0deeba5b411bbde85bf2c/raw/037acd30da146cd0fe5c153a29a1b0447d9461af/ny-crime-data.csv')
        .then( df => {
            // filter out 'Region Total' rows skewing data
            var crimes = df.filter(row => row.get(df.listColumns()[0]) != 'Region Total');

            // convert to JSON object
            crimes = crimes.toCollection();

            // setup visualization
            var view = render('#nyc-crime', nyc_crime_spec);

            // insert wrangled dataset at runtime
            view.change('nyc-crime-data', vega.changeset().insert(crimes));

            // load graph
            view.runAsync();
        })
        .catch(err => {
            console.log(err);
    });
}

var view = render('#nyc-map', nyc_county).runAsync()
// ! FOR DEVELOPMENT ONLY
// ! DEBUGGING LOG DATA STREAM
.then(
    view => {
        console.log(view.data('nyc-county'))
        console.log(view.data('nyc-crime-index'))
    }
);