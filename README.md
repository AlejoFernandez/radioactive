Radioactive is a Javascript API that unifies different types of datasources ( sync, async, promises and streaming ) and exposes them as regular Javascript functions inside a reactive context.

You can write complex data processing and transformation code without using callbacks, listening for events or manually coordinating how the different services work. From your point of view, every service is represented by a synchronous Javascript function. Radioactive takes care of managing the complexity behind the curtains: If data changes, locally or on the server, everything will be updated automatically.

* If you want to learn more about the project and our mission, read this introductory blog post.
* If you want to use radioactive, just keep on reading

# Quickstart

```bash
npm install radioactive
```

```javascript
var radioactive = require('radioactive')

radioactive.react(function(){
  console.log( radioactive.time() );
})
```

You can also install it using bower.

```bash
bower install radioactive
```

Radioactive exposes one global object called `radioactive`.

```javascript

radioactive.react(function(){
  console.log( radioactive.time() );
})
```

[Head on to the Tutorial](https://github.com/radioactive/radioactive/wiki/Tutorial)


# Community

* [github.com/radioactive](https://github.com/radioactive)
* [Google Groups: radioactivejs](https://groups.google.com/forum/#!forum/radioactivejs)
* [Stack Overflow Tag: `[radioactive]`]()
* [radioactive modules and integrations](https://github.com/radioactive/radioactive/wiki/Modules)



