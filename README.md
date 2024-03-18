# <p align="center">Projeto React Testing Library</p>

## Contexto

Esse projeto é uma aplicação já pronta disponibilizada pela [Trybe](https://betrybe.com), a Pokédex, objetivo é utilizar `React-Testing-Library` e `Vitest` para escrever os testes. Sendo todos os testes passando em 100% dos casos de uso/mutações criados pelo `Stryker Mutator`.

## Rode o projeto localmente

> ⚠️ É preciso ter o [Node](https://nodejs.org/en) instalado em sua máquina.

Primeiro, instale as dependências com:

```JSON
npm install
```

Esse projeto não tem front-end, apenas os testes `Vitest`.

Rode todos os testes com:

```JSON
npm test
```
Um teste por vez, acrescentando o nome do test/spec:

```JSON
npm test numbers
```

### cobertura vitest

![alt text](coverage-vitest.png)

### cobertura stryker

![alt text](coverage-stryker.png.png)

## Competências desenvolvidas

- Capacidade para usar seletores da `React-Testing-Library` em testes automatizados.
- Capacidade para testar usando `vitest`.
- Capacidade de simular eventos.
- Capacidade de testar fluxos lógicos assíncronos.
