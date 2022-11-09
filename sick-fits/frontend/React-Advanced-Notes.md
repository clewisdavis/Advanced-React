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

## Learning Next.js

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

- In your `components` directory, create a new file, `components/Header.js`
- And set it up

```JAVASCRIPT
export default function Header() {
  return (
    <header>
      <p>I am the header</p>
    </header>
  );
}
```

- In your `Pages` component, import and use the new `<Header/>`
- TIP: Auto import, type the component name, then `Cntl + Spacebar` to bring up the drop down to import.

- Now start to template out your header in HTML.

#### Now, how do you link from page to page?

- If you use regular `anchor` tag, it will refresh the entire page every time you navigate.
- What we want, to move from page to page without having to refresh the entire page.
- Nice thing about Next.js, triggers and re-renders when a url has changed using the Next.js `<Link href="/">` tag.

```JAVASCRIPT
import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <div className="bar">
        <Link href="/">Sick Fits</Link>
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
    </header>
  );
}
```

- Now, navigate to your sell page, and click the link. Page loads really fast and doesn't refresh.

#### Set up a Nav component

- Create a new file, `Nav.js` and create your nav.

```JAVASCRIPT
import Link from 'next/link';

export default function Nav() {
  return (
    <nav>
      <Link href="/product">Product</Link>
      <Link href="/sell">Sell</Link>
      <Link href="/orders">Orders</Link>
      <Link href="/account">Account</Link>
    </nav>
  );
}
```

- Add it to your `Header.js` component. Now you can navigate from page to page. Notice the speed. Really fast and the entire page does not refresh.

- Anytime you want to link to something that is part of your website, use the `<Link href="/products">` tag, to your pages.
- To link externally, use the a regular `a href` anchor link.

## CSS and Styled Components

- Start writing some styles with [Styled Components](https://styled-components.com/)

### Intro to Styled Components and CSS

- React give you lots of options for writing css, this covers scoped CSS, using styled components
- CSS in JS, you define all your CSS, within the component. Benefits, you scope your CSS really easily.
- You can use variables inside of your component.

```HTML
<h1 className="logo">My Header</h1>
```

- Instead of applying classes directly to your element.
- You create a component for it, with the styles attached to it. And it's scoped to that component and will not apply to any other part of page.
- So if you have a common class name, it will not break or cascade into other areas.

- Define your new styled component, `const Logo = styled.h1``;`
- After the `styled.` is where you tell it what type of component you want it to be.
- And always use backticks ``, called a template literal.

```JAVASCRIPT
const Logo = styled.h1`
  background: red;
`;
```

- Make sure you import `styled-components`.
- To Apply, go to where you used the `<h1>`, and replace it with `<Logo>`.
- If you inspect the DOM, you will see `<Logo>` being rendered as an `<h1>`.
- Notice the class name, looks really random, associated with the style.

```JAVASCRIPT
import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav';

// Styled Component
const Logo = styled.h1`
  background: red;
  a {
    color: white;
  }
`;

export default function Header() {
  return (
    <header>
      <div className="bar">
        <Logo>
          <Link href="/">Sick Fits</Link>
        </Logo>
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
      <Nav />
    </header>
  );
}
```

- If you add decedent selectors to the styled component, it will only apply to that component and you don't have to worry about apply specificity or colliding with other styles.

- If you want to re-use the styled component on another part of the app. You can put it in it's own file, and `import` it as you need it.
- For example, in the `styles` directory. You simply `export default CloseButton`.

```JAVASCRIPT
import styled from 'styled-components';

const CloseButton = styled.button`
  background: black;
  color: white;
  font-size: 3rem;
  border: 0;
  position: absolute;
  z-index: 2;
  right: 0;
`;

export default CloseButton;
```

- When do you put your styles in a separate file?
- Personal preference, but to many files can get overwhelming and hard to keep track of.
- Good practice, just define the styles in the component where you use it. And as it gets to big, or re-use the styles. Then break it out into a separate file and `export`.

- Naming your styled components, to differentiate between other regular React components, you can put a `Styles` in the name. `const HeaderStyles = styled.header``;`

- Styled Components is very similar to writing regular CSS, with all the benefits of being able to scope it to a component.

- Note: When refreshing the page, notice the flicker when the page reloads.

### Global Styles, Typography and Layout

- Scoped styles are great, but sometimes you want global styles.
- Basic stuff like colors, fonts and sizing, so you don't redefine throughout your app.

- Use the `createGlobalStyle` API inside of styled components and inject it.
- Import in your `Page.js` file. Example below...

```JAVASCRIPT
import PropTypes from 'prop-types';
import { createGlobalStyle } from 'styled-components';
import Header from './Header';

const GlobalStyles = createGlobalStyle`
  html {
    --red: #ff0000;
    --black: #393939;
    --grey: #3a3a3a;
    --gray: var(--grey);
    --lightGrey: #e1e1e1;
    --lightGrey: var(--lightGrey);
    --offWhite: #ededed;
    --maxWidth: 1000px;
    --bs: 0 12px 24px 0 rgba(0,0,0,0.09);
  }
`;

export default function Page({ children, cool }) {
  return (
    <div>
      <Header />
      <h2>I am the page component!</h2>
      <h3>{cool}</h3>
      {children}
    </div>
  );
}
```

- On your `html` tag, good practice to set any color variables via CSS [custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*).

- To use your `GlobalStyles` you need to inject them in your `Page` component.

```JAVASCRIPT
export default function Page({ children, cool }) {
  return (
    <div>
      <GlobalStyles />
      <Header />
      <h2>I am the page component!</h2>
      <h3>{cool}</h3>
      {children}
    </div>
  );
}
```

- Save and refresh, and inspect your `html` element in the browser, you should see the new global styles available.
- For global colors to work, make sure you are using the `CSS` variable in your styles.

- Global styles
  - colors
  - fonts

- For fonts, you will be referencing static files. In the `public/static` directory

```JAVASCRIPT
const GlobalStyles = createGlobalStyle`

  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2');
    format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  html {
    --red: #ff0000;
    --black: #393939;
    --grey: #3a3a3a;
    --gray: var(--grey);
    --lightGrey: #e1e1e1;
    --lightGrey: var(--lightGrey);
    --offWhite: #ededed;
    --maxWidth: 1000px;
    --bs: 0 12px 24px 0 rgba(0,0,0,0.09);
  }
`;
```

- Add you `font-family` to a new body tag within your global style.
- TIP: For a good font stack, use the VS Code auto suggested, `--apple-system` and it will fill in a good font fall back stack for you.

```CSS
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
```

- Then, just put your font right in front, the on you imported.

```CSS
body {
    font-family: 'radnika_next', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
```

- Adding in some resets. You can import normalize or just add some resets yourself.

```JAVASCRIPT
// Global Styles with Resets
const GlobalStyles = createGlobalStyle`

  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2');
    format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  html {
    --red: #ff0000;
    --black: #393939;
    --grey: #3a3a3a;
    --gray: var(--grey);
    --lightGrey: #e1e1e1;
    --lightGrey: var(--lightGrey);
    --offWhite: #ededed;
    --maxWidth: 1000px;
    --bs: 0 12px 24px 0 rgba(0,0,0,0.09);
    --fontFamily: 'radnika_next', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    box-sizing: border-box;
  }

  *, *::before, *:after {
    box-sizing: inherit;
  }

  body {
    font-family: var(--fontFamily);
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
  }

  a {
    text-decoration: none;
    color: var(--black);
  }

  a:hover {
    text-decoration: underline;
  }

  button {
    font-family: var(--fontFamily);
  }

`;
```

- Create a `<InnerSyles>` component and specify a max width and padding. In this example; it's the body of the page. Your design may vary.

- Full `Page` component

```JAVASCRIPT
const GlobalStyles = createGlobalStyle`

  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2');
    format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  html {
    --red: #ff0000;
    --black: #393939;
    --grey: #3a3a3a;
    --gray: var(--grey);
    --lightGrey: #e1e1e1;
    --lightGrey: var(--lightGrey);
    --offWhite: #ededed;
    --maxWidth: 1000px;
    --bs: 0 12px 24px 0 rgba(0,0,0,0.09);
    --fontFamily: 'radnika_next', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    box-sizing: border-box;
  }

  *, *::before, *:after {
    box-sizing: inherit;
  }

  body {
    font-family: var(--fontFamily);
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
  }

  a {
    text-decoration: none;
    color: var(--black);
  }

  a:hover {
    text-decoration: underline;
  }

  button {
    font-family: var(--fontFamily);
  }

`;

const InnerStyles = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2rem;
`;

export default function Page({ children, cool }) {
  return (
    <div>
      <GlobalStyles />
      <Header />
      <InnerStyles>{children}</InnerStyles>
    </div>
  );
}
```

### Visualizing Route Changes

- See what is happening when you change the page.
- When you click from page to page, the user needs to know something is happening.
- We are going to use, a package called [nprogress](https://www.npmjs.com/package/nprogress)

- Import it in your `_app.js` file
- Import the `css`, `import 'nprogress/nprogress.css';`
- Import `NProgress` and `next` router

```JAVASCRIPT
import NProgress from 'nprogress';
import Router from 'next/router';
```

- Does not work for me, but here is the component.

```JAVASCRIPT
// _app.js
import NProgress from 'nprogress';
import Router from 'next/router';
import Page from '../components/Page';

// TODO: swap with our own
// import 'nprogress/nprogress.css';
import '../components/styles/nprogress.css';

Router.events.on('routeChangesStart', () => NProgress.start());
Router.events.on('routeChangesComplete', () => NProgress.done());
Router.events.on('routeChangesError', () => NProgress.done());

export default function MyApp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}
```

### Fixed Styled Components Flicker on Server Render

- Error in console, `warning, Prop className did not match`. Difference between the server side and client side rendering. Caused by the random class names generated.
- So we need it to be, consistent.

- Other issue, sometimes when you reload, you get the FLOUT / FLOUC, not rendering the styles on the server for us. Flash Of Unstyled Content.
- Fix in your `_document.js` file. It's a setting, just Google, `serverstylesheet styled-components` and will come up.

- [Styled-Components, Advanced Usage.](https://styled-components.com/docs/advanced)
- To use with Next.js, we need to hook it up to one of their hooks. Called `getInitialProps`.
- GetInitialProps will do, wait until that method has been resolved. Before it sends the data from the server to the browser.

- TIP: When you fix something and it's not taking affect. Probably a cache issue with Next.js. Stop the build `Cntl + C` and in your front end folder. In your finder, delete the .next folder. Then start your app up again, `npm run dev`.

- Use these settings to get server side rendered styel sheets, in your `_document.js` file.

```JAVASCRIPT
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(
      (App) => (props) => sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }
