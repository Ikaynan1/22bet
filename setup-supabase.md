# 🗄️ **Configuração do Supabase**

## **PASSO 1: Criar Projeto no Supabase**

1. **Acesse**: [supabase.com](https://supabase.com)
2. **Clique "Start your project"**
3. **Faça login** com GitHub
4. **Clique "New project"**
5. **Preencha**:
   - Name: `affiglobal-panel`
   - Database Password: `sua-senha-forte`
   - Region: `South America (São Paulo)`
6. **Clique "Create new project"**

## **PASSO 2: Obter Chaves da API**

1. **Vá em "Settings" → "API"**
2. **Copie**:
   - Project URL: `https://seu-projeto.supabase.co`
   - anon/public key: `sua-chave-anonima`

## **PASSO 3: Criar Tabelas**

**Vá em "Table Editor" e execute os SQLs:**

sql
-- Tabela de usuários
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  password VARCHAR(255) NOT NULL,
  type VARCHAR(20) DEFAULT 'affiliate',
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de métricas dos afiliados
CREATE TABLE affiliate_metrics (
  id SERIAL PRIMARY KEY,
  affiliate_id INTEGER REFERENCES users(id),
  date DATE NOT NULL,
  registrations INTEGER DEFAULT 0,
  ftds INTEGER DEFAULT 0,
  deposits DECIMAL(10,2) DEFAULT 0,
  commissions DECIMAL(10,2) DEFAULT 0,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de solicitações de pagamento
CREATE TABLE payment_requests (
  id SERIAL PRIMARY KEY,
  affiliate_id INTEGER REFERENCES users(id),
  amount DECIMAL(10,2) NOT NULL,
  wallet_address VARCHAR(255) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  processed_at TIMESTAMP
);


## **PASSO 4: Configurar no Código**

**Edite `utils/supabase.js`:**

javascript
const SUPABASE_URL = 'https://seu-projeto.supabase.co';
const SUPABASE_ANON_KEY = 'sua-chave-anonima-aqui';


## **PASSO 5: Testar Conexão**

1. **Registre um usuário**
2. **Verifique na aba "Table Editor"**
3. **Dados devem aparecer na tabela `users`**

---

## 🔐 **Código Secreto Admin**

**Para registrar como admin use o código:**

ADMIN2024#AFFIGLOBAL


**⚠️ IMPORTANTE**: Mude este código no arquivo `components/Register.js` linha 15!
