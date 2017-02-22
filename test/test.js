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
		var test = function(context,answer){
			$Q.test(context+ " -> get "+answer.length+" elements.",function(assert){
				var $test = $($span).clone().text(context).appendTo($("#target"));
				var $texts = $test.texts();
				var result = $texts.map(function(index,$element){ return $($element).text(); }).get();
				assert.deepEqual(answer,result);
			});
		};
		test("test",["t","e","s","t"]);
		$Q.module("exclude space charactor.",function(hooks){
			test("t e s\tt ",["t","e","s","t"]);
		});
		$Q.module("surrogate pair support.",function(hooks){
			test("\uD867\uDE3D\uD842\uDFB7",["\uD867\uDE3D","\uD842\uDFB7"]);
		});
		$Q.module("regature charactor unsupport.",function(hooks){
			test("A\u20E0秘\u20E3",["A","\u20E0","秘","\u20E3"]);
		});
		$Q.module("variation selector support.",function(hooks){
			test("\u2668\ufe0e\u24c2\ufe0f\u908A\uDB40\uDD00\t",["\u2668\ufe0e","\u24c2\ufe0f","\u908A\uDB40\uDD00"]);
		});
	});
})(jQuery,QUnit);