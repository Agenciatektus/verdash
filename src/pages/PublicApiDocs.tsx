import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Code, Copy, Check, MessageSquare, ThumbsUp, ThumbsDown, AlertCircle, Menu, Bell, HelpCircle, User, X, BookOpen, MessageCircle, FileText, LogOut } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { API_VERSIONS, VERSION_STATUS } from '@/config/apiVersions';
import { versionedContent } from '@/config/apiContent';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';

// Componente de código copiável
function CodeBlock({ code, language = 'bash', className = '' }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className={`relative group ${className}`}>
      <pre className="bg-black/90 text-green-400 rounded-lg p-4 overflow-x-auto text-sm font-mono border border-slate-800">
        {code}
      </pre>
      <button
        onClick={copy}
        className="absolute top-2 right-2 p-2 rounded bg-slate-800/80 hover:bg-slate-700/80 text-white"
        aria-label="Copiar código"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}

// Definição de docSections (estrutura das seções da documentação)
const docSections = [
  {
    id: 'intro',
    label: 'Introdução',
    title: 'API Pública Verdash',
    breadcrumbs: ['Introdução'],
    toc: [
      { id: 'intro', label: 'Introdução' },
      { id: 'intro-quickstart', label: 'Comece rápido' },
      { id: 'intro-exemplo', label: 'Exemplo de integração' },
      { id: 'intro-tabela', label: 'Tabela de recursos' },
    ],
    content: {
      description: (
        <>
          <h2 className="text-xl font-bold mb-2" id="intro-quickstart">Comece rápido</h2>
          <p className="mb-4">A API Verdash permite integrar dashboards e métricas em minutos. Siga o passo a passo:</p>
          <ol className="list-decimal ml-6 mb-4">
            <li>Crie uma conta ou acesse sua conta Verdash.</li>
            <li>Gere uma API Key no painel de integrações.</li>
            <li>Use a API Key para autenticar suas requisições.</li>
          </ol>
          <div className="mb-4 p-4 bg-yellow-900/30 border-l-4 border-yellow-500 text-yellow-200 rounded">
            <strong>Dica:</strong> Nunca compartilhe sua API Key publicamente.
          </div>
          <h3 className="text-lg font-semibold mt-8 mb-2" id="intro-exemplo">Exemplo de integração</h3>
          <CodeBlock code={`npm install axios

# ou usando fetch nativo do browser`} language="bash" />
          <CodeBlock code={`fetch('https://verdash.app/api/v1/metrics', {
  headers: { 'x-api-key': 'SUA_API_KEY_AQUI' }
})
.then(r => r.json())
.then(console.log)`} language="javascript" />
          <blockquote className="border-l-4 border-verdash-cyan/80 pl-4 italic text-slate-300 my-4">“A API Verdash foi pensada para ser simples, segura e escalável.”</blockquote>
          <hr className="my-6 border-slate-700" />
          <h4 className="text-base font-bold mb-2" id="intro-tabela">Tabela de recursos</h4>
          <table className="w-full text-sm mb-4 border-collapse">
            <thead>
              <tr className="bg-slate-800 text-slate-200">
                <th className="p-2 border border-slate-700">Recurso</th>
                <th className="p-2 border border-slate-700">Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-slate-700">/metrics</td>
                <td className="p-2 border border-slate-700">Consulta métricas do seu projeto</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-700">/dashboards</td>
                <td className="p-2 border border-slate-700">Lista dashboards disponíveis</td>
              </tr>
            </tbody>
          </table>
          <div className="my-6">
            <img src="/public/screenshots/tela_dashboard_principal.png" alt="Exemplo de dashboard Verdash" className="rounded-lg border border-slate-800 shadow-lg max-w-full" />
            <div className="text-xs text-slate-400 mt-2">Exemplo de dashboard integrado via API Verdash</div>
          </div>
        </>
      ),
    },
  },
  {
    id: 'auth',
    label: 'Autenticação',
    title: 'Autenticação',
    breadcrumbs: ['Autenticação'],
    toc: [
      { id: 'auth', label: 'Autenticação' },
      { id: 'auth-header', label: 'Header de autenticação' },
      { id: 'auth-examples', label: 'Exemplos' },
    ],
    content: {
      description: 'Todas as requisições devem conter o header de autenticação com sua API Key.',
      header: 'x-api-key: SUA_API_KEY_AQUI',
      examples: {
        curl: 'curl -H "x-api-key: SUA_API_KEY_AQUI" https://verdash.app/api/v1/metrics',
        javascript: `fetch('https://verdash.app/api/v1/metrics', { headers: { 'x-api-key': 'SUA_API_KEY_AQUI' } })\n.then(r => r.json())`,
        python: `import requests\nrequests.get('https://verdash.app/api/v1/metrics', headers={'x-api-key': 'SUA_API_KEY_AQUI'})`,
        node: `const axios = require('axios');\naxios.get('https://verdash.app/api/v1/metrics', { headers: { 'x-api-key': 'SUA_API_KEY_AQUI' } })` 
      },
    },
  },
  {
    id: 'endpoints',
    label: 'Endpoints',
    title: 'Endpoints',
    breadcrumbs: ['Endpoints'],
    toc: [
      { id: 'endpoints', label: 'Endpoints' },
      { id: 'get-metrics', label: 'GET /metrics' },
      { id: 'post-metrics', label: 'POST /metrics' },
    ],
    children: [
      {
        id: 'get-metrics',
        label: 'GET /metrics',
        title: 'GET /metrics',
        breadcrumbs: ['Endpoints', 'GET /metrics'],
        toc: [
          { id: 'get-metrics', label: 'GET /metrics' },
          { id: 'get-metrics-request', label: 'Requisição' },
          { id: 'get-metrics-response', label: 'Resposta' },
        ],
        content: {
          description: 'Lista métricas associadas à integração da API Key.',
          request: {
            curl: 'curl -H "x-api-key: SUA_API_KEY_AQUI" https://verdash.app/api/v1/metrics',
            javascript: `fetch('https://verdash.app/api/v1/metrics', { headers: { 'x-api-key': 'SUA_API_KEY_AQUI' } })`,
            python: `import requests\nrequests.get('https://verdash.app/api/v1/metrics', headers={'x-api-key': 'SUA_API_KEY_AQUI'})`,
            node: `const axios = require('axios');\naxios.get('https://verdash.app/api/v1/metrics', { headers: { 'x-api-key': 'SUA_API_KEY_AQUI' } })` 
          },
          response: `[
  {
    "id": "metric-uuid",
    "name": "Vendas",
    "value": 1234,
    "updated_at": "2024-07-10T12:00:00Z",
    "metadata": {
      "unit": "R$",
      "format": "currency"
    }
  }
]`,
        },
      },
      {
        id: 'post-metrics',
        label: 'POST /metrics',
        title: 'POST /metrics',
        breadcrumbs: ['Endpoints', 'POST /metrics'],
        toc: [
          { id: 'post-metrics', label: 'POST /metrics' },
          { id: 'post-metrics-request', label: 'Requisição' },
          { id: 'post-metrics-response', label: 'Resposta' },
        ],
        content: {
          description: 'Cria uma nova métrica.',
          request: {
            curl: 'curl -X POST -H "x-api-key: SUA_API_KEY_AQUI" -d "{...}" https://verdash.app/api/v1/metrics',
            javascript: `fetch('https://verdash.app/api/v1/metrics', { method: 'POST', headers: { 'x-api-key': 'SUA_API_KEY_AQUI', 'Content-Type': 'application/json' }, body: JSON.stringify({ ... }) })`,
            python: `import requests\nrequests.post('https://verdash.app/api/v1/metrics', headers={'x-api-key': 'SUA_API_KEY_AQUI'}, json={...})`,
            node: `const axios = require('axios');\naxios.post('https://verdash.app/api/v1/metrics', {...}, { headers: { 'x-api-key': 'SUA_API_KEY_AQUI' } })` 
          },
          response: `{
  "id": "metric-uuid",
  "name": "Vendas",
  "value": 1234,
  "updated_at": "2024-07-10T12:00:00Z"
}`,
        },
      },
    ],
  },
];

