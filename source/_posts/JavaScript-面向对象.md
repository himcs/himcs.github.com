---
title: JavaScript_面向对象
date: 2019-06-28 17:13:26
tags: JavaScript
---

# 原型模式

在JavaScript的世界里,没有类和对象的概念.  
JavaScript使用原型(prototype)实现了面向对象编程.

## 原型链

调用`obj.xxx`访问对象属性时,`JavaScript`会在当前对象查找该属性,没找到就去其原型对象上找,如果还没有找到,就会一之上溯到`Object.proptotype`对象.如果还没有就返回`undefined`
>例如，创建一个Array对象：  

    var arr = [1, 2, 3];  

    其原型链是：
    arr ----> Array.prototype ----> Object.prototype ----> null

>函数对象  

    function foo() {  
        return 0;  
    }  
    foo ----> Function.prototype ----> Object.prototype ----> null  
    由于Function.prototype定义了apply()等方法，因此，所有函数都可以调用apply()方法。

## 继承

ES6之前的写法
例如两个对象

```js
var Student = {
    name: 'Robot',
    height: 1.2,
    run: function () {
        console.log(this.name + ' is running...');
    }
};
var xiaoming = {
    name: '小明'
};
```

如果想让`xiaoming`继承`Student`的属性怎么办?  
只要`xiaoming.__proto__ = Student;`,`__proto__`将`xiaoming`的原型对象指向了`Student`,看起来`xiaoming`是从`Student`继承而来,所以可以使用`Student`的属性.

```js
xiaoming.name; // '小明'
xiaoming.run(); // 小明 is running...
```

## ES6

`class`和`extend`关键字
定义类

```js
class A{
    //构造方法
    constructor(name){
        this.name = name;
    }
    //函数
    hello() {
        alert('Hello, ' + this.name + '!');
    }
}
```

继承A

```js
class B extends A{
    //构造方法
    constructor(name){
        //调用父类构造方法使用super函数
        super(name);
    }
}
```

## 验证是类的实例

`instanceof`
