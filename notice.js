/**
 * Notice.js v0.0.1
 *
 * A clean and simple message plugin, with no dependencies.
 *
 * https://github.com/xiangming/notice.js
 *
 * Copyright © 2016 by Arvin Xiang.
 */

var notice = function(){

    var _COUNT = 0,
        currentType,
        _TYPE = {
            success: 'success',
            warning: 'warning',
            error: 'error',
            info: 'info'
        }
    ;

    function Notice(options) {
        var elem = createElement(options);
        elem.id = 'notice-' + (_COUNT++);
        this.elem = elem;
    }

    Notice.prototype.show = function() {
        if (document.getElementById(this.elem.id)) return;

        // create notice container
        var container = document.querySelector('.notice-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'notice-container';
            document.body.appendChild(container);
        }
        container.appendChild(this.elem);
    };

    Notice.prototype.clear = function() {
        dismiss(this.elem);
    };

    // create notice item
    function createElement(options) {
        // div.notice-item
        //   span.notice-close
        //   div.notice-content
        var item = document.createElement('div');
        item.className = 'notice-item';
        if (options.type) {
            item.className += ' ' + options.type;
        }

        var content;
        if (options.url) {
            content = document.createElement('a');
            content.href = options.url;
            content.target = '_blank';
        } else {
            content = document.createElement('div');
        }
        content.className = 'notice-content';
        content.innerHTML = options.message;

        var close = document.createElement('span');
        close.className = 'notice-close';
        close.innerHTML = '×';

        item.appendChild(close);
        item.appendChild(content);

        close.addEventListener('click', function(e) {
            dismiss(item);
        });

        // listen to DOMNodeRemoved and trigger callback
        options.cb && item.addEventListener('DOMNodeRemoved', function(){
            options.cb();
        });

        return item;
    }

    function dismiss(elem) {
        elem.className += ' notice-dismiss';
        setTimeout(function() {
            if (elem && elem.parentNode) {
                elem.parentNode.removeChild(elem);
            }
        }, 200);
    }

    function notify() {
        var options = {}, cb;

        if ( !arguments[0] || (typeof arguments[0] !== 'string' && typeof arguments[0] !== 'object') ) return;

        if (typeof arguments[0] === 'string') {
            options.message = arguments[0];

            // notice.success('a callback message', function(){...})
            if (typeof arguments[1] === 'function') {
                cb = arguments[1];

            // notice.success('a autohide message', 2000)
            // notice.success('a callback message', 2000, function(){...})
            } else if (typeof arguments[1] === 'number') {
                options.duration = arguments[1];
                cb = typeof arguments[2] === 'function' ? arguments[2] : null;
            } else {
                // notice.success('a message');
            }

        // notice.success({message: 'a message', duration: 2000})
        // notice.success({message: 'a message', duration: 2000}, function(){...})
        } else if (typeof arguments[0] === 'object') {
            options = arguments[0];
            cb = typeof arguments[1] === 'function' ? arguments[1] : null;
        }

        options.cb = cb;
        options.type = currentType;
        // Clean up the variable in case it is being reused
        currentType = undefined;

        var time = options.duration;
        var item = new Notice(options);
        item.show();

        // only auto hide when duration is set
        if (time) {
            setTimeout(function() {
                item.clear();
            }, time);
        }
    }

    function success() {
        currentType = _TYPE.success;
        return notify.apply(this, arguments);
    }

    function warning() {
        currentType = _TYPE.warning;
        return notify.apply(this, arguments);
    }

    function error() {
        currentType = _TYPE.error;
        return notify.apply(this, arguments);
    }

    function info() {
        currentType = _TYPE.info;
        return notify.apply(this, arguments);
    }

    return {
        success : success,
        warning : warning,
        error   : error,
        info    : info
    }
}();