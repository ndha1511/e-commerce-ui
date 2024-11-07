import { ReactNode, useEffect, useState } from "react";
import { useCheckLoginQuery } from "./services/auth.service";
import { connect, isConnected, stompClient } from "./websocket/websocket-config";
import { Message } from "stompjs";

const App = ({ children }: { children: ReactNode }) => {
    const {data, isSuccess} = useCheckLoginQuery();
    const [connectFinish, setConnectFinish] = useState<boolean>(false);

    useEffect(() => {
        if(isSuccess) {
            if(data.data) {
                connect(onConnected, onError);
            } else {
                setConnectFinish(true);
            }
        } else {
            setConnectFinish(true);
        }
    }, [isSuccess]);

    const onConnected = () => {
        console.log("Connected to websocket server");
        if (isConnected() && stompClient) {
            stompClient.subscribe("/user/" + data?.data?.email + "/queue/notifications", onMessageReceived);
        }
        setConnectFinish(true);
    }

    const onMessageReceived = (message: Message) => {
        const messageResponse = JSON.parse(message.body);
        console.log(messageResponse);
    }

    const onError = () => {
        console.log("Error connecting to websocket server");
    }

    return connectFinish ? children : <></>;
}

export default App;