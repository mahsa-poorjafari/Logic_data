document.addEventListener('DOMContentLoaded', function() {
    let graphContainer = document.getElementById('logical_data_l0_diagram');

    main(graphContainer);
});

function main(container){
    // Checks if the browser is supported
    if (!mxClient.isBrowserSupported())
    {
        // Displays an error message if the browser is not supported.
        mxUtils.error('Browser is not supported!', 200, false);
    }
    else
    {
        // Disables the built-in context menu
        mxEvent.disableContextMenu(container);

        // Creates the graph inside the given container
        var graph = new mxGraph(container);
        //graph.setEnabled(false);


        // graph.getStylesheet().getDefaultEdgeStyle();

        // Enables rubberband selection
        new mxRubberband(graph);

        // Disables basic selection and cell handling
        // configureStylesheet(graph);

        // Gets the default parent for inserting new cells. This
        // is normally the first child of the root (ie. layer 0).
        var parent = graph.getDefaultParent();

        // Adds cells to the model in a single step
        graph.getModel().beginUpdate();


        try
        {
            let varH = 20;
            let varW = 20;
            let dtW = 300;
            let dtH = 1000;

            dataTypeStyle(graph, 'dataType');
            sharedVarStyle(graph, 'variable');

            let dataTypes = document.getElementById('shared_variables').getElementsByTagName("span");
            for (let i = 0; i < dataTypes.length; i++) {
                varW = 20;
                varH += 50;
                let dtId = 'dT'+i;
                let dtText = dataTypes[i].innerHTML;
                let dt = graph.insertVertex(parent, dtId, dtText, dtW, dtH, 100, 80, 'dataType');

                let dtVarList = document.getElementById(dtText+'_child').getElementsByTagName("li");
                for (let j = 0; j < dtVarList.length; j++) {
                    if (j !== 0 && ((j/8)% 1) === 0){
                        varH += 100;
                        varW = 20;
                    }
                    let varId = 'dT'+i+'_var'+ j;
                    // sharedVarStyle(graph, varId);
                    // Specify edges for each data type
                    let edgeColor = (i==0)? '#B22222' : '#0000CD';
                    // console.log(i);
                    configEdgeStyle(graph, edgeColor);
                    let v = graph.insertVertex(parent, varId, dtVarList[j].innerHTML, varW, varH, 100, 50, 'variable');
                    graph.insertEdge(parent, null, '', v, dt, 'dashed=0;'+
                    'endArrow=block;sourcePerimeterSpacing=0;startFill=0;endFill=0;strokeColor='+edgeColor);
                    varW +=150;
                    varH += 10;
                }
                dtW += 300;
            }
            var thrCells = graph.getChildVertices(graph.getDefaultParent());
            console.table(thrCells);

        }
        finally
        {
            // Updates the display
            graph.getModel().endUpdate();
        }
    }
};


