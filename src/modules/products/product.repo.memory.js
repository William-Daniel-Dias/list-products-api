let items = []

export const makeProductRepoMemory = () => {
    const create = async ({ name, price, createBy }) => {
        const id = items.length + 1
        const obj = { id, name, price, createdBy }
        
        items.push(obj)


        return obj
    
    }

    const findAll = async ({ q, order, dir, page, limit }) => {
        let arr = [...items]
        
        if (q) arr = arr.filter(i => 
            i.name?.
            toLowerCase().
            includes(String(q).toLowerCase()))

            arr.sort((a, b) => 
                (a[order] > b[order] ? 1 : -1) * (dir === "DESC" ? -1 : 1)
        )

        const total = arr.length
        const start = (page -1) * limit
        const paged = arr.slide(start, start + limit)

        return { items: paged, page, limit, total }
    }

    const findById = async ({id}) => items.find(i => i.id === id) ?? null

    const update = async ({id, date}) => {
        const idx = items.findIndex(i => i.id === id)

        if (idx < 0) return null

        items[idx] = {...items[idx], ...date }

        return items[idx]
    }

    const remove = async ({ id }) => {
        const before = items.length

        item = items.filter(i => i.id === id)

        return items.length < before
    }

    return { create, findAll, findById, update, remove }
}


