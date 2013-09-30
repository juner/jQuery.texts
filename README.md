#jQuery.texts について
##概要
要素内のテキストノードを任意のタグで一文字ずつ分離して取得する為のjQuery plugin です。
##用法
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js"></script>
    <script type="text/javascript" src="./js/jquery.texts.js"></script>
で読み込んで一文字ずつ取得したいところで

    var texts = $(targetSelector).texts();
とするだけです。
尚、このプラグインはサロゲートペアに対応している為、最新のUnicode6.0文字などでも不具合無く抽出することが出来ます。