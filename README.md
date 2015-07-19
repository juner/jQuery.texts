#about jQuery.texts
[ja][]
#what this.
jQuery.texts is a plug-in order to wrap in the Element one character the TextNode.
#How to use
you only need to use as follows where you want to get one character reads after the jQuery.

    var $texts = $(targetSelector).texts();

In addition, this plug-in order to correspond to the surrogate pair, emoji also supports.

##Example
For example, you will that there has been a following like Element.

    <div id="test">TEST </div>
	
To apply the jQuery.texts, do the following manner.

    var $texts = $("#test").texts();

As a result, the original tag will be equivalent to those in the following manner.

    <div id="target"><span>T</span><span>E</span><span>S</span><span>T</span> </div>

This also allows the `$ texts` contains the following such jQuery array.

    [<span>T</span>,<span>E</span>,<span>S</span>,<span>T</span>];

[ja]: README.ja.md "README(ja)"