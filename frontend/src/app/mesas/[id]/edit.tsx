import { getMesa } from '@/app/mesas/mesas.api';
import CrearMesaForm from '@/components/ui/CrearMesaForm';

interface Props {
    params: {
        id: string;
    };
}

export default async function EditMesaPage({ params }: Props) {
    const mesa = await getMesa(params.id);

    return (
        <div className="h-screen flex justify-center items-center">
            <CrearMesaForm mesa={mesa} />
        </div>
    );
}
