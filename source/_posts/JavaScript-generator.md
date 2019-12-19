---
title: JavaScript_generator
date: 2019-06-28 16:36:55
tags: JavaScript,generator
---


## ES6引入的数据类型

定义使用`function * fun(){}`,用于补充return的不足.  

使用`f.next()`

## 实例

```js
function* foo(x) {
    yield x + 1;
    yield x + 2;
    return x + 3;
}
var f=foo(1);
f.next();//{value: 2, done: false}
f.next();//{value: 3, done: false}
f.next();//{value: 4, done: true}
```

每次使用`next()`会执行foo的代码,直到遇到`yied x`,遇到返回一个对象`{value: x, done: true/false}`,然后函数暂停,知道调用`f.next()`.

返回的`value`就是yield的值.

实现了一个函数拥有多次返回值的行为.
