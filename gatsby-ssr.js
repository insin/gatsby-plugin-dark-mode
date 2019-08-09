const React = require('react')

exports.onRenderBody = function({ setPreBodyComponents }) {
  setPreBodyComponents([
    React.createElement('script', {
      key: 'gatsby-plugin-dark-mode',
      dangerouslySetInnerHTML: {
        __html: `
void function() {
  window.__onThemeChange = function() {}

  var preferredTheme
  try {
    preferredTheme = localStorage.getItem('theme')
  } catch (err) { }

  function setTheme(newTheme) {
    window.__theme = newTheme
    preferredTheme = newTheme
    document.body.className.match(/dark|light/g) !== null 
      ? document.body.classList.replace(/dark|light/g, newTheme)
      : document.body.classList.add(newTheme)
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
  ])
}
