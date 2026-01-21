import React, { useState, useEffect } from 'react';
import { Sun, Moon, Wind, Shield, Smartphone, Zap, Music, ArrowRight, Menu, X, Thermometer, ChevronRight, Mail, Sparkles, MessageSquare, Send, Globe } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const TRANSLATIONS = {
  zh: {
    nav: {
      features: "解决方案",
      demo: "在线体验",
      history: "过往案例",
      contact: "联系我们"
    },
    hero: {
      tag: "🚀 AI 驱动的下一代智能家居系统",
      title_start: "您的家，",
      title_end: "比想象中更懂您",
      desc: "不仅仅是远程控制，而是真正的感知与自动化。我们要打造的，是一个能感知您温度、习惯与情绪的居住空间。",
      btn_demo: "立即体验 Demo",
      btn_learn: "了解方案"
    },
    demo: {
      powered_by: "Powered by Gemini",
      title: "指尖上的未来",
      desc: "现在，我们将一张真实的客厅照片接入了系统。您可以手动点击，或者直接告诉 AI 您想做什么。",
      ai_title: "AI 意图识别",
      ai_placeholder: "试着输入: '我想看个电影' 或 '有点冷，我要看书'...",
      ai_btn: "AI 执行指令",
      ai_thinking: "思考中...",
      manual_title: "手动控制",
      light_main: "主照明",
      status_on: "开启",
      status_off: "关闭",
      temp_control: "温控",
      scene_mode: "场景模式",
      scene_read: "明亮",
      scene_movie: "影院",
      room_temp: "室内温度",
      mode_active: "影院模式已激活",
      scene_label: "CURRENT SCENE",
      scene_cinema: "CINEMA",
      scene_daily: "DAILY LIGHT"
    },
    features: {
      title: "全屋智能解决方案",
      subtitle: "我们不仅仅销售硬件，更提供完整的场景化设计。",
      light_title: "智能照明系统",
      light_desc: "随心而动的光影。根据时间、天气和您的活动自动调节色温与亮度，营造完美氛围。",
      security_title: "主动安防监控",
      security_desc: "不仅仅是录像。AI识别陌生人，异常情况毫秒级推送，离家模式自动布防。",
      climate_title: "环境与气候",
      climate_desc: "恒温、恒湿、恒氧。空调、地暖与新风系统的联动控制，懂您的体感舒适度。"
    },
    history: {
      title: "开发历程 & Demo",
      subtitle: "从简单的单片机控制到复杂的全屋互联，这是我们的足迹。",
      btn_github: "查看 GitHub 仓库",
      items: [
        {
          year: "2025",
          title: "Project Alpha: 语音中控中心",
          desc: "成功开发出基于本地大模型的离线语音助手，无需联网即可控制家中所有设备，保护隐私。",
          tags: ['Python', 'IoT', 'Voice AI']
        },
        {
          year: "2024",
          title: "Smart Mirror V2",
          desc: "第二代智能魔镜Demo。集成日程显示、天气预报及健康数据分析，主要用于浴室场景。",
          tags: ['React Native', 'Raspberry Pi']
        },
        {
          year: "2023",
          title: "基于 Zigbee 的灯光阵列",
          desc: "最早的原型验证。实现了对50+灯泡的低延迟同步控制，解决了大规模组网的丢包问题。",
          tags: ['C++', 'Zigbee', 'Hardware']
        }
      ]
    },
    contact: {
      title: "准备好升级您的生活空间了吗？",
      desc: "留下您的联系方式，我们将提供免费的上门勘测与方案设计。",
      ai_title: "智能家居顾问 (AI Beta)",
      ai_online: "Online",
      ai_hint: "有什么不清楚的吗？随便问问 AI，比如“全屋智能大概多少钱？”",
      ai_placeholder: "请输入您的问题...",
      ai_busy: "抱歉，我现在有点忙，请直接拨打我们的电话咨询。",
      footer: "© 2026 SmartLife Tech. All rights reserved."
    }
  },
  en: {
    nav: {
      features: "Solutions",
      demo: "Demo",
      history: "Case Studies",
      contact: "Contact"
    },
    hero: {
      tag: "🚀 AI-Driven Next Gen Interactive Home",
      title_start: "Your Home,",
      title_end: "Knows You Better",
      desc: "Beyond remote control—true perception and automation. We build living spaces that sense your temperature, habits, and mood.",
      btn_demo: "Try Demo",
      btn_learn: "Learn More"
    },
    demo: {
      powered_by: "Powered by Gemini",
      title: "Future at Your Fingertips",
      desc: "We've connected a real living room photo to the system. Tap manually or tell AI what you want to do.",
      ai_title: "AI Intent Recognition",
      ai_placeholder: "Try: 'I want to watch a movie' or 'It's cold, I want to read'...",
      ai_btn: "Execute Command",
      ai_thinking: "Thinking...",
      manual_title: "Manual Control",
      light_main: "Main Light",
      status_on: "ON",
      status_off: "OFF",
      temp_control: "Temp",
      scene_mode: "Scene",
      scene_read: "Bright",
      scene_movie: "Cinema",
      room_temp: "Room Temp",
      mode_active: "Cinema Mode Active",
      scene_label: "CURRENT SCENE",
      scene_cinema: "CINEMA",
      scene_daily: "DAILY LIGHT"
    },
    features: {
      title: "Whole-Home Solutions",
      subtitle: "We don't just sell hardware; we provide complete scenario designs.",
      light_title: "Smart Lighting",
      light_desc: "Lights that move with you. Auto-adjusts color and brightness based on time, weather, and activity.",
      security_title: "Active Security",
      security_desc: "More than recording. AI identifies strangers, sends ms-level alerts, and auto-arms when away.",
      climate_title: "Climate Control",
      climate_desc: "Constant temp, humidity, and oxygen. Coordinated AC, floor heating, and fresh air systems."
    },
    history: {
      title: "Development & History",
      subtitle: "From simple MCU control to complex whole-home interconnection.",
      btn_github: "View GitHub",
      items: [
        {
          year: "2025",
          title: "Project Alpha: Voice Hub",
          desc: "Developed offline voice assistant based on local LLM. Controls all devices without internet to protect privacy.",
          tags: ['Python', 'IoT', 'Voice AI']
        },
        {
          year: "2024",
          title: "Smart Mirror V2",
          desc: "2nd Gen Smart Mirror. Integrated schedule, weather, and health analytics for bathroom scenarios.",
          tags: ['React Native', 'Raspberry Pi']
        },
        {
          year: "2023",
          title: "Zigbee Light Array",
          desc: "Early prototype. Achieved low-latency sync control for 50+ bulbs, solving large-scale mesh packet loss.",
          tags: ['C++', 'Zigbee', 'Hardware']
        }
      ]
    },
    contact: {
      title: "Ready to Upgrade Your Life?",
      desc: "Leave your contact info for a free on-site survey and design proposal.",
      ai_title: "Smart Home Advisor (AI Beta)",
      ai_online: "Online",
      ai_hint: "Any questions? Ask AI: 'How much does it cost?'",
      ai_placeholder: "Ask something...",
      ai_busy: "Sorry, I'm busy. Please call us directly.",
      footer: "© 2026 SmartLife Tech. All rights reserved."
    }
  }
};

