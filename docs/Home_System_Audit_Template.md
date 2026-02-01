# Home System Risk Audit Report (V1 Professional)
# 家庭系统风险体检报告 (V1 专业版)

## 1. Basic Information / 基本信息
*   **Address/Area (地址/区域)**: ____________________
*   **Property Type (房屋类型)**: Detached / Townhouse / Condo
*   **Occupancy (居住情况)**: Standard (常住) / Frequent Traveler (频繁出差) / Long-term Vacant (长期空置)
*   **Audit Date (体检日期)**: ____________________

---

## 2. Overall Risk Score / 总体风险评分
```
🔴 High Risk (高风险):  __ Items
🟠 Med Risk (中风险):   __ Items
🟢 Standard (已达标):   __ Items
```
**Summary / 总结**: ________________________________________________________________

---

## 3. Core Discovery Categories / 核心体检项

### 🔴 A. Leakage & Physical Risks (水浸与物理风险)
*   **Checkpoints**: Laundry, Dishwasher, Sinks, Basement hot water tank, Floor drains.
*   **Question**: "If a leak occurs, is the notification guaranteed? Does it shut off automatically?"
*   **🇨🇳 核心疑问**: 这里如果漏水，通知是否一定能发出去？系统能否自动止损？

### 🟠 B. Network & Hub Resilience (网络与中枢风险)
*   **Checkpoints**: Router redundancy, Gateway heartbeat monitoring, Zigbee/Wi-Fi dead zones.
*   **Question**: "If internet drops, is the system 'Silent' or 'Still Speaking'?"
*   **🇨🇳 核心疑问**: 现在家里一旦断网，系统是“失联”还是“还能通过备用链路报警”？

### � C. Power Continuity (断电风险)
*   **Checkpoints**: UPS for Hub/Router, Reboot recovery logic, Battery failure alerts.
*   **Question**: "Will the system go silent during a short power failure?"
*   **🇨🇳 核心疑问**: 短时停电期间，关键网关与传感器是否仍有备用电源支撑运行？

### 🟢 D. Notification Reliability (通知可靠性)
*   **Checkpoints**: Multi-channel alerts (App, SMS, Voice), Quiet-mode bypass, Alert escalation.
*   **Question**: "Does the alarm rely on only one method? Can it bypass 'Do Not Disturb'?"
*   **🇨🇳 核心疑问**: 报警是否只依赖一种推送？手机开启省电或勿扰模式是否会漏掉通知？

### 🔵 E. Unattended Scenarios (无人值守场景)
*   **Checkpoints**: Vacation mode presence simulation, Long-term anomaly detection, Battery health logs.
*   **Question**: "Could a major failure go unnoticed while the family is away for weeks?"
*   **🇨🇳 核心疑问**: 离家远行期间，是否有自动化机制监控系统本身的健康状态？

---

## 4. Final Verdict / 专家判定
> [!IMPORTANT]
> **"Most systems look 'normal' right before they fail. Our goal is to ensure yours speaks when it's broken."**
> **“大多数家庭出事前系统都是‘正常的’。我们做的不是让它聪明，而是保证出故障时它还能说话。”**

---
**Auditor Signature (检测员签名)**: SmartLife Tech - Service Lead
