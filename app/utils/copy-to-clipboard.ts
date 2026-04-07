export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    // if (navigator.clipboard && window.isSecureContext) {
    //   await navigator.clipboard.writeText(text)
    // }

    const pre = document.createElement('pre');
    pre.textContent = text;
    pre.style.position = 'absolute';
    pre.style.left = '-9999px';
    pre.style.opacity = '0';
    pre.style.userSelect = 'text';
    pre.setAttribute('contenteditable', 'true');

    document.body.appendChild(pre);

    const range = document.createRange();
    range.selectNodeContents(pre);
    const selection = window.getSelection();

    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }

    document.execCommand('copy');

    if (selection) {
      selection.removeAllRanges();
    }
    document.body.removeChild(pre);
  } catch (error) {
    console.error('Pre copy failed:', error);
  }
};
