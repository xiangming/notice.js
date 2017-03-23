# Notice.js

A clean and simple message plugin, with no dependencies.

[Live Demo](http://xiangming.github.com/notice.js/)

## How to use ?

1. include `notice.js` and `notice.css`
2. Enjoy it!
```
// notice.success for a success message
notice.success('A success message');

// notice.warning for a warning message
notice.warning('A warning message');

// notice.error for a error message
notice.error('A error message');

// notice.info for a info message
notice.info('A info message');

// set timer to closed it
notice.success('This message will closed in 2 seconds', 2000);
notice.success({message: 'This message will closed in 2 seconds', duration: 2000});

// add link to a message
notice.success({
    message: 'Click on this message',
    url: 'http://arvinxiang.com/'
});

// callback when message closed
notice.success('A callback message', function(){
    alert('callback function');
});

// callback when meesage auto closed
notice.success('a auto closed and callback message', 2000, function(){
    alert('callback function');
});
notice.success({
    message: 'a auto closed and callback message',
    duration: 2000
}, function(){
    alert('callback function');
});

```

You can get the examples in the demo page.
