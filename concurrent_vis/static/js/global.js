
function createLine(x1,y1,x2,y2,lineId) {
    let distance = Math.sqrt(((x1-x2)*(x1-x2))+((y1-y2)*(y1-y2)));
    console.log(distance);
    let xMid = (x1+x2)/2;
    console.log('left'+xMid);
    let yMid = (y1+y2)/2;
    console.log('top'+yMid);
    let radian = Math.atan2(y1-y2, x1-x2);
    let degree = (radian*180)/Math.PI;
    let line = document.getElementById(lineId);
    line.style.width= distance.toString()+"px";
    line.style.top = yMid.toString()+"px";
    line.style.left = (xMid - (distance/2)).toString()+"px";
    line.style.transform = "rotate("+degree+"deg)";
}


function nodeStyle(graph, threadId) {
    let style = new Object();
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
    style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
    style[mxConstants.STYLE_WHITE_SPACE] = 'wrap';
    style[mxConstants.STYLE_FONTCOLOR] = '#000000';
    style[mxConstants.STYLE_STROKECOLOR] = '#000000';
    style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
    style[mxConstants.STYLE_IMAGE] = '/static/media/'+ threadId + '.png';
    graph.getStylesheet().putCellStyle(threadId, style);
};



function configEdgeStyle(graph,edgeColor) {
    let eStyle = graph.getStylesheet().getDefaultEdgeStyle();
    eStyle['strokeColor'] = edgeColor;
    eStyle['fontColor'] = '#000000';
    eStyle['fontStyle'] = '0';
    eStyle['fontStyle'] = '0';
    eStyle['startSize'] = '8';
    eStyle['endSize'] = '20';
    eStyle['verticalAlign'] = 'top';
};
let activeLi = document.getElementsByClassName("action_list");

activeLi.onmouseover = function(){
    activeLi.classList.remove("hovered");
    this.classList.add("hovered");
};
let nodeList = [];
let edgeList = [];

let structList = document.getElementsByClassName('shared_struct');
// console.log(structList);
for (let i = 0; i < structList.length; i++) {
    let vars = structList[i].children
    for (let j=0;j < vars.length; j++){
        console.log(vars[j]);

        let structName = vars[j].innerHTML;
        let structId = structName + "_child";
        let structChildList = document.getElementById(structId).getElementsByTagName("lo");
        console.log(structChildList);
        let xp = 200;
        let yp = 175;
        let sP = {data: {id: structName, type: 'round-rectangle'}, position: { x: xp+100, y: yp+200 } };
        nodeList.push(sP);
        for (let k = 0; k < structChildList.length; k++) {
          let strcutChild = structChildList[k].innerHTML;
          let sCh = {data: {id: strcutChild, type: 'ellipse'}};
          nodeList.push(sCh);
          let edgeId = 'ch'+k+'_p'+j ;
          let e = {data: {id: edgeId, source: strcutChild, target: structName}};
          edgeList.push(e);
        }
    }
}

