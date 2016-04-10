# generator-genreact

[![Build Status](https://travis-ci.org/Skookum/generator-genreact.svg)](https://travis-ci.org/Skookum/generator-genreact)

Welcome to this brave new world. A better future that also brings
with us all of the things we learned in the past.

It may be a bit overwhelming if you try to understand all of it right out of the
gate, though. This is a layered architecture that sets you up for success at
every level. It is highly opinionated, but attempts to hold its opinions
loosely so that you can change it if you so desire.

> NOTE: This is still alpha. We’re actively using it in prototypes at
Skookum and intend on using it for production work imminently.

## Get Hacking

* `npm install -g generator-genreact`
* `mkdir my-new-project && cd $_`
* `yo genreact:app [app-name]`
* `npm start`
* `open localhost:<%= port %>`

## Generator commands

### Components

Components are the building blocks of your application. Think of them like Web
Components, but better. They have clear compositional boundaries, carry their CSS
and behavior with them, and your application understands these dependencies so
bundling for production is trivial.

**Examples:**

* `yo genreact:component MyComponentName`

This will generate the following file structure in `./app/components`.

```
|- MyComponentname/
  |- index.js
  |- styles.css
  |- __tests__/
    |- index.js
```

### Handlers

Handlers are almost synonymous with a route or URL. Think of these as the entry
point to a specific part of your application.

**Examples:**

* `yo genreact:handler MyPageHandler`
* `yo genreact:handler MyPageHandler/MySectionHandler`

The key difference is whether it’s a top-level route or a child route. This
command will create the following structure and attempt to add it to the
appropriate location in your `routes.js file.

### Components: Revisited

You’ve generated a few components and now you have a few pages. We’ve already
seen the structure that a component generates and requires. To generate
additional, section-specific components, you would do the following:

**Examples:**

* `yo genreact:component MyFlashyComponent`
  --> `./components/MyFlashComponent`
* `yo genreact:component MyFlashyComponent --handler MyPageHandler`
  --> `./handlers/MyPageHandler/components/MyFlashComponent`
* `yo genreact:component MyPageHandler/MySectionHandler/MyFlashyComponent`
  --> `./app/MyPageHandler/MySectionHandler/components/MyFlashComponent`

### Action & Reducer (Redux)

You’ve generated a few components and now you want to store data and get data. To generate
actions and reducers, you would do the following:

**Examples:**

* `yo genreact:actionReducer User setUser addUser`
  --> `./actions/UserActions.js`
  --> `./reducers/UserReducer.js`
* `yo genreact:action User setUser addUser`
  --> `./actions/UserActions.js`
* `yo genreact:reducer User setUser addUser`
  --> `./reducers/UserReducer.js`

## A few of the things you get

Pablo Picaso said that great artists steal. This toolchain takes the best
practices and experiences we’ve had creating great consumer and enterprise
products and bundles it together for us in a package that allows us to not just
get up and running quickly but to then iterate effectively.

A few of the things that you will find in here:

* An amazing development environment. There is hot-reloading tooling for both the
  client and server (TODO: patch reloads) built-in.
* Isomorphic rendering with es6 everywhere.
* A component architecture with co-located concerns.
* Test suites that are ready to go.
* A UI toolchain. We expect and prefer that your data layer be somewhere else.
  The data and UI layers should be able to scale independently as needed.
* (TODO) Rich documentation and style guide web interface.

In this environment, we reduce the concerns of our UI designers and developers
to the component level. As a UI developer, you don’t need to worry about how
compilation happens or how to ensure that the CSS a component needs gets onto a
page. You shouldn’t need to worry about how the final files are delivered to a
client in production. These are all practices that are understood well, but full
of nuance and tradeoffs. We have tuned — and continue to tune — these characteristics.

## Tools in Use

* Webpack
* React
* react-router
* jest
* babel

## Optional

* redux
* redux-thunk
* redux-actions
* react-redux

## Resources

A few resources that talk about some of the ideas you’ll find in here. Some
of these articles were explicit drivers of this project and others were conveniently
published since we started this work. To these authors: thank you for our documentation.

* Folder structure: https://gist.github.com/ryanflorence/daafb1e3cb8ad740b346
* Block, Element, Modifying Your JS Components: https://medium.com/seek-ui-engineering/block-element-modifying-your-javascript-components-d7f99fcab52b

## License

This generator and toolchain is MIT Licensed. The projects and tools we bring
together for you each have their own license and terms you should be aware of.
