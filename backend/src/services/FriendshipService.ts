import { AppDataSource } from "../data-source"
import { Friendship } from "../entities/Friendship"


export const areFriends = async (a: number, b: number) => {

    const count = await AppDataSource.getRepository(Friendship).count({
        where: [
            {sender: {id:a}, receiver: {id:b}, status:"accepted"},
            {sender: {id:b}, receiver: {id:a}, status:"accepted"}
        ],
    });
    return count > 0;
}