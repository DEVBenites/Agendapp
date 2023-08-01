import bcrypt from 'bcrypt';
import prisma from '../client';
import { ApiMethod } from '../interfaces/api';
export const GET: ApiMethod = {

    "/": async (req, res) => {

        const users = await prisma.users.findMany({});

        return res.status(200).json(users);

    },

    "/:id": async (req, res) => {

        const { id } = req.params;

        const finded = await prisma.users.findUnique({ where: { id } });

        return res.status(200).json(finded);

    }

}


export const PUT: ApiMethod = {

    "/:id": async (req, res) => {

        const { params: { id }, body } = req;

        const updated = await prisma.users.update({ data: body, where: { id } });

        return res.status(200).json(updated);

    }

}


export const POST: ApiMethod = {

    "/": async (req, res) => {

        const { body: { password, ...body } } = req;

        const encrypted = await bcrypt.hash(password, 10)

        const created = await prisma.users.create({ data: { password: encrypted, ...body } });

        return res.status(200).json(created);

    }

}


export const DELETE: ApiMethod = {

    "/:id": async (req, res) => {

        const { params: { id } } = req;

        const deleted = await prisma.users.delete({ where: { id } });

        return res.status(200).json(deleted);

    }

}
