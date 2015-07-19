#jQuery.texts について
[en][]
##概要
要素内のテキストノードを任意のタグで一文字ずつ分離して取得する為のjQuery plugin です。
##用法
jQueryのあとに読み込んで一文字ずつ取得したいところで以下の様に使用するだけです。

    var $texts = $(targetSelector).texts();

尚、このプラグインはサロゲートペアに対応している為、絵文字も対応しています。

##用例
例えば、次の様な要素があったとします。

    <div id="test">TEST </div>
	
これに jQuery.texts を適用する場合以下の様にします。

    var $texts = $("#test").texts();

これにより、元の要素は以下の様になります。

    <div id="target"><span>T</span><span>E</span><span>S</span><span>T</span> </div>

また、これにより `$texts` には次の様なjQuery配列が入ります。

    [<span>T</span>,<span>E</span>,<span>S</span>,<span>T</span>];
    
[en]: README.md "README(en)"