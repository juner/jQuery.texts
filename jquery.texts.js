;(function ($,document,undefined){
    "use strict";
    if($ === undefined){
        throw "not found jQuery";
    }
    var default_options = {
        template:function(){ return $.parseHTML("<span/>")[0];},
        className:"char",
        tagName:"span",
        excludeSelectors:["select","option","textarea","ol","ul","dl"],
        splitReg :/([\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2000-\u200F\t\s 　]+|.)/g,
        testReg : /[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\u2000-\u200F\t\s 　\u0323]/
    };
    // 古いバージョンの jquery 対策 (1.8以下)
    var addBack = typeof $.fn.addBack === "function" ? "addBack" : "andSelf";
    var private_methods ={
        getTemplate:function(options){
            options = options || methods.getOptions();
            if($.isFunction(options.template)){
                return options.template();
            }else if(typeof options.template == "string"){
                return $.parseHTML(options.template)[0];
            }else{
                throw new Error("unkown type template.");
            }
        },
        textsTargetElement:function(options){
            options = options || methods.getOptions();
            var excludeTagNames = options.excludeSelectors.join(',');
            return $(this).find("*")[addBack]().not(excludeTagNames);
        },
        notZeroLengthTextNode:function(){
            return $(this).contents().filter(function(){
                return this.nodeType === 3 && 0<this.nodeValue.length
            });
        },
        cloneElement:function(elm,newText){
            var newElem = elm.cloneNode(false);
            newElem.appendChild(document.createTextNode(newText || ""));
            return newElem;
        },
        newTextNode:function(context){
            return document.createTextNode(context || "");
        },
        textNodeToWrapTextNode:function(tempElem,options){
            options = options || methods.getOptions();
            return function(index,node){
                var textNode = this;
                var parentNode = textNode.parentNode;
                var text =this.nodeValue;
                var fragments= document.createDocumentFragment ? document.createDocumentFragment():null;
                var nodes = [];
                text.replace(options.splitReg,function(matches,$1,offset,str){
                    var newNode = ($1 && options.testReg.test($1))
                        ? private_methods.cloneElement(tempElem,$1)
                        : private_methods.newTextNode($1);
                    if(fragments){
                        fragments.appendChild(newNode);
                    }else{
                        parentNode.insertBefore(newNode,textNode);
                    }
                    nodes.push(newNode);
                });
                if(fragments)
                    parentNode.insertBefore(fragments,textNode);
                $(this).remove();
                return nodes;
            }
        }
    };
    var methods = {
        getOptions:function(config){
            return $.extend({},default_options,config);
        },
        setOptions:function(options){
            return default_options = $.extend(default_options,options);
        },
        getTextsTargetTextNode:function(elm,options){
            options = options || methods.getOptions();
            var $elm = $(elm);
            $elm = private_methods.textsTargetElement.call($elm,options);
            $elm = private_methods.notZeroLengthTextNode.call($elm);
            return $elm;
        },
        convertTextsWrapTextNode:function(elm,options){
            options = options || methods.getOptions();
            var $elm = $(elm);
            var tempElem = private_methods.getTemplate(options);
            return $elm.map(private_methods.textNodeToWrapTextNode(tempElem,options));
        },
        getTexts:function(elm,options){
            options = options || methods.getOptions();
            var $elm = $(elm);
            $elm = methods.getTextsTargetTextNode($elm,options);
            $elm = methods.convertTextsWrapTextNode($elm,options);
            $elm = $elm.filter("*");
            return $elm;
        }
    };
    /**
     * jQuery().texts(config)
     * @param config[className] 設定する一時クラス名(初期値:"char")
     * @param config[tagName] 設定するタグ名(初期値:"span")
     * @param config[excludeSelectors] 除外セレクタ[主に除外するタグ名を指定する](初期値:select,option,textarea,ol,ul,dl)
     * @param config[splitReg] 抽出用正規表現オブジェクト
     * @param config[testReg] 囲う一文字を判別する為の正規表現オブジェクト(初期値:/([\uD800-\uDBFF][\uDC00-\uDFFF]|[^\B\t\s ])/g)
     */
    function texts(config){
        return $(this).pushStack(methods.getTexts(this,methods.getOptions(config)));
    }
    $.fn.extend({ 
        texts:texts
    });
    $.extend({
        texts:methods
    });
})(jQuery,document);
