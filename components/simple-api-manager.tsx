'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Key, Calendar, Save } from 'lucide-react';

export function SimpleApiManager() {
  const [dob, setDob] = useState('');
  const [geminiKey, setGeminiKey] = useState('');
  const [nvidiaKey, setNvidiaKey] = useState('');
  const [groqKey, setGroqKey] = useState('');
  const [perplexityKey, setPerplexityKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const updateApiKey = async (provider: string, key: string) => {
    if (!dob || !key.trim()) return;
    
    setLoading(true);
    try {
      const payload: any = { dob };
      if (provider === 'gemini') payload.gemini_key = key;
      if (provider === 'nvidia') payload.nvidia_key = key;
      if (provider === 'groq') payload.groq_key = key;
      if (provider === 'perplexity') payload.perplexity_key = key;
      
      const res = await fetch('/api/gi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage(`${provider} API key updated successfully`);
        if (provider === 'gemini') setGeminiKey('');
        if (provider === 'nvidia') setNvidiaKey('');
        if (provider === 'groq') setGroqKey('');
        if (provider === 'perplexity') setPerplexityKey('');
      } else {
        const error = await res.json();
        setMessage(error.message || 'Failed to update API key');
      }
    } catch (error) {
      setMessage('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Key className="w-5 h-5" />
          API Key Manager
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {message && (
          <div className="p-3 rounded-lg text-sm bg-blue-500/10 text-blue-400">
            {message}
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="dob" className="text-zinc-300 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Date of Birth (YYYY-MM-DD)
          </Label>
          <Input
            id="dob"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="bg-zinc-950 border-zinc-800 text-zinc-50"
            placeholder="1995-03-15"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="gemini-key" className="text-zinc-300">
            Gemini API Key
          </Label>
          <div className="flex gap-2">
            <Input
              id="gemini-key"
              type="password"
              placeholder="Enter Gemini API key"
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              className="bg-zinc-950 border-zinc-800 text-zinc-50"
            />
            <Button
              onClick={() => updateApiKey('gemini', geminiKey)}
              disabled={loading || !geminiKey.trim() || !dob}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Save className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="groq-key" className="text-zinc-300">
            Groq API Key (14.4K/day + 1K chat/day)
          </Label>
          <div className="flex gap-2">
            <Input
              id="groq-key"
              type="password"
              placeholder="Enter Groq API key"
              value={groqKey}
              onChange={(e) => setGroqKey(e.target.value)}
              className="bg-zinc-950 border-zinc-800 text-zinc-50"
            />
            <Button
              onClick={() => updateApiKey('groq', groqKey)}
              disabled={loading || !groqKey.trim() || !dob}
              size="sm"
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Save className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="nvidia-key" className="text-zinc-300">
            NVIDIA API Key (40 rpm limit)
          </Label>
          <div className="flex gap-2">
            <Input
              id="nvidia-key"
              type="password"
              placeholder="Enter NVIDIA API key"
              value={nvidiaKey}
              onChange={(e) => setNvidiaKey(e.target.value)}
              className="bg-zinc-950 border-zinc-800 text-zinc-50"
            />
            <Button
              onClick={() => updateApiKey('nvidia', nvidiaKey)}
              disabled={loading || !nvidiaKey.trim() || !dob}
              size="sm"
              className="bg-green-600 hover:bg-green-700"
            >
              <Save className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="perplexity-key" className="text-zinc-300">
            Perplexity API Key
          </Label>
          <div className="flex gap-2">
            <Input
              id="perplexity-key"
              type="password"
              placeholder="Enter Perplexity API key"
              value={perplexityKey}
              onChange={(e) => setPerplexityKey(e.target.value)}
              className="bg-zinc-950 border-zinc-800 text-zinc-50"
            />
            <Button
              onClick={() => updateApiKey('perplexity', perplexityKey)}
              disabled={loading || !perplexityKey.trim() || !dob}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Save className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="text-xs text-zinc-500 mt-4">
          <Key className="w-3 h-3 inline mr-1" />
          Secure API key management via /gi endpoint<br/>
          <span className="text-purple-400">🚀 Groq: 14.4K diagnosis + 1K chat/day</span><br/>
          <span className="text-orange-400">⚠️ NVIDIA: 40 requests/minute limit</span>
        </div>
      </CardContent>
    </Card>
  );
}