```

- Entire component

```JAVASCRIPT
import Document, { Html, Head, NextScript, Main } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(
      (App) => (props) => sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

## Server Side GraphQL Development

Getting into the back end.

### Setting up Mongo DB

- KeystoneJS is a layer that sits on top of a number of databases.
- Can use MongoDB, Postcress, Prisma. For this tutorial, we are using MongoDB
- First thing, is to setup and make a DB. For people who have never made a DB before.
- Two options:
  - Run MongoDB locally on your computer.
  - Recommended hosted service, MongoDB Atlas, layer of UI and reporting/analytics

- Go through setting up MongoDB Atlas on the site.
- From your backend folder, set up a `.env` file, so your information does not go into your version control.
- Environmental variables, in this course, rename `sample.env` to just `.env`
  - `COOKIE SECRET` Change it to literally any other string
  - `DATABASE_URL` Will change this to your mongo db url
  - `STRIPE_SECRET` For checkout, not needed
  - `MAIL_HOST` cover later in lessons
  - `FRONTEND_URL` Port number you are running on the front end, this is important

#### Connect to your Cluster

- Series of settings to set this up. Best to just watch Wes do it, and follow along.

### Intro to GraphQL

- GraphQL, is a specification for requesting data, and pushing data to and from a server.
- Not a library itself, then library maintainers implement that as a layer on top of the db.
- Write queries and mutations
- queries will pull data down from the API
- mutations will create data or update existing data
- Has it's own syntax, looks like JS objects.
- You have to explicitly ask for the parts of the query you want

```JAVASCRIPT
query {
  allProducts {
    name
    description
    price
  }
}
```

- Running that query will bring back what you asked for. But with the data.
- Ask for the thing that you want, along with what fields you want.
- You can do multiple queries in one go.
- And it's relational.

- Mutations, for example reset password, or updating a user.

- Little more to get set up than REST API endpoint.
- Keystone makes this easier.

### Setting up Keystone and Typescript

- Create a new `keystone.ts` file in the root of your backend repo
- import your `env` config variables. `import 'dotenv/config';`
- Set on your local machine and we are going to deply them

- Then define your db url

```JAVASCRIPT
const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';
```

- Create a base session config, so you can run keystone

```JAVASCRIPT
import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
  mxAge: 60 * 60 * 24 * 360, // how long should they stay signed in
  secret: process.env.COOKIE_SECRET,
};

export default config({
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  db: {
    adapter: 'mongoose',
    url: databaseURL,
    // TODO: Add data seeding here
  },
  lists: createSchema({
    // Schema items goes in here
  }),
  ui: {
    // TODO: change this for roles
    isAccessAllowed: () => true,
  },
  // TODO: Add session values here
});

```

- Start your server, in your backend terminal, run `npm run dev` to start up your keystone server. Nothing will be displayed.

### Creating our first User data type

- Schema, description of what our data will look like, fields and relationships
- Create your first schema, User schema, `schemas/User.ts`

```JAVASCRIPT
import { text, password, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

// Named Export
export const User = list({
  // access:
  // ui
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
    // TODO, add roles, cart and orders
  },
});
```

- Import `User` schema it to your `keystone.ts` file

```JAVASCRIPT
export default config({
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  db: {
    adapter: 'mongoose',
    url: databaseURL,
    // TODO: Add data seeding here
  },
  lists: createSchema({
    // Schema items goes in here
    User,
  }),
  ui: {
    // TODO: change this for roles
    isAccessAllowed: () => true,
  },
  // TODO: Add session values here
});
```

### Adding Auth to application

- Create a method with `withAuth` to give us the ability to have auth in KeystoneJS
- Then wrap your `config` with the `withAuth` method
- Add a session argument
- See the `keystone.ts` file, and recording for setting up auth

### Creating our Products Data Type

- Create a new Products schema, new file in backend directory, `schemas/Products.ts`
- Module #4, video 16

### Uploading Product Images

- Cloudinary, service for hosting media and images, any digital media
- Create an account, for free trial
- Going to create a new data type called Product Image
- Set up the `.env` config with our cloudinary settings, name, key and secret
- Then make a new file in your `schemas` directory, `ProductImage.ts`
- Set up your cloudinary config

```JAVASCRIPT
import { cloudinaryImage } from '@keystone-next/cloudinary';
import { text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
  folder: 'sickfits',
};

export const ProductImage = list({
  fields: {
    image: cloudinaryImage({
      cloudinary,
      label: 'Source',
    }),
    altText: text(),
  },
});
```

- Now inject that into our `keystone.ts` file
- Restart your backend, and browse to keystone. Then upload an image.
- Should be displayed in your cloudinary dashboard.

### Creating two way data relationship in Keystone

- Relationships between data is really easy in KeystoneJS
- Just watch the video

### Inserting Seed Data

- When debugging when you delete items
- Write a script, to load with seed data
- In your `keystone.ts` file, find your db connection and add script
- use `onConnect()` method to inject all the items into the database.

```JAVASCRIPT
db: {
      adapter: 'mongoose',
      url: databaseURL,
      // TODO: Add data seeding here
      onConnect() {
        console.log('Connected to the database!');
      },
    },
```

- Use the data in `seed-data/data.ts` as a starter
- Then, the script in `seed-data/index.ts` to inject.
- Set up to run with npm script

```JAVASCRIPT
db: {
      adapter: 'mongoose',
      url: databaseURL,
      // TODO: Add data seeding here
      async onConnect(keystone) {
        console.log('Connected to the database!');
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(keystone);
        }
      },
    },
```

- In package.json file, script for `seed-data`, so kill your build and run `npm run seed-data`
- In Keystone app, you can look at the graphQL queries.

### Setting up Apollo Client

- We need a piece of software that will talk to the graphQL API and manage all that data.
- Using Apollo GraphQL to do this.
- Good for debugging API, you can see all the data
- Apollo does a lot of caching, so you don't have to hit server.
- <https://www.apollographql.com/>
- Handles the simple things
  - Cache
  - Fetching / Pushing Data to our API
- They don't handle Image upload

- Lots of boiler plate stuff, just copy and paste

- Wes wrote a custom scripts, in `withData.js`
- Take the `withData` method and create an instance of Apollo and inject it in our application

- Do that inside of our `_app.js` file.
- Wrap our entire app with a provider.
- A component that live very high within your application. Allows components that are several levels deep to access that data.
- The Apollo client is at an app level.
- Anywhere in your app, you can go and fetch data at any level from the Apollo Client.
- That's what a provider does
  
- In our `app.js` file, we are going to wrap it with, `<ApolloProvider></ApolloProvider>`
- Where does the data come from?
- Export it with the `withData()` library script that Wes provided.

- Best to just watch the video on setting up Apollo.

### Fetching Data with hooks and Displaying it on Front-End

- Pull in some data and display it.
- Make a products component, that will fetch our data.
- Custom React Hook and dealing with state lesson.

```JAVASCRIPT
export default function Products() {
  return (
    <div>
      <p>Products Component</p>
    </div>
  );
}
```

- And import it into your products page

```JAVASCRIPT
import Products from '../components/Products';

export default function ProductsPage() {
  return (
    <div>
      <Products />
    </div>
  );
}
```

- How do we query items from our backend?
- How do we get GraphQl queries onto the page?
- In Keystone local site, open up the API Explorer and write a query.
- Write a qeury for the product.
- Name your query, good convention is all CAPS and finish it with `_QUERY`

```JAVASCRIPT
query ALL_PRODUCTS_QUERY {
  allProducts {
    id
    name
    price
    description
    photo {
      id
      image {
        publicUrlTransformed
      }
    }
  }
}
```

- Take that and make the query in your `products.js` page.
- Import graph ql, `import gql from "graphql-tag";`
- `gql` will turn our text into a proper graphql query.
- Our products page query

```JAVASCRIPT
import gql from 'graphql-tag';

const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    allProducts {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Products() {
  return (
    <div>
      <p>Products Component</p>
    </div>
  );
}
```

- Now that we have our query, we will use `hook` in order to fetch the data
- Use the `useQuery(ALL_PRODUCTS_QUERY);` and pass in your product query variable.
- This will pass in the data, any errors and if it's loading.
- Destructure the data, into three variables, `data, error, loading`

```JAVASCRIPT
export default function Products() {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY);
  console.log(data, error, loading);
  return (
    <div>
      <p>Products Component</p>
    </div>
  );
}
```

- Set up the conditional for the `data, error, loading`
- So when you load the page, or navigate to another page, you get a loading or if an error it will throw an error.

```JAVASCRIPT
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
```

- Now, `map()` over your products and display them on the page.

```JAVASCRIPT
  {data.allProducts.map((product) => (
    <p>{product.name}</p>
  ))}
```

- And don't forget you need to create a key when looping over data in React.
- Key can be anything that is unique about that piece of data, `key={product.id}`

```JAVASCRIPT
  {data.allProducts.map((product) => (
    <p key={product.id}>{product.name}</p>
  ))}
```

- The entire component

```JAVASCRIPT
export default function Products() {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY);
  console.log(data, error, loading);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <ProductsListStyles>
        {data.allProducts.map((product) => (
          <p key={product.id}>{product.name}</p>
        ))}
      </ProductsListStyles>
    </div>
  );
}
```

- Write a styled component for your products list

```JAVASCRIPT
const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;
```

- Next up, make a singular products component to display more details.
- Make a new file, `components/product` and create a component

```JAVASCRIPT
export default function Product({ product }) {
  return (
    <div>
      <p>{product.name}</p>
    </div>
  );
}
```

- Pass in the product via props in the `Products.js` component
- `<Product key={product.id} product={product} />`

- Set up some styles for each component
- Import some pre-defined styles, into your `Product` component

```JAVASCRIPT
import ItemStyles from './styles/ItemStyles';

export default function Product({ product }) {
  return <ItemStyles>{product.name}</ItemStyles>;
}
```

- Add your images in
- TIP: Nested chaining in JS, you can just add a `?` after each item to check if it exist.

```JAVASCRIPT
    <ItemStyles>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
    </ItemStyles>
```

- Anytime you need a little bit of functionality, create a `libs` or a `utils` folder and put your commonly used functions in it. A money converter for example.

- Create a `formatMoney()` function and export it so you can formatt the dollar amounts in your apps.

```JAVASCRIPT
export default function formatMoney(amount = 0) {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  };

  // check if it's a clean dollar amount, % is a good way to check if you have any leftover
  if (amount % 100 === 0) {
    options.minimumFractionDigits = 0;
  }
  const formatter = Intl.NumberFormat('en-US', options);

  return formatter.format(amount / 100);
```

- Then use it in your product `<PriceTag>` function. And pass in the price.

```JAVASCRIPT
  <PriceTag>{formatMoney(product.price)}</PriceTag>
```

- Now any money, with .00 cents, will get pulled off. `$34`

### Fixing and Styling the Nav

- In `Nav.js`, import the styled component from `styles/NavStyles.js`
- Then wrap your nav in a styled component `<NavStyles>`
- Make any css adjustments on the component.

### React Forms and Custom Hooks, long one

- Now we want to push data into our GraphQL
- Pulling data and creating data, and then update the data
- Create a new component `components/CreateProduct.js`

```JAVASCRIPT
export default function CreateProduct() {
  return (
    <div>
      <p>This is the create products page</p>
    </div>
  );
}
```

- Get some forms setup, forms in React are tricky
- Build a form, then deal with mutation of submitting and then uploading an image

```JAVASCRIPT
export default function CreateProduct() {
  return (
    <form>
      <label htmlFor="name">
        Name
        <input type="text" id="name" name="name" placeholder="Name" />
      </label>
    </form>
  );
}
```

- Then on the `sell.js` page, import and use the `<CreateProduct />` component.

- Hook up an input to some state in React, and then use a useForm hook
- Hooking up state to a form input
- Create the state in your `CreateProduct` component and import `useState` from react.

```JAVASCRIPT
import { useState } from 'react';

export default function CreateProduct() {
  const [name, setName] = useState('Wes');
  return (
    <form>
      <label htmlFor="name">
        Name
        <input type="text" id="name" name="name" placeholder="Name" />
      </label>
    </form>
  );
}
```

- Now we have state, and whenever that state changes, it will be updated where ever it's used.
- And if you want to use state in an input in React, on the input, `value={name}`

```JAVASCRIPT
import { useState } from 'react';

export default function CreateProduct() {
  const [name, setName] = useState('Wes');
  return (
    <form>
      <label htmlFor="name">
        Name
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={name}
        />
      </label>
    </form>
  );
}
```

- But get an error, you cannot interact with the form field.
- Warning, a component is changing an uncontrolled input to be controlled.

- React is very strict about, one single source of truth
- If you have state in an input, and you change that input, you have your data in two different places. In the input and in state. So React throws an error.
- Those can get out of sync really quickly and it's a pain

- So React tells us, you need to listen for an onChange event on an input
- And when that happens, you need to intercept what that user had typed
- Put it back into state, and that will trigger a re-render and update the value on the input/form

- To start, put an inline function on the form element. `onChange={(e) => {console.log(e)}}`
- Now, when you try and type something in the field, it will console.log the event.

```JAVASCRIPT
export default function CreateProduct() {
  const [name, setName] = useState('Wes');
  return (
    <form>
      <label htmlFor="name">
        Name
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            console.log(e);
          }}
        />
      </label>
    </form>
  );
}
```

- Use `setName()` to sync the state with the input.
- Try and `setName(e.target.value)` to sync the input with state.
- You can look in the React Dev tools, you can see state updating in the component

```JAVASCRIPT
export default function CreateProduct() {
  const [name, setName] = useState('Wes');
  return (
    <form>
      <label htmlFor="name">
        Name
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </label>
    </form>
  );
}
```

- Gets out of hand, have a lot of forms
- Sync some states from inputs, and have it all in a single object.
- Create a use form hook,

- Create a new `lib` file to handle forms, `lib/useForm.js`
- Create a `useForm` function and pass in some initial state, empty.

```JAVASCRIPT
export default function useForm(initial = {}) {
    
}
```

- Our own custom hook that we created `useForm`
- Create a state object for our inputs
- Allow us to use as many form inputs as we want

```JAVASCRIPT
export default function useForm(initial = {}) {
  //create a state object for inputs
  const [inputs, setInputs] = useState(initial);
}
```

- Create a `handleChange()` function and pass in the event
- Going to have a couple differ values
- Create a state object for our inputs

- When you are dealing with an object with multiple pieces of state in a object
- Set the entire thing to be an object
- Copy the existing state

```JAVASCRIPT
function handleChange(e) {
  setInputs({
    // copy the existing state
    ...inputs,
    name: e.target.value
  })

}
```

- Make the name of the form element dynamic

```JAVASCRIPT
function handleChange(e) {
  setInputs({
    // copy the existing state
    ...inputs,
    // make name dynamic, pass it in
    [e.target.name]: e.target.value,
  })

}
```

- If you want to use the things in the custom hook, you have to return them

```JAVASCRIPT
return {
  inputs,
  handleChange,
}
```

- The hook looks like this, in the `useForm` library

```JAVASCRIPT
import { useState } from 'react';

export default function useForm(initial = {}) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);

  // make a function handleChange, passed into the onChange handler on the input
  function handleChange(e) {
    setInputs({
      // copy the existing state
      ...inputs,
      // have to make it dynamic, so you can pass in the name of the form element
      [e.target.name]: e.target.value,
    });
  }
}

// return the things we want to surface from this custom hook

return {
  inputs,
  handleChange,
};
```

- On your create products, you can now use the `useForm` hook.
- `const { inputs, handleChange } = useForm();`, importing an object and destructing an object an and handleChange values

- Then we update our form element
- `value={inputs.name}`
- and update the handle change to use `handChange` method
- `onChange={handleChange}`
- Set an initial value for the `useForm()`

```JAVASCRIPT
const { inputs, handleChange } = useForm({
    name: 'Nice Car',
    price: 234,
    description: 'Awesome car',
  });
```

- The full component

```JAVASCRIPT
import useForm from '../lib/useForm';

export default function CreateProduct() {
  const { inputs, handleChange } = useForm({
    name: 'Nice Car',
    price: 234,
    description: 'Awesome car',
  });
  return (
    <form>
      <label htmlFor="name">
        Name
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={inputs.name}
          onChange={handleChange}
        />
      </label>
    </form>
  );
}
```

- Check to see if this works, go to React Dev tools and look at the `CreateProduct` component, hook. Change the value of input and watch it update.

- Now you can reuse that for other forms

```JAVASCRIPT
      <label htmlFor="price">
        Price
        <input
          type="number"
          id="price"
          name="price"
          placeholder="price"
          value={inputs.price}
          onChange={handleChange}
        />
      </label>
```

- Note, inputs as a number, once you change the value it converts from a number to a string. We need it to always be a string.

- We need to add a little more to our `lib/useForm` package to convert.
- Inside our `handleChange` function, destructure the `e.target`
- And then write a condition to convert to integer.

```JAVASCRIPT
    let { value, name, type } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }
```

- Now when you change the value of the price number input, it's being updated as a number.

```JAVASCRIPT
import { useState } from 'react';

export default function useForm(initial = {}) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);

  // make a function handleChange, passed into the onChange handler on the input
  function handleChange(e) {
    let { value, name, type } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    setInputs({
      // copy the existing state
      ...inputs,
      // have to make it dynamic, so you can pass in the name of the form element
      [name]: value,
    });
  }
  // return the things we want to surface from this custom hook

  return {
    inputs,
    handleChange,
  };
}
```

- Reset the form to the initial state

```JAVASCRIPT
  function resetForm() {
    setInputs(initial);
  }
```

- And Clear the form, how do you loop over the object, and set them to be nothing?
- If you have an object, you can wrap it in an `Object.entries(yourObject)` and it will create an array of those items

```JAVASCRIPT
const person = { name: "chris", price: 200, age: 43, job: "design"}
Object.entries(person);
```

- Loop over the keys and set them to be nothing, blank

```JAVASCRIPT
Object.entries(person).map(item => item[1])
```

- You can destructure and return a key or value

```JAVASCRIPT
Object.entries(person).map((key, value) => key)
```

```JAVASCRIPT
Object.entries(person).map((key, value) => value)
```

- Return with not value

```JAVASCRIPT
Object.entries(person).map((key, value) => [key, ''])
```

- How do we turn that back into an object?
- Wrap it in an `Object.fromEntries()`

```JAVASCRIPT
Object.fromEntries(Object.entries(person).map((key, value) => [key, '']));
```

- Basically turn it into an array with `Object.entries`, then turn it back with `Object.fromEntries`

- Then you have to `setInputs(blankState)`

```JAVASCRIPT
  // clear the form, how do you loop over and set them to be empty?
  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  }
```

- Surface that `clearForm` function in your `return` statement on the component

```JAVASCRIPT
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
```

- You can even hook that up to a button, in your `CreateProducts` component

```JAVASCRIPT
      <button type="button" onClick={clearForm}>
        Clear Form
      </button>
      <button type="button" onClick={resetForm}>
        Reset Form
      </button>
```

### Hooking up our File input and Form Styles

- Use the `Form.js` styles, and add the `<Form>` component to the `<CreateProduct>` component.
- Disable form element, do it on the fieldset, to disable. You need this for when making a call to the backend, when charging credit card etc..
- Need to disable while we are doing things on the backend so user cannot start adding things.
- TIP: To disable everything, just wrap your form in a `fieldset`, and add the `disabled` attribute.
- Can also set an `aria-busy` attribute, to show a loading state vs. using a regular class. That way it's accessible and styled. Without having to add/remove classes.

- Basic form styles, with loading with `aria`

```JAVASCRIPT
import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

const Form = styled.form`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.02);
  border: 5px solid white;
  padding: 20px;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  label {
    display: block;
    margin-bottom: 1rem;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid black;
    &:focus {
      outline: 0;
      border-color: var(--red);
    }
  }
  button,
  input[type='submit'] {
    width: auto;
    background: red;
    color: white;
    border: 0;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
  }
  fieldset {
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.5;
    }
    &::before {
      height: 10px;
      content: '';
      display: block;
      background-image: linear-gradient(
        to right,
        #ff3019 0%,
        #e2b04a 50%,
        #ff3019 100%
      );
    }
    &[aria-busy='true']::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  }
