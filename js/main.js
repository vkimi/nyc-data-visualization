const DataFrame = dfjs.DataFrame;

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
DataFrame.fromCSV('https://gist.githubusercontent.com/justinhodev/bbe43324cbf228095e47bb471e5930f2/raw/632f57b671376fa8dcc3a8d5755e3004204da326/nyc_census_tracts.csv?fbclid=IwAR388bG7eeMcRqNicntr3lXPsMrxjKLW_egXE5XXq6VxL_F0ZCuskrGe75I')
    .then( df2 => {
        // filter out 'Region Total' rows skewing data
        df3 = df2.replace(``, `0`) 
        var factors = df3.filter(row => row.get(df3.listColumns()[0]) != 'Region Total');

        // convert to JSON object
        factors = factors.toCollection();
        // setup visualization
        var view = render('#nyc-pie', nyc_category);

        var asianTotal= 0; //create a new array that looks like my values on the left side
                            // how do I bring this value over?
        for (i = 0; i < factors.length-1; i++) { 
            if(typeof parseFloat(factors[i]['Asian']) == 'number'){ 
                asianTotal += parseFloat(factors[i]['Asian']);
            }else{
                console.log(factors[i]['Asian'] + " is not a number <br/>");
            }
        }


        // insert wrangled dataset at runtime
       view.change('nyc-pie-data', vega.changeset().insert(factors));

        // load graph
        view.runAsync();
    })
    .catch(err => {
        console.log(err);
});