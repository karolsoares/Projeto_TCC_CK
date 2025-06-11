import sys
import os
from audio_separator.separator import Separator

def main():
    if len(sys.argv) != 3:
        print("Uso: python separator.py <caminho_audio_entrada> <pasta_saida>")
        sys.exit(1)

    caminho_entrada = sys.argv[1]
    pasta_saida = sys.argv[2]

    # Cria pasta de saída, se não existir
    os.makedirs(pasta_saida, exist_ok=True)

    # Inicializa o separador (usa modelo padrão do Demucs)
    separator = Separator()

    separator.load_model()

    output_names  =  { 
    "Vocais" :  "saída_vocais" , 
    "Instrumental" :  "saída_instrumental" , 
    } 


    # Separa as faixas
    paths_das_faixas = separator.separate(caminho_entrada, output_names)

    # Imprime os caminhos absolutos de cada faixa (1 por linha)
    for caminho in paths_das_faixas:
        print(os.path.abspath(caminho))

if __name__ == "__main__":
    main()
