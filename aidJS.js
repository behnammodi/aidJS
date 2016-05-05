// aidJS 
// pure js library
// ie9+, chrome1+, firefox4+, opera1+, safari1+
// version 0.1.0 2016/05/05
//  - add $count in $q
// version 0.0.0 2016/05/05
var $ = {
    $version: '0.1.0',
    // ajax
    // ie9+
    // version 0.0.0 2016/05/05   
    $ajax: function (params) {
        params = params || {};
        var request = new XMLHttpRequest();
        request.open(params.type, params.url, true);
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                if (params.success instanceof Function) {
                    params.success(request);
                }
            } else {
                // We reached our target server, but it returned an error
            }
        };
        request.onerror = function () {
            if (params.error instanceof Function) {
                params.error(request);
            }
        };
        request.send();
    },
    // browser
    // ie9+
    // version 0.0.0 2016/05/05
    $browser: {
        $name: null,
        $version: null,
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
            this.$name = M[0];
            this.$version = M[1];
        }
    },
    // log
    // ie8+, chrome1+, firefox4+, opera1+, safari1+
    // version 0.0.0 2016/05/05
    $log: function () {
        console.log('---------------', new Date(), '---------------');
        console.log(arguments);
    },
    // select element
    // ie9+
    // version 0.0.0 2016/05/05
    $q: function (element) {

        // element
        var elements=null;
        if (element instanceof Object) {
            elements = [element];
        } else {
            elements = document.querySelectorAll(element);
        }        

        if (elements.length == 0) {
            throw 'not found element';
            return false;
        }      

        // add class
        // ie8+
        // version 0.0.0 2016/05/05
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

        // append
        // ie9+
        // version 0.0.0
        function append(appendElement) {
            Array.prototype.forEach.call(elements, function (element, index) {
                element.appendChild(appendElement);
            });
            return this;
        }



        // attribute
        // ie9+
        // version 0.0.0 2016/05/05
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

        // count
        // ie9+
        // version 0.0.0 2016/05/05
        function count() {
            return elements.length;
        }

        // style
        // ie9+
        // version 0.0.0 2016/05/05
        function css(propertie, value) {
            if (value !== undefined) {
                Array.prototype.forEach.call(elements, function (element, index) {
                    element.style[propertie] = value;
                });
            } else {
                return getComputedStyle(elements[0])[propertie];
            }
            return this;
        }

        // empty
        // ie9+
        // version 0.0.0 2016/05/05
        function empty() {
            Array.prototype.forEach.call(elements, function (element, index) {
                element.innerHTML = '';
            });
            return this;
        }

        // eq
        // ie8+
        // version 0.0.0 2016/05/05
        function eq(index) {
            return $.$q(elements[index]);;
        }

        // has class
        // ie8+
        // version 0.0.0 2016/05/05
        function hasClass(className) {
            if (elements[0].classList)
                return elements[0].classList.contains(className);
            else
                return new RegExp('(^| )' + className + '( |$)', 'gi').test(elements[0].className);
        }

        // hide
        // ie9+
        // version 0.0.0 2016/05/05
        function hide() {
            css('display', 'none');
            return this;
        }

        // html
        // ie9+
        // version 0.0.0 2016/05/05
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

        // remove
        // ie9+
        // version 0.0.0 2016/05/05
        function remove() {
            Array.prototype.forEach.call(elements, function (element, index) {
                element.parentNode.removeChild(element);
            });
            return this;
        }

        // remove class
        // ie8+
        // version 0.0.0 2016/05/05
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

        // remove event listener
        // ie9+ , chrome1+ , firefox1+ , opera7+, safari1+
        // version 0.0.0 2016/05/05
        function off(eventName, eventHandler) {
            Array.prototype.forEach.call(elements, function (element, index) {
                element.removeEventListener(eventName, eventHandler);
            });
            return this;
        }

        // offset
        // ie9+
        // version 0.0.0 2016/05/05
        function offset() {
            return elements[0].getBoundingClientRect();
        }

        // add event listener
        // ie9+
        // version 0.0.0 2016/05/05
        function on(eventName, eventHandler) {
            Array.prototype.forEach.call(elements, function (element, index) {
                element.addEventListener(eventName, eventHandler);
            });
            return this;
        }

        // outerWidth
        // ie9+
        // version 0.0.0 2016/05/05
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

        // outerWidth
        // ie9+
        // version 0.0.0 2016/05/05
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

        // parent
        // ie9+
        // version 0.0.0 2016/05/05
        function parent() {
            return elements[0].parentNode;
        }

        // prepend
        // ie9+
        // version 0.0.0 2016/05/05
        function prepend(insertElement) {
            Array.prototype.forEach.call(elements, function (element, index) {
                element.insertBefore(insertElement, element.firstChild);
            });
            return this;
        }

        // show
        // ie9+
        // version 0.0.0 2016/05/05
        function show() {
            css('display', '');
            return this;
        }

        // text content
        // ie9+
        // version 0.0.0 2016/05/05
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

        return {
            $addClass: addClass,
            $append: append,
            $attr: attr,
            $count:count,
            $css: css,
            $empty: empty,
            $eq:eq,
            $hasClass: hasClass,
            $hide: hide,
            $html: html,
            $remove: remove,
            $removeClass: removeClass,
            $outerHeight: outerHeight,
            $outerWidth: outerWidth,
            $off: off,
            $offset: offset,
            $on: on,
            $outerWidth: outerWidth,
            $parent: parent,
            $prepend: prepend,
            $show: show,
            $text: text,
        };
    }
};

$.$browser.init();