import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node,
    store: PropTypes.object
  };

  render() {
    const {assets, component, store} = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';
    const head = Helmet.rewind();

    return (
      <html lang="en-us">
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          <meta name="bankrate-site-verification" content="75387a3abc9bf8cf6cc8" />
          <meta name="google-site-verification" content="1DZOZwCcjvk35l-3ZclhWBnFEXzDLECREa5Buv2E37U" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* styles (will be present only in production with webpack extract text plugin) */}
          {Object.keys(assets.styles).map((style, key) =>
            <link href={assets.styles[style]} key={key} media="screen, projection"
                  rel="stylesheet" type="text/css" charSet="UTF-8"/>
          )}

          {/* (will be present only in development mode) */}
          {/* outputs a <style/> tag with all bootstrap styles + App.scss + it could be CurrentPage.scss. */}
          {/* can smoothen the initial style flash (flicker) on page load in development mode. */}
          {/* ideally one could also include here the style for the current page (Home.scss, About.scss, etc) */}
          { Object.keys(assets.styles).length === 0 ? <style dangerouslySetInnerHTML={{__html: require('../theme/bootstrap.config.js') + require('../containers/App/App.scss')._style}}/> : null }
          <script dangerouslySetInnerHTML={{__html: `!function(){var a;if(a=window.driftt=window.drift=window.driftt||[],!a.init)
            return a.invoked?void(window.console&&console.error&&console.error("Drift snippet included twice.")):
            (a.invoked=!0,a.methods=["identify","config","track","reset","debug","show","ping","page","hide","off","on"],
            a.factory=function(b){return function(){var c;return c=Array.prototype.slice.call(arguments),c.unshift(b),a.push(c),a}},
            a.methods.forEach(function(b){a[b]=a.factory(b)}),a.load=function(a){var b,c,d,e;b=3e5,e=Math.ceil(new Date/b)*b,
            d=document.createElement("script"),d.type="text/javascript",d.async=!0,d.crossorigin="anonymous",
            d.src="https://js.driftt.com/include/"+e+"/"+a+".js",c=document.getElementsByTagName("script")[0],
            c.parentNode.insertBefore(d,c)})}(),drift.SNIPPET_VERSION="0.3.1",
          drift.load("amy622ayz2ey");`}}/>
        </head>
        <body>
          <script dangerouslySetInnerHTML={{__html: `window.fbAsyncInit=function(){FB.init({appId:"1697227587263342",xfbml:!0,
            version:"v2.8"}),FB.AppEvents.logPageView()},function(e,n,t){var o,c=e.getElementsByTagName(n)[0];e.getElementById(t)||
            (o=e.createElement(n),o.id=t,o.src="//connect.facebook.net/en_US/sdk.js",c.parentNode.insertBefore(o,c))}(document,
            "script","facebook-jssdk");`}}/>
          <div id="content" dangerouslySetInnerHTML={{__html: content}}/>
          <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} charSet="UTF-8"/>
          <script src={assets.javascript.main} charSet="UTF-8"/>
          <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5888396ac783d21a"></script> 
        </body>
      </html>
    );
  }
}
