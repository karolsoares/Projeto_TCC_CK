# CK - Processamento de Aúdio

CK Processamento de Aúdio é uma plataforma de processamento de áudio offline, desenvolvida com Electron.js no frontend e Python no backend. O sistema oferece uma interface gráfica intuitiva para usuários aplicarem transformações e análises em arquivos de áudio .wav. Entre suas principais funcionalidades estão equalização multibanda, redução de ruído, separação de faixas e suporte à execução de plugins personalizados em Python.

## Funcionalidades

### Equalização de Áudio

Permite o ajuste fino de dez bandas de frequência (30 Hz a 16 kHz), com ganhos entre -10 dB e +10 dB. A aplicação dessa equalização é realizada por filtros digitais e pode ser complementada por recursos da biblioteca Yodel para maior precisão.

**Bibliotecas utilizadas:**  
- `scipy.signal`  
- `numpy`  
- `yodel` 

### Redução de Ruído

Remove ruído de fundo com base em modelos de redução espectral, ajustáveis por intensidade.

**Bibliotecas utilizadas:**  
- `noisereduce`  
- `numpy`  
- `soundfile`

### Separação de Faixas

Separa componentes de uma faixa de áudio, como vocais e instrumentais, utilizando modelos de machine learning executados via ONNX Runtime.

**Bibliotecas utilizadas:**  
- `audio-separator`  
- `onnxruntime`

### Execução de Plugins Customizados

Usuários podem desenvolver e carregar seus próprios plugins em Python. Cada plugin deve conter uma função `process_audio(data, sr)` e será executado dinamicamente pela interface.

**Exemplo de plugin:**

```python
def process_audio(data, sr, *args):
    return -data  # Inversão da forma de onda

