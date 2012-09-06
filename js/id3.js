//ID3 Decision Tree Algorithm


//main algorithm and prediction functions

var id3 = function(_s,target,features){
    var targets = _.unique(_s.pluck(target));
    if (targets.length == 1){
	console.log("end node! "+targets[0]);
	return {type:"result", val: targets[0], name: targets[0]+" "+Math.round(Math.random()*10000).toString()}; 
    }
    if(features.length == 0){
	console.log("returning the most dominate feature!!!");
	return {type:"result", val: targets[0], name: targets[0]}; //this needs to be changed!!
    }
    var bestFeature = maxGain(_s,target,features);
    var remainingFeatures = _.without(features,bestFeature);
    var possibleValues = _.unique(_s.pluck(bestFeature));
    console.log("node for "+bestFeature);
    var node = {name: bestFeature};
    node.type = "feature";
    node.vals = _.map(possibleValues,function(v){
	console.log("creating a branch for "+v);
	var _newS = _(_s.filter(function(x) {return x[bestFeature] == v}));
	var child_node = {name:v,type: "feature_value"};
	child_node.child =  id3(_newS,target,remainingFeatures);
	return child_node;
	
    });
    return node;
}

var predict = function(id3Model,sample) {
    root = id3Model;
    while(root.type != "result"){
	var attr = root.name;
	var sampleVal = sample[attr];
	var childNode = _.detect(root.vals,function(x){return x.name == sampleVal});
	root = childNode.child;
    }
    return root.val;
}



//necessary math functions

var entropy = function(vals){
    var uniqueVals = _.unique(vals);
    var probs = uniqueVals.map(function(x){return prob(x,vals)});
    var logVals = probs.map(function(p){return -p*log2(p) });
    return logVals.reduce(function(a,b){return a+b},0);
}

var gain = function(_s,target,feature){
    var attrVals = _.unique(_s.pluck(feature));
    var setEntropy = entropy(_s.pluck(target));
    var setSize = _s.size();
    var entropies = attrVals.map(function(n){
	var subset = _s.filter(function(x){return x[feature] === n});
	return (subset.length/setSize)*entropy(_.pluck(subset,target));
    });
    var sumOfEntropies =  entropies.reduce(function(a,b){return a+b},0);
    return setEntropy - sumOfEntropies;
}

var maxGain = function(_s,target,features){
    return _.max(features,function(e){return gain(_s,target,e)});
}

var prob = function(val,vals){
    var instances = _.filter(vals,function(x) {return x === val}).length;
    var total = vals.length;
    return instances/total;
}

var log2 = function(n){
    return Math.log(n)/Math.log(2);
}

//Display logic

var drawGraph = function(id3Model,divId){
    var g = new Graph();
    g.edgeFactory.template.style.directed = true;
    g = addEdges(id3Model,g);
//    var layouter = new Graph.Layout.Ordered(g, topological_sort(g));
    var layouter = new Graph.Layout.Spring(g);
    layouter.layout();
    var renderer = new Graph.Renderer.Raphael(divId, g, 800, 600);
    renderer.draw();
	//fix those awkwardly named 'Yes 123' edges
	$(_.select($('tspan'),function(e){return $(e).text().indexOf('Yes ') > -1})).text('Yes');
	$(_.select($('tspan'),function(e){return $(e).text().indexOf('No ') > -1})).text('No');
}

var addEdges = function(node,g){
    if(node.type == 'feature'){
	_.each(node.vals,function(m){
	    g.addEdge(node.name,m.name);
	    g = addEdges(m,g);
	});
	return g;
    }
    if(node.type == 'feature_value'){
	g.addEdge(node.name,node.child.name);
	if(node.child.type != 'result'){
	    g = addEdges(node.child,g);
	}
	return g;
    }
    return g;
}


var renderSamples = function(samples,$el,model){
    _.each(samples,function(s){
	$el.append("<tr><td>"+[s.outlook,s.temp,s.humidity,s.wind].join('</td><td>')+"</td><td><b>"+predict(model,s)+"</b></td></tr>");
    })
}

var renderTrainingData = function(_training,$el){
    _training.each(function(s){
	$el.append("<tr><td>"+[s.outlook,s.temp,s.humidity,s.wind,s.play].join('</td><td>')+"</td></tr>");
    })
}
