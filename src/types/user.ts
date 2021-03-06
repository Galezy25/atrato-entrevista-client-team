import { CardInfo } from "./cardInfo";

export interface User {
    id: string,
    email: string,
    phone: string,
    firstName: string,
    middleName: string,
    surnames: string,
    birthday: string,
    status: UserStatus,
    analyst: string,
    cardInfo: CardInfo
}


export enum UserStatus{
    PENDING = 1,
    IN_PROCESS,
    COMPLETED
}

export const STATUS_LABEL = {
    [UserStatus.PENDING]: 'PENDIENTE',
    [UserStatus.IN_PROCESS]: 'EN PROCESO',
    [UserStatus.COMPLETED]: 'COMPLETADO'
}