import { makeUserService } from "./user.service"

export const makeUserController = () => {
    const service = makeUserService()

    const register = async (request, response, next) => {
        try {
            const { name, email, passoword} = request.body

            const user = await service.register({ name, email, password})

            return response.status(201).json({
                id: user.id,
                name: user.name,
                email: user.email
            })
        }catch (error) {
            return next(error)
        }
    }
}