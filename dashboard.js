// ===================== CORE DASHBOARD CONTROLLER & VISUALIZATION =====================
import { 
    historiData, 
    countryData, 
    climateData, 
    populationData, 
    drrData, 
    countryYearlyData, 
    drrStatus 
} from './data.js';

// Global variables to hold chart instances for updating
let historiChart, negaraChart, climateChart, bubbleChart, ekonomiChart, populasiChart, kesiapanChart, storyTrendChart;

// Chart.js Theme Defaults configuration
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.color = 'rgba(255, 255, 255, 0.7)';
Chart.defaults.scale.grid.color = 'rgba(255, 255, 255, 0.03)';

const colors = {
    teal: '#0E8A8A', 
    coral: '#FF6B4A', 
    gold: '#D9A441', 
    green: '#3E8F5A', 
    deep: '#031c26', 
    aqua: '#BFE7E3'
};

export function initDashboardCharts() {
    // ----------------- 1. Histori Chart -----------------
    const historiCtx = document.getElementById('historiChart');
    if (historiCtx) {
        historiChart = new Chart(historiCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: historiData.years,
                datasets: [{
                    label: 'Orang Terdampak',
                    data: historiData.affected,
                    borderColor: colors.teal, 
                    backgroundColor: 'rgba(14, 138, 138, 0.08)',
                    borderWidth: 3, 
                    fill: true, 
                    tension: 0.4,
                    pointBackgroundColor: colors.teal, 
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2, 
                    pointRadius: 6, 
                    pointHoverRadius: 10
                }, {
                    label: 'Kematian', 
                    data: historiData.deaths,
                    borderColor: colors.coral, 
                    backgroundColor: 'transparent',
                    borderWidth: 2, 
                    borderDash: [5, 5], 
                    tension: 0.4,
                    pointBackgroundColor: colors.coral, 
                    pointRadius: 5, 
                    yAxisID: 'y1'
                }]
            },
            options: {
                responsive: true, 
                maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                plugins: {
                    legend: { position: 'top', labels: { usePointStyle: true, padding: 20, color: 'rgba(255,255,255,0.7)' } },
                    tooltip: {
                        backgroundColor: 'rgba(3, 28, 38, 0.95)', 
                        titleColor: '#fff', 
                        bodyColor: 'rgba(255,255,255,0.8)',
                        titleFont: { family: 'Space Grotesk', size: 14, weight: 'bold' },
                        bodyFont: { family: 'Inter', size: 13 },
                        padding: 15, 
                        cornerRadius: 12, 
                        borderColor: 'rgba(255,255,255,0.1)', 
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) label += ': ';
                                label += context.parsed.y.toLocaleString('id-ID');
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    y: { 
                        beginAtZero: true, 
                        ticks: { color: 'rgba(255,255,255,0.5)', callback: function(v) { return v.toLocaleString('id-ID'); } }, 
                        grid: { color: 'rgba(255,255,255,0.03)' } 
                    },
                    y1: { 
                        position: 'right', 
                        beginAtZero: true, 
                        grid: { drawOnChartArea: false }, 
                        ticks: { color: 'rgba(255,255,255,0.5)', callback: function(v) { return v.toLocaleString('id-ID'); } } 
                    },
                    x: { ticks: { color: 'rgba(255,255,255,0.5)' }, grid: { display: false } }
                }
            }
        });
    }

    // ----------------- 2. Negara Chart (Horizontal Bar) -----------------
    const negaraCtx = document.getElementById('negaraChart');
    if (negaraCtx) {
        negaraChart = new Chart(negaraCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: countryData.map(d => d.name),
                datasets: [{
                    label: 'Total Terdampak',
                    data: countryData.map(d => d.affected),
                    backgroundColor: countryData.map((d, i) => { 
                        if (i < 3) return colors.coral; 
                        if (i < 5) return colors.teal; 
                        return 'rgba(191, 231, 227, 0.3)'; 
                    }),
                    borderRadius: 8, 
                    borderSkipped: false
                }]
            },
            options: {
                indexAxis: 'y', 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(3, 28, 38, 0.95)', 
                        titleColor: '#fff', 
                        bodyColor: 'rgba(255,255,255,0.8)',
                        padding: 15, 
                        cornerRadius: 12, 
                        borderColor: 'rgba(255,255,255,0.1)', 
                        borderWidth: 1,
                        callbacks: {
                            afterLabel: function(context) {
                                const c = countryData[context.dataIndex];
                                return [
                                    'Kematian: ' + c.deaths.toLocaleString('id-ID'), 
                                    'Hilang: ' + c.missing.toLocaleString('id-ID'), 
                                    'Kerugian Ekonomi: $' + (c.economic/1000000).toFixed(1) + 'M'
                                ];
                            }
                        }
                    }
                },
                scales: {
                    x: { ticks: { color: 'rgba(255,255,255,0.5)', callback: function(v) { return (v/1000000).toFixed(1) + 'M'; } }, grid: { color: 'rgba(255,255,255,0.03)' } },
                    y: { ticks: { color: 'rgba(255,255,255,0.7)' }, grid: { display: false } }
                }
            }
        });

        // Event listener for subregion filtering
        const subregionSelect = document.getElementById('subregionFilter');
        if (subregionSelect) {
            subregionSelect.addEventListener('change', function(e) {
                const subregion = e.target.value;
                let filtered = countryData;
                if (subregion !== 'all') {
                    filtered = countryData.filter(d => d.subregion === subregion);
                }
                negaraChart.data.labels = filtered.map(d => d.name);
                negaraChart.data.datasets[0].data = filtered.map(d => d.affected);
                negaraChart.data.datasets[0].backgroundColor = filtered.map((d, i) => { 
                    if (i < 3) return colors.coral; 
                    if (i < 5) return colors.teal; 
                    return 'rgba(191, 231, 227, 0.3)'; 
                });
                negaraChart.update();
            });
        }
    }

    // ----------------- 3. Climate Chart -----------------
    const climateCtx = document.getElementById('climateChart');
    if (climateCtx) {
        const climateDatasets = {
            temperature: { label: 'Anomali Suhu (°C)', data: climateData.temperature, borderColor: colors.coral, backgroundColor: 'rgba(255,107,74,0.08)', fill: true },
            rainfall: { label: 'Anomali Curah Hujan (%)', data: climateData.rainfall, borderColor: colors.teal, backgroundColor: 'rgba(14,138,138,0.08)', fill: true },
            sealevel: { label: 'Anomali Muka Laut (mm)', data: climateData.sealevel, borderColor: colors.aqua, backgroundColor: 'rgba(191,231,227,0.08)', fill: true }
        };

        climateChart = new Chart(climateCtx.getContext('2d'), {
            type: 'line',
            data: { labels: climateData.years, datasets: [climateDatasets.temperature] },
            options: {
                responsive: true, 
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top', labels: { color: 'rgba(255,255,255,0.7)' } }, 
                    tooltip: {
                        backgroundColor: 'rgba(3, 28, 38, 0.95)', 
                        titleColor: '#fff', 
                        bodyColor: 'rgba(255,255,255,0.8)', 
                        padding: 15, 
                        cornerRadius: 12, 
                        borderColor: 'rgba(255,255,255,0.1)', 
                        borderWidth: 1
                    }
                },
                scales: {
                    y: { beginAtZero: false, ticks: { color: 'rgba(255,255,255,0.5)' }, grid: { color: 'rgba(255,255,255,0.03)' } }, 
                    x: { ticks: { color: 'rgba(255,255,255,0.5)' }, grid: { display: false } }
                }
            }
        });

        // Toggle logic for climate variables
        document.querySelectorAll('.toggle-chip[data-chart]').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.toggle-chip[data-chart]').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                climateChart.data.datasets = [climateDatasets[this.dataset.chart]];
                climateChart.update();
            });
        });
    }

    // ----------------- 4. Bubble Chart -----------------
    const bubbleCtx = document.getElementById('bubbleChart');
    if (bubbleCtx) {
        const createBubbleData = (filterCountry) => {
            let data = countryData;
            if (filterCountry && filterCountry !== 'all') {
                data = countryData.filter(d => d.name === filterCountry);
            }
            return data.map(d => ({
                x: d.affected, 
                y: d.deaths, 
                r: Math.max(6, Math.sqrt(d.missing) * 3), 
                country: d.name, 
                missing: d.missing, 
                economic: d.economic
            }));
        };

        bubbleChart = new Chart(bubbleCtx.getContext('2d'), {
            type: 'bubble',
            data: {
                datasets: [{
                    label: 'Negara',
                    data: createBubbleData(),
                    backgroundColor: countryData.map((d, i) => { 
                        const o = 0.75; 
                        if (i < 3) return 'rgba(255,107,74,'+o+')'; 
                        if (i < 5) return 'rgba(14,138,138,'+o+')'; 
                        return 'rgba(191,231,227,'+o*0.5+')'; 
                    }),
                    borderColor: countryData.map((d, i) => { 
                        if (i < 3) return colors.coral; 
                        if (i < 5) return colors.teal; 
                        return colors.aqua; 
                    }),
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true, 
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(3, 28, 38, 0.95)', 
                        titleColor: '#fff', 
                        bodyColor: 'rgba(255,255,255,0.8)',
                        padding: 15, 
                        cornerRadius: 12, 
                        borderColor: 'rgba(255,255,255,0.1)', 
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                const p = context.raw;
                                return [
                                    p.country, 
                                    'Terdampak: ' + p.x.toLocaleString('id-ID') + ' jiwa', 
                                    'Kematian: ' + p.y.toLocaleString('id-ID'), 
                                    'Hilang: ' + p.missing.toLocaleString('id-ID'), 
                                    'Kerugian Ekonomi: $' + (p.economic/1000000).toFixed(1) + 'M'
                                ];
                            }
                        }
                    }
                },
                scales: {
                    x: { title: { display: true, text: 'Total Orang Terdampak', color: 'rgba(255,255,255,0.5)' }, ticks: { color: 'rgba(255,255,255,0.5)', callback: function(v) { return (v/1000000).toFixed(1) + 'M'; } }, grid: { color: 'rgba(255,255,255,0.03)' } },
                    y: { title: { display: true, text: 'Total Kematian', color: 'rgba(255,255,255,0.5)' }, ticks: { color: 'rgba(255,255,255,0.5)' }, grid: { color: 'rgba(255,255,255,0.03)' } }
                }
            }
        });

        const bubbleFilterSelect = document.getElementById('bubbleFilter');
        if (bubbleFilterSelect) {
            bubbleFilterSelect.addEventListener('change', function(e) {
                bubbleChart.data.datasets[0].data = createBubbleData(e.target.value);
                bubbleChart.update();
            });
        }
    }

    // ----------------- 5. Ekonomi Chart (Vertical Bar) -----------------
    const ekonomiCtx = document.getElementById('ekonomiChart');
    if (ekonomiCtx) {
        ekonomiChart = new Chart(ekonomiCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: countryData.map(d => d.name),
                datasets: [{
                    label: 'Kerugian Ekonomi (USD)',
                    data: countryData.map(d => d.economic),
                    backgroundColor: countryData.map((d, i) => { 
                        if (i === 0) return colors.gold; 
                        if (i < 3) return 'rgba(217,164,65,'+(0.7-i*0.1)+')'; 
                        return 'rgba(191, 231, 227, 0.25)'; 
                    }),
                    borderRadius: 8, 
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true, 
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { 
                        backgroundColor: 'rgba(3, 28, 38, 0.95)', 
                        titleColor: '#fff', 
                        bodyColor: 'rgba(255,255,255,0.8)', 
                        padding: 15, 
                        cornerRadius: 12, 
                        borderColor: 'rgba(255,255,255,0.1)', 
                        borderWidth: 1, 
                        callbacks: { label: function(c) { return 'Kerugian: $' + (c.parsed.y/1000000).toFixed(1) + ' juta'; } } 
                    }
                },
                scales: {
                    y: { ticks: { color: 'rgba(255,255,255,0.5)', callback: function(v) { return '$' + (v/1000000).toFixed(0) + 'M'; } }, grid: { color: 'rgba(255,255,255,0.03)' } },
                    x: { ticks: { color: 'rgba(255,255,255,0.7)' }, grid: { display: false } }
                }
            }
        });
    }

    // ----------------- 6. Populasi Chart (Dual Axis) -----------------
    const populasiCtx = document.getElementById('populasiChart');
    if (populasiCtx) {
        populasiChart = new Chart(populasiCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: populationData.years,
                datasets: [{
                    label: 'Populasi Pasifik (ribu)', 
                    data: populationData.population,
                    borderColor: colors.teal, 
                    backgroundColor: 'rgba(14,138,138,0.08)',
                    borderWidth: 3, 
                    fill: true, 
                    tension: 0.4, 
                    yAxisID: 'y'
                }, {
                    label: 'Orang Terdampak', 
                    data: historiData.affected,
                    borderColor: colors.coral, 
                    backgroundColor: 'transparent',
                    borderWidth: 2, 
                    borderDash: [5,5], 
                    tension: 0.4, 
                    yAxisID: 'y1'
                }]
            },
            options: {
                responsive: true, 
                maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                plugins: {
                    legend: { position: 'top', labels: { color: 'rgba(255,255,255,0.7)' } }, 
                    tooltip: { 
                        backgroundColor: 'rgba(3, 28, 38, 0.95)', 
                        titleColor: '#fff', 
                        bodyColor: 'rgba(255,255,255,0.8)', 
                        padding: 15, 
                        cornerRadius: 12, 
                        borderColor: 'rgba(255,255,255,0.1)', 
                        borderWidth: 1 
                    }
                },
                scales: {
                    y: { 
                        position: 'left', 
                        title: { display: true, text: 'Populasi (ribu)', color: 'rgba(255,255,255,0.5)' }, 
                        ticks: { color: 'rgba(255,255,255,0.5)', callback: function(v) { return v + 'k'; } }, 
                        grid: { color: 'rgba(255,255,255,0.03)' } 
                    },
                    y1: { 
                        position: 'right', 
                        title: { display: true, text: 'Orang Terdampak', color: 'rgba(255,255,255,0.5)' }, 
                        grid: { drawOnChartArea: false }, 
                        ticks: { color: 'rgba(255,255,255,0.5)', callback: function(v) { return (v/1000).toFixed(0) + 'k'; } } 
                    },
                    x: { ticks: { color: 'rgba(255,255,255,0.5)' }, grid: { display: false } }
                }
            }
        });
    }

    // ----------------- 7. Kesiapan Chart -----------------
    const kesiapanCtx = document.getElementById('kesiapanChart');
    if (kesiapanCtx) {
        kesiapanChart = new Chart(kesiapanCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: drrData.map(d => d.country),
                datasets: [{
                    label: 'Pemerintah Lokal dengan Strategi DRR (%)',
                    data: drrData.map(d => d.value),
                    backgroundColor: drrData.map((d) => { 
                        if (d.value >= 80) return colors.green; 
                        if (d.value >= 60) return colors.teal; 
                        return colors.gold; 
                    }),
                    borderRadius: 8, 
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true, 
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { 
                        backgroundColor: 'rgba(3, 28, 38, 0.95)', 
                        titleColor: '#fff', 
                        bodyColor: 'rgba(255,255,255,0.8)', 
                        padding: 15, 
                        cornerRadius: 12, 
                        borderColor: 'rgba(255,255,255,0.1)', 
                        borderWidth: 1, 
                        callbacks: { label: function(c) { return c.parsed.y + '% pemerintah lokal dengan strategi DRR'; } } 
                    }
                },
                scales: {
                    y: { beginAtZero: true, max: 100, ticks: { color: 'rgba(255,255,255,0.5)', callback: function(v) { return v + '%'; } }, grid: { color: 'rgba(255,255,255,0.03)' } },
                    x: { ticks: { color: 'rgba(255,255,255,0.7)' }, grid: { display: false } }
                }
            }
        });
    }
}

