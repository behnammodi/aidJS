/*
 * aidJS v0.3.1
 * (c) 2016 ITTEN, Inc. http://itten.ir 
 * ie9+, chrome5+, firefox4+, opera12+, safari5+
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
        return false;
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
        throw 'not found element';
        return false;
    }

    /*
     * add class
     * ie8+
     * version 0.0.0 2016/05/05
     */
    function addClass(className) {
        if (elements[0].classList) {
            Array.prototype.forEach.call(elements, function (element, index) {
                className = className.split(' ');
                className.forEach(function (value) {
                    element.classList.add(value);
                })
            });
        } else {
            Array.prototype.forEach.call(elements, function (element, index) {
                element.className += ' ' + className;
            });
        }
        return this;
    }

    /*
     * append
     * ie9+
     * version 0.0.0
     */
    function append(appendElement) {
        Array.prototype.forEach.call(elements, function (element, index) {
            element.appendChild(appendElement);
        });
        return this;
    }

    /*
     * attribute
     * ie9+
     * version 0.0.0 2016/05/05
     */
    function attr(attribute, value) {
        if (value) {
            Array.prototype.forEach.call(elements, function (element, index) {
                element.setAttribute(attribute, value);
            });
        } else {
            return elements[0].getAttribute(attribute);
        }
        return this;
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
     * version 0.0.0 2016/05/08
     */
    function closest(query) {
        var elementSelector = elements[0];
        var matchesSelector = elementSelector.matches || elementSelector.webkitMatchesSelector || elementSelector.mozMatchesSelector || elementSelector.msMatchesSelector;
        while (elementSelector && elementSelector.tagName.toLowerCase() != 'html') {
            if (matchesSelector.call(elementSelector, query)) {
                break;
            }
            elementSelector = elementSelector.parentNode;
        }
        return (elementSelector.tagName.toLowerCase() == 'html') ? null : a(elementSelector);
    };

    /*
     * style
     * ie9+, chrome5+, firefox4+, opera12+, safari5+
     * version 0.1.2 2016/05/07 
     *  - performance improvemnt 
     * version 0.1.1 2016/05/07
     *  - fixed bug in return property value 
     * version 0.1.0 2016/05/05
     *  - add polyfill property arrgument
     * version 0.0.0 2016/05/05
     */
    function css(property, value) {
        if (typeof property === 'object' || (typeof property === 'string' && typeof value === 'string')) {
            Array.prototype.forEach.call(elements, function (element, index) {
                if (typeof property === 'string') {
                    element.style[property] = value;
                } else {
                    for (key in property) {
                        element.style[key] = property[key];
                    }
                }
            });
        } else {
            return getComputedStyle(elements[0])[property];
        }
        return this;
    }

    /*
     * empty
     * ie9+
     * version 0.0.0 2016/05/05
     */
    function empty() {
        Array.prototype.forEach.call(elements, function (element, index) {
            element.innerHTML = '';
        });
        return this;
    }

    /*
     * eq
     * ie8+
     * version 0.0.1 2016/05/07
     *  - fixed bug
     * version 0.0.0 2016/05/05
     */
    function eq(index) {
        return a(elements[index]);;
    }

    /*
     * find
     * ie8+
     * version 0.0.0 2016/05/08
     */
    function find(query) {
        var result = [];
        Array.prototype.forEach.call(elements, function (element, index) {
            Array.prototype.forEach.call(element.querySelectorAll(query), function (elementTwo, index) {
                result.push(elementTwo);
            });
        });
        return a(result);
    }

    /*
     * has class
     * ie8+
     * version 0.0.0 2016/05/05
     */
    function hasClass(className) {
        if (elements[0].classList)
            return elements[0].classList.contains(className);
        else
            return new RegExp('(^| )' + className + '( |$)', 'gi').test(elements[0].className);
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
     * version 0.0.0 2016/05/05
     */
    function html(content) {
        if (content) {
            Array.prototype.forEach.call(elements, function (element, index) {
                element.innerHTML = content;
            });
        } else {
            return elements[0].innerHTML;
        }
        return this;
    }

    /*
     * remove
     * ie9+
     * version 0.0.0 2016/05/05
     */
    function remove() {
        Array.prototype.forEach.call(elements, function (element, index) {
            element.parentNode.removeChild(element);
        });
        return this;
    }

    /*
     * remove class
     * ie8+
     * version 0.0.0 2016/05/05
     */
    function removeClass(className) {
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
        return this;
    }

    /*
     * observable
     * ie1
     * version 0.0.0 2016/05/07
     */
    function observable(eventForFire) {

    }

    /*
     * remove event listener
     * ie9+ , chrome1+ , firefox1+ , opera7+, safari1+
     * version 0.0.0 2016/05/05
     */
    function off(eventName, eventHandler) {
        Array.prototype.forEach.call(elements, function (element, index) {
            element.removeEventListener(eventName, eventHandler);
        });
        return this;
    }

    /*
     * offset
     * ie9+
     * version 0.0.0 2016/05/05
     */
    function offset() {
        return elements[0].getBoundingClientRect();
    }

    /*
     * add event listener
     * ie9+
     * version 0.0.0 2016/05/05
     */
    function on(eventName, eventHandler) {
        Array.prototype.forEach.call(elements, function (element, index) {
            element.addEventListener(eventName, eventHandler, true);
        });
        return this;
    }

    /*
     * outerWidth
     * ie9+
     * version 0.0.0 2016/05/05
     */
    function outerHeight(withMargin) {
        if (withMargin) {
            var height = elements[0].offsetHeight;
            var style = getComputedStyle(elements[0]);
            height += parseInt(style.marginTop) + parseInt(style.marginBottom);
            return height;
        } else {
            return elements[0].offsetHeight
        }
    }

    /*
     * outerWidth
     * ie9+
     * version 0.0.0 2016/05/     
     */
    function outerWidth(withMargin) {
        if (withMargin) {
            var width = elements[0].offsetWidth;
            var style = getComputedStyle(elements[0]);
            width += parseInt(style.marginLeft) + parseInt(style.marginRight);
            return width;
        } else {
            return elements[0].offsetWidth
        }
    }

    /*
     * parent
     * ie9+
     * version 0.0.0 2016/05/05
     */
    function parent() {
        return elements[0].parentNode;
    }

    /*
     * prepend
     * ie9+
     * version 0.0.0 2016/05/05
     */
    function prepend(insertElement) {
        Array.prototype.forEach.call(elements, function (element, index) {
            element.insertBefore(insertElement, element.firstChild);
        });
        return this;
    }

    /*
     * scrollLeft
     * ?
     * version 0.0.0 2016/05/08
     */
    function scrollLeft() {
        return elements[0].scrollLeft;
    }


    /*
     * scrollTop
     * ie9+
     * version 0.0.0 2016/05/05
     */
    function scrollTop() {
        return elements[0].scrollTop;
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
     * version 0.0.0 2016/05/05
     */
    function text(content) {
        if (content !== undefined) {
            Array.prototype.forEach.call(elements, function (element, index) {
                element.textContent = content;
            });
        } else {
            return elements[0].textContent;
        }
        return this;
    }

    /*
     * value
     * ?
     * version 0.0.0 2016/05/08
     */
    function value(value) {
        if (value === undefined) {
            return elements[0].value;
        } else {
            elements[0].value = value;           
        }
        return this;
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
        find: find,
        hasClass: hasClass,
        hide: hide,
        html: html,
        remove: remove,
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
        value: value
    };
}

aidJS.version = '0.3.0',

/*
 * ajax
 * ie9+, chrome1+, firefox3.5+, opera10.5+, safari4+
 * version 0.0.1 2016/05/06
 *  - fixed bug
 * version 0.0.0 2016/05/05   
 */
aidJS.ajax = function (params) {
    params = params || {};
    var request = new XMLHttpRequest();
    request.open(params.method, params.url, true);
    request.withCredentials = true;
    request.setRequestHeader('Accept', 'application/json');
    request.setRequestHeader('Accept', 'text/plain');
    request.setRequestHeader('Accept', '*/*');
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    request.setRequestHeader('Access-Control-Allow-origin', 'true');
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            if (params.success instanceof Function) {
                params.success(request);
            }
        } else {
            // error
        }
    };
    request.onerror = function () {
        if (params.error instanceof Function) {
            params.error(request);
        }
    };
    request.send(JSON.stringify(params.data));
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
 * log
 * ie8+, chrome1+, firefox4+, opera1+, safari1+
 * version 0.0.0 2016/05/05
 */
aidJS.log = function () {
    console.log('---------------', new Date(), '---------------');
    console.log(arguments);
};

/*
 * observable
 * ?
 * version 0.0.0 2016/05/07
 */
aidJS.observable = {
    /*
     * event repositories
     * ?
     * version 0.0.0 2016/05/07
     */
    eventRepositories: [],
    /*
     * register event repositories
     * ?
     * version 0.0.0 2016/05/07
     */
    register: function (eventName, handler) {
        if (!this.eventRepositories[eventName]) {
            this.eventRepositories[eventName] = [];
        }
        this.eventRepositories[eventName].push(handler);
    },
    /*
     * dispatch event repositories
     * ?
     * version 0.0.0 2016/05/07
     */
    dispatch: function (eventName, params) {
        this.eventRepositories[eventName].forEach(function (handler) {
            handler(params);
        })
    }
}

aidJS.browser.init();

window.a = window.aidJS = a = aidJS;