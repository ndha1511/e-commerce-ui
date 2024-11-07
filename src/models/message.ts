import { BaseModel } from "./base-model";

export enum MessageType{
    TEXT,
    IMAGE,
    VIDEO
}

export interface Message extends BaseModel{
    message: string;
    sender: string;
    receiver: string;
    content: string;
    sendDate: Date;
    messageType: MessageType;
    roomId: string;
}