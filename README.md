# Gerador de Currículos em Python

Este projeto consiste em um script Python (`curriculo.py`) que gera automaticamente um currículo profissional em formato `.docx` (Microsoft Word). Ele utiliza a biblioteca `python-docx` para manipular documentos Word, permitindo a criação de um currículo estruturado com seções como informações de contato, perfil, experiência profissional, educação, cursos, projetos, habilidades e idiomas.

## Tecnologias Utilizadas

- **Python**: Linguagem de programação principal utilizada para desenvolver o script.
- **python-docx**: Uma biblioteca Python para criar e modificar arquivos Microsoft Word (.docx). Esta biblioteca é fundamental para a manipulação do documento, permitindo a adição de texto, formatação (negrito, tamanho da fonte, cor), alinhamento e inserção de tabelas.

## Como Funciona

O script `curriculo.py` é um programa autônomo que, ao ser executado, constrói um documento Word do zero. Ele define estilos de fonte e parágrafo, adiciona cabeçalhos para cada seção do currículo e preenche o conteúdo com informações pré-definidas (atualmente com dados de exemplo).

As principais funcionalidades incluem:

- **Definição de Estilos**: Configura a fonte padrão (Calibri, tamanho 11pt) para todo o documento.
- **Informações de Contato**: Adiciona título, subtítulo (cargo/área) e detalhes de contato (endereço, telefone, e-mail, LinkedIn, GitHub) centralizados.
- **Linha Horizontal**: Insere uma linha divisória para separar visualmente as seções.
- **Seções Estruturadas**: Cria seções dedicadas para:
    - Perfil
    - Experiência Profissional
    - Educação
    - Cursos
    - Projetos (com suporte para múltiplos projetos, incluindo título, descrição e URL)
    - Soft Skills (em formato de lista)
    - Habilidades Técnicas (organizadas em uma tabela de 3 colunas)
    - Idiomas
- **Formatação Avançada**: Aplica negrito, tamanhos de fonte específicos e cores (como cinza para o subtítulo) para melhorar a legibilidade e a estética do currículo.
- **Geração de Arquivo**: Salva o currículo final em um arquivo chamado `Curriculo.docx` no mesmo diretório onde o script é executado.

## Como Usar

Para utilizar este script e gerar seu próprio currículo, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter o Python instalado em seu sistema. Você pode baixá-lo em [python.org](https://www.python.org/).

### Instalação das Dependências

O único pré-requisito é a biblioteca `python-docx`. Você pode instalá-la usando o `pip`, o gerenciador de pacotes do Python:

```bash
pip install python-docx
```

### Execução do Script

1. **Baixe o arquivo `curriculo.py`**: Salve o arquivo em um diretório de sua preferência.

2. **Edite o conteúdo**: Abra o arquivo `curriculo.py` em um editor de texto (como VS Code, Sublime Text, Notepad++).
   - Localize as seções onde as informações do currículo são adicionadas (ex: `title`, `subtitle`, `contact_info`, `profile`, `exp`, `edu`, `courses`, `projects`, `soft_skills`, `skills`, `languages`).
   - Substitua os dados de exemplo (`'Name'`, `'Full Stack Intern'`, `'Lorem ipsum...'`) pelas suas próprias informações.
   - Para a seção de `projects`, você pode adicionar mais dicionários à lista `projects` para incluir todos os seus projetos.
   - Para a seção de `skills`, adicione ou remova habilidades da lista `skills` conforme necessário.

3. **Execute o script**: Abra um terminal ou prompt de comando, navegue até o diretório onde você salvou o arquivo `curriculo.py` e execute o seguinte comando:

```bash
python curriculo.py
```

Após a execução, um arquivo chamado `Curriculo.docx` será criado no mesmo diretório. Você pode abri-lo com o Microsoft Word ou qualquer outro software compatível para visualizar e fazer ajustes finais, se necessário.

## Personalização

Você pode personalizar o currículo de diversas maneiras, alterando o código Python:

- **Fontes e Tamanhos**: Modifique `font.name` e `font.size` no início do script para alterar a fonte e o tamanho padrão.
- **Cores**: Altere os valores `RGBColor` para mudar as cores do texto (ex: `RGBColor(255, 0, 0)` para vermelho).
- **Layout**: Ajuste o alinhamento (`WD_PARAGRAPH_ALIGNMENT`) e o espaçamento (`paragraph_format.space_after`) para controlar o layout das seções.
- **Novas Seções**: Adicione novas seções copiando e adaptando o padrão de `doc.add_heading` e `doc.add_paragraph`.
  
---

**Autor**: Nelson Prado

## Análise de IA do Currículo

O currículo gerado por este script obteve uma pontuação impressionante de **93** em uma análise de IA, classificando-o com uma nota **A**. Isso indica que o formato e o conteúdo gerados são altamente otimizados e bem estruturados para serem avaliados por sistemas de inteligência artificial, que são frequentemente utilizados em processos de recrutamento modernos. Embora a pontuação seja excelente, é sempre recomendável revisar a análise detalhada para identificar quaisquer pontos que possam ser aprimorados para uma perfeição ainda maior.


