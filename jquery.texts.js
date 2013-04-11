// forked from juner's ".texts() 1.0 [jQuery plugin]" http://jsdo.it/juner/jQuery_texts
(function($,undefined){
    if($ === undefined){
        throw "not found jQuery";
    }
    /**
     * jQuery().texts(options)
     * @param options[className] 設定する一時クラス名(初期値:"char")
     * @param options[tagName] 設定するタグ名(初期値:"span")
     * @param options[excludeTagNames] 除外セレクタ[主に除外するタグ名を指定する](初期値:select,option,textarea)
     * @param options[reg] 一文字を切り出す為の正規表現オブジェクト(初期値:/([\uD800-\uDBFF][\uDC00-\uDFFF]|[^\B\t\s ])/g)
     */
    var default_options = {
        className:"char",
        tagName:"span",
        excludeTagNames:["select","option","textarea","ol","ul","dl"],
        reg : /([\uD800-\uDBFF][\uDC00-\uDFFF]|[^\B\t\s ])/g,
    };
    var methods = {
        getOptions:function(config){
            return $.extend(default_options,config);
        },
        setOptions:function(options){
            return default_options = $.extend(default_options,options);
        },
        getTexts:function(elm,options){
            options = options || methods.getOptions();
            elm.find("*").add(elm).not(options.excludeTagNames.join(',')).contents().each(function(){
                var text ="";
                if(this.nodeType===3 && 0<(text =$(this).text()).length)
                {
                    text = text.replace(options.reg, "<"+options.tagName+" class='"+options.className+"'>$1</"+options.tagName+">");
                    var es = $.parseHTML(text);
                    $(es).insertAfter(this);
                    $(this).remove();
                }
            });
            return elm.find(""+options.tagName+"."+options.className+"").removeAttr("class");
        }
    };
    $.fn.extend({
        texts:function(config){
            return methods.getTexts(this,methods.getOptions(config));
        }
    });
    $.extend({
        texts:methods
    });
})(jQuery);
