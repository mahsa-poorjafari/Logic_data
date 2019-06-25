document.addEventListener('DOMContentLoaded', function() {
    let graphContainer = document.getElementById('logical_data_l1_diagram');
    main(graphContainer);
});

function main(container) {
    // Checks if the browser is supported
    if (!mxClient.isBrowserSupported()) {
        // Displays an error message if the browser is not supported.
        mxUtils.error('Browser is not supported!', 200, false);
    } else {
        // Disables the built-in context menu
        mxEvent.disableContextMenu(container);

        // Creates the graph inside the given container
        var graph = new mxGraph(container);
        //graph.setEnabled(false);


        // graph.getStylesheet().getDefaultEdgeStyle();

        // Enables rubberband selection
        new mxRubberband(graph);
        var parent = graph.getDefaultParent();

        // Adds cells to the model in a single step
        graph.getModel().beginUpdate();
        try {
            let varH = 500;
            let varW = 20;
            let stW = 20;
            let stH = 100;

            logicalDataStyle(graph, 'logicalData');
            sharedVarStyle(graph, 'variable');
            configEdgeStyle(graph, "#000000");

            let structList = document.getElementById("logical_data_l1_textual").getElementsByClassName("shared_struct")[0].getElementsByTagName("li");
            // console.table(structList);
            let stNode = null;
            for (let i = 0; i < structList.length; i++) {
                if (i !== 0 && ((i / 5) % 1) === 0) {
                    stH += 100;
                    stW = 1000;
                }

                let stText = structList[i].getElementsByTagName("span")[0].innerHTML;
                // console.log(structText);


                if (stText != "variables") {
                    let stId = 'st' + i;
                    // console.log(stText +" - "+ stId);
                    stNode = graph.insertVertex(parent, stId, stText, stW, stH, 120, 80, 'logicalData');
                    //console.log(stNode);
                    stW += 150;
                }

                // console.table(stVarList);
                // console.table(stNode);
                let stVarList = structList[i].getElementsByTagName("lo");
                for (let j = 0; j < stVarList.length; j++) {
                    let varText = stVarList[j].innerHTML;
                    let varId = 'var_' + j;

                    let varNode = graph.insertVertex(parent, varId, varText, varW, varH, 120, 80, 'variable');
                    let e = graph.insertEdge(parent, null, null, varNode,stNode, 'dashed=0;' +
                        'endArrow=diamond;sourcePerimeterSpacing=0;startFill=0;endFill=1;');

                    // varH += 100;
                    varW += 150;
                }
                varW = 20;
                varH += 100;
            }
            // console.table( graph.getChildVertices(graph.getDefaultParent()));

        }

        finally
        {
            // Updates the display
            graph.getModel().endUpdate();
        }

    }

}
