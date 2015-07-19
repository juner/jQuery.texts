#jQuery.texts について
[en][]
##概要
要素内のテキストノードを任意のタグで一文字ずつ分離して取得する為のjQuery plugin です。
##用法
jQueryのあとに読み込んで一文字ずつ取得したいところで以下の様に使用するだけです。

    var $texts = $(targetSelector).texts();

尚、このプラグインはサロゲートペアに対応している為、絵文字も対応しています。

[en]: README.md "README(en)"