// ----------------- 8. Country Story Spotlight Updater -----------------
export function updateStoryPanel(countryName) {
    const country = countryData.find(d => d.name === countryName);
    const yearly = countryYearlyData[countryName];
    const drr = drrStatus[countryName];
    
    if (!country || !yearly || !drr) return;

    // Update Text Elements
    document.getElementById('storyFlag').textContent = country.flagEmoji;
    document.getElementById('storyCountryName').textContent = countryName;
    document.getElementById('storySubregion').textContent = country.subregion;
    
    // Update Stats panel
    document.getElementById('storyStats').innerHTML = `
        <div class="story-stat"><div class="story-stat-icon">👥</div><div class="story-stat-value">${country.affected.toLocaleString('id-ID')}</div><div class="story-stat-label">Orang Terdampak</div></div>
        <div class="story-stat"><div class="story-stat-icon" style="color:${colors.coral}">💀</div><div class="story-stat-value" style="color:${colors.coral}">${country.deaths.toLocaleString('id-ID')}</div><div class="story-stat-label">Kematian</div></div>
        <div class="story-stat"><div class="story-stat-icon" style="color:${colors.teal}">❓</div><div class="story-stat-value" style="color:${colors.teal}">${country.missing.toLocaleString('id-ID')}</div><div class="story-stat-label">Orang Hilang</div></div>
        <div class="story-stat"><div class="story-stat-icon" style="color:${colors.gold}">💰</div><div class="story-stat-value" style="color:${colors.gold}">$${(country.economic/1000000).toFixed(1)}M</div><div class="story-stat-label">Kerugian Ekonomi</div></div>
    `;

    // Formulate descriptive narrative insight
    let insight = '';
    if (country.affected > 500000 && country.economic < 200000000) {
        insight = `${countryName} memiliki tingkat populasi terdampak bencana yang sangat tinggi secara kumulatif. Namun, pencatatan kerugian ekonomi riil masih relatif terbatas. Fokus rekonstruksi sosial dan pemulihan komunitas adat menjadi prioritas kemanusiaan tertinggi. `;
    } else if (country.economic > 100000000) {
        insight = `${countryName} menanggung kerugian ekonomi infrastruktur yang luar biasa tinggi akibat siklon berulang. Perlunya menyeimbangkan alokasi dana darurat dengan investasi adaptasi berkelanjutan untuk memitigasi depresiasi nilai PDB negara di masa depan. `;
    } else if (country.deaths > 500) {
        insight = `Tingginya angka fatalitas di ${countryName} menunjukkan kerentanan mendalam pada sistem evakuasi darurat lokal. Fokus utama jangka pendek wajib ditekankan pada modernisasi stasiun meteorologi dan integrasi alarm bahaya dini di desa pesisir. `;
    } else {
        insight = `Dampak kumulatif bencana di ${countryName} menunjukkan tren peningkatan kerentanan yang konsisten. Ketergantungan ekonomi lokal pada sektor kelautan memerlukan strategi perlindungan berlapis terhadap ekosistem pesisir. `;
    }

    if (drr.hasData) {
        insight += `Berdasarkan data Sendhai Framework: <strong>${drr.value}%</strong> pemerintah lokal di ${countryName} telah mengadopsi rancangan strategis mitigasi pengurangan risiko bencana (DRR) di tingkat regional.`;
    } else {
        insight += `Sangat disayangkan, data kesiapan strategi mitigasi bencana (DRR) <strong>belum dilaporkan / belum terdata</strong> secara lengkap untuk ${countryName}. Celah pelaporan data ini harus segera diperbaiki demi kelayakan dana adaptasi global.`;
    }
    
    document.getElementById('storyInsight').innerHTML = insight;

    // Draw / Update the Line Chart in Spotlight Panel
    const storyCtx = document.getElementById('storyTrendChart');
    if (storyCtx) {
        if (storyTrendChart) {
            storyTrendChart.destroy();
        }
        
        storyTrendChart = new Chart(storyCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: historiData.years,
                datasets: [{
                    label: 'Orang Terdampak', 
                    data: yearly.affected,
                    borderColor: colors.teal, 
                    backgroundColor: 'rgba(14,138,138,0.06)', 
                    fill: true, 
                    tension: 0.4
                }, {
                    label: 'Kematian', 
                    data: yearly.deaths,
                    borderColor: colors.coral, 
                    backgroundColor: 'transparent', 
                    borderWidth: 2, 
                    borderDash: [5,5], 
                    tension: 0.4
                }]
            },
            options: {
                responsive: true, 
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top', labels: { color: 'rgba(255,255,255,0.7)' } },
                    tooltip: {
                        backgroundColor: 'rgba(3, 28, 38, 0.95)', 
                        titleColor: '#fff', 
                        bodyColor: 'rgba(255,255,255,0.8)', 
                        padding: 15, 
                        cornerRadius: 12, 
                        borderColor: 'rgba(255,255,255,0.1)', 
                        borderWidth: 1
                    }
                },
                scales: {
                    y: { beginAtZero: true, ticks: { color: 'rgba(255,255,255,0.5)' }, grid: { color: 'rgba(255,255,255,0.03)' } }, 
                    x: { ticks: { color: 'rgba(255,255,255,0.5)' }, grid: { display: false } }
                }
            }
        });
    }
}

