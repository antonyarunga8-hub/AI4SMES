import React, { useState } from 'react';
import { Megaphone, Share2, Sparkles, Calendar, TrendingUp, CheckCircle, Copy, Send, Image as ImageIcon } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MarketingManager() {
  const [productTopic, setProductTopic] = useState('');
  const [targetPlatform, setTargetPlatform] = useState('WhatsApp Status');
  const [tone, setTone] = useState('Enthusiastic & Pan-African');
  const [generatedPost, setGeneratedPost] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const [scheduledPosts, setScheduledPosts] = useState([
    { id: 1, platform: 'WhatsApp Status & Story', content: '🚀 Big News! Get 15% off all hardware tools this Friday. Tap link to order via WhatsApp!', time: 'Friday 8:00 AM', status: 'Scheduled' },
    { id: 2, platform: 'Instagram & Facebook', content: 'Empowering local businesses with AI-driven bookkeeping! Read our founder story.', time: 'Tomorrow 2:00 PM', status: 'Scheduled' }
  ]);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!productTopic) return;

    setIsGenerating(true);
    setTimeout(() => {
      let copy = "";
      if (targetPlatform === 'WhatsApp Status') {
        copy = `🔥 *SPECIAL SME OFFER!* 🔥\n\nLooking for top-tier ${productTopic}? We've got you covered!\n\n✨ Premium Quality\n⚡ Express Delivery across East Africa\n💳 Mobile Money Payment Accepted (M-Pesa / Bank)\n\n📲 Tap to chat with us directly or reply *YES* to place your order now! 🛍️`;
      } else if (targetPlatform === 'Instagram & Facebook') {
        copy = `Transform your routine with premium ${productTopic}! ✨\n\nBuilt specifically for quality-conscious African entrepreneurs & households. Fast shipping, guaranteed satisfaction.\n\n👇 Comment "INFO" or click the link in bio to order today!\n\n#AI4SMEs #AfricanEntrepreneurs #BusinessGrowth #${productTopic.replace(/\s+/g, '')}`;
      } else {
        copy = `We are excited to announce our enhanced offering for ${productTopic}.\n\nAt AI4SMEs Africa, our commitment is to provide scalable, affordable solutions designed for the modern African enterprise.\n\nContact our corporate team today for a customized demo.`;
      }

      setGeneratedPost(copy);
      setIsGenerating(false);

      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.8 }
      });
    }, 1000);
  };

  const handleSchedule = () => {
    if (!generatedPost) return;
    setScheduledPosts([
      {
        id: Date.now(),
        platform: targetPlatform,
        content: generatedPost,
        time: 'Scheduled for Next Optimal Engagement Slot',
        status: 'Scheduled'
      },
      ...scheduledPosts
    ]);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPost);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel p-5 rounded-2xl border border-amber-500/30 flex items-center justify-between flex-wrap gap-4 bg-amber-950/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
            <Megaphone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white font-bold text-base sm:text-lg">AI Marketing Manager & Content Studio</h3>
            <p className="text-slate-400 text-xs sm:text-sm">Generate localized African marketing copy, WhatsApp status blasts, & campaign recommendations</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Generator Form */}
        <div className="lg:col-span-5 glass-panel rounded-2xl border border-slate-800 p-6 space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" /> Content Generator
          </h4>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Product / Service / Promotion</label>
              <input
                type="text"
                required
                placeholder="e.g. Fresh Coffee Beans Discount or Wholesale Maize"
                value={productTopic}
                onChange={(e) => setProductTopic(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Target Channel</label>
                <select
                  value={targetPlatform}
                  onChange={(e) => setTargetPlatform(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="WhatsApp Status">WhatsApp Status</option>
                  <option value="Instagram & Facebook">Instagram / FB</option>
                  <option value="LinkedIn Business">LinkedIn</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Tone & Voice</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Enthusiastic & Pan-African">Pan-African Warm</option>
                  <option value="Professional & Urgent">Urgent & Direct</option>
                  <option value="Informative">Informative</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <Sparkles className="w-4 h-4" />
              {isGenerating ? "AI Crafting High-Converting Copy..." : "Generate AI Marketing Campaign"}
            </button>
          </form>

          {/* Generated Result Box */}
          {generatedPost && (
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase">AI Copy Result ({targetPlatform})</span>
                <button
                  onClick={handleCopy}
                  className="text-xs text-slate-300 hover:text-white flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg"
                >
                  {copied ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied!" : "Copy Copy"}
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 whitespace-pre-line bg-slate-950 p-3 rounded-lg border border-slate-800 font-sans">
                {generatedPost}
              </p>
              <button
                onClick={handleSchedule}
                className="w-full bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-2 border border-amber-500/20"
              >
                <Calendar className="w-3.5 h-3.5" /> Schedule Auto-Post
              </button>
            </div>
          )}
        </div>

        {/* Scheduled Posts & Campaign Performance */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel rounded-2xl border border-slate-800 p-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" /> Active & Scheduled Campaigns
            </h4>
            <div className="space-y-3">
              {scheduledPosts.map((post) => (
                <div key={post.id} className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-semibold">{post.platform}</span>
                      <span className="text-[11px] text-slate-400">{post.time}</span>
                    </div>
                    <p className="text-slate-200 text-xs line-clamp-2">{post.content}</p>
                  </div>
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0 font-medium">
                    {post.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-2xl border border-slate-800 p-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-violet-400" /> AI Marketing ROI & Performance
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-xs">Reach (Impressions)</span>
                <p className="text-xl font-extrabold text-white mt-1">24,500</p>
              </div>
              <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-xs">WhatsApp Clicks</span>
                <p className="text-xl font-extrabold text-emerald-400 mt-1">1,820</p>
              </div>
              <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-xs">Customer Conversion</span>
                <p className="text-xl font-extrabold text-amber-400 mt-1">14.2%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