`;

export default Form;
```

- Add an image upload field.

```JAVASCRIPT
  <label htmlFor="image">
    Image
    <input type="file" id="image" name="image" onChange={handleChange} />
  </label>
```

- Add a description field.

```JAVASCRIPT
  <label htmlFor="description">
    Description
    <textarea
        id="description"
        name="description"
        placeholder="Description"
        value={inputs.description}
        onChange={handleChange}
    />
  </label>
```

- Now, Listen for the click on the add product button
- In the `<Form>` tag, listen for the onSubmit.
- TIP: If your event is small enough, you can just write it as an inline function on the Component.

```JAVASCRIPT
<Form onSubmit={(e) => {
  e.preventDefault();
  console.log('Submitted'):
}}>
  <fieldset>
    <label>Form here</label>
  </fieldset>
</Form>
```

- The `e.preventDefault()` will stop the default button behavior from putting it in the url and refreshing the page.
- And add a required to the image form element.

### 24 - Creating Products via our Mutations

- Sending data and hooking up to GraphQL API
- Create a mutation in your GraphQL API explorer, from KeystoneJS

- Figure out what mutation we need, in your API explorer

```JAVASCRIPT
mutation {
  createProduct(data:{
    name: "Sample Product",
    description: "Test",
    price: 100
  }) {
    id
    price
    description
  }
}
```

