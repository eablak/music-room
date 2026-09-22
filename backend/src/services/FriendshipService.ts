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


export const findFriendship = async (a: number, b: number) => {

    const friendsRepo = AppDataSource.getRepository(Friendship);

    const exsist = await friendsRepo.findOne({
        where: [
            { sender: {id: a}, receiver: {id: b} },
            { sender: {id: b}, receiver: {id: a}},
        ],
    });

    return exsist;

}


export const statusFriendship = async (requestReceiver: number, requestSender: number) => {

    const friendsRepo = AppDataSource.getRepository(Friendship);

    const requestStatus = await friendsRepo.findOne({
        where: { sender: { id:requestSender }, receiver: {id:requestReceiver}, status: "pending"},
    });

    return requestStatus;


}