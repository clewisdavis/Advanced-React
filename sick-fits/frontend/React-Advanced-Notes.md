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
- Rewind and go through again