- `createProduct()` is one of the mutations available to us.
- And pass in the data you want, pass as an argument to the function.

```JAVASCRIPT
createProduct(data:{
    name: "Sample Product",
    description: "Test",
    price: 100
  })
```

- Then from that, you ask for the return data
- Says go and make this, and when you are done, bring me back the data from the database

```JAVASCRIPT
mutation {
  createProduct(data:{
    name: "Sample Product",
    description: "Test",
    price: 100
  }) {
    id
    price
    description
  }
}
```

- Then run it in GraphQL API explorer
- And to to your KeystoneJS, and you can see your product.

- 💡 This is what we will be doing with the form, instead of running it manually in the API explorer.

#### Make your mutation

- In `<CreateProducts />` component, you have to make your mutation.

```JAVASCRIPT
const CREATE_PRODUCT_MUTATION = gql``;
```

- And import `gql` into your file.
- Inside of your `gql` put in your mutation query you ran earlier in the API explorer.

```JAVASCRIPT
const CREATE_PRODUCT_MUTATION = gql`
  mutation {
    createProduct(
      data: {
        name: "Sample Product"
        description: "Test"
        price: 100
        status: "AVAILABLE"
      }
    ) {
      id
      price
      description
    }
  }
`;
```

- However we need to make this more flexible and pass in dynamic data, variables.
- Name the mutation, same as the `const`
- And create the variables, which ones are being passed in and what the type is.
- `$name: String!`, the ! is how you tell graphql something is required.

