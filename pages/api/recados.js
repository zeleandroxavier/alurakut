import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequest(request, response){
    if(request.method === 'POST') {
        const TOKEN = '7df1b11e1e6fffd885a7e7502b6935';
        const client = new SiteClient(TOKEN);

        //Validar os dados, antes de sair cadastrando
        const registroCriado = await client.items.create({
            itemType: '977467', //ID do Model de "Recado" criado pelo Dato
            ...request.body,
        })

        console.log(registroCriado);

        response.json({
            dados: "Algum dado qualquer",
            registroCriado: registroCriado,
        })

        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem'
    })

}