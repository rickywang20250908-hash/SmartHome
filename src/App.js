import React, { useState, useEffect } from 'react';
import { Sun, Moon, Wind, Shield, Smartphone, Zap, Music, ArrowRight, Menu, X, Thermometer, ChevronRight, Mail, Sparkles, MessageSquare, Send, Globe } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const TRANSLATIONS = {
  zh: {
    nav: {
      features: "核心服务",
      demo: "在线体验",
      history: "过往案例",
      contact: "预约检测"
    },
    hero: {
      tag: "🛡️ 为高价值家庭打造的主动式风险管理系统",
      title_start: "告别",
      title_end: "家庭隐患",
      desc: "我们不卖复杂的科技，我们只解决真实的问题：防止漏水灾难、杜绝网络掉线、实现无人值守的安全。让您的家真正让人“省心”。",
      btn_demo: "查看风险演示",
      btn_learn: "99元 上门检测",
      btn_learn_sub: "发现隐患，再决定是否升级",
      view_scope: "查看检测范围"
    },
    demo: {
      powered_by: "核心防护系统演示",
      title: "假如现在发生了...",
      desc: "点击下方按钮，模拟家中可能发生的真实风险。看我们的系统如何为您自动处理危机。",
      ai_title: "AI 风险预判",
      ai_placeholder: "试着输入: '家里好像漏水了' 或 '我想开启离家模式'...",
      ai_btn: "模拟风险场景",
      ai_thinking: "分析风险中...",
      manual_title: "风险模拟",
      light_main: "主水阀",
      status_on: "开启 (正常)",
      status_off: "已自动关闭 (阻断)",
      temp_control: "温湿度监控",
      scene_mode: "防护模式",
      scene_read: "在家",
      scene_movie: "离家",
      room_temp: "机房温度",
      mode_active: "离家布防中: 即使断网也能报警",
      scene_label: "CURRENT STATUS",
      scene_cinema: "ARMED",
      scene_daily: "SAFE"
    },
    features: {
      title: "您买的不是设备，是“没意外”",
      subtitle: "专门针对大户型与频繁出差家庭的三重防护体系。",
      light_title: "水浸灾难阻断",
      light_desc: "在水漫金山前自动关闭总阀。不仅仅是滴滴叫的报警器，而是物理层面的即时止损。",
      security_title: "锁死“单点失效”：三层冗余架构",
      security_desc: "我们为大户型与经常出差的家庭设计了工程级防护。即使发生网络故障或停电，系统仍能通过物理冗余持续报警并保护家庭。",
      redundancy: {
        network: "网络冗余：宽带 + 5G 网络自动秒级切换",
        power: "供电冗余：核心节点 UPS 保护，停电不断联",
        notify: "通知冗余：App、短信、语音多路径触达"
      },
      climate_title: "7x24小时 自动化巡检",
      climate_desc: "像私人管家一样。每月生成健康报告，主动发现设备离线、电池低电等隐患。"
    },
    history: {
      title: "服务过的真实场景",
      subtitle: "每一个案例，都避免了一次可能的家庭危机。",
      btn_github: "查看 GitHub 仓库",
      items: [
        {
          year: "2025",
          title: "北约克 4000尺 独立屋",
          desc: "由于屋主经常回国，我们在地下室部署了全套防漏水系统。成功在2025年冬阻止了一次爆管事故。",
          tags: ['防漏水', '远程托管']
        },
        {
          year: "2024",
          title: "Downtown 高端公寓",
          desc: "为经常断网的住户部署了“断网报警”系统。通过4G备用链路，确保安防监控永不掉线。",
          tags: ['网络冗余', '安防']
        },
        {
          year: "2023",
          title: "Markham 老房改造",
          desc: "不破坏装修，通过无线技术实现了全屋灯光与老旧暖通设备的智能化升级。",
          tags: ['老房改造', '无损安装']
        }
      ]
    },
    contact: {
      title: "先别急着买设备，先做个体检",
      desc: "很多家庭连基础的网络覆盖都有盲区。我们要做的第一步，是找出您家的“隐形风险”。",
      ai_title: "7x24 智能客服",
      ai_online: "Online",
      ai_hint: "有什么想问的？比如“检测包含什么内容？”",
      ai_placeholder: "请输入您的问题...",
      ai_busy: "抱歉，咨询人数较多，请直接微信联系我们。",
      btn_sub: "*发现隐患，再决定是否升级*",
      footer: "© 2026 SmartLife Tech. All rights reserved."
    },
    education: {
      title: "为什么需要“专业级”防护？",
      subtitle: "普通的智能家居只是玩具，我们构建的是家庭基础设施。",
      vs_title_diy: "普通智能家居 (DIY)",
      vs_title_pro: "SmartLife 专业级",
      point1_diy: "依赖单一 Wi-Fi，断网即失联",
      point1_pro: "双链路冗余，断网断电依然报警",
      point2_diy: "只会在现场“尖叫”，无人处理",
      point2_pro: "自动关闭水阀，物理隔绝风险",
      point3_diy: "电池没电、设备离线不知情",
      point3_pro: "7x24 远程监控，主动健康报告"
    },
    pricing: {
      title: "透明的服务方案",
      subtitle: "没有隐形的强制消费，只有确定的安全感。",
      audit_title: "1. 核心自动化审计 (咨询)",
      audit_price: "$299 - $599",
      audit_desc: "我们负责设计“大脑”：系统架构、自动化逻辑、避坑清单与硬件规格。",
      audit_btn: "预约设计",
      core_title: "2. “守护者”方案实施",
      core_price: "硬件 + $199",
      core_desc: "我们负责编程与集成，持证电工（外包或推荐）负责法规电气安装。",
      core_btn: "获取方案",
      sub_title: "3. 长期守护",
      sub_price: "$29/月",
      sub_desc: "7x24 小时管家式监控，确保系统永远处于最佳状态。",
      sub_btn: "了解更多"
    },
    audit_scope: {
      title: "设计咨询包含什么？",
      item1: "💧 风险审计：水浸、网络、供电等全链路隐患排查评估",
      item2: "🧩 架构方案：系统逻辑图、避坑硬件清单及本地化方案建议",
      item3: "🤖 逻辑编写：为您预编写 Home Assistant / Apple Home 自动化逻辑",
      item4: "⚡ 合规指导：协助您与持证电工对接，确保物理安装符合法规",
      item5: "🏠 远程访问：安全冗余的远程访问与多层级告警路径审计"
    },
    compliance: {
      footer_note: "合规说明：Smart Life Tech 专注于系统架构与自动化设计。我们不进行受监管的电气（ESA）、安防（ULC）或暖通（TSSA）物理安装，所有相关工程均推荐由持证专业人士（Licensed Trades）执行。",
      license_qa: "我们是智能系统“架构师”，负责设计心脏与大脑；通过与持证电工合作，确保您的系统既智能又合规。"
    }
  },
  en: {
    nav: {
      features: "Core Services",
      demo: "Live Demo",
      history: "Case Studies",
      contact: "Book Audit"
    },
    hero: {
      tag: "🛡️ Proactive Risk Management for Premium Homes",
      title_start: "Say Goodbye to",
      title_end: "Home Hazards",
      desc: "We don't sell gadgets; we solve problems. Prevent water damage, eliminate network dead zones, and secure your home when you're away. Peace of mind, delivered.",
      btn_demo: "See Risk Demo",
      btn_learn: "$99 Home Health Check",
      btn_learn_sub: "Identify risks first, decide later",
      view_scope: "View Audit Scope"
    },
    demo: {
      powered_by: "Core Protection System Demo",
      title: "What if this happens...",
      desc: "Click below to simulate real-world risks. See how our system automatically intervenes to prevent disaster.",
      ai_title: "AI Risk Assessment",
      ai_placeholder: "Try: 'I think there is a leak' or 'I am leaving for vacation'...",
      ai_btn: "Simulate Risk",
      ai_thinking: "Analyzing Risk...",
      manual_title: "Risk Simulation",
      light_main: "Main Water Valve",
      status_on: "OPEN (Normal)",
      status_off: "CLOSED (Blocked)",
      temp_control: "Climate Monitor",
      scene_mode: "Security Mode",
      scene_read: "Home",
      scene_movie: "Away",
      room_temp: "Server Room Temp",
      mode_active: "ARMED: Alerting even if WiFi is down",
      scene_label: "CURRENT STATUS",
      scene_cinema: "ARMED",
      scene_daily: "SAFE"
    },
    features: {
      title: "You Buy 'No Surprises', Not Just Hardware",
      subtitle: "Triple-layer protection designed for large homes and frequent travelers.",
      light_title: "Water Disaster Block",
      light_desc: "Auto-shuts the main valve BEFORE the basement floods. Not just a beeping alarm, but instant physical damage control.",
      security_title: "Lockdown Single Points of Failure",
      security_desc: "Engineering-grade protection for premium homes and frequent travelers. Even during major network outages or power failures, our redundant physical architecture ensures your home remains safe and connected.",
      redundancy: {
        network: "Network: Auto-failover to Cellular (4G/5G)",
        power: "Power: UPS-protected critical nodes",
        notify: "Notification: Multi-path App + SMS + Call alerts"
      },
      climate_title: "7x24 Auto-Health Check",
      climate_desc: "Like a private house manager. Monthly health reports proactively find offline devices and low batteries."
    },
    history: {
      title: "Real World Protection",
      subtitle: "Every case study represents a disaster prevented.",
      btn_github: "View GitHub",
      items: [
        {
          year: "2025",
          title: "North York 4000sqft Detached",
          desc: "Owners travel often. We deployed a full anti-leak system, successfully preventing a pipe burst incident in Winter 2025.",
          tags: ['Leak Prevention', 'Remote Management']
        },
        {
          year: "2024",
          title: "Downtown Penthouse",
          desc: "Deployed 'Network Watchdog' for a client with unstable internet. 4G backup keeps security cameras online 24/7.",
          tags: ['Network Redundancy', 'Security']
        },
        {
          year: "2023",
          title: "Markham Heritage Home",
          desc: "Smart upgrade for a historic home without damaging walls. Wireless retrofitting for lighting and HVAC.",
          tags: ['Retrofit', 'Non-invasive']
        }
      ]
    },
    contact: {
      title: "Don't Buy Devices, Get a Check-up First",
      desc: "Most homes have WiFi dead zones and hidden risks. Step one is a professional 'Home Health Audit' to find them.",
      ai_title: "24/7 AI Support",
      ai_online: "Online",
      ai_hint: "Ask me anything: 'What does the audit cover?'",
      ai_placeholder: "Ask something...",
      ai_busy: "High volume. Please contact us via WeChat.",
      btn_sub: "*Identify risks first, decide later*",
      footer: "© 2026 SmartLife Tech. All rights reserved."
    },
    education: {
      title: "Why 'Professional Grade' Matters",
      subtitle: "Standard smart homes are toys; we build home infrastructure.",
      vs_title_diy: "Basic Smart Home (DIY)",
      vs_title_pro: "SmartLife Pro-Grade",
      point1_diy: "Single Wi-Fi dependency (Offline = Blind)",
      point1_pro: "Dual-link redundancy (Always connected)",
      point2_diy: "Audible alarms only (No action)",
      point2_pro: "Active Response (Auto-shuts valves)",
      point3_diy: "Hidden failures (Dead batteries)",
      point3_pro: "7x24 Monitoring (Proactive Health Reports)"
    },
    pricing: {
      title: "Transparent Service Plans",
      subtitle: "No hidden costs, just reliable peace of mind.",
      audit_title: "1. Core Automation Design (Consulting)",
      audit_price: "$299 - $599",
      audit_desc: "We design the 'Brain': architecture, automation logic, and hardware specs.",
      audit_btn: "Book Design",
      core_title: "2. 'Guardian' Implementation",
      core_price: "Hardware + $199",
      core_desc: "We handle programming; licensed electricians handle regulated electrical work.",
      core_btn: "Get a Quote",
      sub_title: "3. Peace of Mind",
      sub_price: "$29/mo",
      sub_desc: "24/7 heartbeat monitoring to ensure your system is always optimal.",
      sub_btn: "Learn More"
    },
    audit_scope: {
      title: "What's in the Design Audit?",
      item1: "💧 Risk Assessment: Multi-point check for leak, network, and power risks.",
      item2: "🧩 Architecture Plan: Professional logic maps and vetted hardware list.",
      item3: "🤖 Logic Scripting: Pre-written Home Assistant / Apple Home automations.",
      item4: "⚡ Compliance: Coordinating with licensed trades for safe physical install.",
      item5: "🏠 Secure Access: Auditing redundant remote access and multi-path alerts."
    },
    compliance: {
      footer_note: "Compliance: Smart Life Tech specializes in smart home architecture and automation logic. We do not perform regulated electrical (ESA) or security (ULC) installations; such work is referred to licensed trades.",
      license_qa: "We are Smart Home Architects—we design the logic and partner with licensed trades for the physical infrastructure."
    }
  }
};

