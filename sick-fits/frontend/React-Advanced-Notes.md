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

-
