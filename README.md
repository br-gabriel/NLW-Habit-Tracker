# NLW-Habit-Tracker
<p align="center">
   <img src="Habits-desktop.png" width="100%"/>
</p>

<p align="center">
  <img src="Habits-mobile.gif" width="350px"/>
</p>

## Sobre o projeto
Aplicação completa desenvolvida durante o primeiro NLW da Rocketseat de 2023, trata-se de um sistema completo (servidor, web e mobile) de um *habit tracker*.

## Tecnologias
<b>Server:</b> typescript, fastify, prisma, dayjs, zod

<b>Web:</b> vite, typescript, radix ui, axios, clsx, dayjs, tailwind css, phosphor react

<b>Mobile:</b> expo, axios, typescript, clsx, dayjs, nativewind css, react native svg, react native reanimated

## Como rodar o projeto
### Server
Para que aplicação web e/ou mobile funcione corretamente é necessário deixar o servidor rodando em paralelo.



1 - Instalar todas as dependências
```
npm install
```
ou
```
yarn
```

2 - Criar o banco de dados
```
npx prisma migrate dev
```

2.1 - Dados fictícios
Caso queira ter alguns dados fictícios para testar a aplicação, rode o seguinte comando no cmd: `npx prisma db seed`

3 - Rodar o servidor
```
npm run dev
```
ou 
```
yarn dev
```

### Web
1 - ir em `web/src/lib/axios.ts` e colocar o ip da máquina local. ex: `'http://000.000.0.00:3333'` como parâmetro do `baseURL`

2 - Instalar todas as dependências
```
npm install
```
ou
```
yarn
```

3 - Rodar a aplicação
```
npm run dev
```
ou 
```
yarn dev
```

### Mobile
1 - Instalar o aplicativo do 'expo' no smartphone ou baixar o emulador do android studio para testar a aplicação.

2 - Ir em `mobile/src/lib/axios.ts` e colocar o ip da máquina local. ex: `'http://000.000.0.00:3333'` como parâmetro do `baseURL`

3 - Instalar todas as dependências
```
npm install
```
ou
```
yarn
```

4 - Rodar a aplicação
```
npx expo start
```
5 - Selecionar o ambiente que a aplicação será executada (app do expo ou emulador).
