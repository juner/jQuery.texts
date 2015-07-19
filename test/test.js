;(function($,$Q,undefined){
    "use strict";
	$Q.test("jQuery.texts simple use test",function(assert){
		assert.ok("texts" in $.fn,"$(elm).texts is define.");
	assert.ok($.isFunction($.fn["texts"]),"$().texts() is function.");
		var $target = $("#target"),
			$test,
			$texts;
		$test = $("<span>test</span>").appendTo($target);
		$texts = $test.texts();
		assert.equal($texts.length,4,"$(<span>test</span>).texts() -> get 4 elements.");
		$test = $("<span>t e s t</span>").appendTo($target);
		$texts = $test.texts();
		assert.equal($texts.length,4,"$(<span>t e s t </span>).texts() -> get 4 elements.");
	});
	$Q.test("jQuery.texts API define check.",7,function(assert){
		assert.ok("texts" in $,"jQuery.texts is define.");
		assert.ok($.isFunction($.fn["texts"]),
				  "jQuery.fn.texts is de fine.");
		assert.ok($.isFunction($.texts.getOptions),
				  "jQuery.texts.getOptions is define.");
		assert.ok($.isFunction($.texts.setOptions),
				  "jQuery.texts.setOptions is define.");
		assert.ok($.isFunction($.texts.getTextsTargetTextNode),
				 "jQuery.texts.getTextsTargetTextNode is define.");
		assert.ok($.isFunction($.texts.convertTextsWrapTextNode),
				 "jQuery.texts.convertTextsWrapTextNode is define.");

		assert.ok($.isFunction($.texts.getTexts),
				  "jQuery.texts.getTexts is define.");
	});
	$Q.test("jQuery.texts",function(assert){
		var $target = $("#target");
		assert.ok($.isFunction($target.texts),"$.fn.texts is define.");
		var message = "text";
		$target.text(message);
		var $texts = $target.texts();
		assert.equal($texts.length,message.length,"$elm.texts() でちゃんと小分けになって取得できているか");
	});
})(jQuery,QUnit);