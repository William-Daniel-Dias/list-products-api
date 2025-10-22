import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import { makeUserRepoMemory } from "./user.repo.memory.js"
import { HttpError } from "../../utils/httpError.js"
import { env } from "../../config/env.js"

export const makeUserRepoMemory = () => {
    const repo = makeUserRepoMemory()

    const register = async ({ name, email, password }) => {
        const exists = await repo.findByEmail (email)

        if(exists) {
           throw new HttpError ("Email already in use", 409, "EMAIL_TAKEN")
        }
 
        const passwordHash = await bcrypt.hash(password, 10) 

        return repo.create({ name, email, passwordHash})

    }

    const login = async ({ email, password }) => {
        const user = await repo.findByEmail(email)

    if (!user) {
        throw new HttpError("User not found", 404, "USER_NOT_FOUND")
    }

    const ok = await bcrypt.compare(password, user.password)

    if (!ok) {
        throw new HttpError("Invalid credentials", 401, "INVALID_CREDENTIALS")
    }
    
    const accesstoken = jwt.sign({}, env.jwtSecret, {
        subject: String(user.id),
        expiresIn: env.jwrExpiresIn
    })

    return { accesstoken }
    }

    return { register, login }
}


