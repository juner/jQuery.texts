;(function($,$Q,undefined){
    "use strict";
	$Q.test("jQuery.texts API define check.",8,function(assert){
		assert.ok("texts" in $,"jQuery.texts is define.");
		assert.ok($.isFunction($.fn["texts"]),
				  "jQuery.fn.texts is define.");
		assert.ok($.isFunction($.texts.getOptions),
				  "jQuery.texts.getOptions is define.");
		assert.ok($.isFunction($.texts.setOptions),
				  "jQuery.texts.setOptions is define.");
		assert.ok($.isFunction($.texts.getTextsTargetTextNode),
				 "jQuery.texts.getTextsTargetTextNode is define.");
		assert.ok($.isFunction($.texts.convertTextsWrapTextNode),
				 "jQuery.texts.convertTextsWrapTextNode is define.");
		assert.ok($.isFunction($.texts.findAndRemoveClassOfWrapTextNode),
				 "jQuery.texts.findAndRemoveClassOfWrapTextNode is define.");
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