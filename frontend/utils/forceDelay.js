export default async function forceDelay() {

    if (process.env.NODE_ENV === "development") {
        await new Promise(resolve => setTimeout(resolve, 0));
    }
}