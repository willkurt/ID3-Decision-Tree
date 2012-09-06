//main source file
//this is a bit messy, just want to get everything running

//some sample data we'll be using
//http://www.cise.ufl.edu/~ddd/cap6635/Fall-97/Short-papers/2.htm
// Day, Outlook, Temperature, Humidity, Wind, Play ball

// D1	Sunny	Hot	High	Weak	No
// D2	Sunny	Hot	High	Strong	No
// D3	Overcast	Hot	High	Weak	Yes
// D4	Rain	Mild	High	Weak	Yes
// D5	Rain	Cool	Normal	Weak	Yes
// D6	Rain	Cool	Normal	Strong	No
// D7	Overcast	Cool	Normal	Strong	Yes
// D8	Sunny	Mild	High	Weak	No
// D9	Sunny	Cool	Normal	Weak	Yes
// D10	Rain	Mild	Normal	Weak	Yes
// D11	Sunny	Mild	Normal	Strong	Yes
// D12	Overcast	Mild	High	Strong	Yes
// D13	Overcast	Hot	Normal	Weak	Yes
// D14	Rain	Mild	High	Strong	No

var examples = [
{day:'D1',outlook:'Sunny', temp:'Hot', humidity:'High', wind: 'Weak',play:'No'},
{day:'D2',outlook:'Sunny', temp:'Hot', humidity:'High', wind: 'Strong',play:'No'},
{day:'D3',outlook:'Overcast', temp:'Hot', humidity:'High', wind: 'Weak',play:'Yes'},
{day:'D4',outlook:'Rain', temp:'Mild', humidity:'High', wind: 'Weak',play:'Yes'},
{day:'D5',outlook:'Rain', temp:'Cool', humidity:'Normal', wind: 'Weak',play:'Yes'},
{day:'D6',outlook:'Rain', temp:'Cool', humidity:'Normal', wind: 'Strong',play:'No'},
{day:'D7',outlook:'Overcast', temp:'Cool', humidity:'Normal', wind: 'Strong',play:'Yes'},
{day:'D8',outlook:'Sunny', temp:'Mild', humidity:'High', wind: 'Weak',play:'No'},
{day:'D9',outlook:'Sunny', temp:'Cool', humidity:'Normal', wind: 'Weak',play:'Yes'},
{day:'D10',outlook:'Rain', temp:'Mild', humidity:'Normal', wind: 'Weak',play:'Yes'},
{day:'D11',outlook:'Sunny', temp:'Mild', humidity:'Normal', wind: 'Strong',play:'Yes'},
{day:'D12',outlook:'Overcast', temp:'Mild', humidity:'High', wind: 'Strong',play:'Yes'},
{day:'D13',outlook:'Overcast', temp:'Hot', humidity:'Normal', wind: 'Weak',play:'Yes'},
{day:'D14',outlook:'Rain', temp:'Mild', humidity:'High', wind: 'Strong',play:'No'}
];

examples = _(examples);
var features = ['outlook', 'temp', 'humidity', 'wind'];
var samples = [{outlook:'Overcast', temp:'Mild', humidity:'High', wind: 'Strong'},
	       {outlook:'Rain', temp:'Mild', humidity:'High', wind: 'Strong'},
	       {outlook:'Sunny', temp:'Cool', humidity:'Normal', wind: 'Weak'}]



var prob = function(val,vals){
    var instances = _.filter(vals,function(x) {return x === val}).length;
    var total = vals.length;
    return instances/total;
}

var log2 = function(n){
    return Math.log(n)/Math.log(2);
}

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

var id3 = function(_s,target,features){
    var targets = _.unique(_s.pluck(target));
    if (targets.length == 1){
	console.log("end node! "+targets[0]);
	return {type:"result", val: targets[0], name: targets[0]+" "+Math.round(Math.random()*10000).toString()}; //this needs to be changed!!
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

var drawGraph = function(id3Model,divId){
    var g = new Graph();
    g.edgeFactory.template.style.directed = true;
    g = addEdges(id3Model,g);
//    var layouter = new Graph.Layout.Ordered(g, topological_sort(g));
    var layouter = new Graph.Layout.Spring(g);
    layouter.layout();
    var renderer = new Graph.Renderer.Raphael(divId, g, 800, 600);
    renderer.draw();
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
