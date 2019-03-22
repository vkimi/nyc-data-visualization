/**
 * render
 * *Creates new Vega object
 * @param {string} div DOM element to render Vega view in
 * @param {Object} spec Vega specification JSON object
 * TODO: set default container, catch exception
 */
function render(div, spec) {
    var tooltip = new vegaTooltip.Handler();

    var view = new vega.View(vega.parse(spec), {
        logLevel: vega.Warn,
        renderer: 'canvas',
        container: div,
        hover: true
    }).tooltip(tooltip.call);
    
    return view;
}