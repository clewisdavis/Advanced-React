# Notes from Fullstack Advanced React & GraphQL

- WesBos course, <https://advancedreact.com/>
- Prerequisite, some intro to React or basic experience with React

## Intro and Set up

### Tooling and Starter Files Setup

- Things needed for this course
- Latest Node.js, probably whatever is LTS, 14.15.0 as of this course
- Browser, Firefox, Chrome
- MongoDB Compass, app that lest you visualize the DB
- VS Code for editor
- Terminal
- Grab the starter file, backend and frontend

- Browser extensions, React Dev Tools and Apollo Dev Tools
- MongoDB Compass, a GUI Desktop app, allows you to visualize the data in your database
- VSCode, open each backend and frontend in a separate VSCode window. To develop them separately. List of extensions recommended will pop up.

- Terminal, hyper, iTerm2 and built in one.
- If you want to see what Wes uses, just visit, Wesbos.com/uses
- If on windows, check out WSL subsystem for Linux, give you a terminal very simlar to Linux, all the commands you use on mac will just work properly.

- Fork the repo, and run `npm i` on each each backend and frontend folders. Have a terminal in each folder. Will take all dependencies in the `package.json` and install them.

- This course uses React 17

### The tech stack explained

- Major building blocks for this app, Sick Fits store, cart, checkout, account, sell items, application to create a online store.
- React and GraphQL for front end
- Front End
  - React
  - Next
  - Apollo
  - Styled Components and friends

  - React is good at one thing, taking data and putting it into templates and rendering it out to the DOM. And update it on the page.
  - Next.js, framework for React, takes good stuff from React, routing, paging, pages etc.
  - Apollo Client, GraphQL, query all the items, interface and load in the data, cache and fetch, fetch data or push data to our server.
  - Styles Components, scoped CSS in React, reusable styles, all the small UI components, reusable that are scoped, teach you the ideas and how to write scoped CSS modules you can re-use.

- Back End
  - Keystone.js, framework, headless CMS, login to your CMS and create all your data types and manage your data. The output is a GraphQL API allow us to write queries to get all the items. And return data you want. Going to use Apollo to make the queries and pull the data into app. Keystone will provide a GraphQL API base on all the CRUD operations, and Apollo will take the date to our Next.js app. Apollo is the middle man that gets the data and injects it into our React app.
  - MongoDB, for the database, doesn't matter what db you use, keystone.js will work with all.

### Learning Next.js

- Framework for building websites and apps with React.
- Next.js, does routing, linking from page to page, lazy loading, static or pre-rendering, images, etc.
- In Next.js, you can just create pages, and it will work.
- In the `pages` directory, create an `index.js`, will work very similar to how `index.html` works.

- Then, you export a React function, and that's what shows up on the page.

```JAVASCRIPT
 export default function() {
    return <div>
       <p>Hello!</p>
    <div>
 }
```

- In your `package.json`, look at the scripts, to run do, `npm run dev`, and will run next.
- The pages are file system based routing instead of config based routing
- React Router is a config based, where you have a React router component

- Make sure you name your function and it's not an anonymous function. Can name it what you want.

```JAVASCRIPT
 export default function IndexPage() {
    return <div>
       <p>Hello!</p>
    <div>
 }
```

- For the pages of your website or app. Just make a page and React component for each.
- Then you can go directly to that page in the url. `localhost:5000/whatever`
- Another nice thing, it does hot reloading, happens with our CSS and JS, will always hot reload

- Next.js, is server rendered, view source, would see all the HTML. Then React will re-render components as needed.
- When it gets to the client, browser, Next.js will then make it a React application.
- This makes for nice page transitions. Only loads what need to be updated. Nice page transitions. Just swapping out the content you need.
- Also can be static rendered. At build time you can pre-render pages. So they load really quickly.
- So when someone visits the page, it's already native HTML so its really fast.
- You can opt into server rendering, or static rendering, three properties, get static props, get server side props, get initial props. Will get into later.
- Will get into linking and styling etc.

### Creating a Page Layout Component

- In Next.js, a page is the highest you can get, but where is all the other stuff, HTML, Head, Body etc.
- In Next, everything that is in the page, just gets dumped to the `<body>`
- If you want control at the higher level stuff.
- Simple, how to get a nav to show up on every page?

