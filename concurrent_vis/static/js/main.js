document.addEventListener('DOMContentLoaded', function(){
    var graphContainer = document.getElementById('graphContainer');
    var body = document.getElementsByTagName("body");
    // body.addEventListener("load", main(graphContainer));
    main(graphContainer);
    function main(container)
    {
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


            graph.getStylesheet().getDefaultEdgeStyle()['edgeStyle'] = 'orthogonalEdgeStyle';

            // Enables rubberband selection
            new mxRubberband(graph);

            // Disables basic selection and cell handling
            // configureStylesheet(graph);

            // Gets the default parent for inserting new cells. This
            // is normally the first child of the root (ie. layer 0).
            var parent = graph.getDefaultParent();

            // Adds cells to the model in a single step
            graph.getModel().beginUpdate();

            // var w = 20;
            // var h = 300;
            try
            {
                // for (let i = 0; i < varList.length; i++) {
                //     if (i !== 0 && ((i/8)% 1) === 0){
                //         h += 100;
                //         w = 20;
                //     }
                //     let varId = 'var'+ i;
                //     graph.insertVertex(parent, null, varList[i].innerHTML, w, h, 100, 80, varId);
                //     w +=150;
                // }
                let varH = 20;
                let varW = 20;
                let dtW = 300;
                let dtH = 1000;
                let dataTypes = document.getElementById('shared_variables').getElementsByTagName("span");
                for (let i = 0; i < dataTypes.length; i++) {
                    let dtId = 'dT'+ i;
                    dataTypeStyle(graph, 'dT'+ i);
                    let dt = graph.insertVertex(parent, null, dataTypes[i].innerHTML, dtW, dtH, 100, 80, dtId);
                    let dtVarList = document.getElementById(dataTypes[i].innerHTML+'_child').getElementsByTagName("li");
                    for (let j = 0; j < dtVarList.length; j++) {
                        if (j !== 0 && ((j/8)% 1) === 0){
                            varH += 100;
                            varW = 20;
                        }
                        let varId = 'dT'+i+'var'+ j;
                        sharedVarStyle(graph, varId);
                        // let edgeColor = '#000000';
                        // if (i == 0){
                        //     edgeColor = '#B22222';
                        // }else if (i==1){edgeColor= '#0000CD'}
                        let edgeColor = (i==0)? '#B22222' : '#0000CD';
                        console.log(i);
                        configEdgeStyle(graph);
                        let v = graph.insertVertex(parent, null, dtVarList[j].innerHTML, varW, varH, 100, 80, varId);
                        let e1 = graph.insertEdge(parent, null, '', v, dt, 'dashed=0;'+
						'endArrow=block;sourcePerimeterSpacing=0;startFill=0;endFill=0;strokeColor='+edgeColor);
                        varW +=150;
                        varH += 10;
                    }
                    dtW += 300;
                }

            }
            finally
            {
                // Updates the display
                graph.getModel().endUpdate();
            }
        }
    };
    function configureStylesheet(graph) {
        let style = new Object();
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
        style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
        style[mxConstants.STYLE_STROKECOLOR] = '#000000';
        style[mxConstants.STYLE_FILLCOLOR] = '#FF6666';
        style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
        style[mxConstants.STYLE_IMAGE] = '/static/media/LD_bg2.png';
        graph.getStylesheet().putCellStyle('hello', style);

        let eStyle = graph.getStylesheet().getDefaultEdgeStyle();
        eStyle['strokeColor'] = '#000000';
        eStyle['fontColor'] = '#000000';
        eStyle['fontStyle'] = '0';
        eStyle['fontStyle'] = '0';
        eStyle['startSize'] = '8';
        eStyle['endSize'] = '20';
    };
    function sharedVarStyle(graph, varId) {
        let style = new Object();
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
        style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
        style[mxConstants.STYLE_WHITE_SPACE] = 'wrap';
        style[mxConstants.STYLE_FONTCOLOR] = '#000000';
        style[mxConstants.STYLE_STROKECOLOR] = '#000000';
        style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
        style[mxConstants.STYLE_IMAGE] = '/static/media/TechData.png';
        graph.getStylesheet().putCellStyle(varId, style);
    };
    function dataTypeStyle(graph, dtId) {
        let style = new Object();
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
        style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
        style[mxConstants.STYLE_WHITE_SPACE] = 'wrap';
        style[mxConstants.STYLE_FONTCOLOR] = '#000000';
        style[mxConstants.STYLE_STROKECOLOR] = '#000000';
        style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
        style[mxConstants.STYLE_IMAGE] = '/static/media/dataType.png';
        graph.getStylesheet().putCellStyle(dtId, style);
    };
    function configEdgeStyle(graph,edgeColor) {
        let eStyle = graph.getStylesheet().getDefaultEdgeStyle();
        eStyle['strokeColor'] = edgeColor;
        eStyle['fontColor'] = '#000000';
        eStyle['fontStyle'] = '0';
        eStyle['fontStyle'] = '0';
        eStyle['startSize'] = '8';
        eStyle['endSize'] = '20';
    }

});
