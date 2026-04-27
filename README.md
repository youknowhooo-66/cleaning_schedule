# SchedulePro - Gestão Inteligente de Agendamentos 🧹✨

Bem-vindo ao repositório do **SchedulePro**, uma plataforma completa e moderna desenvolvida com foco em SaaS corporativo para gestão de agendamentos de serviços (como limpezas residenciais e comerciais). O sistema conta com painéis intuitivos, autenticação de usuários, separação de papéis (Admin/Usuário) e uma identidade visual premium.

## 🚀 Tecnologias Utilizadas

O projeto é dividido em duas partes principais: **Frontend** e **Backend**, construídos com tecnologias modernas e eficientes.

### Frontend
- **React.js** com **Vite** (alta performance e build rápido)
- **Tailwind CSS** para estilização rápida e responsiva
- **Lucide-React** para ícones limpos e consistentes
- **React Router DOM** para navegação e proteção de rotas
- **Axios** para consumo da API
- **React Toastify** para feedback visual ao usuário
- **Tipografia:** *Plus Jakarta Sans* (visual clean e corporativo)

### Backend
- **Node.js** com **Express**
- **Prisma ORM** para modelagem e interação com o banco de dados
- **PostgreSQL** como banco de dados relacional
- **CORS** devidamente configurado para ambientes de desenvolvimento

---

## ⚙️ Principais Funcionalidades

1. **Autenticação e Autorização:**
   - Login e Cadastro de novos membros.
   - Controle de acesso baseado em Roles (`ADMIN` e `USER`).
   - Rotas protegidas no frontend: apenas administradores podem visualizar e editar informações de Equipe e Profissionais.

2. **Gestão de Agendamentos:**
   - Criação de novos agendamentos definindo tipo de serviço (Residencial ou Comercial).
   - Visualização em lista dos serviços agendados com possibilidade de filtragem e edição.
   - Dashboard com métricas atualizadas dinamicamente.

3. **Gestão de Equipes (Admin):**
   - Criação, edição e exclusão de Profissionais (Cleaners).
   - Gestão de membros da equipe (Usuários internos).

4. **Identidade Visual Premium:**
   - Paleta de cores exclusiva (`brand` para azul marinho elegante e `accent` para laranja vibrante).
   - Componentes com efeito "glassmorphism", cantos arredondados, sombras suaves e micro-interações para uma experiência fluida.

---

## 🛠️ Como Executar o Projeto Localmente

Siga os passos abaixo para rodar o projeto na sua máquina.

### Pré-requisitos
- [Node.js](https://nodejs.org/en/) instalado (versão 18+ recomendada)
- [PostgreSQL](https://www.postgresql.org/) rodando localmente (ou um banco na nuvem)

### Passo 1: Configurando o Backend

1. Navegue até a pasta do backend:
   ```bash
   cd back
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie um arquivo `.env` na raiz da pasta `back` e configure sua URL do banco de dados (exemplo para Prisma):
   ```env
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/cleaning_schedule?schema=public"
   ```
4. Execute as migrations para criar as tabelas no banco de dados:
   ```bash
   npx prisma migrate dev
   ```
5. Inicie o servidor:
   ```bash
   npm run dev
   ```
   *(O servidor rodará na porta 5001 por padrão)*

### Passo 2: Configurando o Frontend

1. Abra um novo terminal e navegue até a pasta do frontend:
   ```bash
   cd front
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   *(A aplicação estará acessível em http://localhost:5173 ou 5174)*

---

## 🐳 Como Executar com Docker (Recomendado)

Para facilitar o ambiente de desenvolvimento e evitar configurações manuais, o projeto conta com suporte nativo ao **Docker** e **Docker Compose**. Com apenas um comando, você sobe o Banco de Dados, o Backend e o Frontend simultaneamente.

### Pré-requisitos
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) instalados na sua máquina.

### Executando o Projeto

1. Na raiz do projeto (onde está o arquivo `docker-compose.yml`), execute o comando:
   ```bash
   docker-compose up -d --build
   ```

2. Aguarde alguns instantes enquanto as imagens são construídas e os contêineres são iniciados. O Docker cuidará de criar o banco de dados PostgreSQL, instalar as dependências e iniciar os servidores.

3. O backend precisa aplicar as migrations (tabelas) no banco de dados. Para isso, rode este comando em um novo terminal:
   ```bash
   docker exec -it schedule_backend npx prisma migrate deploy
   ```

4. **Acesse as aplicações:**
   - **Frontend:** [http://localhost:5173](http://localhost:5173)
   - **Backend API:** [http://localhost:5001](http://localhost:5001)

Para parar e remover os contêineres, basta rodar:
```bash
docker-compose down
```

---

## 🎨 Estrutura de Cores (Design System)

O frontend foi desenhado para fugir dos templates genéricos, utilizando as seguintes configurações no `tailwind.config.js`:

- **Brand:** Tons que variam do `#f4f6fc` ao `#141c37`, passando por um "Deep Navy" (`#2a4898`). Usado em textos, bordas e fundos estruturais.
- **Accent:** Tons que variam do `#fff5f0` ao `#440d06`, com destaque vibrante em `#fe571c`. Utilizado para chamar a atenção do usuário em botões primários e detalhes visuais.

---

Feito com dedicação para uma experiência de usuário excepcional! ✨
