document.addEventListener('DOMContentLoaded', function() {
    let graphContainer = document.getElementById('logical_comp_diagram');
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

            let threadList = document.getElementById("logical_comp_textual").getElementsByClassName("threads")[0].getElementsByTagName("li");
            // let mainThread = threadList[0].getElementsByTagName("span")[0].innerHTML;
            // let tW = 50;
            // let tH = 100;
            // let thrNode = null;
            addThreadNodes(graph, parent, threadList, 50, 100);
            console.table( graph.getChildVertices(graph.getDefaultParent()));
            // for (let i = 0 ; i < threadList.length; i++){
            //     let thrId = 'thr' + i;
            //     let thrText = threadList[i].getElementsByTagName("span")[0].innerHTML;
            //     if (thrText.includes("_")){
            //         thrText = thrText.replace(/_/g, "\n");
            //         threadStyle(graph, "mainThread");
            //         thrNode = graph.insertVertex(parent, thrId, thrText, tW, tH, 120, 80, 'mainThread');
            //         tW += 150;
            //     }else {
            //         threadStyle(graph, "thread");
            //         thrNode = graph.insertVertex(parent, thrId, thrText, tW, tH, 120, 80, 'thread');
            //         tW += 150;
            //     }
            // }
        }
        finally {
            //console.table( graph.getChildVertices(graph.getDefaultParent()));
            graph.getModel().endUpdate();

        }
    }
}