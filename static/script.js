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
        
        // --- Lógica de envio do formulário ---
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
                const response = await fetch('/upload', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();
                loadingDiv.classList.add('hidden'); // Esconde o spinner

                if (data.status === 'success') {
                    showMessage('Currículo processado! O download começará em breve.', 'success');
                    // Inicia o download
                    window.location.href = data.download_url;
                    resetForm();
                } else {
                    showMessage(data.message || 'Ocorreu um erro desconhecido.', 'error');
                    uploadContainer.classList.remove('hidden'); // Mostra o formulário novamente em caso de erro
                }
            } catch (error) {
                loadingDiv.classList.add('hidden');
                showMessage('Erro de conexão. Verifique o console para mais detalhes.', 'error');
                uploadContainer.classList.remove('hidden');
                console.error('Erro:', error);
            }
        });

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