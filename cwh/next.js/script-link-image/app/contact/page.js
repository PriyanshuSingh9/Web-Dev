import React from 'react'
import Script from 'next/script'

const Contact = () => {

    return (
        <div>
            {/* this is the script component which is designed to handle third-party scripts (like Google Analytics, 
            Ads, or widgets)*/}
            {/* It improves performance by giving you control over when and how a script
            loads, ensuring it doesn't block the page from displaying (Layout
            blocking). */}
            {/* Loading Strategies (`strategy` prop):
            * afterInteractive (default): Loads immediately after the page
            becomes interactive (good for tags managers, analytics).
            * lazyOnload: Loads during idle time (good for low-priority scripts
            like chat widgets or social media snippets).
            * beforeInteractive: Loads before the page becomes interactive
            (rarely used, only for critical scripts like bot detection).
            * worker (experimental): Loads the script in a web worker. */}
            <Script>
                {`alert("This is the contact page")`}
            </Script>
            I am Contact
        </div>
    )
}

export default Contact

export const metadata = {
    title: "Contact Facebook",
    description: "Yaha zuck ka number to nahi hai",
};