```JAVASCRIPT
const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # Which variables are getting passed in? And what type?
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: "Sample Product"
        description: "Test"
        price: 100
        status: "AVAILABLE"
      }
    ) {
      id
      price
      description
    }
  }
`;
```

- Then inside your `createProduct()` mutation, you can use the variables.

💡Try your hardest to NOT think of this as JS, this is GraphQL notation. Everything inside fo the `gql`.

- Can't use JS variables inside of `gql`, try and keep it a clean graphql mutation.
- Use the gql variables in your `createProduct()` mutation.

```JAVASCRIPT
const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # which variables are getting passed in? And what type are they?
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
      }
    ) {
      id
      price
      description
    }
  }
`;
```

- The photo is unique relationship
- `photo: { create: { image: $image, altText: $name } }`
- Tell it to create a relationship with this product, and create the item and use the `image` and `altText` for that.
- Full mutation with photo

```JAVASCRIPT
const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # which variables are getting passed in? And what type are they?
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;
```

#### Hooking it up to our form

- Now you need to hook up your mutation inside of your `onSubmit` on the `<Form>`
- You will use the mutation hook, inside our component, `useMutation()`
- `useMutation()` comes from our apollo client.

- Inside of your `CreateProduct()` function
- `const payload = useMutation();`
- and pass it in your mutation `CREATE_PRODUCT_MUTATION`

```JAVASCRIPT
const payload = useMutation(CREATE_PRODUCT_MUTATION, {
    variables: inputs,
  });
```

- Destructure the payload, it's an array that it returns
- The first thing it returns is the `createProduct` function that will run the mutation
- The second thing, is the same thing as the graphql query.
- `{loading, error, data}`, loading state, error state, and any data that gets returned from the mutation.

```JAVASCRIPT
const [createProduct, {loading, error, data}] = useMutation(CREATE_PRODUCT_MUTATION, {
    variables: inputs,
  });
```

- If you console.log the `createProduct()`, this is a function that is bound to the entire mutation, and when you run it with the arguments, it will go off to the back end and run it for us.
- It's an asynchronous function, so we can call it. In our `<Form onSubmit={}>` function.

- Since it's an asynchronous function, you need to make it as that.
- Mark the `onSubmit` function as `async`, allow to `await` so it calls the backend and comes back.

```JAVASCRIPT
<Form
    onSubmit={async (e) => {
      e.preventDefault();
      console.log(inputs);
      // submit the input fields to the backend
      const response = await createProduct();  
    }}
>
```

- 💡Important: The `createProduct()` mutation function, we have already pre-loaded it with our variables.
- You can either specify the variables when you define the mutation, if you know what they are.
- Or you can pass them into your `await createProduct()` function if you don't know them.

- Take care of your `loading` and `disabled` state.
- In your `<fieldset>` add a disabled state with the the loading parameter. If it is loading, it will disable the entire form.

```JAVASCRIPT
<fieldset disabled={loading} aria-busy={loading}>
```

- and `error` state, if their is an error, we need to show the user.
- With the course, Wes provided a Error component, take in the error and shows to user.
- Before your `<fieldset>` put in the `<DisplayError />` component and then pass in the prop `error={error}`
- And this component will check, if there is an error, it will render out. Nut if not, will just be `null`

#### Try and upload a form

- Use your form to add a product
- What's going on
  - Disabled the form on submit
  - The loading indicator turned to on
  - We `await` the `createProduct()`
  - Came back with a response and got the data, id, name and price
  - Now, you can go to your backend, KeystoneJS, and see the new product
  - And the image
  - Try and make an error, test the error

- Delete the `name` to test out the error state

- Finish up after it's done
- Clear the form after submit
- Add `clearForm()` function to your `<Form />` component

### 25 - Fetching queries after successful mutation

- On your home page, it renders the cached products, and doesn't show the product you just added, until you refresh.

- In Apollo,  you have options to get fresh data:

- 1. Modify the cache directly, the `allProducts` query. Manually inject it into the cache and it would update itself.
- 2. Tell Apollo behind the scenes, go to server and re-fetch the query. Go to the network and re-fresh the cache.

- Update the query, it lives in the `Products.js` component. Export the query in the file so you can use it.

```JAVASCRIPT
export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    allProducts {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;
```

- Import it in your `CreateProducts.js` file so you can use it.
- Then, inside your `useMutation()` function add the `refetchQueries` and pass it your `ALL_PRODUCTS_QUERY`.

```JAVASCRIPT
  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );
```

- Sequence, when the mutation fires off and we successfully come back, re-fetch the `ALL_PRODUCTS_QUERY`.
- Go and add a new product, then navigate to the home page, and it will immediately show up. It went to the network and re-ran that query for us.
- 💡That is referred to as, **re-fetching our query**.

### 26 - Change pages in Next.js, after product creation

- Declaritive programming, you figure out what you want and it will figure out the logic behind the scenes to make it work.
- Sometimes you want to do it imperative, do it programmatically on the page.
- Next.js has API for that.

- After we create our page. We want to programmatically route to another page.
- Import `import Router from 'next/router';`
- And on our `<Form onSubmit={}>` we add `Router.push()`

```JAVASCRIPT
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        // submit the input fields to the backend
        const res = await createProduct();
        clearForm();
        // Go to that products page
        Router.push({
          pathname: `/product/${res.data.createProduct.id}`,
        });
      }}
    >
```

- We are going to take the returned id, and simply go to that page.
- If you need to, you can pass query parameters, part of Next.js

- Now, when you add a product, it routes to the product page, but we get a 404
- Because we have yet to build that page.

### 27 - Displaying Single Items, Routing and SEO

- CRUD, Create, Read, Update, Delete
- If you have a database, then you are doing these things
- Sometimes, it's CRUDS, the S is for Subscribe.

- Now, Next.js has file based routing, able to put the product ID in the url.
- Or you can create a slug for the product to look it up.
- In your pages directory, make a new folder and file `pages/product/[id].js`
- Use the ID to look it up in the db

- The square brackets is specific to next JS.
- The `[]`, use this template for anything that matches this layout.
- In the `[id].js` file, add a `<SingleProduct>` component.

