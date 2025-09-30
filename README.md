# Formatador de Currículo com IA

## Visão Geral do Projeto

Este projeto é uma aplicação web que utiliza inteligência artificial para formatar currículos. Desenvolvido com Flask no backend e uma interface de usuário construída com HTML, CSS e JavaScript, ele permite que os usuários enviem arquivos de currículo nos formatos `.docx` ou `.pdf`. A aplicação então extrai as informações relevantes do currículo usando a API Gemini do Google, processa esses dados e gera um novo currículo formatado em um documento `.docx` padronizado, que pode ser baixado pelo usuário. O objetivo principal é simplificar o processo de criação de currículos bem estruturados, aproveitando o poder da IA para interpretar e organizar as informações de forma eficiente.




## Tecnologias Utilizadas

O projeto integra diversas tecnologias para oferecer uma solução completa de formatação de currículos:

*   **Python**: Linguagem de programação principal para o desenvolvimento do backend.
*   **Flask**: Microframework web para Python, utilizado para construir a API e servir as páginas web.
*   **Google Gemini API**: Serviço de inteligência artificial generativa, empregado para extrair e estruturar as informações dos currículos.
*   **python-dotenv**: Biblioteca para carregar variáveis de ambiente de um arquivo `.env`, garantindo a segurança das chaves de API.
*   **python-docx**: Biblioteca Python para criar e modificar arquivos Microsoft Word (.docx), utilizada para gerar os currículos formatados.
*   **pypdf**: Biblioteca Python para trabalhar com arquivos PDF, usada para extrair texto de currículos em formato PDF.
*   **HTML5**: Linguagem de marcação para a estrutura da interface do usuário.
*   **CSS3**: Linguagem de estilo para a apresentação visual da aplicação.
*   **JavaScript**: Linguagem de programação para a interatividade do frontend, incluindo a lógica de arrastar e soltar arquivos e o envio assíncrono de formulários.
*   **Werkzeug**: Uma biblioteca de utilitários para WSGI, usada indiretamente pelo Flask para manipulação de arquivos seguros (`secure_filename`).




## Como Funciona (Fluxo de Trabalho)

O processo de formatação de currículos nesta aplicação segue os seguintes passos:

1.  **Upload do Arquivo (Frontend)**: O usuário acessa a interface web e pode arrastar e soltar um arquivo `.docx` ou `.pdf` na área designada, ou clicar para selecionar o arquivo. O JavaScript no frontend gerencia a interação, exibindo o nome do arquivo selecionado e controlando o estado de carregamento.

2.  **Envio para o Backend**: Ao clicar no botão 'Formatar Currículo', o JavaScript coleta o arquivo e o envia para o endpoint `/upload` da aplicação Flask via uma requisição `POST` assíncrona (`fetch API`). Durante este processo, um indicador de carregamento é exibido ao usuário.

3.  **Processamento no Backend (Flask)**:
    *   O servidor Flask recebe o arquivo, verifica se é um tipo permitido (`.pdf` ou `.docx`) e o salva temporariamente no diretório `uploads/`.
    *   Em seguida, a função `ler_arquivo` é invocada para extrair o texto completo do currículo. Para arquivos PDF, utiliza-se `pypdf`; para DOCX, a biblioteca `python-docx`.

4.  **Extração de Dados com IA (Google Gemini)**:
    *   O texto extraído do currículo é então enviado para a API Gemini do Google. Um `prompt` cuidadosamente elaborado instrui a IA a atuar como um assistente de RH e extrair informações específicas (nome, cargo, contato, experiência, educação, etc.) e retorná-las em um formato JSON estruturado.
    *   Configurações de segurança (`safety_config`) são aplicadas para filtrar conteúdo potencialmente problemático na resposta da IA.
    *   A resposta da IA é validada para garantir que seja um JSON válido e que contenha informações úteis. Caso contrário, mensagens de erro apropriadas são retornadas.

