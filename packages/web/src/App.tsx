import { useEffect } from "react";
import { useBooksQuery } from "./__generated__/graphql.js";

function App() {
    const { data, loading, error } = useBooksQuery({
        variables: {},
    });

    useEffect(() => {
        fetch("http://localhost:5555")
            .then((res) => res.text())
            .then((text) => console.log(text))
            .catch((err) => console.log(err));
    }, []);

    if (loading) {
        return <div>loading...</div>;
    }

    if (!loading && !data) {
        return <div>React App</div>;
    }

    return (
        <div>
            {data?.books?.map((book) => (
                <div key={book?.title}>{book?.title}</div>
            ))}
        </div>
    );
}

export default App;