- Make a new component, called `Page.js` in your components directory

```JAVASCRIPT
export default function Page() {
  return (
    <div>
      <h2>I am the page component!</h2>
    </div>
  );
}
```

- How do you make this show up on every single page?
- Import it into your page, and use it.

```JAVASCRIPT
import Page from '../components/Page';

export default function IndexPage() {
  return (
    <Page>
      <p>Hello!!</p>
    </Page>
  );
}
```

- VSCode has an auto import, if you write a component and haven't imported it.
- Put you cursor inside the component, and hit `Cntrl + Spacebar` and VSCode will give you options to auto import the component.

- Now you need to render out the children of that `<Page>` component.
- In order to render out the children of the `<Page>` component, add `{children}` to the component within your `return`.
- You get `{children}` from the arguments of the function.
- Where do you get the `children` variable, you get it from `props` passed in as an argument into the component.

```JAVASCRIPT
export default function Page(props) {
  return (
    <div>
      <h2>I am the page component!</h2>
      {props.children}
    </div>
  );
}
```

- Now, you are able to render out anything that is a child of the `<Page>` component.

```JAVASCRIPT
import Page from '../components/Page';

export default function IndexPage() {
  return (
    <Page>
      <p>Hello!!</p>
      <code>code</code>
      <p>I am a child</p>
    </Page>
  );
}
```

- Still getting some errors, you must use destructuring for assignment.
- You [destructure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) the `props` argument, into the props you need.
- Destructure the argument as `{ children }` then you can get the value direclty from the destructured object.

```JAVASCRIPT
export default function Page({ children }) {
  return (
    <div>
      <h2>I am the page component!</h2>
      {children}
    </div>
  );
}
```

- In your `<Page>` component, define a `prop` and pass it onto your `index.js` to use.
- Add the `propTypes` to avoid any squiggly.

```JAVASCRIPT
// PAGE COMPONENT
import PropTypes from 'prop-types';

export default function Page({ children, cool }) {
  return (
    <div>
      <h2>I am the page component!</h2>
      <h3>{cool}</h3>
      {children}
    </div>
  );
}

Page.propTypes = {
  cool: PropTypes.string,
  children: PropTypes.any,
};
```

```JAVASCRIPT
// INDEX.JS PAGE, PAGES DIRECTORY
import Page from '../components/Page';

export default function IndexPage() {
  return (
    <Page cool="Camaro">
      <p>Hello!! on index</p>
      <code>code on index</code>
      <p>I am a child on index</p>
    </Page>
  );
}
```

- Can we create a file that will always wrap everything in a `<Page>` component?
- Where you can get access to everything in the `<head>` of a document.
- Special files in Next.js
- Make a new file in `pages` directory, `pages/_app.js`

- In Next.js, must have a `pages` directory and if you want to control anything higher than the page component. You must do it in your `_app.js` file.

```JAVASCRIPT
// pages/_app.js
import Page from '../components/Page';

export default function MyApp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}
```

- It's a `prop` of the `<App>` component, need to pass down the `{ Component, pageProps }` to pass down.
- Then use your `<Component />`, and spread your `{ ...pageProps }` into it. `<Component { ...pageProps } />`

- You no longer need to wrap everything in a `<Page>` component, it is being down globally in your `_app.js` file.

- Note: Wrap your elements in a React fragment to prevent build errors.

```JAVASCRIPT
export default function IndexPage() {
  return (
    <>
      <p>Hello!! on index</p>
      <code>code on index</code>
      <p>I am a child on index</p>
    </>
  );
}
```

- Now, make a custom `_document.js` for our layout.
- As of this tutorial, not API for document so you have to `extend` and use a `class`.

```JAVASCRIPT
import Document, {Html, Head, NextScript, Main} from 'next/document';

export default function class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head></Head>
                <body>
                    <Main/>
                    <NextStript />
                </body>
            </Html>
        )
    }
}
```

- In order to add `css` to the `head`, you need to specify the `document`.
- Mainly a config. Kill your terminal process and re-run. Now you should see `lang="en"` appear in your `<html>` tag.
- A little confusing, but more config and set up.

### Creating our Header and Nav Components