```JAVASCRIPT
export default function SingleProduct() {
  return <p>Hey, I am a single product</p>;
}
```

- Now, after you create a product, it routes to the `<SingleProduct>` page. Not sure why, very confusing.
- In your React Dev tools, you can see we now have the `id` being supplied to us.
- Why?
- Because we named the file `[id].js`, what that does it says, match anything with this url `product/whatever` and give me that whatever in a query param, and we have access to it.

- 🤔, not so sure

- Pass your `id` into `<SingleProduct>` component, destructure.

```JAVASCRIPT
export default function SingleProduct({ query }) {
  return <p>Hey, I am a single product {query.id}</p>;
}
```

- Now your id shows up on the UI.
- Copy that, and go to your Keystone.js/API Explorer and let's write a query to grab that single item.

- In your graphQL explorer, write the query, remember, this is not JS, it's graphQL syntax.
- You can only query single items base don unique fields, `Product()` just returns one item.

```JAVASCRIPT
query {
  Product(where: {
    id: "634c1168403cd42f6a5519df"
  })
}
```

- Query the Product, where the id is equal to "634c1168403cd42f6a5519df"
- And when that comes back, we ask for, name, price, description

```JAVASCRIPT
query {
  Product(where: {
    id: "634c1168403cd42f6a5519df"
  }) {
    name
    price
    description
  }
}
```

- If you want to return something based on a name or whatever string. Use `allProducts` as the query.
- The difference between `Product()` and `allProducts()` is returning one vs. multiple.
- IF you are only returning one item from a query, it must use a unique field.

- To filter by everything, you use `allProducts()`.

```JAVASCRIPT
query {
  Product(where: {
    id: "634c1168403cd42f6a5519df"
  }) {
    name
    price
    description
  }
  
  allProducts(where:{
    name_contains_i: "vintage"
  }) {
    name
    price
  }
}
```

- Useful for when you want to find an item based on something that is not unique.
- OR when you want to build a search

- For now, we are only using the one. Copy that `query` and put in your `[id].js` page.

```JAVASCRIPT
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const SINGLE_ITEM_QUERY = gql`
  query {
    Product(where: { id: "634c1168403cd42f6a5519df" }) {
      name
      price
      description
    }
  }
`;

export default function SingleProduct({ query }) {
  const { data, loading, error } = useQuery();
  return <p>Hey, I am a single product {query.id}</p>;
}
```

- `console.log()` the `console.log({ data, loading, error });` so you can see it loading. When it's fetching it from the server, you will see `loading: true`.
- 💡TIP: if you put your console.log in `{}` it will return it as an object so you can see what's associated with it.

#### Move the query to it's own component

- Now, we want to move the query to it's own component.
- Make a new component `components/SingleProduct.js`

- Move the graphql query from the `[id].js` page to the `SingleProducts` page.
- And the `const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY);` into the function.

```JAVASCRIPT
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const SINGLE_ITEM_QUERY = gql`
  query {
    Product(where: { id: "634c1168403cd42f6a5519df" }) {
      name
      price
      description
    }
  }
`;

export default function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY);
  return <p>Single Product</p>;
}
```

- Import `<SingleProduct>` into your `[id].js` to use it. And pass in the `query.id`

```JAVASCRIPT
import SingleProduct from '../../components/SingleProduct';

export default function SingleProductPage({ query }) {
  return <SingleProduct id={query.id} />;
}
```

- Now we create a single product component, and all it needs is an ID and we can display what we want.

```JAVASCRIPT
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import DisplayError from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
  query {
    Product(where: { id: "634c1168403cd42f6a5519df" }) {
      name
      price
      description
    }
  }
`;

export default function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  return (
    <div>
      <h2>{data.Product.name}</h2>
    </div>
  );
}
```

- We need to make the `id` dynamic, above it's hard coded in the `SingleProduct` component

```JAVASCRIPT
export default function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  return (
    <div>
      <h2>{data.Product.name}</h2>
    </div>
  );
}
```

- Now, you can use that component in another part of your app if like.
- For example, `<SingleProduct id="63495a61403cd42f6a5519d9" />` you can just pass in the id, and it will render.

#### Styling on the single product

- Add some more styling to the single item product.
- Start to pull in the data from your graphQL query.

- Make a variable, `Product` so easier to write. `const { Product } = data;`
- This is pulling from your graphql query. If you `console.log(Product)`, you will see the data object come back.
- You can get to each item, for example to display the name of the product.

```JAVASCRIPT
<h2>{Product.name}</h2>
```

- Single product component

```JAVASCRIPT
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import DisplayError from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      id
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { Product } = data;
  console.log(Product);
  return (
    <div>
      <img
        src={Product.photo.image.publicUrlTransformed}
        alt={Product.photo.alt}
      />
      <div className="details">
        <h2>{Product.name}</h2>
        <p>{Product.description}</p>
      </div>
    </div>
  );
}
```

- Define the title tag in your Next.js application.
- Just embed the `<Head />` tag inside your component. Make sure to import it.
- `import Head from 'next/head';`

- Anything that gets put in the head, will get injected into the document.

```JAVASCRIPT
  return (
    <div>
      <Head>
        <title>Sick Fits | {Product.name}</title>
      </Head>
      <img
        src={Product.photo.image.publicUrlTransformed}
        alt={Product.photo.alt}
      />
      <div className="details">
        <h2>{Product.name}</h2>
        <p>{Product.description}</p>
      </div>
    </div>
  );
```

- Now, create some styles for the `SingleProducts` component.

```JAVASCRIPT
const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;
```

- The component

```JAVASCRIPT
  return (
    <ProductStyles>
      <Head>
        <title>Sick Fits | {Product.name}</title>
      </Head>
      <img
        src={Product.photo.image.publicUrlTransformed}
        alt={Product.photo.alt}
      />
      <div className="details">
        <h2>{Product.name}</h2>
        <p>{Product.description}</p>
      </div>
    </ProductStyles>
  );
```

### Working with Mutations
  
- Pass in the data via query parameters
- Which is the `?id=5345345` at the end of url
- Make a new page, in `pages/update.js`

```JAVASCRIPT
import UpdateProduct from '../components/UpdateProduct';

export default function UpdatePage() {
  return (
    <div>
      <UpdateProduct />
    </div>
  );
}
```

- Then make a new component `UpdateProduct` and import into the `update` page

```JAVASCRIPT
export default function UpdateProduct() {
  return <p>Update Product</p>;
}
```

- Inside `Products.js` file, create a button to edit and delete items
- In Next.js, pass in the id via query param
- Do this in the `Product.js` file
- In the `href` pass in options
  - `pathname: 'update"` is the page `update.js`
  - `query: { id: product.id}` that is passed in via the url
  - The a little edit and icon

```JAVASCRIPT
      <div className="buttonList">
        <Link
          href={{
            pathname: 'update',
            query: {
              id: product.id,
            },
          }}
        >
          Edit 📝
        </Link>
      </div>
```

- Now, when you go to the homeapge, and click edit.
- Notice the id is being passed in via query param
- Another way to do url's in Next.js

- Now, create the form to update the product.
- In `UpdateProduct.js` do this
  - 1. We need to get the existing product
  - 2. We need to get the mutation to update the product
  - 3. We need the form to handle the updates

- 1. Have to go to our `update.js` page to get the information from the url
  - And that data is being passed in via `props.query`
  - Just destructure that in your `UpdatePage` component
  - And pass it down via props

```JAVASCRIPT
import UpdateProduct from '../components/UpdateProduct';

export default function UpdatePage({ query }) {
  return (
    <div>
      <UpdateProduct id={query.id} />
    </div>
  );
}
```

- Then we go into our `UpdateProducts.js` component and bring it in, destructure it, so we can use in our component.
- And display on the page so you can see if being passed in properly

```JAVASCRIPT
export default function UpdateProduct({ id }) {
  // 1. need to get the exiting product
  // 2. need to get the mutation to update the product
  // 3. need the form to handle the updates
  return <p>Update Product {id}</p>;
}
```

- Now when you go to any page, you see the id.
- Next up, need to get the existing product.
- Create a graphql single product query in your `UpdateProduct.js` file

