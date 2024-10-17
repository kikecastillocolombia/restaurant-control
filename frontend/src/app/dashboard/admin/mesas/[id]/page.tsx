import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getMesa } from '@/app/dashboard/admin/mesas/mesas.api';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

interface Props {
    params: {
        id: string;
    };
}

export default async function MesaDetailPage({ params }: Props) {
    const mesa = await getMesa(params.id);

    return (
        <div className="flex justify-center items-center h-screen">
            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-between">
                        Detalles de la Mesa {mesa.numero}
                        <Link className={buttonVariants()} href="/dashboard/admin/mesas">
                            Volver
                        </Link>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p>ID: {mesa.id}</p>
                    {/* Aquí puedes agregar más detalles según tus necesidades */}
                </CardContent>
            </Card>
        </div>
    );
}
