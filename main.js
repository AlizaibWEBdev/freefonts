        // Add event delegation for download buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('download-btn')) {
        const fontName = e.target.getAttribute('data-font-name');
        const cdnUrl = e.target.getAttribute('data-cdn-url');
        downloadFont(fontName, cdnUrl);
    }
});

// Define the download function
function downloadFont(fontName, cdnUrl) {
    // First try to extract direct font file URL from CDN
    let fontFileUrl = '';
    
    // Handle Google Fonts CDN URL
    if (cdnUrl.includes('fonts.googleapis.com')) {
        const familyParam = cdnUrl.match(/family=([^&]+)/)[1];
        const fontId = familyParam.split(':')[0].replace(/\+/g, ' ');
        fontFileUrl = `https://fonts.google.com/download?family=${encodeURIComponent(fontId)}`;
    } 
    // Handle other CDNs or fallback
    else {
        fontFileUrl = cdnUrl;
    }
    
    // Create temporary download link
    const link = document.createElement('a');
    link.href = fontFileUrl;
    link.download = `${fontName.replace(/\s+/g, '_')}.zip`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


        document.addEventListener('DOMContentLoaded', function () {



            const fontsContainer = document.getElementById('fonts-container');
            const searchInput = document.getElementById('font-search');

            let fontsData = [];

            // Load fonts from JSON
            fetch('./fonts.json')
                .then(response => response.json())
                .then(data => {
                    fontsData = data;
                    renderFonts(data);

                    // Load all font faces
                    data.forEach(font => {
                        if (font.cdn) {
                            const link = document.createElement('link');
                            link.href = font.cdn;
                            link.rel = 'stylesheet';
                            document.head.appendChild(link);
                        }
                    });
                })
                .catch(error => {
                    console.error('Error loading fonts:', error);
                    fontsContainer.innerHTML = `
                        <div class="bg-white p-8 rounded-lg shadow-sm text-center">
                            <h3 class="text-lg font-medium text-gray-900 mb-2">Error Loading Fonts</h3>
                            <p class="text-gray-600">Please try again later or refresh the page.</p>
                        </div>
                    `;
                });

            // Search functionality
            searchInput.addEventListener('input', function () {
                const searchTerm = this.value.toLowerCase();
                const filteredFonts = fontsData.filter(font =>
                    font.name.toLowerCase().includes(searchTerm)
                );
                renderFonts(filteredFonts);
            });










            // Inside your existing script, replace the renderFonts function with this:
            function renderFonts(fonts) {
                if (fonts.length === 0) {
                    fontsContainer.innerHTML = `
            <div class="bg-white p-8 rounded-lg shadow-sm text-center">
                <h3 class="text-lg font-medium text-gray-900 mb-2">No Fonts Found</h3>
                <p class="text-gray-600">Try a different search term.</p>
            </div>
        `;
                    return;
                }

                fontsContainer.innerHTML = fonts.map(font => `
        <div class="font-card bg-white rounded-xl shadow-sm overflow-hidden">
            <div class="p-8 border-b border-gray-100" style="font-family: '${font.family || font.name}', sans-serif; min-height: 180px; display: flex; align-items: center; justify-content: center;">
                <div class="text-center">
                    <p class="text-2xl md:text-3xl font-medium">${font.name}</p>
                    <p class="mt-4 text-gray-600">${font.previewText || 'The quick brown fox jumps over the lazy dog'}</p>
                </div>
            </div>
            <div class="p-6">
                <div class="flex justify-between items-center">
                    <div>
                        <h3 class="text-lg font-bold text-gray-900">${font.name}</h3>
                        <p class="text-sm text-gray-500 mt-1">${font.category || 'Sans-serif'} • Free for commercial use</p>
                    </div>
                    <button onclick="downloadFont('${font.name}', '${font.cdn}')" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium text-sm">
                        Download
                    </button>
                </div>
            </div>
        </div>
    `).join('');
            }

            // Add this new function to handle downloads





















        });
  
  