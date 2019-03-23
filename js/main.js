vegaEmbed('#vis', nyc).then(
    result => {
        console.log(result.view);
    }
).catch(err => console.log(err));