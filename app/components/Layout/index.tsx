import React, {
  PropsWithChildren,
  ReactNodeArray,
  ReactElement,
  ReactNode,
} from "react";

export interface LayoutProps extends PropsWithChildren<any> {
  children: ReactNode | null;
  pageDataString: string | null;
  title: string;
  pageId?: string;
}

const Layout = ({
  title,
  children = null,
  pageDataString = null,
  pageId = "spa",
}: LayoutProps): ReactElement => {
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#fafafa" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600;700;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
          rel="stylesheet"
        />
        <link type="text/css" rel="stylesheet" href={`/${pageId}.css`} />
      </head>
      <body>
        {pageDataString && (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__PRELOADED_STATE__ =  ${pageDataString};`,
            }}
          />
        )}
        <div
          dangerouslySetInnerHTML={{
            __html: `
                      <!--[if IE]>
                          <p class="browserupgrade">
                              You are using an <strong>outdated</strong> browser.
                              Please <a href="https://browsehappy.com/">upgrade your browser</a> to improve your experience and security.
                          </p>
                      <![endif]-->`,
          }}
        />
        <main id="root-app" className="main-container">
          {children}
        </main>
        <script src="/vendors.js" />
        <script src={`/${pageId}.js`} />
      </body>
    </>
  );
};

export default Layout;
