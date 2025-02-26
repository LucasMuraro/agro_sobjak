1 - Habilitar a API do Cloud Firestore:

https://console.developers.google.com/apis/api/firestore.googleapis.com/overview

Selecione seu Projeto.
Na página da API do Firestore, clique em "Enable" (Habilitar).
Certifique-se de que você está autenticado com a conta correta que tem permissão para habilitar APIs no projeto.
Permissões no Firebase Console.

2 - Habilite o Firestore no Firebase
No Firebase Console, selecione seu projeto.
No menu à esquerda, clique em "Criação" e depois "Firestore Database".
Clique em "Criar banco de dados" e siga as instruções para habilitar o Firestore no modo de produção ou no modo de teste, dependendo das suas necessidades.

3 - Obtenha as Credenciais do Firebase Admin SDK

Instale o Firebase Admin SDK
npm install firebase-admin

No Firebase Console, vá para "Configurações do Projeto" (ícone de engrenagem no canto superior esquerdo).
Vá para a aba "Contas de Serviço".
Em "SDK Admin do Firebase", selecione "Node.js"
Clique em "Gerar nova chave privada" e baixe o arquivo JSON. (Isso conterá as credenciais necessárias para acessar o Firestore.)
Jogue esse arquivo na pasta config dentro desse projeto.

Instale o NPM
npm install

Inicie o Servidor:
node app.js
