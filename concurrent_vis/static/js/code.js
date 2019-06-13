let nodeList = [];
let edgeList = [];

let structList = document.getElementById('shared_struct').getElementsByTagName("li");
console.log(structList);
for (let i = 0; i < structList.length; i++) {
  let structName = structList[i].innerHTML;
  let structId = structName + "_child";
  let structChildList = document.getElementById(structId).getElementsByTagName("lo");
  console.log(structChildList);
  let xp = 200;
  let yp = 175;
  let sP = {data: {id: structName, type: 'round-rectangle'}, position: { x: xp+100, y: yp+200 } };
  nodeList.push(sP);
  for (let j = 0; j < structChildList.length; j++) {
    let strcutChild = structChildList[j].innerHTML;
    let sCh = {data: {id: strcutChild, type: 'ellipse'}};
    nodeList.push(sCh);
    let edgeId = 'ch'+j+'_p'+i ;
    let e = {data: {id: edgeId, source: strcutChild, target: structName}};
    edgeList.push(e);
  }
}
let varList = document.getElementById('shared_variables').getElementsByTagName("li");
for (let i = 0; i < varList.length; i++) {
  let a = {"data": {"id": varList[i].innerHTML, type: 'ellipse'}};
  nodeList.push(a);
}

let cy = window.cy = cytoscape({
  container: document.getElementById('cy'),

  boxSelectionEnabled: true,
  zoomingEnabled: false,
  userZoomingEnabled: false,

  style: [
    {
      selector: "node",
      "style" : {
        "content": "data(id)",
        "text-valign": "center",
        "text-halign": "center",
        "width": 70,
        "height": 70,
        "shape": "data(type)",
        'background-color': '#ccc',
        'color':'#000',
        'font-size': 10,
        "text-wrap":"wrap"
      }
    }, {
      "selector": "edge",
      "style": {
        "width": 2,
        "curve-style": "bezier",
        "target-arrow-shape": "triangle"
      }
    }, {
      "selector": "edge[arrow]",
      "style": {
        "target-arrow-shape": "triangle"
      }
    }, {
      "selector": "edge.hollow",
      "style": {
        "target-arrow-fill": "hollow"
      }

    }
  ],

  elements: {
    nodes: nodeList,
    edges: edgeList
        //[
      // {"data": {"id": "e9", "source": "n16", "target": "n17", "arrow": "diamond"}},
    //]
  }

});
cy.edges().toggleClass('hollow');

// let funcList = [];
// //let conList = [];
// let funcNames = document.getElementById('function_names').getElementsByTagName("li");
// for (let i = 0; i < funcNames.length; i++) {
//   let a = {"data": {"id": funcNames[i].innerHTML}};
//   funcList.push(a);
// }
// let dl = window.dl = cytoscape({
//   container: document.getElementById('dl'),
//   boxSelectionEnabled: true,
//   zoomingEnabled: false,
//   userZoomingEnabled: false,
//   style: [
//     {
//       selector: "node",
//       "style" : {
//         "content": "data(id)",
//         "text-valign": "center",
//         "text-halign": "center",
//         "width": 70,
//         "height": 70,
//         "shape": "rectangle",
//         'background-color': '#FFD700',
//         'color':'#000',
//         'font-size': 10,
//         "text-wrap":"wrap"
//       }
//     }, {
//       "selector": "edge",
//       "style": {
//         "width": 2,
//         "curve-style": "bezier",
//         "target-arrow-shape": "diamond"
//       }
//     }, {
//       "selector": "edge[arrow]",
//       "style": {
//         "target-arrow-shape": "diamond"
//       }
//     }, {
//       "selector": "edge.hollow",
//       "style": {
//         "target-arrow-fill": "hollow"
//       }
//
//     }
//   ],
//
//   elements: {
//     nodes: funcList,
//     // edges: edgeList
//         //[
//       // {"data": {"id": "e9", "source": "n16", "target": "n17", "arrow": "diamond"}},
//     //]
//   }
// });