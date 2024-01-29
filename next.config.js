/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",

            },{
                protocol: "https",
                hostname: "s3.us-west-2.amazonaws.com",
            },{
                protocol: "https",
                hostname: "images.unsplash.com",
            },
        ]
}};

export default config;
