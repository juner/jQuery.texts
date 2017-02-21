;(function ($,document,undefined){
    "use strict";
    if($ === undefined){
        throw new Error("not found jQuery");
    }
    var default_options = {
        template:function(){ return $.parseHTML("<span/>")[0];},
        className:"char",
        tagName:"span",
        excludeSelectors:["select","option","textarea","ol","ul","dl"],
        splitReg :/([\uD800-\uDBFF][\uDC00-\uDFDFF\uFE10-\uFFFF][\uFE00-\uFE0F]?|[\u2000-\u200F\t\s 　]+|.[\uFE00-\uFE0F]?)/g,
        testReg : /[\uD800-\uDBFF][\uDC00-\uDFFF\uFE10-\uFFFF][\uFE00-\uFE0F]?|[^\u2000-\u200F\t\s 　\u0323][\uFE00-\uFE0F]?/
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
        splitTextNode:function(callback,options){
            callback = callback || private_methods.newTextNode;
            var textNode = this;
            var parentNode = textNode.parentNode;
            var text =this.nodeValue;
            var fragments= document.createDocumentFragment ? document.createDocumentFragment():null;
            var nodes = [];
            console.log("textNode: "+ textNode +"origin: " + text);
            text.replace(options.splitReg,function(matches,$1,offset,str){
                var newNode = ($1 && options.testReg.test($1))
                    ? callback($1)
                    : private_methods.newTextNode($1);
                fragments.appendChild(newNode);
            });
            parentNode.insertBefore(fragments,textNode);
            $(this).remove();
        },
        textNodeToWrapTextNode:function(tempElem,options){
            return function(index,node){
                var nodes = [];
                private_methods.splitTextNode.call(this,function(text){
                    console.log("split: "+text+"(\\u"+text.charCodeAt(0).toString(16)+")");
                    var $newNode = private_methods.cloneElement(tempElem,text);
                    nodes.push($newNode);
                    return $newNode;
                },options);
                return nodes;
            }
        }
    };
    /**
     * @global
     * @memberOf jQuery
     * @namespace jQuery.texts
     */
    var methods = {
        /**
         * 
         * @memberOf jQuery.texts
         */
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
     * jQuery.texts is split textNode charactors and wrap elements.
     * @global
     * @memberOf jQuery 
     * @param {string} config.className - 設定する一時クラス名(初期値:"char")
     * @param {string} config.tagName - 設定するタグ名(初期値:"span")
     * @param {string} config.excludeSelectors - 除外セレクタ[主に除外するタグ名を指定する](初期値:select,option,textarea,ol,ul,dl)
     * @param {string} config.splitReg - 抽出用正規表現オブジェクト
     * @param {string} config.testReg - 囲う一文字を判別する為の正規表現オブジェクト(初期値:/([\uD800-\uDBFF][\uDC00-\uDFFF]|[^\B\t\s ])/g)
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
