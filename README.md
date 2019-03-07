# gatsby-plugin-dark-mode

A theme toggling plugin for Gatsby with default handling for implementing a dark mode theme, and a React component for implementing theme toggling.

## Install

```sh
npm install gatsby-plugin-dark-mode
```

## How to use

### Implement theming

The default theme names are `'light'` and `'dark'`.

The `'dark'` theme will be used automatically (via the [`prefers-color-scheme` CSS media query](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)) if you've requested that your system use a dark colour theme.

The plugin will handle adding the current theme name to the `<body>` element as a `className`, so you can use [global styles](https://www.gatsbyjs.org/docs/creating-global-styles) to implement theming.

One option is to use CSS variables like so:

```css
body {
  --bg: white;
  --textNormal: #222;
  --textTitle: #222;
  --textLink: blue;
  --hr: hsla(0, 0%, 0%, 0.2);

  background-color: var(--bg);
}

body.dark {
  -webkit-font-smoothing: antialiased;

  --bg: darkslategray;
  --textNormal: rgba(255, 255, 255, 0.88);
  --textTitle: white;
  --textLink: yellow;
  --hr: hsla(0, 0%, 100%, 0.2);
}
```

You can then use these variables in your site's components...

```js
class Layout extends React.Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: 'var(--bg)',
          color: 'var(--textNormal)',
          transition: 'color 0.2s ease-out, background 0.2s ease-out',
        }}
      >
        ...
      </div>
    )
  }
}
```

...and in your [Typography config](https://www.gatsbyjs.org/docs/typography-js/#creating-the-typography-configuration) if you're using [`gatsby-plugin-typography`](https://www.gatsbyjs.org/docs/typography-js) (which is included in the [Gatsby Starter Blog](https://www.gatsbyjs.org/starters/gatsbyjs/gatsby-starter-blog/)):

```js
import './global.css'

import Typography from 'typography'
import Wordpress2016 from 'typography-theme-wordpress-2016'

Wordpress2016.overrideThemeStyles = () => ({
  a: {
    color: 'var(--textLink)',
  },
  // gatsby-remark-autolink-headers - don't underline when hidden
  'a.anchor': {
    boxShadow: 'none',
  },
  // gatsby-remark-autolink-headers - use theme colours for the link icon
  'a.anchor svg[aria-hidden="true"]': {
    stroke: 'var(--textLink)',
  },
  hr: {
    background: 'var(--hr)',
  },
})
```

### Implement theme toggling

The plugin provides a `ThemeToggler` component which takes a `children` [render prop](https://reactjs.org/docs/render-props.html), providing the current `theme` name and a `toggleTheme` function to change the theme:

```jsx
import React from 'react'
import { ThemeToggler } from 'gatsby-plugin-dark-mode'

class MyComponent extends React.Component {
  render() {
    return (
      <ThemeToggler>
        {({ theme, toggleTheme }) => (
          <label>
            <input
              type="checkbox"
              onClick={e => toggleTheme(e.target.checked ? 'dark' : 'light')}
              checked={theme === 'dark'}
            />{' '}
            Dark mode
          </label>
        )}
      </ThemeToggler>
    )
  }
}
```

The toggled theme will be persisted across visits in `localStorage.theme`.

## Acknowledgements

Theme switching code and the suggested theming implementation are based on [overreacted.io](https://github.com/gaearon/overreacted.io) by [Dan Abramov](https://github.com/gaearon).

## MIT Licensed
