import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import io from 'socket.io-client'
import LoginPage from './components/Login/LoginPage';

const BACKEND_URL = 'https://localhost'

function App() {
    const [token, setToken] = useState("")
    const [socket, setSocket] = useState(null)
    //const [messages, setMessages] = useState([])


    useEffect(() => {
        if (token){
            const newSocket = io(`${BACKEND_URL}`, {
                path: "/app/test",
                transports: ["websocket"],
                withCredentials: true,
                auth: {
                    token
                }
            })
            setSocket(newSocket)

            return () => {
                newSocket.close()
            }
            // const sc = new WebSocket("wss://localhost/")
            // setSocket(sc)
        }

    }, [token])

    // useEffect(() => {
    //     if (socket){
    //         socket.on("topic/response", handleMessage)
    //     }
    // }, [socket])

    const handleSendTest = () => {
        // socket.emit("test")
    }

    // const handleMessage = msg => {
    //     console.log(msg)
    // }


    return (
        <div className="App">
            <h1>Test</h1>
            {
                !!token
                ? 
                    <div>
                        <button onClick={handleSendTest}>app/test1</button>
                    </div>
                :
                    <LoginPage loginUrl={`${BACKEND_URL}/login`} onLogon={token => setToken(token)}/>
            }
        </div>
    );
}

export default App;
