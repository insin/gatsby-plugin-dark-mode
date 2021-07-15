const React = require("react");

exports.onRenderBody = function ({ setPreBodyComponents }, { node }) {
  const defaultHtmlNode = node ?? "body";
  setPreBodyComponents([
    React.createElement("script", {
      key: "gatsby-plugin-dark-mode",
      dangerouslySetInnerHTML: {
        __html: `
void function() {
  window.__onThemeChange = function() {}

  var preferredTheme
  try {
    preferredTheme = localStorage.getItem('theme')
  } catch (err) { }

  function setTheme(newTheme) {
    const htmlTag = ${
      defaultHtmlNode === "html"
        ? `document.getElementsByTagName( 'html' )[0]`
        : `document.body`
    };
    if (preferredTheme && htmlTag.classList.contains(preferredTheme)) {
      htmlTag.classList.replace(preferredTheme, newTheme)
    } else {
      htmlTag.classList.add(newTheme)
    }

    window.__theme = newTheme
    preferredTheme = newTheme
    window.__onThemeChange(newTheme)
  }

  window.__setPreferredTheme = function(newTheme) {
    setTheme(newTheme)
    try {
      localStorage.setItem('theme', newTheme)
    } catch (err) {}
  }

  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
  darkQuery.addListener(function(e) {
    window.__setPreferredTheme(e.matches ? 'dark' : 'light')
  })

  setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'))
}()
    `,
      },
    }),
  ]);
};
