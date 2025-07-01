import sys
import os
import numpy as np
from scipy.io import wavfile
from yodel.filter import ParametricEQ

def aplicar_equalizacao(caminho_entrada, caminho_saida, ganhos_db):
    if not os.path.isfile(caminho_entrada):
        raise FileNotFoundError(f"Arquivo não encontrado: {caminho_entrada}")

    sr, data = wavfile.read(caminho_entrada)
    x = data.astype(np.float32) / 32768.0 if data.dtype == np.int16 else data.astype(np.float32)

    bandas = [
        (30, 60), (60, 125), (125, 250), (250, 500),
        (500, 1000), (1000, 2000), (2000, 4000),
        (4000, 8000), (8000, 16000), (16000, 20000),
    ]

    eq = ParametricEQ(samplerate=sr, bands=10)
    for i, ((low, high), ganho_db) in enumerate(zip(bandas, ganhos_db)):
        center = np.sqrt(low * high)
        q = center / (high - low)
        eq.set_band(i, center, q, ganho_db)

    y = np.zeros_like(x)
    eq.process(x, y)  # passar input e output

    # Normaliza para evitar clipping
    y /= np.max(np.abs(y)) + 1e-9

    wavfile.write(caminho_saida, sr, np.int16(y * 32767))
    print(f"Arquivo equalizado salvo em: {caminho_saida}")

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Uso: python equalizer.py <entrada.wav> <saida.wav> <ganhos_csv>")
        sys.exit(1)

    entrada, saida = sys.argv[1], sys.argv[2]
    ganhos_str = sys.argv[3]
    try:
        ganhos = [float(g) for g in ganhos_str.split(",")]
        if len(ganhos) != 10:
            raise ValueError("Esperados 10 valores de ganho.")
    except Exception as e:
        print("Erro ao ler ganhos:", e)
        sys.exit(2)

    try:
        aplicar_equalizacao(entrada, saida, ganhos)
    except Exception as e:
        print("Erro ao equalizar:", e)
        sys.exit(3)