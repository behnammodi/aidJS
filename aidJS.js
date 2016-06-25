/*
 * aidJS v0.11.0
 * (c) 2016 ITTEN, Inc. (http://itten.ir) 
 * aidJS on github (https://github.com/uxitten/aidJS/)
 * ie9+, chrome5+, firefox4+, opera12+, safari5+
 * version 0.11.0 2016/06/24
 *  - add bubbling arrgument in method "on"
 * version 0.10.0 2016/06/01
 *  - add headers arrg in ajax
 * version 0.9.0 2016/05/29
 *  - add return XMLHttpRequest in ajax method
 * version 0.8.4 2016/05/29
 *  - fixed bug in on and off method
 * version 0.8.3 2016/05/22
 *  - remove observable 
 * version 0.8.2 2016/05/22
 *  - fixed bug in addClass
 * version 0.8.1 2016/05/18
 *  - add data to state in methos set querystring
 *  - add index method
 *  - value method now work with input type checkbox
 *  - add clean method in queryString
 *  - overwrite set in queryString
 * version 0.8.0 2016/05/15
 *  - add complete handler in ajax
 *  - add queryString feature
 * version 0.7.0 2016/05/14
 *  - add a.copy method
 *  - fixed bug
 *  - remove version attr in a
 * version 0.6.2 2016/05/11
 *  - add aidJS.debug
 *  - fixed bug
 * version 0.6.1 2016/05/10
 *  - add query in console.warn
 * version 0.6.0 2016/05/09
 *  - add elements prop for access pure elements
 *  - add trigger in a
 *  - add the string appending feature in append
 *  - add event delegation feature in on
 *  - add removeAttr method in a
 *  - fixed bug set value in attr
 *  - fixed bug in parent
 * version 0.5.0 2016/05/08
 *  - add find method in a
 *  - add closest method in a
 *  - add scrollLeft method in a
 *  - add value method in a
 * version 0.4.0 2016/05/07
 *  - add observable first version 
 * version 0.3.3 2016/05/07
 *  - performance improvemnt in css
 * version 0.3.2 2016/05/07
 *  - fixed bug in return property value in css
 *  - fixed bug in eq
 * version 0.3.1 2016/05/06
 *  - fixed bug in a.ajax
 * version 0.3.0 2016/05/06
 *  - redesign structure
 * version 0.2.0 2016/05/05
 *  - add polyfill propertie arrgument in css
 *  - add scrollTop in a
 * version 0.1.0 2016/05/05
 *  - add count in a
 * version 0.0.0 2016/05/05
 */


/*
 * select element
 * ie9+
 * version 0.0.0 2016/05/05
 */
