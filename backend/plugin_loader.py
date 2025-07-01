import os
import sys
import importlib.util
import soundfile as sf

def load_plugins():
    """
    Carrega todos os plugins Python da pasta 'plugins'.
    Retorna um dicionário {nome_do_plugin: módulo}.
    """
    plugins = {}
    plugins_dir = os.path.join(os.path.dirname(__file__), "plugins")

    if not os.path.isdir(plugins_dir):
        print("Pasta 'plugins/' não encontrada.")
        return plugins

    for file in os.listdir(plugins_dir):
        if file.endswith(".py") and not file.startswith("__"):
            plugin_name = file[:-3]
            plugin_path = os.path.join(plugins_dir, file)
            try:
                spec = importlib.util.spec_from_file_location(plugin_name, plugin_path)
                module = importlib.util.module_from_spec(spec)
                spec.loader.exec_module(module)
                if hasattr(module, "process_audio") and callable(module.process_audio):
                    plugins[plugin_name] = module
                    print(f" Plugin carregado: {plugin_name}")
                else:
                    print(f"Plugin '{plugin_name}' ignorado: função process_audio não encontrada.")
            except Exception as e:
                print(f" Erro ao carregar plugin '{plugin_name}': {e}")
    return plugins

def main():
    if len(sys.argv) < 3:
        print("Uso: python plugin_executor.py <plugin_name> <caminho_audio.wav>")
        sys.exit(1)

    plugin_name = sys.argv[1]
    audio_path = sys.argv[2]

    if not os.path.isfile(audio_path):
        print(f"[ERRO] Arquivo de áudio não encontrado: {audio_path}")

    # Carrega plugins
    plugins = load_plugins()
    if plugin_name not in plugins:
        print(f"[ERRO] Plugin '{plugin_name}' não encontrado.")
        print(f"Plugins disponíveis: {', '.join(plugins.keys()) or 'nenhum'}")
        sys.exit(1)

    try:
        data, sr = sf.read(audio_path)
    except Exception as e:
        print(f"[ERRO] Erro ao ler o áudio: {e}")
        sys.exit(1)

    try:
        processed = plugins[plugin_name].process_audio(data, sr)
    except Exception as e:
        print(f"[ERRO] Erro ao aplicar o plugin '{plugin_name}': {e}")
        sys.exit(1)

    os.makedirs("output", exist_ok=True)
    output_path = os.path.join("output", f"{plugin_name}_processed.wav")

    try:
        sf.write(output_path, processed, sr)
        print(output_path) 
    except Exception as e:
        print(f"[ERRO] Erro ao salvar o áudio processado: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()