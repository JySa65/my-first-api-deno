import { Application } from 'https://deno.land/x/oak/mod.ts'

import router from './router.ts'

const app: Application = new Application()

app.use(router.routes())
app.use(router.allowedMethods())

const port: number = 3000

console.log("Sever run on port", port)
await app.listen({ port })