const App = () => {
  const [lang, setLang] = useState('zh'); // 'zh' | 'en'
  const t = TRANSLATIONS[lang];

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAuditScope, setShowAuditScope] = useState(false);

  // 监听滚动，改变导航栏样式
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleLang = () => {
    setLang(prev => prev === 'zh' ? 'en' : 'zh');
  };

  return (
    <div className="font-sans text-slate-800 bg-slate-50 min-h-screen selection:bg-blue-500 selection:text-white">
      {/* 导航栏 */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            SmartLife.
          </div>

          {/* 桌面菜单 */}
          <div className="hidden md:flex space-x-8 items-center font-medium text-slate-600">
            <button onClick={() => scrollToSection('features')} className="hover:text-blue-600 transition">{t.nav.features}</button>
            <button onClick={() => scrollToSection('demo')} className="hover:text-blue-600 transition">{t.nav.demo}</button>
            <button onClick={() => scrollToSection('history')} className="hover:text-blue-600 transition">{t.nav.history}</button>
            <button onClick={toggleLang} className="flex items-center gap-1 hover:text-blue-600 transition uppercase text-sm font-bold">
              <Globe size={16} /> {lang === 'zh' ? 'EN' : '中'}
            </button>
            <button onClick={() => scrollToSection('contact')} className="px-5 py-2 bg-slate-900 text-white rounded-full hover:bg-slate-700 transition">
              {t.nav.contact}
            </button>
          </div>

          {/* 移动端菜单按钮 */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleLang} className="flex items-center gap-1 text-slate-600 font-bold text-sm">
              <Globe size={18} /> {lang.toUpperCase()}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* 移动端菜单 */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 flex flex-col items-center space-y-4">
            <button onClick={() => scrollToSection('features')} className="text-slate-600 py-2">{t.nav.features}</button>
            <button onClick={() => scrollToSection('demo')} className="text-slate-600 py-2">{t.nav.demo}</button>
            <button onClick={() => scrollToSection('history')} className="text-slate-600 py-2">{t.nav.history}</button>
            <button onClick={() => scrollToSection('contact')} className="text-blue-600 font-bold py-2">{t.nav.contact}</button>
          </div>
        )}
      </nav>

      {/* Hero 区域 */}
      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-cyan-100 rounded-full blur-3xl opacity-50"></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold tracking-wide border border-blue-100">
            {t.hero.tag}
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight mb-6">
            {t.hero.title_start}<br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">{t.hero.title_end}</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto mb-10">
            {t.hero.desc}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button onClick={() => scrollToSection('demo')} className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200 flex items-center justify-center gap-2">
              <Zap size={20} />
              {t.hero.btn_demo}
            </button>
            <div className="flex flex-col items-center gap-2">
              <button onClick={() => scrollToSection('features')} className="w-full px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-lg text-lg font-bold hover:bg-slate-50 transition flex items-center justify-center gap-2">
                {t.hero.btn_learn}
                <ArrowRight size={20} />
              </button>
              <button
                onClick={() => setShowAuditScope(!showAuditScope)}
                className="text-sm text-blue-600 font-semibold hover:underline flex items-center gap-1"
              >
                {t.hero.view_scope} <ChevronRight size={14} className={showAuditScope ? 'rotate-90' : ''} />
              </button>
              <span className="text-xs text-slate-400 italic font-medium">{t.hero.btn_learn_sub}</span>
            </div>
          </div>

          {/* Audit Scope Detail Reveal */}
          {showAuditScope && (
            <div className="mt-8 max-w-2xl mx-auto bg-white rounded-xl p-6 border border-blue-100 shadow-xl text-left animate-fade-in">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Shield className="text-blue-600" size={20} /> {t.audit_scope.title}
              </h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-3 p-2 hover:bg-slate-50 rounded-lg transition">
                  <span className="shrink-0 mt-1">A</span>
                  <span>{t.audit_scope.item1}</span>
                </li>
                <li className="flex items-start gap-3 p-2 hover:bg-slate-50 rounded-lg transition">
                  <span className="shrink-0 mt-1">B</span>
                  <span>{t.audit_scope.item2}</span>
                </li>
                <li className="flex items-start gap-3 p-2 hover:bg-slate-50 rounded-lg transition">
                  <span className="shrink-0 mt-1">C</span>
                  <span>{t.audit_scope.item3}</span>
                </li>
                <li className="flex items-start gap-3 p-2 hover:bg-slate-50 rounded-lg transition">
                  <span className="shrink-0 mt-1">D</span>
                  <span>{t.audit_scope.item4}</span>
                </li>
                <li className="flex items-start gap-3 p-2 hover:bg-slate-50 rounded-lg transition">
                  <span className="shrink-0 mt-1">E</span>
                  <span>{t.audit_scope.item5}</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* 交互式 Demo 区域 (核心亮点 + Gemini AI) */}
      <section id="demo" className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 text-blue-400 font-semibold mb-2">
              <Sparkles size={18} /> {t.demo.powered_by}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.demo.title}</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              {t.demo.desc}
            </p>
          </div>

          {/* 这里调用封装好的 DemoSection */}
          <DemoSection t={t.demo} lang={lang} />
        </div>
      </section>

      {/* 核心服务 */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.features.title}</h2>
            <p className="text-slate-600">{t.features.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Sun className="text-orange-500" size={32} />}
              title={t.features.light_title}
              desc={t.features.light_desc}
            />
            <FeatureCard
              icon={<Shield className="text-emerald-500" size={32} />}
              title={t.features.security_title}
              desc={t.features.security_desc}
            >
              <RedundancyDiagram t={t.features.redundancy} />
            </FeatureCard>
            <FeatureCard
              icon={<Wind className="text-cyan-500" size={32} />}
              title={t.features.climate_title}
              desc={t.features.climate_desc}
            />
          </div>
        </div>
      </section>

      {/* 为什么选择专业级 - 教育区域 */}
      < section className="py-20 bg-slate-50" >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.education.title}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">{t.education.subtitle}</p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-white">
            <div className="p-10 bg-slate-50 border-r border-slate-200">
              <h3 className="text-xl font-bold text-slate-400 mb-8 uppercase tracking-widest text-center">{t.education.vs_title_diy}</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-3 text-slate-500">
                  <X className="text-slate-300 shrink-0 mt-1" size={18} />
                  <span>{t.education.point1_diy}</span>
                </li>
                <li className="flex items-start gap-3 text-slate-500">
                  <X className="text-slate-300 shrink-0 mt-1" size={18} />
                  <span>{t.education.point2_diy}</span>
                </li>
                <li className="flex items-start gap-3 text-slate-500">
                  <X className="text-slate-300 shrink-0 mt-1" size={18} />
                  <span>{t.education.point3_diy}</span>
                </li>
              </ul>
            </div>
            <div className="p-10 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
              <h3 className="text-xl font-bold text-blue-100 mb-8 uppercase tracking-widest text-center">{t.education.vs_title_pro}</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-3">
                  <Shield className="text-blue-300 shrink-0 mt-1" size={18} />
                  <span className="font-medium">{t.education.point1_pro}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="text-blue-300 shrink-0 mt-1" size={18} />
                  <span className="font-medium">{t.education.point2_pro}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="text-blue-300 shrink-0 mt-1" size={18} />
                  <span className="font-medium">{t.education.point3_pro}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 服务方案 / 定价区域 */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.pricing.title}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">{t.pricing.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* 99元体检 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col items-center text-center hover:shadow-lg transition">
              <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full mb-4">STEP 1</span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{t.pricing.audit_title}</h3>
              <div className="text-3xl font-extrabold text-blue-600 mb-4">{t.pricing.audit_price}</div>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">{t.pricing.audit_desc}</p>
              <button onClick={() => scrollToSection('contact')} className="mt-auto w-full py-3 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-700 transition">
                {t.pricing.audit_btn}
              </button>
            </div>

            {/* 499元升级 */}
            <div className="p-8 rounded-2xl bg-slate-900 text-white shadow-xl flex flex-col items-center text-center transform scale-105 z-10">
              <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 underline">POPULAR</span>
              <h3 className="text-xl font-bold mb-2">{t.pricing.core_title}</h3>
              <div className="text-3xl font-extrabold text-blue-400 mb-4">{t.pricing.core_price}</div>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">{t.pricing.core_desc}</p>
              <button onClick={() => scrollToSection('contact')} className="mt-auto w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-500 transition">
                {t.pricing.core_btn}
              </button>
            </div>

            {/* 29元月费 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col items-center text-center hover:shadow-lg transition">
              <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-3 py-1 rounded-full mb-4">RECURRING</span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{t.pricing.sub_title}</h3>
              <div className="text-3xl font-extrabold text-emerald-600 mb-4">{t.pricing.sub_price}</div>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">{t.pricing.sub_desc}</p>
              <button onClick={() => scrollToSection('contact')} className="mt-auto w-full py-3 border border-slate-300 text-slate-700 rounded-lg font-bold hover:bg-slate-50 transition">
                {t.pricing.sub_btn}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 项目历史/开发Demo */}
      <section id="history" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.history.title}</h2>
              <p className="text-slate-600">{t.history.subtitle}</p>
            </div>
            <button className="text-blue-600 font-semibold flex items-center gap-1 mt-4 md:mt-0 hover:gap-2 transition-all">
              {t.history.btn_github} <ChevronRight size={18} />
            </button>
          </div>

          <div className="space-y-8">
            {t.history.items.map((item, index) => (
              <HistoryItem
                key={index}
                year={item.year}
                title={item.title}
                desc={item.desc}
                tags={item.tags}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 底部行动召唤 & AI 咨询 & Footer */}
      <footer id="contact" className="bg-slate-900 text-slate-300 py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">{t.contact.title}</h2>
              <p className="mb-2 text-lg">{t.contact.desc}</p>
              <p className="mb-8 text-sm text-blue-400 italic">{t.contact.btn_sub}</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Smartphone className="text-blue-500" />
                  <span>647-864-1656</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-blue-500" />
                  <span>createoursmarthome@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-xs text-black font-bold">W</div>
                  <span>WeChat: SmartHome_Start</span>
                </div>
              </div>
            </div>

            {/* AI 咨询模块 */}
            <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden">
              <div className="bg-slate-700/50 p-4 border-b border-slate-600 flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <MessageSquare size={18} className="text-blue-400" /> {t.contact.ai_title}
                </h3>
                <span className="text-xs bg-blue-900 text-blue-200 px-2 py-1 rounded">{t.contact.ai_online}</span>
              </div>
              <div className="p-6">
                <AiConsultant t={t.contact} lang={lang} />
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-16 pt-8 text-center text-sm text-slate-500">
            <div className="max-w-3xl mx-auto mb-4 opacity-70 italic leading-relaxed">
              {t.compliance.footer_note}
            </div>
            {t.contact.footer}
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- 子组件区域 ---

// 部署配置：优先读取 Vercel 的环境变量，如果本地测试没有配置则为空
// 这里的 REACT_APP_GEMINI_API_KEY 就是我们在 Vercel 后台需要填写的名字
const apiKey = process.env.REACT_APP_GEMINI_API_KEY || "";

// DemoSection: 包含 AI 控制逻辑
const DemoSection = ({ t, lang }) => {
  const [lights, setLights] = useState(true);
  const [temp, setTemp] = useState(24);
  const [mode, setMode] = useState('read'); // 'read' | 'movie'
  const [aiInput, setAiInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

  // 这是一个高清的客厅图片 URL
  const roomImageUrl = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop";

  // Gemini AI 控制逻辑
  const handleAIOptimize = async () => {
    if (!aiInput.trim()) return;
    setAiLoading(true);
    setAiResponse('');

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-09-2025" });

      const instruction = lang === 'en'
        ? "Reply in English. Keep it short and friendly."
        : "Reply in Chinese. Keep it short and friendly.";

      const prompt = `
                You are a 'Home Risk Management System' for a premium smart home. 
                The user will simulate a risk scenario (e.g., "Water leak detected", "I'm leaving for vacation", "Internet is down").
                
                Your Goal: Analyze the risk and take IMMEDIATE protective action.

                Control Mappings:
                - 'lights' now represents: **Main Water Valve**. (true = OPEN/Normal, false = CLOSED/Blocked).
                - 'mode' now represents: **Security State**. ('read' = HOME/Disarmed, 'movie' = AWAY/Armed).
                - 'temp' represents: **Server Room Temp**. (Keep between 18-24).

                Current State:
                - Water Valve: ${lights ? 'OPEN' : 'CLOSED'}
                - Security: ${mode === 'read' ? 'HOME' : 'AWAY'}
                - Temp: ${temp}

                User Input: "${aiInput}"

                Rules:
                1. IF input mentions "leak", "water", "flood" -> MUST set 'lights' (Valve) to false (CLOSE IT).
                2. IF input mentions "leaving", "vacation", "bye" -> MUST set 'mode' to 'movie' (IS ARMED).
                3. IF input mentions "home", "back" -> set 'mode' to 'read' (DISARMED).
                4. Always provide a reassuring 'reply' confirming the safety action taken. ${instruction}

                Output JSON Format:
                {
                    "mode": "movie",
                    "lights": false,
                    "temp": 24,
                    "reply": "EMERGENCY: Leak detected. Main water valve CLOSED immediately."
                }
            `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // 尝试解析 JSON
      try {
        // 清理可能的 markdown 标记
        const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const data = JSON.parse(jsonString);

        // 更新状态
        if (data.mode) setMode(data.mode);
        if (typeof data.lights === 'boolean') setLights(data.lights);
        if (data.temp) setTemp(data.temp);
        if (data.reply) setAiResponse(data.reply);

      } catch (e) {
        console.error("JSON Parse Error", e);
        setAiResponse(lang === 'zh' ? "抱歉，我没太听懂，请再说一次。" : "Sorry, I didn't quite get that. Please try again.");
      }

    } catch (error) {
      console.error("AI Error:", error);
      setAiResponse(lang === 'zh' ? "AI 连接似乎有点问题（请检查是否配置了 API Key），请稍后再试。" : "AI connection issue. Please check your API Key and try again.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col-reverse md:flex-row h-auto md:h-[600px]">
      {/* 控制面板 (左侧 - 移动端在下) */}
      <div className="w-full md:w-80 p-6 md:p-8 border-t md:border-t-0 md:border-r border-slate-700 flex flex-col gap-6 z-10 bg-slate-800 shrink-0 overflow-y-auto">

        {/* AI Command Input */}
        <div className="bg-gradient-to-br from-blue-900/50 to-slate-800 p-4 rounded-xl border border-blue-500/30 shadow-lg">
          <h3 className="text-sm font-semibold text-blue-300 flex items-center gap-2 mb-3">
            <Sparkles size={14} /> {t.ai_title}
          </h3>
          <div className="flex flex-col gap-2">
            <textarea
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder={t.ai_placeholder}
              className="w-full bg-slate-900/80 border border-slate-600 rounded-lg p-3 text-xs text-white focus:border-blue-500 focus:outline-none resize-none h-16 md:h-20"
            />
            <button
              onClick={handleAIOptimize}
              disabled={aiLoading}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {aiLoading ? t.ai_thinking : t.ai_btn} <Send size={12} />
            </button>
          </div>
          {aiResponse && (
            <div className="mt-3 text-xs text-blue-200 bg-blue-900/20 p-2 rounded border border-blue-500/10 animate-fade-in">
              🤖 {aiResponse}
            </div>
          )}
        </div>

        <div className="border-t border-slate-700 my-1"></div>

        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest hidden md:block">{t.manual_title}</h3>

        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
          {/* 灯光控制 */}
          <div className="bg-slate-700/50 p-3 md:p-4 rounded-xl border border-slate-600/50">
            <div className="flex justify-between items-center mb-2">
              <span className="flex items-center gap-2 text-white text-xs md:text-sm"><Sun size={16} /> {t.light_main}</span>
              <div
                className={`w-10 h-5 md:w-12 md:h-6 rounded-full p-1 cursor-pointer transition-colors ${lights ? 'bg-blue-500' : 'bg-slate-600'}`}
                onClick={() => setLights(!lights)}
              >
                <div className={`bg-white w-3 h-3 md:w-4 md:h-4 rounded-full shadow-md transform transition-transform ${lights ? 'translate-x-5 md:translate-x-6' : 'translate-x-0'}`}></div>
              </div>
            </div>
            <p className="text-xs text-slate-400 hidden md:block">状态: {lights ? t.status_on : t.status_off}</p>
          </div>

          {/* 场景模式 */}
          <div className="bg-slate-700/50 p-3 md:p-4 rounded-xl border border-slate-600/50">
            <span className="flex items-center gap-2 mb-2 text-white text-xs md:text-sm"><Music size={16} /> {t.scene_mode}</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { setMode('read'); setLights(true); }}
                className={`text-xs md:text-sm py-1 md:py-2 rounded-lg transition border ${mode === 'read' ? 'bg-orange-600 border-orange-500 text-white' : 'bg-transparent border-slate-600 text-slate-400 hover:border-slate-500'}`}
              >
                {t.scene_read}
              </button>
              <button
                onClick={() => { setMode('movie'); setLights(true); }}
                className={`text-xs md:text-sm py-1 md:py-2 rounded-lg transition border ${mode === 'movie' ? 'bg-purple-600 border-purple-500 text-white' : 'bg-transparent border-slate-600 text-slate-400 hover:border-slate-500'}`}
              >
                {t.scene_movie}
              </button>
            </div>
          </div>
        </div>

        {/* 温度控制 */}
        <div className="bg-slate-700/50 p-4 rounded-xl border border-slate-600/50">
          <div className="flex justify-between items-center mb-4">
            <span className="flex items-center gap-2 text-white"><Thermometer size={18} /> {t.temp_control}</span>
            <span className="text-xl font-bold font-mono text-blue-400">{temp}°C</span>
          </div>
          <input
            type="range"
            min="16"
            max="30"
            value={temp}
            onChange={(e) => setTemp(e.target.value)}
            className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

      </div>

      {/* 视觉反馈区 (右侧 - 移动端在上) */}
      <div className="w-full h-72 md:h-full relative overflow-hidden bg-black flex-grow">
        {/* 1. 底层：真实的客厅照片 */}
        <img
          src={roomImageUrl}
          alt="Smart Living Room"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 transform hover:scale-105"
        />

        {/* 2. 交互遮罩层 - 灯光 (黑色透明度变化) */}
        <div
          className="absolute inset-0 bg-black transition-opacity duration-1000 pointer-events-none"
          style={{ opacity: lights ? 0 : 0.7 }}
        ></div>

        {/* 3. 交互遮罩层 - 氛围颜色 (场景模式) */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none mix-blend-overlay ${mode === 'movie' ? 'bg-purple-900 opacity-60' : 'bg-orange-100 opacity-10'}`}
        ></div>

        {/* 4. 浮动的 UI 状态指示 */}
        <div className="absolute top-6 right-6 flex flex-col gap-2 items-end">
          <div className="bg-black/40 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm border border-white/10 shadow-lg flex items-center gap-2">
            <Thermometer size={14} className={temp < 22 ? 'text-blue-300' : 'text-orange-300'} />
            {t.room_temp}: {temp}°C
          </div>

          {lights && mode === 'movie' && (
            <div className="bg-purple-900/80 backdrop-blur-md text-purple-100 px-4 py-2 rounded-lg text-sm border border-purple-500/30 shadow-lg animate-pulse">
              🎬 {t.mode_active}
            </div>
          )}
        </div>

        {/* 模拟墙面上的智能开关效果 */}
        <div className={`absolute bottom-8 left-8 transition-opacity duration-500 ${lights ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-white/80 font-mono text-xs tracking-widest mb-1">{t.scene_label}</div>
          <div className="text-white text-3xl font-bold tracking-tight shadow-black drop-shadow-lg">
            {mode === 'movie' ? t.scene_cinema : t.scene_daily}
          </div>
        </div>
      </div>
    </div>
  );
}

// 简单的 AI 问答组件
const AiConsultant = ({ t, lang }) => {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-09-2025" });

      const instruction = lang === 'en'
        ? "Answer in English (under 50 words)."
        : "Answer in Chinese (under 50 words).";

      const prompt = `
                You are a helpful sales consultant for a Smart Home company called 'SmartLife Tech'.
                ${instruction}
                Encourage them to book a consultation.
                User Question: "${query}"
            `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      setAnswer(response.text());
    } catch (error) {
      setAnswer(t.ai_busy);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-slate-400 text-sm">{t.ai_hint}</p>
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.ai_placeholder}
          className="flex-1 bg-slate-900 border border-slate-600 rounded px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
        />
        <button
          onClick={handleAsk}
          disabled={loading}
          className="bg-blue-600 text-white px-3 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? '...' : <Send size={16} />}
        </button>
      </div>
      {answer && (
        <div className="bg-slate-700/50 p-3 rounded text-sm text-slate-200 border-l-2 border-blue-500">
          {answer}
        </div>
      )}
    </div>
  )
}


const FeatureCard = ({ icon, title, desc, children }) => (
  <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
    <div className="mb-4 bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-sm">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed text-sm mb-6">{desc}</p>
    {children && <div className="mt-auto">{children}</div>}
  </div>
);

const RedundancyDiagram = ({ t }) => {
  return (
    <div className="bg-slate-900 rounded-xl p-4 shadow-inner text-[10px] sm:text-xs">
      <div className="flex flex-col gap-3">
        {/* Layer 1: Notification */}
        <div className="flex flex-col items-center">
          <div className="bg-blue-600/20 border border-blue-500/50 rounded px-2 py-1 text-blue-300 font-bold mb-1">
            ALERT DELIVERY
          </div>
          <div className="flex gap-2">
            <span className="bg-blue-900/50 border border-blue-500/20 px-1 rounded text-blue-400">App</span>
            <span className="bg-blue-900/50 border border-blue-500/20 px-1 rounded text-blue-400">SMS/Call</span>
          </div>
        </div>

        {/* Lines */}
        <div className="flex justify-center -my-1">
          <div className="w-px h-3 bg-blue-500/30"></div>
        </div>

        {/* Layer 2: Logic Hub */}
        <div className="flex flex-col items-center">
          <div className="relative group">
            <div className="bg-slate-800 border-2 border-emerald-500/50 rounded-lg p-2 flex items-center gap-2">
              <Zap size={14} className="text-yellow-400 animate-pulse" />
              <span className="text-white font-mono">CORE HUB (UPS)</span>
            </div>
            <div className="absolute -right-2 -top-2 bg-emerald-500 text-[8px] text-white px-1 rounded font-bold">FAILSAFE</div>
          </div>
        </div>

        {/* Lines */}
        <div className="flex justify-center -my-1">
          <div className="w-px h-3 bg-blue-500/30"></div>
        </div>

        {/* Layer 3: Network Failover */}
        <div className="flex justify-center gap-4">
          <div className="flex flex-col items-center">
            <Globe size={14} className="text-blue-400 mb-1" />
            <div className="bg-slate-800 border border-blue-500/30 rounded px-2 py-1 text-slate-400 italic">Broadband</div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="text-emerald-500 mb-1">⇄</div>
          </div>
          <div className="flex flex-col items-center">
            <Smartphone size={14} className="text-emerald-400 mb-1" />
            <div className="bg-slate-800 border border-emerald-500/30 rounded px-2 py-1 text-emerald-400 font-bold">4G/5G Backup</div>
          </div>
        </div>
      </div>

      {/* Legend / Subtext */}
      <div className="mt-4 pt-3 border-t border-slate-700/50 space-y-1 opacity-80">
        <div className="flex items-center gap-2 text-blue-300">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
          {t.network}
        </div>
        <div className="flex items-center gap-2 text-yellow-300">
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
          {t.power}
        </div>
      </div>
    </div>
  );
};

const HistoryItem = ({ year, title, desc, tags }) => (
  <div className="flex flex-col md:flex-row gap-6 group">
    <div className="md:w-24 pt-1">
      <span className="text-2xl font-bold text-slate-300 group-hover:text-blue-500 transition-colors">{year}</span>
    </div>
    <div className="flex-1 pb-8 border-b border-slate-200 group-last:border-0">
      <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">{title}</h3>
      <p className="text-slate-600 mb-4">{desc}</p>
      <div className="flex gap-2 flex-wrap">
        {tags.map((tag, i) => (
          <span key={i} className="px-3 py-1 bg-white border border-slate-200 text-xs font-medium text-slate-500 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default App;
