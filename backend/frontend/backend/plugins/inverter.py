import sys
import soundfile as sf
import numpy as np

def process_audio(data, sr, *args):
    return data * 0.5

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Uso: python example.py <entrada.wav> <saida.wav>")
        sys.exit(1)

    entrada = sys.argv[1]
    saida = sys.argv[2]

    data, sr = sf.read(entrada)
    resultado = process_audio(data, sr)
    sf.write(saida, resultado, sr)
