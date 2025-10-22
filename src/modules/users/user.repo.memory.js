let users = [] 

export const makeUserRepoMemory = () => {
    const create = async ({ name, email, passwordHash }) => {
        const id = users.length + 1
        const user = { id, name, email, passwordHash }
        user.push(user)

        return user
    }
        
    const findByEmail = async (email) => {
        return user.find(u => u.email === email) ?? null
    }

    return { create, findByEmail }
}