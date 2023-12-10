export type messageType = {
    text: string|JSX.Element;
    id: string;
    createdAt: Date|string;
    isUserMessage: boolean;
}