const fs = require('fs');
const data = fs.readFileSync('cuberto_html.html', 'utf8');

// Find all elements with classes that might be related to services or cards
const sections = data.split('<section');
const servicesSectionHTML = sections.find(s => s.toLowerCase().includes('services'));
if(servicesSectionHTML) {
    fs.writeFileSync('services_section.html', '<section' + servicesSectionHTML);
    console.log('Saved to services_section.html');
} else {
    console.log('Not found');
}
