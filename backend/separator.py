import os

try:
    import tkinter as tk
    from tkinter import filedialog
    GUI_AVAILABLE = True
except ImportError:
    GUI_AVAILABLE = False

from audio_separator.separator import Separator

def selecionar_arquivo():
    if GUI_AVAILABLE:
        try:
            root = tk.Tk()
            root.withdraw()
            caminho_arquivo = filedialog.askopenfilename(
                title="Selecione o arquivo de áudio",
                filetypes=[("Arquivos de áudio", "*.mp3 *.wav *.flac"), ("Todos os arquivos", "*.*")]
            )
            if caminho_arquivo:
                return caminho_arquivo
        except Exception as e:
            print(f"Erro ao abrir explorador gráfico: {e}")
    
    # Fallback: pedir no terminal
    caminho_arquivo = input("Digite o caminho completo do arquivo de áudio: ")
    return caminho_arquivo

def selecionar_pasta_saida():
    if GUI_AVAILABLE:
        try:
            root = tk.Tk()
            root.withdraw()
            caminho_pasta = filedialog.askdirectory(
                title="Selecione o diretório de saída"
            )
            if caminho_pasta:
                return caminho_pasta
        except Exception as e:
            print(f"Erro ao abrir explorador gráfico: {e}")

    # Fallback: pedir no terminal
    caminho_pasta = input("Digite o caminho completo do diretório de saída: ")
    return caminho_pasta

# Seleção do arquivo de entrada
input_file = selecionar_arquivo()
if not os.path.isfile(input_file):
    print("Erro: arquivo não encontrado. Verifique o caminho digitado.")
    exit(1)

## Seleção do diretório de saída
output_dir_sel = selecionar_pasta_saida()
if not os.path.isdir(output_dir_sel):
    print("Diretório não encontrado. Criando diretório...")
    try:
        os.makedirs(output_dir_sel)
        print(f"Diretório criado: {output_dir_sel}")
    except Exception as e:
        print(f"Erro ao criar diretório: {e}")
        exit(1)

# Inicializa a classe Separator
separator = Separator()

# Carrega o modelo
separator.load_model()

# Executa a separação com o diretório de saída especificado
#output_files = separator.separate("/audio/exemplos/audio_example.mp3", output_dir=output_dir_sel)
output_names  =  { 
    "Vocais" :  "saída_vocais" , 
    "Instrumental" :  "saída_instrumental" , 
} 
output_files = separator.separate(input_file, output_names)#tentar colocar o diretório de saida
#print(f"Separação concluída! Arquivos gerados:")
#for f in output_files:
#    print(f" - {f}")
