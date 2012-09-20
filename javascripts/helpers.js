var buildDecisionTree = function(examples,target,features,samples){
    $("#samples tbody").children().remove();
    $("#training tbody").children().remove();
          $("#canvas").html('');
    console.log('building model');
    var testModel =
      id3(examples,target,features);
    if($("#showTree:checked").length > 0){
        console.log('drawing tree');
        drawGraph(testModel,'canvas');
          }
    console.log('predicting');
    renderSamples(samples,$("#samples"),testModel,target,features);
    renderTrainingData(examples,$("#training"),target,features);
    console.log('done!');
    $("#error").html(calcError(samples,testModel,target));
}
