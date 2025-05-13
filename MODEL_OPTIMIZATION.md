# Otimização de Modelos 3D para Dispositivos Móveis

Este documento fornece instruções sobre como otimizar os modelos 3D utilizados neste projeto para melhorar o desempenho em dispositivos móveis.

## Problema Identificado

A exibição 3D em dispositivos móveis está extremamente pesada, causando lentidão e consumo excessivo de bateria. As implementações iniciais de otimização já foram feitas no código, mas é necessário criar uma versão de baixa resolução do modelo 3D.

## Otimização do Modelo GLB

Para um melhor desempenho em dispositivos móveis, recomenda-se criar uma versão otimizada do modelo 3D:

1. **Redução de polígonos**: Criar uma versão de baixa resolução (low-poly) do modelo com aproximadamente 30-50% dos polígonos originais.

2. **Caminho do arquivo**: Salvar o arquivo com nome `feto1_lowpoly.glb` no diretório `/public/images/feto/`.

### Como reduzir polígonos usando Blender:

1. Abra o arquivo original `Feto.blend` no Blender
2. Selecione o modelo
3. Adicione um modificador "Decimate" 
   - Configure o "Ratio" para 0.3-0.5 para reduzir para 30-50% dos polígonos originais
4. Aplique o modificador
5. Exporte como GLB com a opção "Apply Modifiers" ativada
6. Salve como `feto1_lowpoly.glb`

### Outras ferramentas para otimização:

- **[gltf-pipeline](https://github.com/CesiumGS/gltf-pipeline)**: Ferramenta de linha de comando para otimizar arquivos GLTF/GLB
  ```
  npx gltf-pipeline -i feto1.glb -o feto1_lowpoly.glb --draco.compressionLevel=7
  ```

- **[Sketchfab](https://sketchfab.com)**: Permite fazer upload e baixar versões otimizadas de modelos 3D

## Dicas Adicionais de Otimização

1. **Texturas**: Reduzir a resolução das texturas para no máximo 512x512 pixels para dispositivos móveis

2. **Materiais**: Simplificar materiais removendo efeitos complexos como subsurface scattering, transmission, etc.

3. **Batch Instancing**: Se houver múltiplos objetos similares, considere usar instancing

4. **Geometria Simplificada**: Para posições muito distantes da câmera, use LOD (Level of Detail) com geometrias progressivamente mais simples

## Testes de Desempenho

Após implementar as otimizações, teste o desempenho nos seguintes dispositivos móveis:
- Dispositivos Android de entrada
- iPhones mais antigos (iPhone 8 ou anterior)
- Tablets

Monitore:
- Taxa de quadros (FPS) - objetivo: manter acima de 30 FPS
- Consumo de memória
- Temperatura do dispositivo
- Consumo de bateria

## Implementação no Código

O código no projeto já está preparado para carregar automaticamente o modelo otimizado em dispositivos móveis. A detecção de dispositivo verifica:
- Largura da tela menor que 768px
- User-agent de dispositivos móveis

O arquivo carregado será `/images/feto/feto1_lowpoly.glb` se estiver disponível, com fallback para o arquivo original. 