5.  **Geração do Currículo Formatado (DOCX)**:
    *   Com os dados extraídos e estruturados em JSON, a função `criar_curriculo_docx` é responsável por gerar um novo documento `.docx` formatado. Esta função utiliza a biblioteca `python-docx` para criar o documento, adicionar títulos, parágrafos e listas, e aplicar estilos predefinidos (como fonte Calibri, tamanho 11pt, alinhamentos, etc.).
    *   As informações são inseridas dinamicamente no documento, com tratamento para dados ausentes, garantindo que o currículo final seja consistente e profissional.
    *   O arquivo DOCX gerado é salvo no diretório `generated/`.

6.  **Download do Arquivo (Frontend)**: Após a geração bem-sucedida, o backend retorna uma URL de download para o frontend. O JavaScript então redireciona o navegador do usuário para essa URL, iniciando o download automático do currículo formatado. O formulário é resetado após alguns segundos para permitir um novo upload.

7.  **Tratamento de Erros**: Em todas as etapas, a aplicação inclui tratamento de erros robusto, com logging detalhado no backend e mensagens de feedback claras no frontend para o usuário, cobrindo desde falhas no upload até problemas na comunicação com a IA ou na geração do documento.




## Como Usar

Para configurar e executar este projeto localmente, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter o seguinte software instalado em sua máquina:

*   **Python 3.8+**
*   **pip** (gerenciador de pacotes do Python)

### Instalação

1.  **Clone o repositório** (se aplicável, ou descompacte os arquivos):
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd <nome_do_diretorio_do_projeto>
    ```

2.  **Crie e ative um ambiente virtual** (recomendado):
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # No Linux/macOS
    # venv\Scripts\activate  # No Windows
    ```

3.  **Instale as dependências do Python**:
    ```bash
    pip install -r requirements.txt
    ```
    
### Configuração da API do Google Gemini

1.  **Obtenha uma chave de API do Google Gemini**: Siga as instruções na [documentação oficial do Google AI Studio](https://ai.google.dev/) para obter sua chave de API.

2.  **Crie um arquivo `.env`**: Na raiz do projeto, crie um arquivo chamado `.env` e adicione sua chave de API e uma chave secreta para o Flask:
    ```
    GOOGLE_API_KEY='SUA_CHAVE_API_AQUI'
    SEGREDO_FLASK='UMA_CHAVE_SECRETA_ALEATORIA_E_FORTE'
    ```
    Certifique-se de que o arquivo `.env` **NÃO** seja versionado no controle de código-fonte (adicione-o ao `.gitignore`).

### Execução da Aplicação

1.  **Inicie o servidor Flask**:
    ```bash
    python app.py
    ```

2.  **Acesse a aplicação**: Abra seu navegador web e navegue para `http://127.0.0.1:5000/` (ou a porta que o Flask indicar).

### Utilização

1.  Na interface web, arraste e solte um arquivo `.docx` ou `.pdf` na área indicada, ou clique para selecionar o arquivo.
2.  Clique no botão "Formatar Currículo".
3.  Aguarde o processamento. Um spinner de carregamento será exibido.
4.  Após o processamento, o currículo formatado será baixado automaticamente em formato `.docx`.




## Estrutura do Projeto

O projeto é organizado da seguinte forma:

```
.  
├── app.py                  # Backend da aplicação Flask
├── requirements.txt        # Dependências do Python
├── .env.example            # Exemplo de arquivo .env para variáveis de ambiente
├── uploads/                # Diretório para armazenar arquivos de currículo enviados
├── generated/              # Diretório para armazenar currículos .docx gerados
├── templates/              # Contém os templates HTML
│   └── index.html          # Página principal da aplicação
└── static/                 # Contém arquivos estáticos (CSS, JS)
    ├── style.css           # Estilos CSS da aplicação
    └── script.js           # Lógica JavaScript do frontend
```




## Variáveis de Ambiente

O projeto utiliza as seguintes variáveis de ambiente, que devem ser configuradas em um arquivo `.env` na raiz do projeto:

*   `GOOGLE_API_KEY`: Sua chave de API para acessar os serviços do Google Gemini. Essencial para a funcionalidade de extração de dados por IA.
*   `SEGREDO_FLASK`: Uma chave secreta utilizada pelo Flask para segurança de sessões e proteção contra ataques CSRF. Deve ser uma string longa e aleatória.


Made by Nelson Prado 


