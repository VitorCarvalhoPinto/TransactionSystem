# Como rodar o projeto

### Instale as dependências:
```sh
yarn install
```

### Crie o banco de dados:
```sh
yarn sequelize db:create
```

### Execute as migrações:
```sh
yarn sequelize db:migrate
```

### (Opcional) Para excluir o banco de dados:
```sh
yarn sequelize db:drop
```

### Por fim:
```sh
yarn dev
```

##### Necessário MySql instalado na máquina e rodando.
