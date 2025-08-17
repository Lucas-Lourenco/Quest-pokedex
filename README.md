# 🐾 Quest Pokedex

Uma **Pokedex interativa** construída em React, consumindo dados da [PokeAPI](https://pokeapi.co/). Permite navegar entre uma lista de Pokémons e visualizar detalhes individuais de cada criatura além de permitir a busca por tipos específicos de pokemons.

---

## 🚀 Tecnologias
- **React**  
- **React Router**  
- **Axios**  
- **Styled Components**  
- **Context API**  
- **Jest** 

---

## 📂 Estrutura do Projeto

```
src/
├─ components/ # Componentes reutilizáveis
│ ├─ Header.jsx
│ ├─ Layout.jsx
│ ├─ PokemonCard.jsx
│ └─ SelectByType.jsx
│
├─ contextApi/ # Contextos globais
│ ├─ ThemeContext.jsx
│ └─ HomeContext.jsx
│
├─ pages/ # Páginas principais
│ ├─ Home.jsx
│ └─ PokemonDetails.jsx
│
├─ routes/ # Gerenciamento de rotas
│ └─ AppRoutes.jsx
│
├─ services/ # Serviços de API
│ └─ PokemonApi.jsx
│
├─ styles/ # Estilização global
│ └─ GlobalStyle.jsx
│
├─ tests/ # Testes unitários
│ ├─ App.test.jsx
│ ├─ AppRoutes.test.jsx
│ ├─ Header.test.jsx
│ ├─ Home.test.jsx
│ ├─ HomeContext.test.jsx
│ ├─ Layout.test.jsx
│ ├─ PokemonApi.test.jsx
│ ├─ PokemonCard.test.jsx
│ ├─ PokemonDetails.test.jsx
│ ├─ SelectByType.test.jsx
│ └─ ThemeContext.test.jsx
│
└─ App.jsx # Componente raiz

```
---

## 🔀 Rotas

| Rota                | Componente          | Descrição                           |
|--------------------|------------------|-----------------------------------|
| `/`                | Home             | Listagem de Pokémons               |
| `/pokemon/:name`   | PokemonDetails   | Detalhes do Pokémon selecionado    |

---

## 🌐 Contextos

### ThemeContext
- Gerencia tema **claro/escuro**.  
- `toggleTheme`: alterna tema global.  
- Integração com `StyledThemeProvider` para aplicar cores globais.

### HomeContext
- Preserva estado da **Home**: lista, filtros, paginação e posição do scroll.  
- Permite voltar de detalhes sem resetar a página.

---


## 🖥️ Componentes Principais

| Componente       | Função                                                                 |
|-----------------|-----------------------------------------------------------------------|
| **Header**       | Cabeçalho com título e botão de alternância de tema                  |
| **Layout**       | Wrapper que aplica tema e envolve todo o conteúdo da página          |
| **PokemonCard**  | Card de Pokémon com nome, imagem e tipo, cores dinâmicas e hover     |
| **SelectByType** | Dropdown para filtrar Pokémons por tipo, integrado com a HomeContext |

---

## 🌐 Serviço de API (PokemonApi)

- Busca lista de Pokémons paginada (10 por vez).  
- Obtém detalhes individuais de cada Pokémon.  
- Parâmetro `offset` permite **paginação ou scroll infinito**.

---

## 📝 Componente Raiz (App.jsx)

- Envolve a aplicação com **ThemeProvider** e **HomeProvider**.  
- Aplica **GlobalStyle**.  
- Utiliza **Layout** como wrapper principal.  
- Renderiza **AppRoutes** para navegação.

**Hierarquia:**
```
ThemeProvider
└─ GlobalStyle
└─ Layout
└─ HomeProvider
└─ AppRoutes

```
---

## 🧪 Testes Automatizados

- Implementados com **Jest** e **React Testing Library**.  
- Cobrem renderização de componentes, contextos e serviços de API e mais.  


---

## 🎨 Estilização

- **Styled Components** para componentes isolados e reutilizáveis.  
- **GlobalStyle** define cores, fontes e reset de estilos.  
- Layout **responsivo** para dispositivos móveis.

---

## ⚙️ Instalação e Execução

1. Clone o repositório:

```bash
git clone https://github.com/Lucas-Lourenco/Quest-pokedex.git

cd Quest-pokedex

Instale dependências:

npm install

Execute os testes:

npm test #roda uma vez os testes.

npm run watch #roda automatizado

Execute o projeto:

npm run dev

Acesse: http://localhost:5173/
```
## 🔗 Links Úteis

- [PokeAPI](https://pokeapi.co/) – API oficial de Pokémons  
- [React](https://reactjs.org/) – Biblioteca utilizada  
- [Styled Components](https://styled-components.com/) – Biblioteca de estilos


##
  📌**Desenvolvido por [Lucas]**