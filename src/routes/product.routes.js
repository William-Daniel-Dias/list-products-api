import { Router } from "express"
import { makeProductController } from "../modules/products/product.controller.js"
import { ensureAuth } from "../middlewares/auth.js"
import { validate } from "../middlewares/validate.js"
import { createProductSchema, listProductsQuery, patchProductSchema, productIdParams } from "../modules/products/products.schemas.js"

export const ProductRouter = () => {
    const r = Router()
    const ctrl = makeProductController()

    r.use(ensureAuth)

    r.post("/", validate({body: createProductSchema }), ctrl.create)
    r.get("/", validate({query: listProductsQuery}), ctrl.list)
    r.get("/:id", validate({params: productIdParams}), ctrl.get)
    r.patch("/:id", validate({
        parms: productIdParams,
        body: patchProductSchema
    }), ctrl.patch)
    r.delete("/:id", validate({ parms: productIdParams}), ctrl.remove)

    return r
}