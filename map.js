// ===================== INTERACTIVE PACIFIC SVG MAP =====================
import { countryData, mapNodes } from './data.js';

// Sizing helper function
function getActiveSize(country, mode, node) {
    if (mode === 'affected') {
        const scale = Math.sqrt(country.affected) / 32;
        return Math.max(8, Math.min(38, scale));
    } else if (mode === 'economic') {
        const scale = Math.sqrt(country.economic) / 350;
        return Math.max(8, Math.min(42, scale));
    } else if (mode === 'climate') {
        const atolls = ["Marshall Islands", "Tuvalu", "Kiribati", "Nauru"];
        return atolls.includes(country.name) ? 34 : 10;
    }
    return node.size;
}

// Color and Gradient helper function
function getActiveColorAndGrad(country, mode) {
    if (mode === 'affected') {
        if (country.subregion === "Melanesia") return { color: "#FF6B4A", grad: "url(#grad-melanesia)" };
        if (country.subregion === "Micronesia") return { color: "#0E8A8A", grad: "url(#grad-micronesia)" };
        return { color: "#D9A441", grad: "url(#grad-polynesia)" };
    } else if (mode === 'economic') {
        return { color: "#D9A441", grad: "url(#grad-polynesia)" };
    } else if (mode === 'climate') {
        const atolls = ["Marshall Islands", "Tuvalu", "Kiribati", "Nauru"];
        if (atolls.includes(country.name)) return { color: "#BFE7E3", grad: "url(#grad-climate)" };
        return { color: "#3E8F5A", grad: "url(#grad-micronesia)" };
    }
    return { color: "#0E8A8A", grad: "url(#grad-micronesia)" };
}