```JAVASCRIPT
import gql from 'graphql-tag';

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;
```

- Then query the product and log it out to console.

```JAVASCRIPT
export default function UpdateProduct({ id }) {
  // 1. need to get the exiting product
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });

  console.log(data);

  // 2. need to get the mutation to update the product
  // 3. need the form to handle the updates
  return <p>Update Product {id}</p>;
}
```

- 2. Need a mutation to update the product.

- Create the mutation query in your `UpdateProduct.js`
- Lots going on here, not sure

```JAVASCRIPT
const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: string
    $description: string
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { id: $id, name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;
```

- Add to the `UpdateProduct`

```JAVASCRIPT
 const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION, {
    variables: {
      id,
      // TODO: Pass in updates to product here!
    },
  });
```

- 3. Need to create a form to handle our updates

- Copy and past from our `CreateProduct.js`, it's very similar

- Query the single product
- Passing into our `useForm()` hook
- And passing the data into our form

- One issue, when you to to a new product and edit, the fields are not populated. Have to manually refresh the page.
- End of this video, lots of bugs. Prob best to just watch the video again.
- Video # 28 updating Items
- See `UpdateProduct.js` for the final working file to update the product with an edit form.

### Loading state bug, useEffect

- #29 video, using useEffect to deal with a tricky loading state issue
- To solve this bug, in our `useForm.js`, when the intial data changes, then you need to update it.
- You do that with `useEffect()`, allows us to monitor pieces of state or variables. And when those variables change, we can run some code.
- In this case, when an initial state of loading, changes to actual data, then we need to update it.

- Watch the values on the inputs, and when it goes from nothing, to something, than we know a change happened.
- Create an array of our object, `const initialValues = Object.values(initial);`
- And add a `.joing('')` to make it a string.
- Then pass that into your `useEffect()`

```JAVASCRIPT
  const initialValues = Object.values(initial);

  useEffect(() => {
    // This function runs when things we are watching change
    setInputs(initial);
  }, [initialValues]);
```

- This will go form a string of nothing, to a string of default values, name, price etc.
- Now, the data is showing up, when we edit the page via the edit button.

### Making a delete button

- Make a delete button to remove when clicked
- Make a new component for delete in your components folder `components/DeleteProduct.js`.

- Pass in the `id` of the product that needs to be deleted and any `children`. Functionality in the button

```JAVASCRIPT
export default function DeleteProduct({ id, children }) {
  return <button type="button">{children}</button>;
}
```

- Then inside our `Products.js` component, import and use the `DeleteProduct`

```JAVASCRIPT
<DeleteProduct>Delete</DeleteProduct>
```

- The reason you define `{children}` inside the component, allow you to put whatever you want inside the button `<DeleteProduct>Whatever</DeleteProduct>`

- Pass in as a prop, the id of the product `<DeleteProduct id={product.id}>Delete</DeleteProduct>`

- With delete buttons, you want to make sure someone didn't accidentally click it.
- Two ways, you can popup a confirm
- Or, maintain a click state to make sure someone wants to delete.

- Define an `onclick` on the button and then run an inline function on the button.

- Write a conditional `if()` statement for the `confirm()`. IF someone clicks cancel, then nothing will happen. If they choose ok, go ahead and delete.

```JAVASCRIPT
export default function DeleteProduct({ id, children }) {
  return (
    <button
      type="button"
      onClick={() => {
        if (confirm('Are you sure')) {
          // go ahead and delete
          console.log('deleted');
        } // nothing happens
      }}
    >
      {children}
    </button>
  );
}
```

- Next thing to do, is delete the item and write a mutation that will delete it for us.
- Make a new graphql query to delete the item in your `DeleteProducts` component.

```JAVASCRIPT
import gql from "graphql-tag";

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    
  }
`;
```

- Go to your graphql, API explorer and get a new mutation.

```JAVASCRIPT
const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct($id) {
        id
        name
    }
  }
`;
```

- Then you run the mutation, before your `return()`

```JAVASCRIPT
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
  });
```

- Tell it to run `DELETE_PRODUCT_MUTATION` and pass it any variables it needs, `{ variables: { id: id },}`

- Now you can apply the `deleteProduct()` function to your `onClick` within the button

```JAVASCRIPT
  return (
    <button
      type="button"
      onClick={() => {
        if (confirm('Are you sure')) {
          // go ahead and delete
          console.log('deleted');
          deleteProduct();
        } // nothing happens
      }}
    >
      {children}
    </button>
  );
```

- Add an alert if a error happens.
- `deleteProduct().catch((err) => alert(err.message));`

- When you click the delete button, it removes the product, however it is still on the page. You have to refresh the page, and it will be gone.
- In the next video, how to remove an item from Apollo Cache

- Full Component

```JAVASCRIPT
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
  });
  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        if (confirm('Are you sure')) {
          // go ahead and delete
          console.log('deleted');
          deleteProduct().catch((err) => alert(err.message));
        } // nothing happens
      }}
    >
      {children}
    </button>
  );
}
```

## Removing items from Apollo Cache

- Issue is, we delete an item and it still appears on the page. It deletes it from the database, but still exist in memory, on the page.
- Still in the cache, of our all products query.

- Apollo has a nice option called `evict`, where it will take out that item from the cache. And Rect will re-render.
- The way that works, we create an update function that you pass along with our `useMutation()`.

- Pass into your `useMutation()` function

```JAVASCRIPT
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    update,
  });
```

- Then write the `update()` function. And pass in the

```JAVASCRIPT
function update(cache, payload) {
  console.log('this is the cache: ' cache);
  console.log('running the update function after delete');
}
```

- The way you remove from the cache, is use `cache.evict()`. You have to find the item in the cache, then evict it.
- Use `cache.identify()` to find it and pass it our payload, `payload.data.deleteProduct`.
- `cache.identify(payload.data.deleteProduct)`
- `cache.identify()` It uses the typename, and id to identify where that item is in the Apollo cache.
- Then, it takes it out, with the `cache.evict()` to take it out entirely.

```JAVASCRIPT
function update(cache, payload) {
  console.log(payload);
  console.log('running the update function after delete');
  cache.evict(cache.identify(payload.data.deleteProduct));
}
```

- Now, when you click on the delete button, it takes it out of the page.

## Pagination

### Pagination Links

- General Approach

1. Render the actual links
2. Alow for dynamic routing
3. Filter the products for the current page
4. Deal with teh Cache invalidation

- Make a new component, `components/Pagination.js`
- And pass in the parameter, the page you are currently on `{page}`

```JAVASCRIPT
export default function Pagination({ page }) {
  return <p>Pagination!</p>;
}
```

- Set up the SEO stuff, for the title tag. Import the `Head` from `next/head`.
- And import your `PaginationStyles`.

```JAVASCRIPT
import Head from 'next/head';
import PaginationStyles from './styles/PaginationStyles';

export default function Pagination({ page }) {
  return (
    <PaginationStyles>
      <Head>
        <title>Sick Fits - Page {page} of ___</title>
      </Head>
    </PaginationStyles>
  );
}
```

- Go to page that renders all the items, in `products.js`
- Import and put above and below your `<Products />` component.
- And create a prop for page, `page={}`, which will be passed in via query params. For now just hardcode, page 1.

```JAVASCRIPT
import Pagination from '../components/Pagination';
import Products from '../components/Products';

export default function ProductsPage() {
  return (
    <div>
      <Pagination page={1} />
      <Products />
      <Pagination page={1} />
    </div>
  );
}
```

- Need couple things
  - Link to the next and previous page
  - Total pages
  - Current page we are on

- Use the `<Link>` component from next.js, import it

```JAVASCRIPT
import Head from 'next/head';
import Link from 'next/link';
import PaginationStyles from './styles/PaginationStyles';

export default function Pagination({ page }) {
  return (
    <PaginationStyles>
      <Head>
        <title>Sick Fits - Page {page} of ___</title>
      </Head>
      <Link href="/">⬅️ Prev</Link>
      <p>Page ___ of ___</p>
      <p>___ Items Total</p>
      <Link href="/">Next</Link>
    </PaginationStyles>
  );
}
```