var aidJS = function (query) {

    if (query === undefined) {
        return undefined;
    }

    /*
     * element
     */
    var elements = null;

    if (query instanceof Array) {
        elements = query;
    } else if (query instanceof Object) {
        elements = [query];
    } else {
        elements = document.querySelectorAll(query);
    }

    if (elements.length == 0) {
        if (aidJS.debug) {
            console.error('aidJS Error:', '0001', 'not found element', query);
        }
    }

    /*
     * add class
     * ie8+
     * version 0.0.2 2016/05/22
     *  - fixed bug
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.0 2016/05/05
     */
    function addClass(className) {
        if (elements.length > 0) {
            if (elements[0].classList) {
                className = className.split(' ');
                Array.prototype.forEach.call(elements, function (element, index) {
                    className.forEach(function (value) {
                        element.classList.add(value);
                    })
                });
            } else {
                Array.prototype.forEach.call(elements, function (element, index) {
                    element.className += ' ' + className;
                });
            }
        }
        return this;
    }

    /*
     * append
     * ie9+
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.1.0 2016/05/06
     *  - added the string appending feature
     * version 0.0.0 2016/05/05
     */
    function append(tobeAppended) {
        if (elements.length > 0) {
            Array.prototype.forEach.call(elements, function (element, index) {
                if (typeof tobeAppended === 'string') {
                    element.innerHTML += tobeAppended;
                }
                else {
                    element.appendChild(tobeAppended);
                }
            });
        }
        return this;
    }

    /*
     * attribute
     * ie9+
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.1 2016/05/09
     *  - fixed bug set value
     * version 0.0.0 2016/05/05
     */
    function attr(attribute, value) {
        if (value !== undefined) {
            if (elements.length > 0) {
                Array.prototype.forEach.call(elements, function (element, index) {
                    element.setAttribute(attribute, value);
                });
            }
            return this;
        } else {
            if (elements.length > 0) {
                return elements[0].getAttribute(attribute);
            } else {
                return undefined;
            }
        }
    }

    /*
     * length
     * ie8+
     * version 0.0.0 2016/05/05
     */
    function length() {
        return elements.length;
    }

    /*
     * closest
     * ?
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.0 2016/05/08
     */
    function closest(query) {
        if (elements.length > 0) {
            var elementSelector = elements[0];
            var matchesSelector = elementSelector.matches || elementSelector.webkitMatchesSelector || elementSelector.mozMatchesSelector || elementSelector.msMatchesSelector;
            while (elementSelector && elementSelector.tagName.toLowerCase() != 'html') {
                if (matchesSelector.call(elementSelector, query)) {
                    break;
                }
                elementSelector = elementSelector.parentNode;
            }
            return (elementSelector.tagName.toLowerCase() == 'html') ? undefined : a(elementSelector);
        }
        return undefined;
    };

    /*
     * style
     * ie9+, chrome5+, firefox4+, opera12+, safari5+
     * version 0.0.2 2016/05/14
     *  - fixed bug in value arrg when typeof is number
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.1.2 2016/05/07 
     *  - performance improvemnt 
     * version 0.1.1 2016/05/07
     *  - fixed bug in return property value 
     * version 0.1.0 2016/05/05
     *  - add polyfill property arrgument
     * version 0.0.0 2016/05/05
     */
    function css(property, value) {
        if (typeof property === 'object' || (typeof property === 'string' && (typeof value === 'string' || typeof value === 'number'))) {
            if (elements.length > 0) {
                Array.prototype.forEach.call(elements, function (element, index) {
                    if (typeof property === 'string') {
                        element.style[property] = value;
                    } else {
                        for (key in property) {
                            element.style[key] = property[key];
                        }
                    }
                });
            }
            return this;
        } else {
            if (elements.length > 0) {
                return getComputedStyle(elements[0])[property];
            } else {
                return undefined;
            }
        }

    }

    /*
     * empty
     * ie9+
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.0 2016/05/05
     */
    function empty() {
        if (elements.length > 0) {
            Array.prototype.forEach.call(elements, function (element, index) {
                element.innerHTML = '';
            });
        }
        return this;
    }

    /*
     * eq
     * ie8+
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.1 2016/05/07
     *  - fixed bug
     * version 0.0.0 2016/05/05
     */
    function eq(index) {
        if (elements.length > 0) {
            return a(elements[index]);
        }
        return this;
    }

    /*
     * find
     * ie8+
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.0 2016/05/08
     */
    function find(query) {
        var result = [];
        if (elements.length > 0) {
            Array.prototype.forEach.call(elements, function (element, index) {
                Array.prototype.forEach.call(element.querySelectorAll(query), function (elementTwo, index) {
                    result.push(elementTwo);
                });
            });
        }
        return a(result);
    }

    /*
     * index 
     * ?
     * version 0.0.0 2016/05/17
     */
    function index() {
        if (elements.length > 0) {
            return Array.prototype.indexOf.call(elements[0].parentNode.children, elements[0]);
        }
        return undefined;
    }

    /*
     * has class
     * ie8+
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.0 2016/05/05
     */
    function hasClass(className) {
        if (elements.length > 0) {
            if (elements[0].classList)
                return elements[0].classList.contains(className);
            else
                return new RegExp('(^| )' + className + '( |$)', 'gi').test(elements[0].className);
        }
        return undefined;
    }

    /*
     * hide
     * ie9+
     * version 0.0.0 2016/05/05
     */
    function hide() {
        css('display', 'none');
        return this;
    }

    /*
     * html
     * ie9+
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.0 2016/05/05
     */
    function html(content) {
        if (content) {
            if (elements.length > 0) {
                Array.prototype.forEach.call(elements, function (element, index) {
                    element.innerHTML = content;
                });
            }
            return this;
        } else {
            if (elements.length > 0) {
                return elements[0].innerHTML;
            } else {
                return undefined;
            }
        }

    }

    /*
     * remove
     * ie9+
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.0 2016/05/05
     */
    function remove() {
        if (elements.length > 0) {
            Array.prototype.forEach.call(elements, function (element, index) {
                element.parentNode.removeChild(element);
            });
        }
        return this;
    }

    /*
     * removeAttribute
     * ?
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.0 2016/05/09
     */
    function removeAttr(attribute) {
        if (elements.length > 0) {
            Array.prototype.forEach.call(elements, function (element, index) {
                element.removeAttribute(attribute);
            });
        }
        return this;
    }

    /*
     * remove class
     * ie8+
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.0 2016/05/05
     */
    function removeClass(className) {
        if (elements.length > 0) {
            if (elements[0].classList) {
                Array.prototype.forEach.call(elements, function (element, index) {
                    element.classList.remove(className);
                });
            }
            else {
                Array.prototype.forEach.call(elements, function (element, index) {
                    element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                });
            }
        }
        return this;
    }

    /*
     * remove event listener
     * ie9+ , chrome1+ , firefox1+ , opera7+, safari1+
     * version 0.0.2 2016/05/29
     *  - fixed bug
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.0 2016/05/05
     */
    function off(eventName, eventHandler) {
        if (elements.length > 0) {
            Array.prototype.forEach.call(elements, function (element, index) {
                element.removeEventListener(eventName, eventHandler, false);
            });
        }
        return this;
    }

    /*
     * offset
     * ie9+
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.0 2016/05/05
     */
    function offset() {
        if (elements.length > 0) {
            return elements[0].getBoundingClientRect();
        }
        return undefined;
    }

    /*
     * add event listener
     * ie9+
     * version 0.2.0 2016/06/24
     *  - add bubbling arrgument
     * version 0.1.2 2016/05/29
     *  - fixed bug
     * version 0.1.1 2016/05/11
     *  - fixed bug
     * version 0.1.0 2016/05/09
     * - added event delegation feature
     * version 0.0.0 2016/05/05
     */
    function on() {
        if (elements.length > 0) {
            var selfArguments = arguments;
            if(
                typeof(selfArguments[1])==='string'
            ){
                Array.prototype.forEach.call(elements, function (element, index) {
                    element.addEventListener(selfArguments[0], function (event) {
                        var target = a(event.target).closest(selfArguments[1]);
                        if (target == undefined) return false;
                        if (target.elements.length === 0) return false;
                        selfArguments[2].call(target.elements[0], event);
                    }, selfArguments[2] || false);
                });
            }else{
                Array.prototype.forEach.call(elements, function (element, index) {
                    element.addEventListener(
                        selfArguments[0],
                        selfArguments[1],
                        selfArguments[2] || false);
                });
            }
        }
        return this;
    }

    /*
     * outerWidth
     * ie9+
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.0 2016/05/05
     */
    function outerHeight(withMargin) {
        if (elements.length > 0) {
            if (withMargin) {
                var height = elements[0].offsetHeight;
                var style = getComputedStyle(elements[0]);
                height += parseInt(style.marginTop) + parseInt(style.marginBottom);
                return height;
            } else {
                return elements[0].offsetHeight
            }
        }
        return undefined;
    }

    /*
     * outerWidth
     * ie9+
     * version 0.0.0 2016/05/     
     */
    function outerWidth(withMargin) {
        if (elements.length > 0) {
            if (withMargin) {
                var width = elements[0].offsetWidth;
                var style = getComputedStyle(elements[0]);
                width += parseInt(style.marginLeft) + parseInt(style.marginRight);
                return width;
            } else {
                return elements[0].offsetWidth
            }
        }
        return undefined;
    }

    /*
     * parent
     * ie9+
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.0 2016/05/09
     *  - fixed bug
     * version 0.0.0 2016/05/05
     */
    function parent() {
        if (elements.length > 0) {
            return a(elements[0].parentNode);
        }
        return this;
    }

    /*
     * prepend
     * ie9+
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.0 2016/05/05
     */
    function prepend(insertElement) {
        if (elements.length > 0) {
            Array.prototype.forEach.call(elements, function (element, index) {
                element.insertBefore(insertElement, element.firstChild);
            });
        }
        return this;
    }

    /*
     * scrollLeft
     * ?
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.0 2016/05/08
     */
    function scrollLeft() {
        if (elements.length > 0) {
            return elements[0].scrollLeft;
        }
        return undefined;
    }


    /*
     * scrollTop
     * ie9+
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.0 2016/05/05
     */
    function scrollTop() {
        if (elements.length > 0) {
            return elements[0].scrollTop;
        }
        return undefined;
    }

    /*
     * show
     * ie9+
     * version 0.0.0 2016/05/05
     */
    function show() {
        css('display', '');
        return this;
    }

    /*
     * text content
     * ie9+
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.0 2016/05/05
     */
    function text(content) {
        if (content !== undefined) {
            if (elements.length > 0) {
                Array.prototype.forEach.call(elements, function (element, index) {
                    element.textContent = content;
                });
            }
            return this;
        } else {
            if (elements.length > 0) {
                return elements[0].textContent;
            } else {
                return undefined;
            }
        }
    }

    /*
     * trigger
     * ie9+
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.0 2016/05/09
     */
    function trigger(eventName) {
        if (elements.length > 0) {
            Array.prototype.forEach.call(elements, function (element, index) {
                var event
                if (document.createEvent) {
                    event = document.createEvent("HTMLEvents");
                    event.initEvent(eventName, true, true);
                } else {
                    event = document.createEventObject();
                    event.eventType = eventName;
                }
                event.eventName = eventName;
                if (document.createEvent) {
                    element.dispatchEvent(event);
                } else {
                    element.fireEvent("on" + event.eventType, event);
                }
            });
        }
        return undefined;
    }


    /*
     * value
     * ?
     * version 0.1.0 2016/05/17
     *  - now work with input type checkbox
     * version 0.0.2 2016/05/14
     *  - fixed bug in set value
     * version 0.0.1 2016/05/11
     *  - fixed bug
     * version 0.0.0 2016/05/08
     */
    function value(value) {
        if (value === undefined) {
            if (elements.length > 0) {
                if (elements[0].tagName.toLowerCase() === 'input'
                    &&
                    elements[0].type.toLowerCase() === 'checkbox') {
                    return elements[0].checked;
                } else {
                    return elements[0].value;
                }
            } else {
                return undefined;
            }
        } else {
            if (elements.length > 0) {
                Array.prototype.forEach.call(elements, function (element, index) {
                    if (element.tagName.toLowerCase() === 'input'
                    &&
                    element.type.toLowerCase() === 'checkbox') {
                        element.checked = value;
                    } else {
                        element.value = value;
                    }
                });
            }
            return this;
        }
    }

    return {
        addClass: addClass,
        append: append,
        attr: attr,
        length: length,
        closest: closest,
        css: css,
        empty: empty,
        eq: eq,
        elements: elements,
        find: find,
        index: index,
        hasClass: hasClass,
        hide: hide,
        html: html,
        remove: remove,
        removeAttr: removeAttr,
        removeClass: removeClass,
        outerHeight: outerHeight,
        outerWidth: outerWidth,
        off: off,
        offset: offset,
        on: on,
        outerWidth: outerWidth,
        parent: parent,
        prepend: prepend,
        scrollLeft: scrollLeft,
        scrollTop: scrollTop,
        show: show,
        text: text,
        trigger: trigger,
        value: value
    };
};

