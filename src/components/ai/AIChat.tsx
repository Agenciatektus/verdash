
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConversationMessage } from "@/types/ai";
import { Send, Brain, User } from "lucide-react";

export const AIChat = () => {
  const [messages, setMessages] = useState<ConversationMessage[]>([
    {
      id: '1',
      role: 'ai',
      content: 'Olá! Sou o Verdash IA, seu copiloto de dados. Posso ajudar você a entender suas métricas, identificar tendências e sugerir ações. Como posso ajudar hoje?',
      timestamp: new Date().toISOString()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ConversationMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simular resposta da IA
    setTimeout(() => {
      const aiResponse: ConversationMessage = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: getAIResponse(input),
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const getAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('custo') || lowerQuestion.includes('cac')) {
      return 'Analisando seus dados, vejo que o custo por aquisição aumentou 12% nos últimos 7 dias. Isso pode estar relacionado ao aumento da concorrência no Google Ads. Recomendo revisar as palavras-chave e otimizar os anúncios com menor performance.';
    }
    
    if (lowerQuestion.includes('conversão') || lowerQuestion.includes('taxa')) {
      return 'Sua taxa de conversão atual está em 3.4%, que é 8% menor que o mês anterior. Os leads do WhatsApp estão convertendo melhor (5.2%) comparado ao Meta (2.8%). Sugiro focar mais no canal WhatsApp e revisar a qualificação dos leads do Meta.';
    }
    
    if (lowerQuestion.includes('vendas') || lowerQuestion.includes('receita')) {
      return 'Suas vendas cresceram 15% este mês, totalizando R$ 234.567. O canal que mais contribuiu foi o Google Ads (40%), seguido pelo WhatsApp (35%). Continue investindo nesses canais e considere expandir as campanhas de melhor performance.';
    }
    
    return 'Com base nos seus dados atuais, posso ver algumas oportunidades de otimização. Gostaria que eu analise alguma métrica específica? Posso ajudar com custos, conversões, leads, vendas ou qualquer outro indicador do seu dashboard.';
  };

  const quickQuestions = [
    "Por que meu custo aumentou?",
    "Qual canal traz mais vendas?",
    "Como melhorar a conversão?",
    "Resumo da semana"
  ];

  return (
    <Card className="verdash-glass h-[600px] flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-white font-grotesk">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-verdash-cyan to-verdash-coral flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          Chat com Verdash IA
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <div className="flex-1 overflow-y-auto px-6 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.role === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-verdash-cyan to-verdash-coral flex items-center justify-center flex-shrink-0">
                  <Brain className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-verdash-blue text-white' 
                  : 'bg-verdash-input-bg border border-verdash-divider text-white'
              }`}>
                <p className="text-sm font-inter leading-relaxed">{message.content}</p>
                <p className="text-xs text-white/50 mt-2">
                  {new Date(message.timestamp).toLocaleTimeString('pt-BR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
              
              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-verdash-input-bg flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-verdash-cyan to-verdash-coral flex items-center justify-center">
                <Brain className="w-4 h-4 text-white animate-pulse" />
              </div>
              <div className="bg-verdash-input-bg border border-verdash-divider rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Questions */}
        <div className="px-6 py-3 border-t border-verdash-divider/30">
          <div className="flex flex-wrap gap-2 mb-3">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs verdash-btn-secondary"
                onClick={() => setInput(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="px-6 pb-6">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pergunte sobre seus dados..."
              className="verdash-input"
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              disabled={isLoading}
            />
            <Button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="verdash-btn-primary"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
