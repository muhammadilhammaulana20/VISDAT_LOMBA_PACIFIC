// ===================== DATASET PACIFIC UNDER PRESSURE =====================

export const historiData = {
    years: [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
    affected: [45000, 32000, 28000, 150000, 85000, 120000, 95000, 45000, 38000, 52000, 180000, 733906, 95000, 462927, 78000, 548988, 42000, 35000, 28000],
    deaths: [45, 32, 28, 150, 85, 120, 95, 45, 38, 52, 180, 450, 95, 380, 78, 520, 42, 35, 28],
    missing: [2, 1, 0, 5, 3, 4, 2, 1, 0, 2, 8, 25, 3, 18, 2, 30, 1, 1, 0]
};

export const countryData = [
    { name: "Fiji", affected: 1240734, deaths: 680, missing: 45, economic: 616900000, subregion: "Melanesia", gdp: 4500000000, flag: "FJ", flagEmoji: "🇫🇯" },
    { name: "Solomon Islands", affected: 562384, deaths: 420, missing: 28, economic: 185000000, subregion: "Melanesia", gdp: 1600000000, flag: "SB", flagEmoji: "🇸🇧" },
    { name: "Vanuatu", affected: 273840, deaths: 380, missing: 22, economic: 69600000, subregion: "Melanesia", gdp: 950000000, flag: "VU", flagEmoji: "🇻🇺" },
    { name: "Marshall Islands", affected: 180333, deaths: 85, missing: 8, economic: 42000000, subregion: "Micronesia", gdp: 220000000, flag: "MH", flagEmoji: "🇲🇭" },
    { name: "Papua New Guinea", affected: 99308, deaths: 1200, missing: 15, economic: 89000000, subregion: "Melanesia", gdp: 24000000000, flag: "PG", flagEmoji: "🇵🇬" },
    { name: "Tonga", affected: 85000, deaths: 65, missing: 5, economic: 36000000, subregion: "Polynesia", gdp: 470000000, flag: "TO", flagEmoji: "🇹🇴" },
    { name: "Samoa", affected: 72000, deaths: 55, missing: 4, economic: 28000000, subregion: "Polynesia", gdp: 820000000, flag: "WS", flagEmoji: "🇼🇸" },
    { name: "Micronesia", affected: 65000, deaths: 45, missing: 3, economic: 22000000, subregion: "Micronesia", gdp: 400000000, flag: "FM", flagEmoji: "🇫🇲" },
    { name: "Palau", affected: 28000, deaths: 12, missing: 1, economic: 8500000, subregion: "Micronesia", gdp: 268000000, flag: "PW", flagEmoji: "🇵🇼" },
    { name: "Kiribati", affected: 22000, deaths: 18, missing: 2, economic: 6500000, subregion: "Micronesia", gdp: 196000000, flag: "KI", flagEmoji: "🇰🇮" },
    { name: "Tuvalu", affected: 18000, deaths: 8, missing: 1, economic: 4200000, subregion: "Polynesia", gdp: 63000000, flag: "TV", flagEmoji: "🇹🇻" },
    { name: "Nauru", affected: 5000, deaths: 2, missing: 0, economic: 1200000, subregion: "Micronesia", gdp: 133000000, flag: "NR", flagEmoji: "🇳🇷" }
];

export const climateData = {
    years: [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
    temperature: [0.42, 0.45, 0.48, 0.38, 0.52, 0.58, 0.51, 0.55, 0.62, 0.68, 0.82, 0.95, 0.88, 0.79, 0.91, 1.02, 0.85, 0.89, 1.15],
    rainfall: [-2.1, -1.8, 1.5, 3.2, -4.5, 2.8, -1.2, 0.5, -3.8, 1.2, -5.2, 4.8, -2.5, 3.5, -1.8, 2.2, -0.5, 1.8, -3.2],
    sealevel: [12, 18, 25, 32, 28, 35, 42, 38, 45, 52, 58, 65, 62, 68, 75, 82, 78, 85, 92]
};

export const populationData = {
    years: [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
    population: [8500, 8650, 8800, 8950, 9100, 9250, 9400, 9550, 9700, 9850, 10000, 10150, 10300, 10450, 10600, 10750, 10900, 11050, 11200]
};

export const drrData = [
    { country: "Nauru", year: 2020, value: 100 },
    { country: "Vanuatu", year: 2020, value: 85 },
    { country: "Tuvalu", year: 2020, value: 75 },
    { country: "Tonga", year: 2020, value: 70 },
    { country: "Palau", year: 2020, value: 65 },
    { country: "Marshall Islands", year: 2020, value: 60 },
    { country: "Samoa", year: 2020, value: 55 },
    { country: "Kiribati", year: 2020, value: 50 }
];

export const countryYearlyData = {
    "Fiji": {
        affected: [5000, 8000, 12000, 45000, 25000, 35000, 28000, 15000, 12000, 18000, 65000, 280000, 35000, 180000, 28000, 220000, 18000, 15000, 12000],
        deaths: [5, 8, 12, 45, 25, 35, 28, 15, 12, 18, 65, 180, 35, 150, 28, 120, 18, 15, 12]
    },
    "Solomon Islands": {
        affected: [8000, 12000, 15000, 25000, 18000, 22000, 20000, 12000, 10000, 14000, 45000, 120000, 22000, 85000, 18000, 95000, 14000, 12000, 10000],
        deaths: [8, 12, 15, 25, 18, 22, 20, 12, 10, 14, 45, 120, 22, 85, 18, 95, 14, 12, 10]
    },
    "Vanuatu": {
        affected: [5000, 8000, 10000, 18000, 12000, 15000, 13000, 8000, 6500, 9000, 28000, 75000, 15000, 55000, 12000, 60000, 9000, 7500, 6500],
        deaths: [5, 8, 10, 18, 12, 15, 13, 8, 6, 9, 28, 75, 15, 55, 12, 60, 9, 7, 6]
    },
    "Papua New Guinea": {
        affected: [3000, 5000, 8000, 12000, 8000, 10000, 9000, 5500, 4500, 6000, 18000, 45000, 10000, 35000, 8000, 38000, 6000, 5000, 4500],
        deaths: [45, 65, 85, 120, 85, 100, 90, 55, 45, 60, 180, 450, 100, 350, 85, 380, 60, 50, 45]
    },
    "Marshall Islands": {
        affected: [2000, 3500, 5000, 8000, 6000, 7500, 6500, 4000, 3500, 4500, 15000, 38000, 8000, 28000, 6000, 32000, 4500, 3800, 3500],
        deaths: [2, 3, 5, 8, 6, 7, 6, 4, 3, 4, 15, 38, 8, 28, 6, 32, 4, 3, 3]
    },
    "Tonga": {
        affected: [1500, 2500, 4000, 6500, 4500, 5500, 5000, 3000, 2500, 3500, 12000, 28000, 5500, 22000, 4500, 25000, 3500, 2800, 2500],
        deaths: [1, 2, 4, 6, 4, 5, 4, 3, 2, 3, 12, 28, 5, 22, 4, 25, 3, 2, 2]
    },
    "Samoa": {
        affected: [1200, 2000, 3500, 5500, 4000, 5000, 4500, 2800, 2200, 3000, 10000, 25000, 5000, 18000, 4000, 22000, 3000, 2500, 2200],
        deaths: [1, 2, 3, 5, 4, 5, 4, 2, 2, 3, 10, 25, 5, 18, 4, 22, 3, 2, 2]
    },
    "Micronesia": {
        affected: [1000, 1800, 3000, 5000, 3500, 4500, 4000, 2500, 2000, 2800, 9000, 22000, 4500, 16000, 3500, 20000, 2800, 2200, 2000],
        deaths: [1, 1, 3, 5, 3, 4, 4, 2, 2, 2, 9, 22, 4, 16, 3, 20, 2, 2, 2]
    },
    "Palau": {
        affected: [500, 800, 1200, 2000, 1500, 1800, 1600, 1000, 800, 1100, 3500, 8500, 1800, 6500, 1500, 7500, 1100, 900, 800],
        deaths: [0, 0, 1, 2, 1, 1, 1, 1, 0, 1, 3, 8, 1, 6, 1, 7, 1, 0, 0]
    },
    "Kiribati": {
        affected: [400, 700, 1000, 1800, 1200, 1500, 1300, 800, 650, 900, 2800, 7000, 1500, 5500, 1200, 6500, 900, 750, 650],
        deaths: [0, 1, 1, 2, 1, 1, 1, 1, 0, 1, 2, 7, 1, 5, 1, 6, 1, 0, 0]
    },
    "Tuvalu": {
        affected: [300, 500, 800, 1200, 900, 1100, 1000, 600, 500, 700, 2200, 5500, 1200, 4500, 900, 5000, 700, 600, 500],
        deaths: [0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 2, 5, 1, 4, 1, 5, 0, 0, 0]
    },
    "Nauru": {
        affected: [100, 150, 250, 400, 300, 350, 320, 200, 160, 220, 800, 2000, 450, 1600, 350, 1800, 250, 200, 180],
        deaths: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 1, 0, 1, 0, 0, 0]
    }
};

export const drrStatus = {
    "Nauru": { hasData: true, value: 100, year: 2020 },
    "Vanuatu": { hasData: true, value: 85, year: 2020 },
    "Tuvalu": { hasData: true, value: 75, year: 2020 },
    "Tonga": { hasData: true, value: 70, year: 2020 },
    "Palau": { hasData: true, value: 65, year: 2020 },
    "Marshall Islands": { hasData: true, value: 60, year: 2020 },
    "Samoa": { hasData: true, value: 55, year: 2020 },
    "Kiribati": { hasData: true, value: 50, year: 2020 },
    "Fiji": { hasData: false, value: null, year: null },
    "Solomon Islands": { hasData: false, value: null, year: null },
    "Papua New Guinea": { hasData: false, value: null, year: null },
    "Micronesia": { hasData: false, value: null, year: null }
};

export const mapNodes = [
    { name: "Papua New Guinea", x: 130, y: 280, size: 36, subregion: "Melanesia" },
    { name: "Palau", x: 80, y: 150, size: 16, subregion: "Micronesia" },
    { name: "Micronesia", x: 260, y: 140, size: 20, subregion: "Micronesia" },
    { name: "Solomon Islands", x: 300, y: 300, size: 26, subregion: "Melanesia" },
    { name: "Marshall Islands", x: 420, y: 110, size: 18, subregion: "Micronesia" },
    { name: "Nauru", x: 430, y: 210, size: 14, subregion: "Micronesia" },
    { name: "Vanuatu", x: 440, y: 370, size: 22, subregion: "Melanesia" },
    { name: "Kiribati", x: 620, y: 170, size: 16, subregion: "Micronesia" },
    { name: "Tuvalu", x: 570, y: 290, size: 14, subregion: "Polynesia" },
    { name: "Fiji", x: 600, y: 390, size: 28, subregion: "Melanesia" },
    { name: "Samoa", x: 740, y: 330, size: 18, subregion: "Polynesia" },
    { name: "Tonga", x: 730, y: 430, size: 18, subregion: "Polynesia" }
];