/*
 * ajax
 * ie9+, chrome1+, firefox3.5+, opera10.5+, safari4+
 * version 0.3.0 2016/06/01
 *  - add headers arrg
 * version 0.2.0 2016/05/29
 *  - add return XMLHttpRequest object for abort ...
 * version 0.1.0 2016/05/15
 *  - add complete handler
 * version 0.0.3 2016/05/14
 *  - fixed bug in error handling
 * version 0.0.2 2016/05/11
 *  - fixed bug
 * version 0.0.1 2016/05/06
 *  - fixed bug
 * version 0.0.0 2016/05/05   
 */
aidJS.ajax = function (params) {
    params = params || {};
    var request = new XMLHttpRequest();
    request.open(params.method, params.url, true);
    params.headers = params.headers || [];
    params.headers.forEach(function (header) {
        request.setRequestHeader(header.key, header.value);
    });
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            if (params.success instanceof Function) {
                params.success(request);
            }
            if (params.complete instanceof Function) {
                params.complete(request);
            }
        } else {
            if (params.error instanceof Function) {
                params.error(request);
            }
            if (params.complete instanceof Function) {
                params.complete(request);
            }
        }
    };
    request.onerror = function () {
        if (params.error instanceof Function) {
            params.error(request);
        }
        if (params.complete instanceof Function) {
            params.complete(request);
        }
    };
    request.send(JSON.stringify(params.data));
    return request;
};

