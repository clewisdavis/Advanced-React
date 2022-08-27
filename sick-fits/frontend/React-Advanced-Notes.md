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

-
