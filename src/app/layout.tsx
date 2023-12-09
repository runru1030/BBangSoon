import React from "react";
import "src/styles/globals.css";
import GlobalProvider from "./GlobalProvider";
import ReactQueryProvider from "./ReactQueryProvider";
import RootStyleRegistry from "./RootStyleRegistry";
import Nav from "@components/Nav";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="shortcut icon" href="/favicon.png" />
        <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
        <script
          type="text/javascript"
          src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}`}
        ></script>
        <title>BBangSoon</title>
      </head>
      <body>
        <ReactQueryProvider>
          <RootStyleRegistry>
            <GlobalProvider>
              <div className="min-h-screen flex flex-col">
                <div className="flex-1">{children}</div>
                <Nav />
              </div>
            </GlobalProvider>
          </RootStyleRegistry>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
