import { createApp } from "./app.js"
import { env } from "./config/env.js"

const boodstrap = async () => {
    const app = createApp()

    app.listen(env.port, () => console.log(`HTTP on : $ ${env.port}`))
}

await boodstrap()