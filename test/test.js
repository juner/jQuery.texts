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
				assert.ok(value in $.texts);
				assert.ok($.isFunction($.texts[value]));
			})
		});
	});
	$Q.module("simple use", function(hooks){
		var $span = $.parseHTML("<span></span>");
		$Q.test("test -> get 4 elements.",function(assert){
			var $test = $($span).clone().text("test").appendTo($("#target"));
			var $texts = $test.texts();
			assert.equal($texts.length,4);
		});
		$Q.module("exclude space charactor.",function(hooks){
			$Q.test("t e s\tt -> get 4 elements.",function(assert){
				var $test = $($span).clone().text("t e s\tt ").appendTo($("#target"));
				var $texts = $test.texts();
				assert.equal($texts.length,4);
			});
		});
		$Q.module("surrogate pair support.",function(assert){
			$Q.test("\uD867\uDE3D -> get 1 elements",function(assert){
				var $test = $($span).clone().text("\uD867\uDE3D").appendTo($("#target"));
				var $texts = $test.texts();
				assert.equal($texts.length,1);
			});
		});
		$Q.module("regature charactor unsupport.",function(assert){
			$Q.test("A\u20E0秘\u20E3 -> get 4 elements",function(assert){
				var $test = $($span).clone().text("A\u20E0秘\u20E3").appendTo($("#target"));
				var $texts = $test.texts();
				assert.equal($texts.length,4);
			});
		});
		$Q.module("variation selector support.",function(){
			$Q.test("\u2668\ufe0e\u24c2\ufe0f\u908A\uDB40\uDD00 -> get 3 elements",function(assert){
				var $test = $($span).clone().text("\u2668\ufe0e\u24c2\ufe0f\u908A\uDB40\uDD00").appendTo($("#target"));
				var $texts = $test.texts();
				assert.equal($texts.length,3);
			});
		});
	});
})(jQuery,QUnit);