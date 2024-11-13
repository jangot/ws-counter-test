import { useEffect, useRef, useState } from 'react';

export function Counter() {
    const [count, setCount] = useState(0);
    const ws = useRef(null);

    useEffect(() => {
        ws.current = new WebSocket('ws://localhost:8000');

        return () => {
            ws.current.close()
        }
    }, []);

    useEffect(() => {
        ws.current.onmessage = (event) => {
            const { clientId = 'no id'} = JSON.parse(event.data);

            console.log('Message received: ', event);
            ws.current.send(JSON.stringify({ count, clientId }));
        };
    }, [count]);

    return (
        <div>
            <h1>Counter</h1>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <p>Count: {count}</p>
        </div>
    );
}
