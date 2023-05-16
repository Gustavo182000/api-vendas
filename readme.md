# API VENDAS

### Dependências utilizadas

``npm install typescript ts-node-dev @types/node tsconfig-paths -D``

```
typescript
@types/node => fornece definições de tipo precisas e abrangentes para o ambiente de tempo de execução do Node.js
ts-node-dev => compila em tempo real apenas durante o desenvolvimento
tsconfig-paths => para a configuração de caminhos personalizados
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
eslint @typescript-eslint/parser e @typescript-eslint/eslint-plugin => utilizar o eslint com typescript.
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

