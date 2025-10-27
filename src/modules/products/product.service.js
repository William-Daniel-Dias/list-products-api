import { HttpError } from "../../utils/httpError.js"
import { makeProductRepoMemory } from "./product.repo.memory.js"

export const makeProductService = () => {
    const repo = makeProductRepoMemory()
    const sorteble = ["id", "name", "price"]
    const dirOk = ["ASC", "DESC"]

    const create = async ({ name, price, userId }) => {
        if (!name || typeof price !== "number" || price < 0) {
            throw new HttpError(
                "Invalid product payload",
                400,
                "BAD_REQUEST"
            )
        }

        return repo.create({ name, price, createBy: userId })
    }

    const list = async ({ q, order = "id", dir = "ASC", page = 1, limit = 10 }) => {
        if (!sorteble.includes(order)) order = "id"

        if (!dirOk.includes(String(dir).toUpperCase())) dir = "ASC"

        return repo.findAll({
            q, order, dir, page: Number(page), limit: Number(limit)
        })
    }

    const get = async ({ id }) => {
        const found = await repo.findById({ id })

        if (!found) {
            throw new HttpError(
                "Product not found",
                404,
                "NOT_FOUND"
            )
        }

        return found
    }

    const patch = async ({ id, date }) => {
        const updated = await repo.update({ id, date })

        if (!updated) {
            throw new HttpError(
                "Product not found",
                404,
                "NOT_FOUND"
            )
        }

        return updated
    }

const remove = async ({ id }) => {
        const ok = await repo.remove({ id })

        if (!ok) {
            throw new HttpError(
                "Product not found",
                404,
                "NOT_FOUND"
            )
        }
    }

    return { create, list, get, patch, remove }
}