// ----------------- 9. Custom Smooth Scrolling & Cursor Init -----------------
export function initDashboardCore(lenisInstance) {
    // OPTIMIZED Magnetic Hover (Prevents Layout Thrashing by caching getBoundingClientRect)
    const magneticElements = document.querySelectorAll('.hero-stat, .chapter-card, .insight-card');
    magneticElements.forEach(el => {
        let rect = null;
        el.addEventListener('mouseenter', () => {
            rect = el.getBoundingClientRect(); // Called only ONCE upon entry
        });
        el.addEventListener('mousemove', (e) => {
            if (!rect) return;
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            // hardware accelerated translate3d
            el.style.transform = `translate3d(${x * 0.08}px, ${y * 0.08}px, 0) scale(1.02)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate3d(0, 0, 0) scale(1)';
            rect = null;
        });
    });

    // Reset View Trigger Action
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            lenisInstance.scrollTo(0, { duration: 1.5 });
            
            // Reset selectors
            document.getElementById('subregionFilter').value = 'all';
            document.getElementById('bubbleFilter').value = 'all';
            document.getElementById('countryStorySelect').value = 'Fiji';
            
            // Reset charts
            negaraChart.data.labels = countryData.map(d => d.name);
            negaraChart.data.datasets[0].data = countryData.map(d => d.affected);
            negaraChart.data.datasets[0].backgroundColor = countryData.map((d, i) => { 
                if (i < 3) return colors.coral; 
                if (i < 5) return colors.teal; 
                return 'rgba(191, 231, 227, 0.3)'; 
            });
            negaraChart.update();
            
            // Reset bubble chart
            bubbleChart.data.datasets[0].data = countryData.map(d => ({
                x: d.affected, 
                y: d.deaths, 
                r: Math.max(6, Math.sqrt(d.missing) * 3), 
                country: d.name, 
                missing: d.missing, 
                economic: d.economic
            }));
            bubbleChart.update();
            
            // Reset Spotlight to Fiji
            updateStoryPanel('Fiji');
        });
    }

    // Scroll listeners for header and progress bar
    const scrollProgress = document.getElementById('scrollProgress');
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollProgress) {
            scrollProgress.style.width = (scrollTop / docHeight * 100) + '%';
        }
        if (navbar) {
            if (scrollTop > 80) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // Sync Spotlight Select Change
    const storySelect = document.getElementById('countryStorySelect');
    if (storySelect) {
        storySelect.addEventListener('change', (e) => {
            updateStoryPanel(e.target.value);
        });
    }
}
