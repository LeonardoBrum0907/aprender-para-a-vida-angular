import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccessibilityService {
  private settings = {
    fontSize: 100,
    contrast: 'normal',
    letterSpacing: 0,
    lineHeight: 'normal',
    dyslexicFont: false
  };

  private renderer: Renderer2;


  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.loadStoredSettings();
    this.applySettings();
  }

  createAccessibilityButton(): void {
    const button = document.createElement('button');
    button.innerHTML = '⚑';
    button.setAttribute('aria-label', 'Abrir menu de acessibilidade');
    button.className = 'accessibility-toggle';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 99999;
        padding: 10px;
        border-radius: 50%;
        background: #2196F3;
        color: white;
        border: none;
        cursor: pointer;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    `;

    button.addEventListener('click', () => this.togglePanel());
    document.body.appendChild(button);
  }

  togglePanel(): void {
    const existingPanel = document.querySelector('.accessibility-panel');
    if (existingPanel) {
      existingPanel.remove();
    } else {
      document.body.appendChild(this.createPanel());
    }
  }

  createPanel(): HTMLElement {
    const panel = this.renderer.createElement('div');
    this.renderer.addClass(panel, 'accessibility-panel');
    this.renderer.setStyle(panel, 'position', 'fixed');
    this.renderer.setStyle(panel, 'bottom', '80px');
    this.renderer.setStyle(panel, 'right', '20px');
    this.renderer.setStyle(panel, 'width', '280px');
    this.renderer.setStyle(panel, 'background', 'white');
    this.renderer.setStyle(panel, 'padding', '20px');
    this.renderer.setStyle(panel, 'border-radius', '8px');
    this.renderer.setStyle(panel, 'box-shadow', '0 2px 10px rgba(0,0,0,0.1)');
    this.renderer.setStyle(panel, 'z-index', '99999');

    // Criar e adicionar o título
    const title = this.renderer.createElement('h3');
    const titleText = this.renderer.createText('Configurações de Acessibilidade');
    this.renderer.appendChild(title, titleText);
    this.renderer.appendChild(panel, title);


    // Tamanho da Fonte
    this.createFontSizeFunc(panel);

    // Contraste
    this.createContrastFunc(panel)

    // Fonte para Dislexia
    this.createDyslexiaFunc(panel)

    // Espaçamento entre letras
    this.createLetterSpacingFunc(panel)

    // Altura das linhas
    this.createLineHeightFunc(panel)

    // Botão de Restaurar Padrões
    this.createResetButtonFunc(panel)

    return panel;
  }

  createFontSizeFunc(panel: HTMLElement) {
    const divFunc = this.renderer.createElement('div')
    this.renderer.addClass(divFunc, 'div-func');

    const fontSizeLabel = this.renderer.createElement('label');
    const fontSizeLabelText = this.renderer.createText('Tamanho da Fonte');
    this.renderer.appendChild(fontSizeLabel, fontSizeLabelText);
    this.renderer.appendChild(divFunc, fontSizeLabel);
    this.renderer.appendChild(panel, divFunc);

    const decreaseFontSizeBtn = this.renderer.createElement('button');
    const decreaseText = this.renderer.createText('A-');
    this.renderer.appendChild(decreaseFontSizeBtn, decreaseText);
    this.renderer.listen(decreaseFontSizeBtn, 'click', () => this.adjustFontSize(-10));
    this.renderer.appendChild(divFunc, decreaseFontSizeBtn);

    const increaseFontSizeBtn = this.renderer.createElement('button');
    const increaseText = this.renderer.createText('A+');
    this.renderer.appendChild(increaseFontSizeBtn, increaseText);
    this.renderer.listen(increaseFontSizeBtn, 'click', () => this.adjustFontSize(10));
    this.renderer.appendChild(divFunc, increaseFontSizeBtn);
  }

  createContrastFunc(panel: HTMLElement) {
    const divFunc = this.renderer.createElement('div')
    this.renderer.addClass(divFunc, 'div-func');

    const contrastLabel = this.renderer.createElement('label');
    const contrastLabelText = this.renderer.createText('Contraste');
    this.renderer.appendChild(contrastLabel, contrastLabelText);
    this.renderer.appendChild(divFunc, contrastLabel);
    this.renderer.appendChild(panel, divFunc);

    const contrastSelect = this.renderer.createElement('select');
    const optionNormal = this.renderer.createElement('option');
    const optionNormalText = this.renderer.createText('Normal');
    this.renderer.setProperty(optionNormal, 'value', 'normal');
    this.renderer.appendChild(optionNormal, optionNormalText);

    const optionHigh = this.renderer.createElement('option');
    const optionHighText = this.renderer.createText('Alto Contraste');
    this.renderer.setProperty(optionHigh, 'value', 'high');
    this.renderer.appendChild(optionHigh, optionHighText);

    const optionInverted = this.renderer.createElement('option');
    const optionInvertedText = this.renderer.createText('Invertido');
    this.renderer.setProperty(optionInverted, 'value', 'inverted');
    this.renderer.appendChild(optionInverted, optionInvertedText);

    this.renderer.appendChild(contrastSelect, optionNormal);
    this.renderer.appendChild(contrastSelect, optionHigh);
    this.renderer.appendChild(contrastSelect, optionInverted);

    this.renderer.listen(contrastSelect, 'change', (event) => this.setContrast(event.target.value));
    this.renderer.appendChild(divFunc, contrastSelect);
  }

  createDyslexiaFunc(panel: HTMLElement) {
    const divFunc = this.renderer.createElement('div')
    this.renderer.addClass(divFunc, 'div-func');

    const dyslexiaLabel = this.renderer.createElement('label');
    const dyslexiaLabelText = this.renderer.createText('Fonte para Dislexia');
    this.renderer.appendChild(dyslexiaLabel, dyslexiaLabelText);
    this.renderer.appendChild(divFunc, dyslexiaLabel);
    this.renderer.appendChild(panel, divFunc);

    const dyslexiaCheckbox = this.renderer.createElement('input');
    this.renderer.setProperty(dyslexiaCheckbox, 'type', 'checkbox');
    this.renderer.listen(dyslexiaCheckbox, 'change', (event) => this.toggleDyslexicFont(event.target.checked));
    this.renderer.appendChild(dyslexiaLabel, dyslexiaCheckbox);
    this.renderer.appendChild(divFunc, dyslexiaLabel);
  }

  createLetterSpacingFunc(panel: HTMLElement) {
    const divFunc = this.renderer.createElement('div')
    this.renderer.addClass(divFunc, 'div-func');

    const letterSpacingLabel = this.renderer.createElement('label');
    const letterSpacingLabelText = this.renderer.createText('Espaçamento entre Letras');
    this.renderer.appendChild(letterSpacingLabel, letterSpacingLabelText);
    this.renderer.appendChild(divFunc, letterSpacingLabel);

    const letterSpacingInput = this.renderer.createElement('input');
    this.renderer.setProperty(letterSpacingInput, 'type', 'range');
    this.renderer.setProperty(letterSpacingInput, 'min', '0');
    this.renderer.setProperty(letterSpacingInput, 'max', '5');
    this.renderer.setProperty(letterSpacingInput, 'step', '1');
    this.renderer.listen(letterSpacingInput, 'input', (event) => this.setLetterSpacing(event.target.value));
    this.renderer.appendChild(panel, divFunc);
    this.renderer.appendChild(panel, letterSpacingInput);
  }

  createLineHeightFunc(panel: HTMLElement) {
    const divFunc = this.renderer.createElement('div')
    this.renderer.addClass(divFunc, 'div-func');

    const lineHeightLabel = this.renderer.createElement('label');
    const lineHeightLabelText = this.renderer.createText('Altura da Linha');
    this.renderer.appendChild(lineHeightLabel, lineHeightLabelText);
    this.renderer.appendChild(divFunc, lineHeightLabel);

    const lineHeightInput = this.renderer.createElement('input');
    this.renderer.setProperty(lineHeightInput, 'type', 'range');
    this.renderer.setProperty(lineHeightInput, 'min', '1');
    this.renderer.setProperty(lineHeightInput, 'max', '2');
    this.renderer.setProperty(lineHeightInput, 'step', '0.1');
    this.renderer.listen(lineHeightInput, 'input', (event) => this.setLineHeight(event.target.value));
    this.renderer.appendChild(panel, divFunc);
    this.renderer.appendChild(panel, lineHeightInput);
  }

  createResetButtonFunc(panel: HTMLElement) {
    const resetButton = this.renderer.createElement('button');
    const resetText = this.renderer.createText('Restaurar Padrões');
    this.renderer.appendChild(resetButton, resetText);
    this.renderer.listen(resetButton, 'click', () => this.resetSettings());
    this.renderer.appendChild(panel, resetButton);
  }

  adjustFontSize(change: number): void {
    this.settings.fontSize += change;
    this.settings.fontSize = Math.min(Math.max(this.settings.fontSize, 70), 200);
    this.applySettings();
    this.saveSettings();
  }

  setContrast(value: string) {
    this.settings.contrast = value;
    this.applySettings();
    this.saveSettings();
  }

  toggleDyslexicFont(enabled: boolean) {
    this.settings.dyslexicFont = enabled;
    this.applySettings();
    this.saveSettings();
  }

  setLetterSpacing(value: number) {
    this.settings.letterSpacing = value;
    this.applySettings();
    this.saveSettings();
  }

  setLineHeight(value: string) {
    this.settings.lineHeight = value;
    this.applySettings();
    this.saveSettings();
  }

  applySettings(): void {
    // Criar ou atualizar a stylesheet de acessibilidade
    let style = document.getElementById('accessibility-styles');
    if (!style) {
      style = document.createElement('style');
      style.id = 'accessibility-styles';
      document.head.appendChild(style);
    }

    // Aplicar configurações via CSS
    let css = `
        html {
            font-size: ${this.settings.fontSize}% !important;
            letter-spacing: ${this.settings.letterSpacing}px !important;
            line-height: ${this.settings.lineHeight} !important;
        }
        body {
            font-size: ${this.settings.fontSize}% !important;
            letter-spacing: ${this.settings.letterSpacing}px !important;
            line-height: ${this.settings.lineHeight} !important;
        }
    `;

    if (this.settings.dyslexicFont) {
      css += `
            body, p, h1, h2, h3, h4, h5, h6, span, a {
                font-family: 'Open-Dyslexic', Comic Sans MS, sans-serif !important;
            }
        `;
    }

    switch (this.settings.contrast) {
      case 'high':
        css += `
                body {
                    background-color: white !important;
                    color: black !important;
                }
                a { color: #0000EE !important; }
            `;
        break;
      case 'inverted':
        css += `
                body {
                    background-color: black !important;
                    color: white !important;
                }
                img { filter: invert(1) !important; }
            `;
        break;
    }

    style.textContent = css;
  }

  saveSettings(): void {
    localStorage.setItem('accessibilitySettings', JSON.stringify(this.settings));
  }

  loadStoredSettings(): void {
    const stored = localStorage.getItem('accessibilitySettings');
    if (stored) {
      this.settings = JSON.parse(stored);
      this.applySettings();
    }
  }

  resetSettings(): void {
    this.settings = {
      fontSize: 100,
      contrast: 'normal',
      letterSpacing: 0,
      lineHeight: 'normal',
      dyslexicFont: false
    };
    this.applySettings();
    this.saveSettings();
  }
}
