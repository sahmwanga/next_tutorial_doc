import Document, { Head, Main, NextScript } from "next/document";
import { getUserSignedCookie, getUserScript } from "../lib/auth";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const userData = await getUserSignedCookie(ctx.req);
    return { ...initialProps, ...userData };
  }

  render() {
    const { user = {} } = this.props;

    return (
      <html lang="en-US">
        <Head>
          <link rel="manifest" href="/static/manifest.json" />

          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="application-name" content="sahmwanga" />
          <meta name="apple-mobile-web-app-title" content="sahmwanga" />
          <meta name="theme-color" content="#005b4f" />
          <meta name="msapplication-navbutton-color" content="#005b4f" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
          <meta name="content" description="sahmwanga next js application" />
          <meta name="msapplication-starturl" content="/" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />

          <link
            rel="icon"
            type="image/png"
            sizes="152x152"
            href="/static/icons/icon-512x512"
          />
          <link
            rel="apple-touch-icon"
            type="image/png"
            sizes="152x152"
            href="/static/icons/icon-512x512"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/static/icons/icon-192x192"
          />
          <link
            rel="apple-touch-icon"
            type="image/png"
            sizes="192x192"
            href="/static/icons/icon-192x192"
          />
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossorigin="anonymous"
          />
        </Head>
        <body>
          <Main />
          <script dangerouslySetInnerHTML={{ __html: getUserScript(user) }} />
          <NextScript />
        </body>
        <style global jsx>
          {`
            html,
            body {
              font-family: "Lato", sans-serif;
            }
          `}
        </style>
      </html>
    );
  }
}

export default MyDocument;
