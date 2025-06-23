import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { assistants } from '../data/Assistants';
import { NavLink } from "react-router";

export default function ChatPage() {
    const params = useParams();
    const [messageHistory, setMessageHistory] = useState([]);
    useEffect(() => {
        sendMessage(assistant.prompt)
    }, []);
    const assistant = assistants.find(assistant => assistant.id === parseInt(params.assistant_id));

    if (!assistant) {
        return <div className="container py-5"><h1 className="text-center">Asistente no encontrado</h1></div>;
    }

    async function sendForm(formData) {
        const message = formData.get('message').trim();
        if (!message) return;
        sendMessage(message);
    }

    async function sendMessage(message) {
        const updatedHistory = [...messageHistory, { sender: "user", text: message }];
        try {
            const reply = await askGemini(updatedHistory);
            setMessageHistory([...updatedHistory, { sender: "model", text: reply }]);
        } catch (error) {
            console.log("Error al enviar el mensaje:", error);
            setMessageHistory([...updatedHistory, { sender: "model", text: "Lo siento, ocurrió un error al procesar tu mensaje." }]);
        }
    }

    async function askGemini(messageHistory) {
        const apiKey = "AIzaSyBG7acMiwFJzTCX2p_GcTEiYgJ2OAlu-J4";
        const content = messageHistory.map(msg => ({
            role: msg.sender === "user" ? "user" : "model",
            parts: [{ text: msg.text }]
        }));
        const body = {
            contents: content
        };
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            const error = await response.text();
            console.error("Gemini error:", error);
            throw new Error("Error en la API de Gemini");
        }
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "No se obtuvo respuesta del modelo.";
    }

    return (
        <div className="vh-100 d-flex flex-column">
            <div className="border-bottom p-3 bg-white shadow-sm">
                <div className="container d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-3">
                        <img src={assistant.image} alt={assistant.name} className="rounded-circle" style={{ width: "60px", height: "60px" }} />
                        <div>
                            <h5 className="mb-0">{assistant.name}</h5>
                            <small className="text-muted">Especialista en {assistant.category.toLowerCase()}</small>
                        </div>
                    </div>
                    <NavLink to={`/assistants`}>
                        <button className="btn btn-outline-dark btn-md">Cambiar de asistente</button>
                    </NavLink>
                </div>
            </div>
            <div className="flex-grow-1 overflow-auto bg-light py-3">
                <div className="container">
                    {messageHistory.map((msg, index) => (
                        <div key={index} className={`d-flex mb-3 ${msg.sender === "user" ? "justify-content-end" : "justify-content-start"}`}>
                            <div className={`p-3 border rounded ${msg.sender === "user" ? "bg-success bg-opacity-10 text-end" : "bg-white"}`}
                                style={{ maxWidth: "75%" }}>
                                <strong className="d-block mb-1">
                                    {msg.sender === "user" ? "Tú" : assistant.name}
                                </strong>
                                <span>{msg.text}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="border-top p-3 bg-white">
                <form className="container d-flex align-items-center gap-2" action={sendForm}>
                    <input type="text" name="message" className="form-control form-control-md" placeholder="Escribe tu mensaje..." />
                    <button type="submit" className="btn btn-dark btn-md d-flex align-items-center gap-2">
                        <span>Enviar</span>
                        <i className="bi bi-send"></i>
                    </button>
                </form>
            </div>
        </div>
    );
}