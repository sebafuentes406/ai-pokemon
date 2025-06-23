import { Assistant } from '../components/Assistant';
import { assistants } from '../data/Assistants';
import { useNavigate, Link } from 'react-router';

export default function AssistantsPage() {
    const navigate = useNavigate();

    const llamarApiYNavegar = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon/1/');
            const data = await response.json();
            let prompt = 'Desde ahora eres un pokemon y tus tipos son: ';
            prompt += data.types.map(item => item.type.name).join(', ');
            prompt += ' responde solo esa información y no inventes nada más.';
            console.log('Redirigiendo a example-result con el prompt: ', prompt);
            navigate('/example-result', { state: { 'prompt': prompt } });
        } catch (error) {
            console.error('Error al consumir la API:', error);
        }
    };

    return (
        <div className="container py-5">
            <div className='mb-4 d-flex justify-content-center gap-3'>
                <Link
                    to="/pokemones"
                    className="btn btn-success"
                >
                    Ir a la Pokédex
                </Link>
                {/* ---------------------------------- */}
            </div>
            <h1 className="text-center mb-5 fw-bold display-6">¿Con quien te gustaria hablar?😘</h1>
            <div className="row justify-content-center">
                {assistants.map((assistant) => (
                    <Assistant
                        key={assistant.id}
                        id={assistant.id}
                        name={assistant.name}
                        category={assistant.category}
                        image={assistant.image}
                        description={assistant.description}
                    />
                ))}
                <div className="d-flex justify-content-center mt-4 small">
                    <a className="text-muted" href="https://www.flaticon.es/iconos-gratis/avatar-de-hombre" target="__blank" title="avatars"></a>
                </div>
            </div>
        </div>
    );
}