// Componente para exemplos de código interativos
const CodeExample = ({ code, language = "javascript" }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Código copiado!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="bg-slate-900/60 p-4 rounded-lg overflow-x-auto">
        <code className="text-sm">{code}</code>
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 p-2 rounded-md bg-slate-800/80 hover:bg-slate-700/80 transition-colors"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
};

// Componente de feedback
const FeedbackSection = ({ sectionId }) => {
  const [feedback, setFeedback] = useState(null);
  const [comment, setComment] = useState("");

  const submitFeedback = (isPositive) => {
    setFeedback(isPositive);
    toast.success("Obrigado pelo seu feedback!");
  };

  return (
    <div className="mt-4 p-4 bg-slate-900/30 rounded-lg">
      <h4 className="text-sm font-semibold mb-2">Esta página foi útil?</h4>
      <div className="flex items-center gap-4">
        <button
          onClick={() => submitFeedback(true)}
          className={`p-2 rounded-md transition-colors ${
            feedback === true ? 'bg-green-500/20 text-green-400' : 'hover:bg-slate-800/50'
          }`}
        >
          <ThumbsUp className="w-4 h-4" />
        </button>
        <button
          onClick={() => submitFeedback(false)}
          className={`p-2 rounded-md transition-colors ${
            feedback === false ? 'bg-red-500/20 text-red-400' : 'hover:bg-slate-800/50'
          }`}
        >
          <ThumbsDown className="w-4 h-4" />
        </button>
      </div>
      {feedback !== null && (
        <div className="mt-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Deixe um comentário (opcional)"
            className="w-full p-2 bg-slate-800/50 rounded-md text-sm"
            rows={3}
          />
          <Button className="mt-2" onClick={() => toast.success("Comentário enviado!")}>
            Enviar
          </Button>
        </div>
      )}
    </div>
  );
};