/*
 * browser
 * ie9+
 * version 0.0.0 2016/05/05
 */
aidJS.browser = {
    name: null,
    version: null,
    init: function () {
        var ua = navigator.userAgent, tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE ' + (tem[1] || '');
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
            if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
        this.name = M[0];
        this.version = M[1];
    }
};

/*
 * copy object
 * ?
 * version 0.0.0 2016/05/14
 */
aidJS.copy = function (obj) {
    return JSON.parse(JSON.stringify(obj));
};

/*
 * for debug mode
 * ?
 * version 0.0.0 206/05/11
 */
aidJS.debug = true;

/*
 * log
 * ie8+, chrome1+, firefox4+, opera1+, safari1+
 * version 0.0.0 2016/05/05
 */
aidJS.log = function () {
    if (aidJS.debug) {
        console.log('---------------', new Date(), '---------------');
        console.log(arguments);
    }
};

/*
 * queryString
 * ?
 * version 0.0.0 2016/05/15
 */
aidJS.queryString = {
    /*
     * clean query string
     */
    clean: function () {
        var _uri = location.toString();
        if (_uri.indexOf("?") > 0) {
            var _cleanUri = _uri.substring(0, _uri.indexOf("?"));
            history.replaceState(null, null, _cleanUri);
        }
    },
    /*
     * set key value
     * ?
     * version 0.1.0 2016/05/18
     *  - add data to state
     * version 0.0.1 2016/05/17
     *  - overwrite arrg
     * version 0.0.0 2016/05/15
     */
    set: function (key, value, data) {
        if (value === undefined) {
            history.pushState(data, null, key);
        } else {
            var _search = location.search;
            var _reg = new RegExp("([?&])" + key + "=[^&#]*", "i");
            if (_reg.test(_search)) {
                _search = _search.replace(_reg, '$1' + key + "=" + value);
            } else {
                var _separator = /\?/.test(_search) ? "&" : "?";
                _search = _search + _separator + key + "=" + value;
            }
            history.pushState(data, null, _search);
        }
    },
    /*
     * get with key
     * ?
     * version 0.0.0 2016/05/15
     */
    get: function (key) {
        var url = window.location.href;
        key = key.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + key + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
}

aidJS.browser.init();

window.a = window.aidJS = a = aidJS;
