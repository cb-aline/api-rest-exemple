//A P I - R E S T 
//importa a dependência
const express = require('express')
const StatusCodes = require('http-status-codes')
//criando o servidor (com o nome 'app') que chama a função express
const app = express();
//Qual porta o express será disponibilizado
/*
Para uma aplicação local, definir a portada 
const PORT = 3000; //pode ser outra, ex: 80
*/
//Para usar a API em nuvem usar uma variável de ambiente ou default
const PORT = process.env.PORT || 3000
//Na plataforma HEROKU derá o process.env.PORT
//a máquina local usará 3000 (ou o que for definido)

//define que todos os objetos usado são do formado .json
app.use(express.json());

//variável (array) de usuários
let users = [
    { id: 1, name: 'Aline Cesar', age: 29},
    { id: 2, name: 'Rafa C.B.', age: 18},
    { id: 3, name: 'Rosana Sales', age: 54},
]

//escutar a porta (reconhecer)
//terá um callback
app.listen(PORT, () => {
    //mensagem no terminal
    console.log(`Servidor rodando em http://localhost:${PORT}`)
});

            // G E T

//para funcionar no navegador usar o GET /
//callback com com parâmetros
app.get('/',(request, response) => {
    //retorna na página um código HTML
    return response.send('<h1>Trabalhando com servidor express.</h1>');
});

//pegar lista de usuários (variável criada) [coleção]
app.get('/users', (request, response) =>{
    //retorna a lista na página
    return response.send(users);
});
//para visualisar digita-se o /users na barra de endereço logo após a url raiz
//o firefox reconhece que é json 
//existem extenções para modificar o tipo da visualização

//pegar um usuário específico [recurso]
app.get('/users/:userId', (request, response) => {
    //guarda a requisição do valor digitado como id no endereço
    const userId = request.params.userId;
    //procura um valor correspondente entre o id digitado e o primeiro id existente na coleção
    const user = users.find(user => {
        //faz comparação entre os valores
        //o valor digitado que era string é transformado em number
        //retorna o valor 
        return (user.id === Number(userId));
    });
    //retorna o usuário na página
    return response.send(user);
});


            // P O S T  

//Adicionar um novo usuário
//callback com parametro
app.post('/users', (request, response) => {
    //recebe um novo usuário pelo corpo da requisição
    //o formato é definido pelo app.use
    const newUser = request.body;
    //adiciona o novo usuário no array
    users.push(newUser);
    //retorna o status (criado) e novo usuário
    return response.status(StatusCodes.CREATED).send(newUser);
});
//POST não pode ser visualizado pelo navegador
//é necessário ferramentas externas
//Thunder Client (VSCode mais recente)
//Postman (online)
// Insomnia
//Reqbin (online - chrome)

            //  P U T 
//Atualizar um usuário (item)
app.put('/users/:userId', (request, response) => {
    //pega o id digitado na url
    const userId = request.params.userId;
    //pega a modificação do elemento (.json) do body
    const updatedUser = request.body;

    //modificar a lista - manipula com o map
    users = users.map(user => {
        //atualiza a lista e retorna um novo usuário
        //Se o id digitado (trasnformado em número) for igual ao id existente na lista
        if(Number(userId) === user.id){
            //retorna o novo usuário
            return updatedUser;
        }
        //se não, retorna o user já existent da lista
        return user;
    });
    //retorna o novo usuário no response
    return response.send(updatedUser);
});


            // D E L E T E
//Deletar um item
//pegar um usuário específico [recurso]
app.delete('/users/:userId', (request, response) => {
    //guarda a requisição do valor digitado como id no endereço
    const userId = request.params.userId;
    //modifica a lista SEM o elemento DELETADO (usando filter)
    users = users.filter((user) => user.id !== Number(userId));
    //fitra os elementos diferentes do id digitado
    //para a url com o id do item deletado
    //retorna o status 204(sem conteúdo)
    return response.status(StatusCodes.NO_CONTENT).send();
});


//Importante: após o uso do ArrowFunction (=>) se usar chaves {} é esperado um retorno (return)