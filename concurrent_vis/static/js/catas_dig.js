document.addEventListener('DOMContentLoaded', function() {
    let graphContainer = document.getElementById('catastrophe_diagram');
    main(graphContainer);
    function main(container)
    {
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


            graph.getStylesheet().getDefaultEdgeStyle()['edgeStyle'] = 'topToBottomEdgeStyle';
            graph.htmlLabels = true;
            graph.vertexLabelsMovable = true;

            graph.isWrapping = function (cell) {
                return this.model.isCollapsed(cell);
            };


            // Enables rubberband selection
            new mxRubberband(graph);
            let parent = graph.getDefaultParent();

            // Adds cells to the model in a single step
            graph.getModel().beginUpdate();
            try
            {
                let varH = 250;
                let varW = 10;
                let thrW = 20;
                let thrH = 100;
                let edgeColor = "#B22222";
                configEdgeStyle(graph, edgeColor);


                let varList = document.getElementById('var_list').getElementsByClassName('set_var_id');
                // console.log(varList.length);
                let varThrList = document.getElementById("sidebar").getElementsByClassName("threads");
                let thrList = varThrList[0].getElementsByTagName("li");
                for (let j = 0; j < thrList.length; j++) {
                    let thrId = 'thr'+j;
                    threadStyle(graph, thrId);
                    let thread = thrList[j].innerHTML;
                    graph.insertVertex(parent, thrId, thread, thrW, thrH, 150, 100, thrId);
                    thrW += 200;
                    thrH -= 20;
                }
                var thrCells = graph.getChildVertices(graph.getDefaultParent());
                //console.table(thrCells);

                // graph.insertVertex(parent, null, "get Elements By Tag Name getElements ByTagName", varW, varH, 120, 100, "val_10");

                for (let i = 0; i < varList.length; i++) {
                    //console.log("varList.length => " + varList.length);
                    if (i !== 0 && ((i/8)% 1) === 0){
                        varH += 100;
                        varW = 20;
                    }
                    let varId = 'val_' + i;

                    let varText = varList[i].getElementsByTagName("span")[0].innerHTML;
                    let varThrList = varList[i].getElementsByTagName("ol")[0];

                    sharedVarStyle(graph, varId);
                    let varNode = graph.insertVertex(parent, varId, varText, varW, varH, 120, 100, varId);

                    var threads = [];
                    let oP = "";
                    for (let k = 0; k < varThrList.children.length ; k++){
                        let thrId = varThrList.children[k].getElementsByTagName("span")[0].innerHTML;
                        // let thrOp = varThrList.children[k].getElementsByClassName("thr_op")[0];
                        //
                        // if (thrOp.children[0] != undefined){
                        //     threads.push(thrId);
                        //     oP = thrOp.children[0].innerHTML + ", " + thrOp.children[1].innerHTML;
                        //     // console.log(oP);
                        // }

                        //threads.push(varThrList.children[k].getElementsByTagName("span")[0].innerHTML);
                    }
                    let edgeId = null;
                    // console.table(varNode);
                    // console.log("threads.length=> "+ threads);
                    thrCells.forEach(function (t) {
                        // console.log(t);
                        graph.insertEdge(parent, edgeId, null, t, varNode, 'dashed=0;'+
                             'endArrow=open;startFill=0;endFill=0;' +
                             'endSize=8;');
                    });

                    thrW += 200;
                    varW +=150;
                    varH += 10;
                }
                // console.table(graph.getStylesheet().getDefaultVertexStyle());
            }
            finally
            {
                // Updates the display
                graph.getModel().endUpdate();
            }

        }


    };

});