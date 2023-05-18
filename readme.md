# API VENDAS

### Dependências utilizadas

`npm install typescript ts-node-dev @types/node tsconfig-paths -D`

```
typescript
@types/node => fornece definições de tipo precisas e abrangentes para o ambiente de tempo de execução do Node.js
ts-node-dev => compila em tempo real apenas durante o desenvolvimento
tsconfig-paths => para a configuração de caminhos personalizados
eslint @typescript-eslint/parser  @typescript-eslint/eslint-plugin => utilizar o eslint com typescript.
prettier => formatador de código para usar em conjunto com o eslint
eslint-config-prettier@6.15.0 eslint-plugin-prettier@3.2.0 => para usar o Prettier com Eslint
typeorm => ORM para o BD
reflect-metadata => exigido para trabalhar com o typeorm e ts
pg => BD Postgre
```

#### Criar o arquivo "tsconfig.json" que conterá as configurações do Typescript

```
tsc --init --rootDir src --outDir build --esModuleInterop --resolveJsonModule --lib es6 --module commonjs --allowJs true --noImplicitAny true
```

```
rootDir => É aqui que o TypeScript procura nosso código.
outDir => Onde o TypeScript coloca nosso código compilado.
esModuleInterop => Se estiver usando commonjs como sistema de módulo (recomendado para aplicativos Node), então esse parâmetro deve ser definido como true.
resolveJsonModule: Se usarmos JSON neste projeto, esta opção permite que o TypeScript o use.
lib => Esta opção adiciona tipos de ambiente ao nosso projeto, permitindo-nos contar com recursos de diferentes versões do Ecmascript, bibliotecas de teste e até mesmo a API DOM do navegador. Usaremos recursos es6 da linguagem.
module => commonjs é o sistema de módulo Node padrão.
allowJs => Se você estiver convertendo um projeto JavaScript antigo em TypeScript, esta opção permitirá que você inclua arquivos .js no projeto.
noImplicitAny => Em arquivos TypeScript, não permita que um tipo seja especificado inexplicitamente. Cada tipo precisa ter um tipo específico ou ser declarado explicitamente any.
```

#### Gerar Build

`tsc`

### Script dev usando ts-node-dev

`"dev": "ts-node-dev --inspect --transpile-only --ignore-watch node_modules src/server.ts"`

### Comando de Start

`npm run dev`

### Extensões Usadas

```
vscode-icons
Prettier - Code formatter
Material Icon Theme
Markdown Preview Enhanced => previsualizar readme.md ctrl + k v
ESLint
ENV
EditorConfig for VS Code
Docker
```

### Prettier parametros

```
semi: definido como true, significa que o Prettier adicionará ponto-e-vírgulas quando necessário.

trailingComma: definido como all, significa que o Prettier colocará vírgulas no final dos objetos.

singleQuote: definido como true, significa que o Prettier usará automaticamente aspas simples em vez de aspas duplas.

printWidth: definido como 80, especifica que a impressora quebrará todas as linhas que excederem 80 caracteres.

É fundamental que extensão Prettier – Code Formatter esteja instalada no VSCode, pois permitirá a formatação automática do código ao salvar o arquivo.
```

### eslint-config-prettier

```
eslint-config-prettier: Desativa todas as regras ESLint que têm o potencial de interferir com as regras do Prettier.

eslint-plugin-prettier: Transforma regras do Prettier em regras ESLint.

Lembre-se de ajustar o arquivo .eslintrc

```

### Estrutura do projeto

```
config - configurações de bibliotecas externas, como por exemplo, autenticação, upload, email, etc.

modules - abrangem as áreas de conhecimento da aplicação, diretamente relacionados com as regras de negócios. A princípio criaremos os seguintes módulos na aplicação: customers, products, orders e users.

shared - módulos de uso geral compartilhados com mais de um módulo da aplicação, como por exemplo, o arquivo server.ts, o arquivo principal de rotas, conexão com banco de dados, etc.

services - estarão dentro de cada módulo da aplicação e serão responsáveis por todas as regras que a aplicação precisa atender, como por exemplo:

A senha deve ser armazenada com criptografia;
Não pode haver mais de um produto com o mesmo nome;
Não pode haver um mesmo email sendo usado por mais de um usuário;
```

### Migrations

```
criar migration => npm run typeorm migration:create -n src/shared/typeorm/migrations/{nameMigration}
executar migration => npm run typeorm -- -d ./src/shared/typeorm/index.ts  migration:run
```
