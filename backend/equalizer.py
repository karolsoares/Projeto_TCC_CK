import sys
import os
import numpy as np
from scipy.io import wavfile
from yodel import AudioSignal
from yodel import Equalizer

def aplicar_equalizacao(caminho_entrada, caminho_saida, ganhos_db):
    """
    Aplica equalização a um arquivo WAV.

    Args:
        caminho_entrada (str): caminho do arquivo de entrada
        caminho_saida (str): onde salvar o arquivo resultante
        ganhos_db (list): lista com ganhos por banda em dB (ex: [0, 5, -3, 0, 0, -2, 3, 0, 0, 0])
    """
    if not os.path.isfile(caminho_entrada):
        raise FileNotFoundError(f"Arquivo de entrada não encontrado: {caminho_entrada}")

    # Lê o áudio como sinal Yodel
    rate, data = wavfile.read(caminho_entrada)
    if len(data.shape) > 1:
        data = data[:, 0]  # Usa o primeiro canal se for estéreo
    data = data.astype(np.float32) / 32768.0

    sinal = AudioSignal(data, rate)

    # Aplica equalizador com os ganhos
    eq = Equalizer()
    sinal_eq = eq.process(sinal, gains=ganhos_db)

    # Converte de volta para int16
    data_eq = np.int16(sinal_eq.data / np.max(np.abs(sinal_eq.data)) * 32767)

    # Salva o resultado
    wavfile.write(caminho_saida, rate, data_eq)
    print(f"Arquivo equalizado salvo em: {caminho_saida}")

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Uso: python equalizer.py <entrada.wav> <saida.wav> <ganho1,ganho2,...,ganho10>")
        sys.exit(1)

    entrada = sys.argv[1]
    saida = sys.argv[2]
    ganhos_str = sys.argv[3]
    ganhos = [float(g) for g in ganhos_str.split(",")]

    try:
        aplicar_equalizacao(entrada, saida, ganhos)
    except Exception as e:
        print("Erro ao aplicar equalização:", e)
        sys.exit(2)