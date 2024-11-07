

export interface Room{
    conversationId: string;
    sender: string;
    receiver: string;
    receiverName: string;
    sendDate:Date;
    seen:boolean;
}