const App = () => {
  const [lang, setLang] = useState('zh'); // 'zh' | 'en'
  const t = TRANSLATIONS[lang];

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => scrollToSection('demo')} className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200 flex items-center justify-center gap-2">
              <Zap size={20} />
              {t.hero.btn_demo}
            </button>
            <button onClick={() => scrollToSection('features')} className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-lg text-lg font-bold hover:bg-slate-50 transition flex items-center justify-center gap-2">
              {t.hero.btn_learn}
              <ArrowRight size={20} />
            </button>
          </div>
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
            />
            <FeatureCard
              icon={<Wind className="text-cyan-500" size={32} />}
              title={t.features.climate_title}
              desc={t.features.climate_desc}
            />
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
              <p className="mb-8 text-lg">{t.contact.desc}</p>
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
const apiKey = typeof process !== 'undefined' && process.env.REACT_APP_GEMINI_API_KEY ? process.env.REACT_APP_GEMINI_API_KEY : "";

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
                You are a smart home control assistant. The user will give you a command or describe their current activity/mood.
                Analyze the intent and return a JSON object to control the room.
                
                Current State:
                - Lights: ${lights ? 'on' : 'off'}
                - Mode: ${mode} ('read' or 'movie')
                - Temp: ${temp}

                User Input: "${aiInput}"

                Rules:
                - 'mode' MUST be either 'read' or 'movie'.
                - 'lights' MUST be boolean.
                - 'temp' MUST be a number between 16 and 30.
                - 'reply' should be a confirmation message. ${instruction}

                Output JSON Format:
                {
                    "mode": "movie",
                    "lights": true,
                    "temp": 24,
                    "reply": "..."
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


const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    <div className="mb-4 bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-sm">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed text-sm">{desc}</p>
  </div>
);

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