export function initPacificMap(onCountrySelect) {
    const container = document.getElementById('pacific-svg-map-container');
    if (!container) return;

    // Clear existing elements
    container.innerHTML = '';

    // Create SVG Element
    const svgNamespace = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNamespace, "svg");
    svg.setAttribute("viewBox", "0 0 960 520");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.style.background = "radial-gradient(circle at center, rgba(4, 42, 56, 0.5) 0%, rgba(3, 24, 32, 0.9) 100%)";
    svg.style.borderRadius = "24px";
    svg.style.border = "1px solid rgba(255, 255, 255, 0.05)";
    svg.style.boxShadow = "inset 0 0 60px rgba(0, 0, 0, 0.5)";

    // Add Definitions for Gradients
    const defs = document.createElementNS(svgNamespace, "defs");
    
    // Gradient for Melanesia (Coral Alert)
    const gradMela = document.createElementNS(svgNamespace, "radialGradient");
    gradMela.setAttribute("id", "grad-melanesia");
    gradMela.innerHTML = `<stop offset="0%" stop-color="#FF6B4A" stop-opacity="0.8"/><stop offset="100%" stop-color="#FF6B4A" stop-opacity="0.1"/>`;
    defs.appendChild(gradMela);
    
    // Gradient for Micronesia (Teal)
    const gradMicro = document.createElementNS(svgNamespace, "radialGradient");
    gradMicro.setAttribute("id", "grad-micronesia");
    gradMicro.innerHTML = `<stop offset="0%" stop-color="#0E8A8A" stop-opacity="0.8"/><stop offset="100%" stop-color="#0E8A8A" stop-opacity="0.1"/>`;
    defs.appendChild(gradMicro);

    // Gradient for Polynesia (Gold)
    const gradPoly = document.createElementNS(svgNamespace, "radialGradient");
    gradPoly.setAttribute("id", "grad-polynesia");
    gradPoly.innerHTML = `<stop offset="0%" stop-color="#D9A441" stop-opacity="0.8"/><stop offset="100%" stop-color="#D9A441" stop-opacity="0.1"/>`;
    defs.appendChild(gradPoly);

    // Gradient for Climate Vulnerability (Cyan/Aqua Alert)
    const gradClimate = document.createElementNS(svgNamespace, "radialGradient");
    gradClimate.setAttribute("id", "grad-climate");
    gradClimate.innerHTML = `<stop offset="0%" stop-color="#BFE7E3" stop-opacity="0.8"/><stop offset="100%" stop-color="#0E8A8A" stop-opacity="0.05"/>`;
    defs.appendChild(gradClimate);

    svg.appendChild(defs);

    // Render Grid Lines
    const gridGroup = document.createElementNS(svgNamespace, "g");
    gridGroup.setAttribute("stroke", "rgba(255, 255, 255, 0.03)");
    gridGroup.setAttribute("stroke-width", "1");
    for (let i = 80; i < 960; i += 80) {
        const line = document.createElementNS(svgNamespace, "line");
        line.setAttribute("x1", i); line.setAttribute("y1", 0);
        line.setAttribute("x2", i); line.setAttribute("y2", 520);
        gridGroup.appendChild(line);
    }
    for (let j = 65; j < 520; j += 65) {
        const line = document.createElementNS(svgNamespace, "line");
        line.setAttribute("x1", 0); line.setAttribute("y1", j);
        line.setAttribute("x2", 960); line.setAttribute("y2", j);
        gridGroup.appendChild(line);
    }
    svg.appendChild(gridGroup);

    // Render Subregion Boundaries / Reference Lines
    const boundaryGroup = document.createElementNS(svgNamespace, "g");
    boundaryGroup.setAttribute("fill", "none");
    boundaryGroup.setAttribute("stroke", "rgba(255, 255, 255, 0.08)");
    boundaryGroup.setAttribute("stroke-width", "1.5");
    boundaryGroup.setAttribute("stroke-dasharray", "4,6");

    const divider1 = document.createElementNS(svgNamespace, "path");
    divider1.setAttribute("d", "M 50,200 L 380,200 L 520,240 Z");
    boundaryGroup.appendChild(divider1);

    const divider2 = document.createElementNS(svgNamespace, "path");
    divider2.setAttribute("d", "M 500,50 L 500,240 L 700,240 L 700,500");
    boundaryGroup.appendChild(divider2);
    
    svg.appendChild(boundaryGroup);

    // Add Labels for Subregions
    const subregionsLabels = [
        { name: "MELANESIA", x: 220, y: 380, color: "#FF6B4A" },
        { name: "MICRONESIA", x: 250, y: 90, color: "#0E8A8A" },
        { name: "POLYNESIA", x: 740, y: 220, color: "#D9A441" }
    ];

    subregionsLabels.forEach(sub => {
        const text = document.createElementNS(svgNamespace, "text");
        text.setAttribute("x", sub.x);
        text.setAttribute("y", sub.y);
        text.setAttribute("fill", sub.color);
        text.setAttribute("font-family", "'Space Grotesk', sans-serif");
        text.setAttribute("font-size", "14px");
        text.setAttribute("font-weight", "800");
        text.setAttribute("letter-spacing", "6px");
        text.setAttribute("opacity", "0.18");
        text.textContent = sub.name;
        svg.appendChild(text);
    });

    // Tooltip Element Creation
    let tooltip = document.querySelector('.map-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.className = 'map-tooltip';
        tooltip.style.position = 'fixed';
        tooltip.style.pointerEvents = 'none';
        tooltip.style.opacity = '0';
        tooltip.style.zIndex = '1000';
        tooltip.style.background = 'rgba(3, 28, 38, 0.96)';
        tooltip.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        tooltip.style.padding = '16px 20px';
        tooltip.style.borderRadius = '18px';
        tooltip.style.color = '#F7F3EA';
        tooltip.style.fontSize = '12.5px';
        tooltip.style.boxShadow = '0 25px 60px rgba(0,0,0,0.6)';
        tooltip.style.backdropFilter = 'blur(20px)';
        tooltip.style.transition = 'opacity 0.2s ease';
        tooltip.style.transform = 'translate(-50%, -120%)';
        document.body.appendChild(tooltip);
    }

    // Active mode state: 'affected' (default), 'economic', 'climate'
    let currentMode = 'affected';
    const nodeElements = [];

    // Nodes group
    const nodesGroup = document.createElementNS(svgNamespace, "g");

    mapNodes.forEach(node => {
        const country = countryData.find(c => c.name === node.name);
        if (!country) return;

        // Parent Group for Node Interactivity
        const g = document.createElementNS(svgNamespace, "g");
        g.style.cursor = "pointer";

        // Outer Glow Circle
        const outerCircle = document.createElementNS(svgNamespace, "circle");
        outerCircle.setAttribute("cx", node.x);
        outerCircle.setAttribute("cy", node.y);
        g.appendChild(outerCircle);

        // Core Solid Circle
        const coreCircle = document.createElementNS(svgNamespace, "circle");
        coreCircle.setAttribute("cx", node.x);
        coreCircle.setAttribute("cy", node.y);
        coreCircle.setAttribute("stroke", "#031c26");
        coreCircle.setAttribute("stroke-width", "2.5");
        g.appendChild(coreCircle);

        // Text Label for Country
        const label = document.createElementNS(svgNamespace, "text");
        label.setAttribute("x", node.x);
        label.setAttribute("text-anchor", "middle");
        label.setAttribute("font-family", "'Inter', sans-serif");
        label.setAttribute("font-size", "9px");
        label.setAttribute("font-weight", "600");
        label.setAttribute("letter-spacing", "0.5px");
        label.style.pointerEvents = "none";
        label.textContent = country.name;
        g.appendChild(label);

        // Store references for updates
        nodeElements.push({
            node,
            country,
            outerCircle,
            coreCircle,
            label
        });

        // Hover & Mouse Interaction Events
        g.addEventListener('mouseenter', () => {
            const size = getActiveSize(country, currentMode, node);
            const { color } = getActiveColorAndGrad(country, currentMode);

            outerCircle.setAttribute("r", size * 2.2);
            outerCircle.setAttribute("opacity", "0.85");
            coreCircle.setAttribute("r", size * 0.95);
            coreCircle.setAttribute("stroke", "#fff");
            label.setAttribute("fill", "#fff");

            // Build dynamic Tooltip HTML based on currentMode
            let dataValueHtml = '';
            if (currentMode === 'affected') {
                dataValueHtml = `
                    <div style="font-size: 10px; color: rgba(255,255,255,0.4); text-transform: uppercase;">Orang Terdampak</div>
                    <div style="font-size: 14px; font-weight: 800; color: #FF6B4A;">${country.affected.toLocaleString('id-ID')} jiwa</div>
                `;
            } else if (currentMode === 'economic') {
                dataValueHtml = `
                    <div style="font-size: 10px; color: rgba(255,255,255,0.4); text-transform: uppercase;">Kerugian Ekonomi</div>
                    <div style="font-size: 14px; font-weight: 800; color: #D9A441;">$${(country.economic/1000000).toFixed(1)} juta USD</div>
                `;
            } else if (currentMode === 'climate') {
                const isAtoll = ["Marshall Islands", "Tuvalu", "Kiribati", "Nauru"].includes(country.name);
                const vuln = isAtoll 
                    ? '<span style="color:#FF6B4A; font-weight:bold;">Sangat Kritis (Atoll Rendah)</span>' 
                    : '<span style="color:#3E8F5A; font-weight:bold;">Sedang (Vulkanik Tinggi)</span>';
                dataValueHtml = `
                    <div style="font-size: 10px; color: rgba(255,255,255,0.4); text-transform: uppercase;">Ancaman Kenaikan Muka Air Laut</div>
                    <div style="font-size: 12.5px; font-weight: bold; margin-top: 2px;">Status: ${vuln}</div>
                `;
            }

            tooltip.innerHTML = `
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                    <span style="font-size: 22px;">${country.flagEmoji}</span>
                    <strong style="font-size: 14.5px; font-family: 'Space Grotesk', sans-serif; letter-spacing: 0.5px;">${country.name}</strong>
                </div>
                <div style="color: rgba(255, 255, 255, 0.4); text-transform: uppercase; font-size: 9px; letter-spacing: 1px; margin-bottom: 8px;">
                    Subregion: <span style="color: ${color}; font-weight: bold;">${country.subregion}</span>
                </div>
                <div style="border-top: 1px solid rgba(255,255,255,0.06); padding-top: 8px; margin-top: 6px;">
                    ${dataValueHtml}
                </div>
            `;
            tooltip.style.opacity = '1';
        });

        g.addEventListener('mouseleave', () => {
            const size = getActiveSize(country, currentMode, node);
            outerCircle.setAttribute("r", size * 1.5);
            outerCircle.setAttribute("opacity", "0.55");
            coreCircle.setAttribute("r", size * 0.7);
            coreCircle.setAttribute("stroke", "#031c26");
            label.setAttribute("fill", "rgba(255, 255, 255, 0.55)");
            tooltip.style.opacity = '0';
        });

        g.addEventListener('mousemove', (e) => {
            tooltip.style.left = e.clientX + 'px';
            tooltip.style.top = e.clientY + 'px';
        }, { passive: true });

        g.addEventListener('click', () => {
            onCountrySelect(country.name);
        });

        nodesGroup.appendChild(g);
    });

    svg.appendChild(nodesGroup);
    container.appendChild(svg);

    // Render loop function
    function renderMapVisuals() {
        nodeElements.forEach(({ node, country, outerCircle, coreCircle, label }) => {
            const size = getActiveSize(country, currentMode, node);
            const { color, grad } = getActiveColorAndGrad(country, currentMode);

            // Sizing transitions
            outerCircle.setAttribute("r", size * 1.5);
            outerCircle.setAttribute("fill", grad);
            outerCircle.setAttribute("opacity", "0.55");
            outerCircle.style.transition = "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

            coreCircle.setAttribute("r", size * 0.7);
            coreCircle.setAttribute("fill", color);
            coreCircle.style.transition = "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

            label.setAttribute("y", node.y + size * 1.25);
            label.style.transition = "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        });
    }

    // Initialize visuals
    renderMapVisuals();

    // Bind Map Switch Mode Buttons
    document.querySelectorAll('.map-mode-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.map-mode-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentMode = this.dataset.mode;
            renderMapVisuals();
        });
    });
}
export default initPacificMap;
