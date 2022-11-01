import { useEffect } from "react";

function App() {
    useEffect(() => {
        fetch("http://localhost:5555")
            .then((res) => res.text())
            .then((text) => console.log(text))
            .catch((err) => console.log(err));
    }, []);

    return <div>React App</div>;
}

export default App;
