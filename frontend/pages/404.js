import Head from "next/head";
import React from "react";

export default function NotFound() {
    return (
        <div className="grid h-[80vh] place-items-center">
            <Head>
                <title>Not Found | Post It!</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <h1 className={'font-brand text-primary text-[35px]'}>Opss... Page Not Found</h1>
        </div>
    )
}