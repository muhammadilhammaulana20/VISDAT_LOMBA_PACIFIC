# Datasets Metadata - Pacific Under Pressure

This document contains the metadata, source registries, and descriptions of the datasets compiled and utilized in the **Pacific Under Pressure** interactive data visualization.

---

## 1. Number of Directly Affected Persons Attributed to Disasters (SDG 11.5.1)
*   **Variable Name:** `Affected_Persons`, `Deaths`, `Missing_Persons`
*   **Description:** Tracks the human cost of climate-induced disasters, including cyclones, floods, landslides, and droughts across 12 Pacific Island Countries (PICs) from 2005 to 2023.
*   **Data Source:** Pacific Data Hub (PDH) / United Nations Office for Disaster Risk Reduction (UNDRR).
*   **Source URL:** [https://pacificdata.org/data/dataset/sdg-11-5-1](https://pacificdata.org/data/dataset/sdg-11-5-1)
*   **Local File Path:** `data/disaster_impact.csv`

## 2. Direct Disaster Economic Loss (SDG 11.5.2)
*   **Variable Name:** `Economic_Loss_USD`
*   **Description:** Measures the direct economic damage to physical assets, infrastructure, agriculture, and tourism sectors caused by natural disasters.
*   **Data Source:** Pacific Data Hub / Sendai Framework Monitor Database.
*   **Source URL:** [https://pacificdata.org/data/dataset/sdg-11-5-2](https://pacificdata.org/data/dataset/sdg-11-5-2)
*   **Local File Path:** `data/disaster_impact.csv`

## 3. Climate Anomalies (Temperature, Rainfall, Sea Level)
*   **Variable Names:** `Sea_Surface_Temp_Anomaly_C`, `Rainfall_Anomaly_Percent`, `Sea_Level_Anomaly_mm`
*   **Description:** Tracks environmental climate indicators:
    *   *Mean Sea Surface Temperature Anomalies:* Deviation of sea surface temperature from the long-term historical mean.
    *   *Rainfall Anomalies:* Percentage deviation of rainfall from seasonal averages.
    *   *Sea Level Anomalies:* Cumulative sea-level rising trend in millimeters.
*   **Data Source:** Pacific Community (SPC) Oceans and Tides Portal / Copernicus Marine Service.
*   **Source URL:** [https://www.spc.int/](https://www.spc.int/)
*   **Local File Path:** `data/climate_anomalies.csv`

## 4. Population Growth & DRR blue print (SDG 11.b.2 / NMDI0002)
*   **Variable Names:** `Population_Growth_Indicator_NMDI0002`, `Sendai_DRR_BluePrint_Score`
*   **Description:** Relates demographic pressure (NMDI0002) with disaster preparedness metrics, mapping the percentage of local governments adopting disaster risk reduction (DRR) strategies.
*   **Data Source:** Pacific Data Hub - Indicator NMDI0002 (Pacific Population Growth Trends) & UNDRR Sendai Monitor.
*   **Source URL:** [https://stats.pacificdata.org/](https://stats.pacificdata.org/)
*   **Local File Path:** `data/population_drr.csv`
