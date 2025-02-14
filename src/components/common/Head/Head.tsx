import { VFC } from 'react'

import { SEO } from '../SEO'

export const Head: VFC = () => {
  return (
    <SEO>
      <meta
        key="viewport"
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
      <meta name="theme-color" content="#000000" />

      <link rel="apple-touch-icon" href="/assets/juice_logo-ol.png" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap"
        rel="stylesheet"
      />

      <script
        async
        src="https://www.desmos.com/api/v1.6/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6"
      ></script>
      <script
        src="https://learned-hearty.juicebox.money/script.js"
        data-site="ERYRRJSV"
        defer
      ></script>
    </SEO>
  )
}