// Componente de busca
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <Input
        type="search"
        placeholder="Buscar na documentação..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10 bg-slate-900/60"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
    </form>
  );
};

const LANGUAGES = [
  { id: 'curl', label: 'cURL' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'python', label: 'Python' },
  { id: 'node', label: 'Node.js' },
];

const containerClass = `mx-auto w-full max-w-[1280px] xl:max-w-[1280px] lg:max-w-[90vw] sm:max-w-[95vw] px-4`;

function findSectionById(id, sections = docSections) {
  for (const section of sections) {
    if (section.id === id) return section;
    if (section.children) {
      for (const child of section.children) {
        if (child.id === id) return child;
      }
    }
  }
  return null;
}

const SIDEBAR_WIDTH = 260; // px
const SIDEBAR_GAP_PERCENT = '16.6%';
const CONTENT_MAX_WIDTH = '55%';
const TOC_WIDTH = 260; // px
const TOC_GAP_PERCENT = '15%';
const HEADER_HEIGHT = 64; // px (h-16)
const MAX_WIDTH = 1420; // px

export default function PublicApiDocs() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedId, setSelectedId] = useState(docSections[0].id);
  const [selectedLang, setSelectedLang] = useState('curl');
  const [tocOpen, setTocOpen] = useState(true);
  const [search, setSearch] = useState('');
  const mainContentRef = useRef(null);
  const { user, logout } = useAuth();

  // Hook para responsividade
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1920);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const isLargeScreen = windowWidth >= 1600;
  const isMediumScreen = windowWidth >= 1280 && windowWidth <= 1518;
  const sidebarLeft = isMediumScreen ? '0%' : (isLargeScreen ? '16.6%' : '24px');
  const tocRight = isMediumScreen ? '0px' : (isLargeScreen ? '15%' : '24px');
  const CONTENT_MAX_WIDTH = isMediumScreen ? '70%' : '55%';
  const contentMarginLeft = sidebarOpen
    ? (isMediumScreen ? '20%' : (isLargeScreen ? `calc(18% + ${SIDEBAR_WIDTH}px)` : `calc(24px + ${SIDEBAR_WIDTH}px)`))
    : (isMediumScreen ? '20%' : (isLargeScreen ? '18%' : '24px'));
  const contentMarginRight = isLargeScreen
    ? `calc(${TOC_GAP_PERCENT} + ${TOC_WIDTH}px)`
    : `calc(24px + ${TOC_WIDTH}px)`;
  const openButtonLeft = sidebarOpen
    ? (isLargeScreen ? `calc(18% + 260px)` : `calc(24px + 260px)`)
    : (isLargeScreen ? '16.6%' : '24px');

  // Filtro de busca na sidebar
  const filteredSections = useMemo(() => {
    if (!search.trim()) return docSections;
    const q = search.trim().toLowerCase();
    return docSections
      .map(section => {
        const matchSection = section.label.toLowerCase().includes(q);
        let filteredChildren = [];
        if (section.children) {
          filteredChildren = section.children.filter(child =>
            child.label.toLowerCase().includes(q)
          );
        }
        if (matchSection || filteredChildren.length > 0) {
          return {
            ...section,
            children: filteredChildren.length > 0 ? filteredChildren : section.children,
          };
        }
        return null;
      })
      .filter(Boolean);
  }, [search]);

  const selectedSection = findSectionById(selectedId);
  const breadcrumbs = selectedSection?.breadcrumbs || [];
  const toc = selectedSection?.toc || [];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToAnchor = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    if (!mainContentRef.current) return;
    const headings = mainContentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach((el) => {
      if (!el.id) {
        el.id = el.textContent.replace(/\s+/g, '-').toLowerCase();
      }
    });
  }, [selectedId, selectedLang]);

  function renderSectionContent(section) {
    if (!section) return null;
    return (
      <div ref={mainContentRef} className="prose prose-invert max-w-none">
        {typeof section.content?.description === 'string'
          ? <p>{section.content.description}</p>
          : section.content?.description}
      </div>
    );
  }

  const tocShouldShow = tocOpen || window.innerWidth >= 1024;

  // Função para copiar todo o conteúdo da página
  const copyPageContent = () => {
    if (mainContentRef.current) {
      const text = mainContentRef.current.innerText;
      navigator.clipboard.writeText(text);
      toast.success('Conteúdo copiado!');
    }
  };

  // Detecta se é desktop (>=1024px)
  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Se não for desktop, sidebar sempre overlay
  const showSidebar = sidebarOpen && (isDesktop || !sidebarOpen ? sidebarOpen : false);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-950/80 to-slate-900/80 flex">
      {/* Header fixo largura total */}
      <header className="fixed top-0 left-0 w-full h-16 z-40 flex items-center bg-white/10 dark:bg-[#0A0E1E]/40 backdrop-blur-[12px] border-b border-white/10 px-8">
        <div className="w-full max-w-[1420px] mx-auto flex items-center">
          <img src="/lovable-uploads/Logo-verdash.svg" alt="Verdash Logo" className="h-8 w-auto" />
          <span className="font-bold text-lg text-white ml-2 hidden md:inline">Documentação Verdash</span>
          <div className="flex items-center gap-4 ml-auto">
            {/* Notificações reais */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative hover:bg-white/5 transition-all duration-300">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-card/30 backdrop-blur-md border-white/5">
                <div className="p-2">
                  <h3 className="text-sm font-semibold mb-2">Notificações</h3>
                  {/* Exemplo de notificação mockada */}
                  <div className="p-2 hover:bg-white/5 rounded-md transition-all duration-300">
                    <p className="text-sm font-medium">Nova venda</p>
                    <p className="text-xs text-muted-foreground">Venda de R$ 5.000 realizada</p>
                    <p className="text-xs text-muted-foreground mt-1">5 min atrás</p>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Suporte rápido */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-white/5 transition-all duration-300">
                  <HelpCircle className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card/30 backdrop-blur-md border-white/5">
                <div className="p-2">
                  <h3 className="text-sm font-semibold mb-2">Suporte Rápido</h3>
                  <a href="/docs" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-md transition-all duration-300"><BookOpen className="w-4 h-4" /><span className="text-sm">Documentação</span></a>
                  <a href="/docs/api" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-md transition-all duration-300"><Code className="w-4 h-4" /><span className="text-sm">API Docs</span></a>
                  <a href="/support" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-md transition-all duration-300"><MessageCircle className="w-4 h-4" /><span className="text-sm">Contato</span></a>
                  <a href="/faq" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-md transition-all duration-300"><FileText className="w-4 h-4" /><span className="text-sm">FAQ</span></a>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Usuário */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-white/5 transition-all duration-300">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="bg-gradient-to-br from-verdash-blue to-verdash-cyan text-white">
                      {user?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card/30 backdrop-blur-md border-white/5">
                <DropdownMenuItem className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 text-red-500" onClick={logout}>
                  <LogOut className="w-4 h-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      {/* Botão para abrir sidebar, sempre renderizado, transição suave */}
      <button
        className="fixed top-24 z-40 p-2 rounded transition-all duration-300 hover:bg-slate-800 bg-slate-900/80 border border-slate-800 shadow-lg"
        style={{
          left: openButtonLeft,
          opacity: sidebarOpen ? 0 : 1,
          pointerEvents: sidebarOpen ? 'none' : 'auto',
          transition: 'left 0.3s, opacity 0.3s',
        }}
        aria-label="Abrir menu"
        onClick={() => setSidebarOpen(true)}
        type="button"
      >
        <span className="sr-only">Abrir menu</span>
        <svg className="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" d="M1.5 2.5h13v2.505h-13V2.5ZM0 1h16v11.5c0 1.3807-1.1193 2.5-2.5 2.5h-11C1.11929 15 0 13.8807 0 12.5V1Zm14.5 11.5c0 .5523-.4477 1-1 1h-11c-.55228 0-1-.4477-1-1V6.255h13V12.5Z" fill="currentColor" fillRule="evenodd"></path>
          <path className="origin-center [transform-box:fill-box] motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.4,0,0.2,1)] -translate-x-[380%]" d="M5 5h1.25v8.5H5z" fill="currentColor"></path>
        </svg>
      </button>
      {sidebarOpen && (
        <aside
          className="fixed top-16 z-30 bg-slate-900/60 backdrop-blur border-r border-slate-800 flex flex-col"
          style={{ left: sidebarLeft, width: SIDEBAR_WIDTH, height: 'calc(100vh - 4rem)' }}
        >
          {/* Botão de recolher sidebar */}
          <button
            className="absolute top-6 z-40 p-2 rounded transition-all duration-300 hover:bg-slate-800"
            style={{ left: 'calc(104%)', position: 'absolute', transformOrigin: 'right' }}
            aria-label="Recolher menu"
            onClick={() => setSidebarOpen(false)}
            type="button"
          >
            <span className="sr-only">Recolher menu</span>
            <svg className="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M1.5 2.5h13v2.505h-13V2.5ZM0 1h16v11.5c0 1.3807-1.1193 2.5-2.5 2.5h-11C1.11929 15 0 13.8807 0 12.5V1Zm14.5 11.5c0 .5523-.4477 1-1 1h-11c-.55228 0-1-.4477-1-1V6.255h13V12.5Z" fill="currentColor" fillRule="evenodd"></path>
              <path className="origin-center [transform-box:fill-box] motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.4,0,0.2,1)] -translate-x-[380%]" d="M5 5h1.25v8.5H5z" fill="currentColor"></path>
            </svg>
          </button>
          <div className="px-6 py-6 pb-0">
            <Input
              type="search"
              placeholder="Buscar na documentação..."
              className="mb-4"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <nav className="flex-1 overflow-y-auto mt-4 px-4 py-3 pl-6">
            {/* Menu de documentação */}
            {filteredSections.length === 0 && (
              <div className="text-slate-400 text-sm px-2 py-4">Nenhuma seção encontrada.</div>
            )}
            {filteredSections.map(section => (
              <div key={section.id} className="mb-2">
                <button
                  className={`w-full text-left px-2 py-1 rounded hover:bg-slate-800/40 font-semibold text-white/90 ${selectedId === section.id ? 'bg-verdash-cyan/20' : ''}`}
                  onClick={() => setSelectedId(section.id)}
                >
                  {section.label}
                </button>
                {section.children && (
                  <div className="ml-2 mt-1">
                    {section.children.map(child => (
                      <button
                        key={child.id}
                        className={`block w-full text-left px-2 py-1 rounded text-sm hover:bg-slate-800/30 ${selectedId === child.id ? 'bg-verdash-cyan/30 font-bold' : ''}`}
                        onClick={() => setSelectedId(child.id)}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </aside>
      )}
      {/* TOC (índice) fixo à direita, sem fundo */}
      <aside className="fixed top-16 z-20 border-l border-slate-800 flex flex-col"
        style={{ right: tocRight, width: TOC_WIDTH, height: 'calc(100vh - 4rem)', background: 'none', backdropFilter: 'none' }}
      >
        <div className="p-6 pb-0">
          <span className="font-bold text-white/80">Índice</span>
        </div>
        <nav className="flex-1 overflow-y-auto mt-4 px-6">
          {tocShouldShow && (
            <nav className="flex-1 overflow-y-auto text-slate-300 text-sm">
              {toc.map(item => (
                <div
                  key={item.id}
                  className="mb-2 cursor-pointer hover:text-verdash-cyan transition-colors"
                  onClick={() => scrollToAnchor(item.id)}
                >
                  {item.label}
                </div>
              ))}
            </nav>
          )}
        </nav>
      </aside>
      {/* Conteúdo central */}
      <main
        className="pt-16 flex-1 min-w-0 px-10 transition-all duration-300"
        style={{
          marginTop: 30,
          marginLeft: contentMarginLeft,
          marginRight: contentMarginRight,
          maxWidth: CONTENT_MAX_WIDTH,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          alignItems: 'stretch',
          justifyContent: 'flex-start',
          alignContent: 'flex-start',
          transition: 'width 0.3s, margin 0.3s',
        }}
      >
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-2">
          <nav className="text-sm text-slate-400 flex gap-2 items-center">
            <span>Home</span>
            <span>/</span>
            <span>Documentação</span>
            {breadcrumbs.map((bc, idx) => (
              <React.Fragment key={bc}>
                <span>/</span>
                <span className={idx === breadcrumbs.length - 1 ? 'text-white font-semibold' : ''}>{bc}</span>
              </React.Fragment>
            ))}
          </nav>
        </div>
        {/* H1 dinâmico e botão copiar página */}
        <div className="flex items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold text-white flex-1">{selectedSection?.title}</h1>
          <button
            className="p-2 rounded bg-slate-800/60 hover:bg-slate-700/60 text-white flex items-center gap-2"
            onClick={copyPageContent}
            aria-label="Copiar conteúdo da página"
          >
            <Copy className="w-5 h-5" />
            <span className="hidden md:inline">Copiar página</span>
          </button>
        </div>
        <div ref={mainContentRef}>
          {renderSectionContent(selectedSection)}
        </div>
      </main>
    </div>
  );
} 