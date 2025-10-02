document.addEventListener('DOMContentLoaded', () => {
    // --- Seletores de elementos ---
    const uploadContainer = document.getElementById('upload-container');
    const form = document.getElementById('upload-form');
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const dropZoneText = document.querySelector('.drop-zone-text');
    const loadingDiv = document.getElementById('loading');
    const messageContainer = document.getElementById('message-container');

    // --- Lógica de arrastar e soltar ---
    dropZone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', () => updateDropZoneText());

    ['dragover', 'dragenter'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });
    });

    ['dragleave', 'dragend', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.remove('drag-over'));
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        if (e.dataTransfer.files.length > 0) {
            fileInput.files = e.dataTransfer.files;
            updateDropZoneText();
        }
    });

    function updateDropZoneText() {
        if (fileInput.files.length > 0) {
            dropZoneText.textContent = `Arquivo selecionado: ${fileInput.files[0].name}`;
            dropZone.classList.add('has-file');
        }
    }
    
    // --- Lógica de envio do formulário (COM A CORREÇÃO) ---
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Impede o envio tradicional do formulário
        
        if (fileInput.files.length === 0) {
            showMessage('Por favor, selecione um arquivo.', 'error');
            return;
        }

        // Mostra o spinner e esconde o formulário
        uploadContainer.classList.add('hidden');
        loadingDiv.classList.remove('hidden');
        messageContainer.innerHTML = '';

        const formData = new FormData();
        formData.append('file', fileInput.files[0]);

        try {
            const response = await fetch('/', {
                method: 'POST',
                body: formData
            });

            // Se a resposta do servidor for um erro (ex: 500), ele vai parar aqui
            if (!response.ok) {
                const errorData = await response.json(); // Tenta ler a mensagem de erro JSON do backend
                throw new Error(errorData.message || 'Ocorreu um erro no servidor.');
            }

            // Pega o nome do arquivo do cabeçalho da resposta
            const disposition = response.headers.get('Content-Disposition');
            let filename = 'curriculo-formatado.docx'; // Nome padrão
            if (disposition && disposition.includes('attachment')) {
                const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                const matches = filenameRegex.exec(disposition);
                if (matches != null && matches[1]) {
                    filename = matches[1].replace(/['"]/g, '');
                }
            }
            
            // Pega os dados do arquivo como um "blob"
            const blob = await response.blob();

            // Cria uma URL temporária na memória do navegador para o arquivo
            const url = window.URL.createObjectURL(blob);
            
            // Cria um link <a> invisível para iniciar o download
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = filename; // Define o nome do arquivo
            
            document.body.appendChild(a);
            a.click(); // Simula o clique no link para baixar
            
            // Limpa os elementos temporários
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            // Esconde o spinner e mostra mensagem de sucesso
            loadingDiv.classList.add('hidden');
            showMessage('Processado com sucesso! O download foi iniciado.', 'success');
            resetForm();

        } catch (error) {
            // Se qualquer etapa acima falhar, mostra o erro
            loadingDiv.classList.add('hidden');
            showMessage(error.message || 'Erro de conexão. Verifique o console.', 'error');
            uploadContainer.classList.remove('hidden');
            console.error('Erro:', error);
        }
    });

    // --- Funções auxiliares de UI ---
    function showMessage(message, type) {
        messageContainer.innerHTML = `<div class="message ${type}">${message}</div>`;
    }

    function resetForm() {
        setTimeout(() => {
            fileInput.value = '';
            dropZoneText.textContent = 'Arraste e solte o arquivo aqui ou clique para selecionar';
            dropZone.classList.remove('has-file');
            uploadContainer.classList.remove('hidden');
            messageContainer.innerHTML = '';
        }, 3000); // Reseta o formulário após 3 segundos
    }
});