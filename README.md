# CRUD(Login)

Foi desenvolvida um CRUD(create, read, update e delete) para login de usuários que após a autenticação possa ser adicionados, alterados e deletados notas de filmes, com classificação, descrição e tags.

## Tecnologias utilizadas

- [express](https://expressjs.com/) para facilitar o desenvolvimento backend.
- [prisma](https://www.prisma.io/) é um ORM para trabalhar com banco de dados de forma mais rápida.
- [typescript](https://www.typescriptlang.org/) que é um super set do javascript.
- [jsonwebtoken](https://jwt.io/) é uma maneira compacta e independente de transmitir informações com segurança entre as partes como um objeto JSON.
- [multer](https://www.npmjs.com/package/multer) é um middleware node.js para manipulação multipart/form-data, que é usado principalmente para fazer upload de arquivos.
- [bcryptjs]() Em node.js, a interface randomBytes do módulo de criptografia embutido é usada para obter números aleatórios seguros ( Utiliza-se o pacote para criptografar as senhas do usuários quando criadas).

## Instalação

Foi feita a instalação das dependências e da devDependências(que servem para rodar o projeto em desenvolvimento)

### dependencies

```bash
 npm install express jsonwebtoken multer bcryptjs
```
### devDependencies
```bash
 npm install @types/express @types/jsonwebtoken @types/multer @types/bcryptjs --save-dev
```
```typescript
npm install typescript prisma --save-dev
```

## Exemplo do arquivo package.json
```express

"keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@prisma/client": "^4.9.0",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0",
    "multer": "^1.4.5-lts.1"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.2",
    "@types/cors": "^2.8.13",
    "@types/express": "^4.17.16",
    "@types/jsonwebtoken": "^9.0.1",
    "@types/multer": "^1.4.7",
    "prisma": "^4.9.0",
    "tsx": "^3.12.2",
    "typescript": "^4.9.4"
  }
  
  ```

## Criaçao de um servidor com express

```express
import express

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

## Contribuição

Solicitações pull são bem-vindas. Para mudanças importantes, abra um problema primeiro
para discutir o que você gostaria de mudar.

Certifique-se de atualizar os testes conforme apropriado.

## License

[MIT](https://choosealicense.com/licenses/mit/)
