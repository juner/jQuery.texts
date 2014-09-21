(function($,document,undefined){
    "use strict";
    if($ === undefined){
        throw "not found jQuery";
    }
    /**
     * jQuery().texts(options)
     * @param options[className] 設定する一時クラス名(初期値:"char")
     * @param options[tagName] 設定するタグ名(初期値:"span")
     * @param options[excludeTagNames] 除外セレクタ[主に除外するタグ名を指定する](初期値:select,option,textarea)
     * @param options[splitReg] 抽出用正規表現オブジェクト
     * @param options[testReg] 囲う一文字を判別する為の正規表現オブジェクト(初期値:/([\uD800-\uDBFF][\uDC00-\uDFFF]|[^\B\t\s ])/g)
     */
    var default_options = {
        className:"char",
        tagName:"span",
        excludeTagNames:["select","option","textarea","ol","ul","dl"],
        splitReg :/([\uD800-\uDBFF][\uDC00-\uDFFF]|[\B\t\s 　\u200B-\u200F]+|.)/g,
        testReg : /[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\B\t\s 　\u0323\u200B-\u200F]/,
    };
    // 古いバージョンの jquery 対策 (1.8以下)
    var addBack = typeof $.fn.addBack === "function" ? "addBack" : "andSelf";
    // 公開しない関数
    var private_methods ={
        textsTargetElement:function(options){
            options = options || methods.getOptions();
            var excludeTagNames = options.excludeTagNames.join(',');
            return $(this).find("*")[addBack]().not(excludeTagNames);
        },
        notZeroLengthTextNode:function(){
            return $(this).contents().filter(function(){
                return this.nodeType === 3 && 0<this.nodeValue.length
            });
        },
        cloneElement:function(elm,newText){
            return $(elm).clone().text((newText || "")).get(0);
        },
        newTextNode:function(context){
            return document.createTextNode(context);
        },
    };
    //公開用関数群
    var methods = {
        getOptions:function(config){
            return $.extend(default_options,config);
        },
        setOptions:function(options){
            return default_options = $.extend(default_options,options);
        },
        getTexts:function(elm,options){
            options = options || methods.getOptions();
            var tempElem = $.parseHTML("<"+options.tagName+" class='"+options.className+"'></"+options.tagName+">")[0];
            var $elm = $(elm);
            $elm = private_methods.textsTargetElement.call($elm,options);
            $elm = private_methods.notZeroLengthTextNode.call($elm);
            $elm.each(function(){
                    var textNode = this;
                    var text =this.nodeValue;
                    text.replace(options.splitReg,function(matches,$1,offset,str){
                        var newNode = ($1 && options.testReg.test($1))
                            ? private_methods.cloneElement(tempElem,$1)
                            : private_methods.newTextNode($1);
                        textNode.parentNode.insertBefore(
                            newNode,textNode);
                    });
                    $(this).remove();
                });
            return elm
                .find(""+options.tagName+"."+options.className+"")
                .removeAttr("class");   
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
})(jQuery,document);
