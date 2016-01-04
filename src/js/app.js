require(['components/ArrayToString'], function(ArrayToString) {
    var result = ArrayToString(['word1', 'word2']);
    console.log(result);
    // <- 'word1 word2'
});