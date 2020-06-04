import { Router } from 'https://deno.land/x/oak/mod.ts'

const router: Router = new Router()

import * as user from './controllers.ts'

router.get('/', user.getListUsers)
router.post('/', user.createUser)
router.get('/:id/', user.getUser)
router.put('/:id/', user.updateUser)
router.delete('/:id/', user.deleteUser)

export default router