let previewTimeout;
let closeTimeout;
let previewFrame = null;
let isOverFrame = false;

document.addEventListener('mouseover', (event) => {
  const link = event.target.closest('a');
  
  // If hovering over a valid link AND Alt is pressed
  if (link && link.href && event.altKey) {
    clearTimeout(previewTimeout);
    clearTimeout(closeTimeout);

    previewTimeout = setTimeout(() => {
      createPreview(link.href, event.clientX, event.clientY);
    }, 300);
  }
});

document.addEventListener('mouseout', (event) => {
  const link = event.target.closest('a');
  if (link) {
    clearTimeout(previewTimeout);
    // Give the user 200ms to move their cursor from the link into the preview window
    startCloseTimeout();
  }
});

function createPreview(url, mouseX, mouseY) {
  if (previewFrame) return; // Don't recreate if already open

  previewFrame = document.createElement('div');
  previewFrame.className = 'hoverpeek-container';

  // Keep preview open if mouse enters the preview container
  previewFrame.addEventListener('mouseenter', () => {
    isOverFrame = true;
    clearTimeout(closeTimeout);
  });

  // Close preview when mouse leaves the preview container
  previewFrame.addEventListener('mouseleave', () => {
    isOverFrame = false;
    startCloseTimeout();
  });

  const iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.className = 'hoverpeek-iframe';

  const header = document.createElement('div');
  header.className = 'hoverpeek-header';
  header.textContent = `Previewing: ${url.substring(0, 50)}...`;

  previewFrame.appendChild(header);
  previewFrame.appendChild(iframe);
  document.body.appendChild(previewFrame);

  // Positioning logic
  const boxWidth = 450;
  const boxHeight = 350;
  let topPosition = mouseY + window.scrollY + 10;
  let leftPosition = mouseX + window.scrollX + 10;

  if (mouseX + boxWidth > window.innerWidth) {
    leftPosition = mouseX + window.scrollX - boxWidth - 10;
  }
  if (mouseY + boxHeight > window.innerHeight) {
    topPosition = mouseY + window.scrollY - boxHeight - 10;
  }

  previewFrame.style.top = `${topPosition}px`;
  previewFrame.style.left = `${leftPosition}px`;
}

function startCloseTimeout() {
  clearTimeout(closeTimeout);
  closeTimeout = setTimeout(() => {
    if (!isOverFrame) {
      removePreview();
    }
  }, 200); // 200ms grace period to cross the gap
}

function removePreview() {
  if (previewFrame) {
    previewFrame.remove();
    previewFrame = null;
    isOverFrame = false;
  }
}