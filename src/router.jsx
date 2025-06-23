import { createBrowserRouter, Navigate } from "react-router";
import AssistantsPage from "./pages/AssistantsPage"
import ChatPage from "./pages/ChatPage"
import ErrorPage from "./pages/ErrorPage";
import PokemonPage from "./pages/PokemonPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/assistants" replace />,
    },
    {
        path: "/assistants",
        Component: AssistantsPage,
    },
    {
        path: "/chat/:assistant_id",
        Component: ChatPage,
    },
    {
        // Ruta de la Pokedex
        path: "/pokemones",
        Component: PokemonPage,
    },
    {
        path: '*',
        element: <ErrorPage />
    }
])