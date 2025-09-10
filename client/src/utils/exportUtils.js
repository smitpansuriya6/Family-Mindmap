import html2canvas from 'html2canvas';

export const exportToPNG = async (element, filename = 'mindmap') => {
  if (!element) {
    throw new Error('No element provided for export');
  }

  try {
    // Find the React Flow container (not just viewport)
    const reactFlowContainer = element.querySelector('.react-flow');
    if (!reactFlowContainer) {
      throw new Error('React Flow container not found');
    }

    // Configure html2canvas to capture the entire container
    const canvas = await html2canvas(reactFlowContainer, {
      backgroundColor: '#f8f9fa',
      scale: 1, // Use normal scale to avoid sizing issues
      useCORS: true,
      allowTaint: false,
      width: reactFlowContainer.offsetWidth,
      height: reactFlowContainer.offsetHeight,
      scrollX: 0,
      scrollY: 0,
      logging: false,
      onclone: (clonedDoc) => {
        // Ensure the cloned element maintains full size
        const clonedElement = clonedDoc.querySelector('.react-flow');
        if (clonedElement) {
          clonedElement.style.width = reactFlowContainer.offsetWidth + 'px';
          clonedElement.style.height = reactFlowContainer.offsetHeight + 'px';
        }
      }
    });

    // Create and trigger download
    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return true;
  } catch (error) {
    console.error('PNG export failed:', error);
    throw error;
  }
};

export const exportToSVG = async (element, filename = 'mindmap') => {
  // Future implementation for SVG export
  console.log('SVG export not implemented yet');
  throw new Error('SVG export not implemented yet');
};

export const getExportPreview = async (element) => {
  if (!element) return null;

  try {
    const viewport = element.querySelector('.react-flow__viewport');
    if (!viewport) return null;

    const canvas = await html2canvas(viewport, {
      backgroundColor: '#f8f9fa',
      scale: 0.5, // Lower resolution for preview
      width: 400,
      height: 300,
      logging: false,
    });

    return canvas.toDataURL('image/png', 0.8);
  } catch (error) {
    console.error('Preview generation failed:', error);
    return null;
  }
};
