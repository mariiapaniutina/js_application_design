require(['components/ArrayToString'], function(ArrayToString) {
    var result = ArrayToString(['word1', 'word2']);
    console.log(result);
    // <- 'word1 word2'
});

var controller = function(){
    return 'CONTROLLER!';
};
console.log(controller());

/* === PURE FUNCTION ===
 * Pure function: the result can only depend on the arguments passed to it, 
 * and it can’t depend on state variables, services, or objects that aren’t part of the argument body
 */

var avarageSum = function(nums){
	var sum = 0;
	for (var i=0; i<nums.length; i++){
	    sum += nums[i];
	}
	return sum/nums.length;
};

var test1 = avarageSum([1, 2, 3, 4, 5]);
console.log('avarageSum [1, 2, 3, 4, 5] ===>', test1);

/* === FUNCTIONAL FACTORY ===
 * This is a function, which returns a function, which do what you want to.
 */

var averageFactory = function () {
    var sum = 0;
    var count = 0;
    return function (value) {
        sum += value;
        count++;
        return sum / count;
	}; 
};

var test2 = averageFactory();
test2(1);
test2(2);
test2(3);
test2(4);
var test2result = test2(5);
console.log('averageFactory [1, 2, 3, 4, 5] ===>', test2result);

/*
 * MODULE pattern using slosures
 */

var myModule = (function(){
	var privateVar = 'this is private :: myModule';
	var privateMethod = function(){
		return privateVar;
	};
	var publicAPI = {
		publicMethod: function(){
			return 'this is public :: myModule';
		}
	};
	return publicAPI;
})();
console.log(myModule.publicMethod());

/*
 * Expose the public module/object through closures
 */

(function (myModule) {
  var privateThing = 'Private variable :: exposed from global object :: myModule';
    function privateMethod () {
      return privateThing;
    }
    myModule.api = {
      tellPrivate: function(){
        return privateMethod();
      }
    };
})(myModule);

console.log(myModule.api.tellPrivate());

/*
 * Example of Promise with pure JS (not supporting in IE, use Polyfill instead)
 */
var promise = new Promise(function(resolve, reject){
  resolve();
});

promise.then(function(){
  console.log('promise :: first callback');
}).then(function(){
  console.log('promise :: second callback');
});

var view = function(){
    return 'VIEW!';
};
console.log(view());