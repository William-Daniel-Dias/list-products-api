import { createApp } from "./app.js"

const boodstrap = async () => {
    const app = createApp()

    app.listen(3333, () => console.log(`HTTP on : $ ${3333}`))
}

await boodstrap()