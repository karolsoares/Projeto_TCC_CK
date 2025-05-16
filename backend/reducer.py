import sys
import noisereduce as nr
import numpy as np
from scipy.io import wavfile
import os

def reduzir_ruido(caminho_entrada, caminho_saida, intensidade=0.5):
    """
    Reduz ruído do arquivo WAV de entrada e salva no arquivo de saída.

    Args:
        caminho_entrada (str): caminho do arquivo WAV original.
        caminho_saida (str): caminho para salvar o arquivo processado.
        intensidade (float): intensidade da redução, entre 0 (sem redução) e 1 (redução máxima).
    """

    if not os.path.isfile(caminho_entrada):
        raise FileNotFoundError(f"Arquivo de entrada não encontrado: {caminho_entrada}")

    # Lê o áudio original
    rate, data = wavfile.read(caminho_entrada)

    # Garante que os dados são mono para simplificar (se estiver estéreo, usa só um canal)
    if len(data.shape) > 1:
        data_mono = data[:, 0]
    else:
        data_mono = data

    # Seleciona um trecho inicial para analisar o ruído (ex: primeiros 0.5 segundos)
    trecho_ruido = data_mono[:int(0.5 * rate)]

    # Aplica redução de ruído com o trecho selecionado, intensidade e taxa de amostragem
    resultado = nr.reduce_noise(y=data_mono, y_noise=trecho_ruido, prop_decrease=intensidade, sr=rate)

    # Normaliza para int16 (valor padrão para WAV)
    resultado_int16 = np.int16(resultado / np.max(np.abs(resultado)) * 32767)

    # Garante que a pasta do arquivo de saída exista
    pasta_saida = os.path.dirname(caminho_saida)
    if not os.path.exists(pasta_saida):
        os.makedirs(pasta_saida)

    # Salva o arquivo processado
    wavfile.write(caminho_saida, rate, resultado_int16)

    print(f"Arquivo processado salvo em: {caminho_saida}")

if __name__ == "__main__":
    # Recebe parâmetros via linha de comando: entrada, saída e opcional intensidade
    if len(sys.argv) < 3:
        print("Uso: python reducer.py <arquivo_entrada.wav> <arquivo_saida.wav> [intensidade]")
        sys.exit(1)

    entrada = sys.argv[1]
    saida = sys.argv[2]
    intensidade = float(sys.argv[3]) if len(sys.argv) > 3 else 0.5

    try:
        reduzir_ruido(entrada, saida, intensidade)
    except Exception as e:
        print("Erro ao reduzir ruído:", e)
        sys.exit(2)