- Calculate how many pages you have, have to calculate items total, and items per page.
- To get total number of items, you can write a query, in our API explorer graphql.
- Apollo give you a meta query, so you can use `_allProductsMeta` and ask for `count` and Apollo will return how many products you have.

```JAVASCRIPT
query {
  _allProductsMeta {
    count
  }
}
```

- Then inside your `<Pagination>` component, add the graphql query.

```JAVASCRIPT
const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;
```

- To use that data, add it to your `Pagination` component, before the return, with `useQuery()`.
- Add your conditional for the loading and error handling.

```JAVASCRIPT
  const { error, loading, data } = useQuery(PAGINATION_QUERY);
  if (loading) return `Loading...`;
  if (error) return <DisplayError error={error} />;
```

- Now, you have your data you can interpolate how many items there are.
- Get the total count of items and just make a `count` variable.

```JAVASCRIPT
export default function Pagination({ page }) {
  const { error, loading, data } = useQuery(PAGINATION_QUERY);
  if (loading) return `Loading...`;
  if (error) return <DisplayError error={error} />;

  const { count } = data._allProductsMeta;

  return (
    <PaginationStyles>
      <Head>
        <title>Sick Fits - Page {page} of ___</title>
      </Head>
      <Link href="/">⬅️ Prev</Link>
      <p>Page ___ of ___</p>
      <p>{count} Items Total</p>
      <Link href="/">Next</Link>
    </PaginationStyles>
  );
}
```

- Now you need to determine how many pages you have. Best not to hardcode that value, store it in a variable. Best place is store in a config.
- `config.js`
- `export const perPage = 4;`

- In your `Pagination` component, import the `perPage` variable from `config.js`
- `import { perPage } from '../config';`

- Create a `pageCount` variable and divide the `count / perPage` and stick that into your return.

```JAVASCRIPT
export default function Pagination({ page }) {
  const { error, loading, data } = useQuery(PAGINATION_QUERY);
  if (loading) return `Loading...`;
  if (error) return <DisplayError error={error} />;

  const { count } = data._allProductsMeta;
  const pageCount = count / perPage;

  return (
    <PaginationStyles>
      <Head>
        <title>Sick Fits - Page {page} of ___</title>
      </Head>
      <Link href="/">⬅️ Prev</Link>
      <p>Page ___ of {pageCount}</p>
      <p>{count} Items Total</p>
      <Link href="/">Next</Link>
    </PaginationStyles>
  );
}
```

- Will give you a decimal, you want to get to the next whole number, so you can show the last product.
- Wrap the `pageCount` ina  `Math.ceil`

```JAVASCRIPT
const pageCount = Math.ceil(count / perPage);
```

- Now if you change that global variable, and save, you will see the page count update on the pagination UI.

- Next thing, to dynamically generate the next and previous based on the page prop, variable being passed.
- Add within your `Link` components `href` for the Previous and Next.

```JAVASCRIPT
  return (
    <PaginationStyles>
      <Head>
        <title>Sick Fits - Page {page} of ___</title>
      </Head>
      <Link href={`/products/${page - 1}`}>⬅️ Prev</Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} Items Total</p>
      <Link href={`/products/${page + 1}`}>Next ➡️</Link>
    </PaginationStyles>
  );
```

- If you have a page that doesn't exist for previous state. You have to disable it.
- NOTE: If you want to put attributes on a Next.js `<Link>` tag, you need to include an `<a>Your Stuff</a>` inside your component.
- In this case, we want to put an `aria-disabled="true"` for our previous link based on some logic.

```JAVASCRIPT
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>⬅️ Prev</a>
      </Link>
```

- If you are going to be nesting things inside the `<Link>`, the `href` will always go on the `<Link href="/">`
- Now, the link is disabled, it visually tell user and accessibly tells users they cannot click it.

- And do the same thing for the next link, but change the condition to be `page >= pageCount`.

```JAVASCRIPT
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>Next ➡️</a>
      </Link>
```

### Pagination Dynamic Routing

- Render the links dynamically Next.js
- Query String Routing, `http://localhost:7777/products?page=2`, passes the differential with it.

- Can also, file based routing, `http://localhost:7777/products/2`
- **File Based routing**, preferred in this situation.
- Make a new folder, `pages/products`, and create a new file `[page].js`.
- This is very similar to the `[id].js` we made earlier.
- `[page].js`, `page` is what the variable will be called when it's passed to you via query param.

- Tip: Move the `products.js` inside your `products` folder to clean things up.
- And rename it `products/index.js`, make sure your import is updated from the main `index.js` file.

- Inside your `[page].js` file, create a component

```JAVASCRIPT
export default function ProductsPage() {
  return <p>Hey Product</p>;
}
```

- `http://localhost:7777/products/3`, now navigating to individual product

- Update `[page].js` to be:

```JAVASCRIPT
export { default } from './index';
```

- A little confusing, we want the same thing to render out on different url's. Video time stamp 6:10
- We have three different files but all rendering out the same thing.
  - `index.js`
  - `products/index.js`
  - `products/[page].js`

- We are defining what happens in one file, and the other ones are just pointing to it.
- So now we can access the current page value, via our router.

- Add `useRouter()` to your`products/index.js` file, and console log it.
- You are looking for the `query: Object { page: "3" }` in the console.

```JAVASCRIPT
import { useRouter } from 'next/dist/client/router';
import Pagination from '../../components/Pagination';
import Products from '../../components/Products';

export default function ProductsPage() {
  const router = useRouter();
  console.log(router);
  return (
    <div>
      <Pagination page={1} />
      <Products />
      <Pagination page={1} />
    </div>
  );
}
```

- 💡 that page value come because we named our file `products/[page].js`
- Destructure the `query` so you can use it, directly off the `useRouter()`

```JAVASCRIPT
  const { query } = useRouter();
  console.log(query.page);
```

- `query.page` will give you the number of pages. Use that in your `Pagination` component.
- If there is no page passed, on the home page or product page, it will default to one. `page={query.page || 1}`

```JAVASCRIPT
<Pagination page={query.page || 1} />
```

- 🐛: bug, when clicking on the next, it jumps to page 11.  
- If you look in the `Pagination` component, we were concatenating and not actually adding.
- Tip: you can can check the type, using `typeof` on your `query.page`
- `console.log(typeof query.page);`, comes back in the console as string.

- You can convert to a number

```JAVASCRIPT
  const page = parseInt(query.page);
  console.log(typeof page);
```

- Then update your prop to just page.

```JAVASCRIPT
export default function ProductsPage() {
  const { query } = useRouter();
  const page = parseInt(query.page);

  return (
    <div>
      <Pagination page={page || 1} />
      <Products />
      <Pagination page={page || 1} />
    </div>
  );
}
```

### Adjust query for Pagination Values, 34

- We also need the current page inside our current product.
- Easier to just grab it out of the router once, and parse it and pass it in, than to re-use `useRouter()` over and over.

- In your `Products.js`, we want to modify the query, to get the first products. And offset them, based on which page we are currently on.
- Pass the page to your products component `<Products page={page || 1} />`

- Then in your query, on `Products.js`, you need to modify it to take in some variables, `$skip: Int = 0, $first: Int`
- Skip value is calculated based on what page we are on.
- First, tell us ,how many per page we need to pass, no default

- Now you need to pass to your graphql function.

```JAVASCRIPT
export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(first: $first, skip: $skip) {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;
```

- Go down to where you use the query, and pass in the arguments.

```JAVASCRIPT
export default function Products({ page }) {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage,
    },
  });
```

- The skip and first variables, calculate the number of products per page, based on the `perPage` variable in your `config.js`
- TIP: Notice the first time, you hit next, it has to load the products, and when you go back, it's fast. Because it's serving it from the apollo cache, doesn't have to make a network request.

### Custom Type Policies and Control over Apollo Cache, 35

- Saying goes in Computer Science, is naming things, cache and validation
- What happens when you delete an item, when you have pagination
