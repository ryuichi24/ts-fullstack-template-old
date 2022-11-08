import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { AuthProvider } from "@/contexts/authContext";
import App from "./App";
import "./index.css";

// if you create http link, you must set credentials here
const httpLink = createHttpLink({
    uri: "http://localhost:5555/graphql",
    credentials: "include",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        console.log({ graphQLErrors });
    }

    if (networkError) {
        console.log({ networkError });
    }
});

// https://www.apollographql.com/docs/react/get-started
const client = new ApolloClient({
    cache: new InMemoryCache(),
    // errorLink must come first!
    link: from([errorLink, httpLink]),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <AuthProvider>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ApolloProvider>
    </AuthProvider>
);
