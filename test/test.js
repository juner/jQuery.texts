;(function($,$Q,undefined){
    "use strict";
	$Q.module("API define check.",function(assert){
		$Q.test("$(elm).texts is function.",function(assert){
			assert.ok($.isFunction($.fn["texts"]))
		});
		$Q.test("jQuery.texts is define.",function(assert){
			assert.ok("texts" in $);
		});
		[
			"getOptions",
			"setOptions",
			"getTextsTargetTextNode",
			"convertTextsWrapTextNode",
			"getTexts"
		].forEach(function(value,index){
			$Q.test("jQuery.texts." + value + " is function.",function(assert){
				assert.ok($.isFunction($.texts[value]));
			})
		});
	});
	$Q.module("simple use", function(hooks){
		$Q.test("$(<span>test</span>).texts() -> get 4 elements.",function(assert){
			var $test = $("<span>test</span>").appendTo($("#target"));
			var $texts = $test.texts();
			assert.equal($texts.length,4,"$(<span>test</span>).texts() -> get 4 elements.");
		});
		$Q.test("$(<span>t e s t </span>).texts() -> get 4 elements.",function(assert){
			var $test = $("<span>t e s t</span>").appendTo($("#target"));
			var $texts = $test.texts();
			assert.equal($texts.length,4,"$(<span>t e s t </span>).texts() -> get 4 elements.");
		});
	});
})(jQuery,QUnit);