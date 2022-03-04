import styles from "./tailwind.css";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";
import NavBar from "./routes/common/NavBar";
import Footer from "./routes/common/Footer";

export const meta: MetaFunction = () => {
  return { title: "Play Rommé!" };
};

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#fe4e4d" />
        <meta name="msapplication-TileColor" content="#f9feff" />
        <meta name="theme-color" content="#ffffff" />
        <Meta />
        <Links />
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,900;1,400;1,900&display=swap');
        </style>
      </head>
      <body className="h-screen">
        <div className="min-h-full px-5 bg-black text-white flex flex-col">
          <NavBar />
          <main className="flex-1 mx-36">
            <Outlet />
          </main>
          <Footer />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
