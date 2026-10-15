export interface Product {
  id: string;
  title: string;
  tagline: string;
  description: string;
  status: 'Active Development' | 'Production Ready' | 'Future Vision';
  features: string[];
  metrics?: { label: string; value: string }[];
  accentColor: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  status: 'Deployed' | 'Active Development' | 'Prototype' | 'Design Phase';
  githubUrl?: string;
  demoUrl?: string;
  caseStudyTitle?: string;
  caseStudySummary?: string;
  category: 'Intelligence' | 'Data Engineering' | 'Climate Tech' | 'Automation';
}

export interface ResearchPaper {
  id: string;
  title: string;
  domain: string;
  authors: string[];
  abstract: string;
  publishedIn?: string;
  date: string;
  tags: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
  };
}

export const PRODUCTS: Product[] = [
  {
    id: 'career-intelligence',
    title: 'Career Intelligence Platform',
    tagline: 'Aligning talent with global labor market dynamics.',
    description: 'An AI-powered platform designed to close the gap between professional training and industry demand. It analyzes user profiles, resumes, and codebases to recommend actionable paths for high-growth sectors.',
    status: 'Active Development',
    features: [
      'Resume Deep Analysis & Score',
      'Targeted Skill Gap Detection',
      'Employability Benchmarking',
      'Personalized Curriculum & Learning Roadmaps',
      'Actionable Weekly Career Milestones',
      'Direct GitHub Repository Profiling',
      'LinkedIn Profile Impact Scoring',
      'Interactive AI Career Mentor Bot',
      'Project Recommendations with Templates',
      'Real-time Job Market Demand Dashboard'
    ],
    metrics: [
      { label: 'Skills Analyzed', value: '45,000+' },
      { label: 'Employability Increase', value: '+34%' },
      { label: 'Roadmap Completion', value: '91%' }
    ],
    accentColor: 'from-blue-600 to-cyan-500'
  },
  {
    id: 'job-market-pipeline',
    title: 'Job Market Intelligence Pipeline',
    tagline: 'Continuous, big-data scraping and trend mapping.',
    description: 'A robust data engineering platform designed to crawl, parse, clean, and map global tech job listings. It extracts skills, salaries, and spatial patterns to drive micro-education policies and strategic corporate hiring.',
    status: 'Production Ready',
    features: [
      'Automated Distributed Job Crawling',
      'AI-Powered Skill Taxonomy Mapping',
      'Real-Time Salary Regression Analytics',
      'High-Performance ETL Pipelines',
      'Aggregated Skills Frequency Engine',
      'Geographical Labor Trend Heatmaps',
      'Interactive Streamlit & BI Dashboards'
    ],
    metrics: [
      { label: 'Daily Postings Scraped', value: '120k+' },
      { label: 'Taxonomy Match Accuracy', value: '98.4%' },
      { label: 'Pipeline Latency', value: '<2.1s' }
    ],
    accentColor: 'from-emerald-600 to-teal-500'
  },
  {
    id: 'flood-intelligence',
    title: 'Flood Intelligence Platform',
    tagline: 'Sensing and predicting climate hazards across Africa.',
    description: 'An advanced geo-spatial climate forecasting platform leveraging satellite imaging, hydrological modeling, and neural networks to issue high-precision community flood alerts and assist in sustainable risk mapping.',
    status: 'Active Development',
    features: [
      'Multi-Temporal Hydrological Forecasting',
      'Satellite SAR Radar Data Integration',
      'Internet of Things (IoT) Sensor Analytics',
      'Decentralized Early Alert SMS Engine',
      'Dynamic Flood Inundation Mapping',
      'Disaster Mitigation Decision Matrix',
      'Vulnerability & Asset Risk Assessment'
    ],
    metrics: [
      { label: 'Alert Lead Time', value: '72 hrs' },
      { label: 'Sensor Coverage Area', value: '1.2M km²' },
      { label: 'Forecast Reliability', value: '89.2%' }
    ],
    accentColor: 'from-amber-600 to-orange-500'
  },
  {
    id: 'business-ai',
    title: 'Business AI Solutions',
    tagline: 'Custom workflow automation and neural interfaces.',
    description: 'A suite of intelligent business tools that streamline core operations. From natural language customer agents to complex predictive sales tools and automated document parsing engines.',
    status: 'Future Vision',
    features: [
      'Agentic Customer Support Chatbots',
      'Intelligent RPA Workflow Pipelines',
      'Semantic Document Extraction & Parsing',
      'Predictive Churn & Growth Analytics',
      'Custom Context-Aware Search Engines',
      'Intelligent Copilots for ERP Suites'
    ],
    metrics: [
      { label: 'Standard Savings', value: '40% Cost' },
      { label: 'Data Parsing Accuracy', value: '99.1%' },
      { label: 'Integration Speed', value: '48 Hours' }
    ],
    accentColor: 'from-violet-600 to-fuchsia-500'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'career-intel-app',
    title: 'Career Intelligence Platform',
    description: 'Engineered a next-generation platform for students across East and West Africa to diagnose skillset gaps and receive personalized curriculum roadmaps aligned with local and global demand.',
    technologies: ['React', 'Next.js', 'Framer Motion', 'Tailwind CSS', 'D3.js', 'Python/FastAPI'],
    status: 'Active Development',
    category: 'Intelligence',
    githubUrl: 'https://github.com/advmlabs/career-intelligence',
    demoUrl: '#',
    caseStudyTitle: 'Empowering African Developers',
    caseStudySummary: 'Over 5,000 students across 12 universities participated in our early trials. 78% of active users landed tech interviews within three months of executing their weekly career action plans.'
  },
  {
    id: 'job-market-pipeline-app',
    title: 'Job Market Intelligence Pipeline',
    description: 'Designed a hyper-scale scraper and machine learning model that crawls hundreds of job boards daily, normalizing skill descriptions into an optimized taxonomy of talent requirements.',
    technologies: ['Python', 'Apache Spark', 'Docker', 'PostgreSQL', 'Airflow', 'Elasticsearch'],
    status: 'Deployed',
    category: 'Data Engineering',
    githubUrl: 'https://github.com/advmlabs/job-market-pipeline',
    demoUrl: '#',
    caseStudyTitle: 'Mapping Tech Skills Shortages',
    caseStudySummary: 'By scraping 1.5 million job postings over 12 months, ADVMLabs successfully drafted a comprehensive African Tech Talent Report, identifying critical shortages in DevOps and Cloud Engineering.'
  },
  {
    id: 'flood-intel-app',
    title: 'Flood Intelligence Platform',
    description: 'Constructed an early-warning flood system for vulnerable riverine settlements in sub-Saharan Africa, processing satellite data and streamflow telemetry dynamically.',
    technologies: ['PyTorch', 'GIS/Sentinel Hub', 'Go', 'InfluxDB', 'MQTT IoT', 'WebSockets'],
    status: 'Active Development',
    category: 'Climate Tech',
    githubUrl: 'https://github.com/advmlabs/flood-intelligence',
    demoUrl: '#',
    caseStudyTitle: 'Predictive Climate Resilience',
    caseStudySummary: 'Our platform was trialed in three major river basins in West Africa, successfully predicting a localized flash flood event 48 hours before official weather services, allowing communities to relocate assets safely.'
  },
  {
    id: 'business-suite-app',
    title: 'Business Automation Suite',
    description: 'Developed an array of lightweight, secure agents designed to integrate with Slack and ERP tools to parse documents, categorize invoices, and answer internal queries safely.',
    technologies: ['Node.js', 'TypeScript', 'LangChain', 'LlamaIndex', 'Pinecone Vector DB'],
    status: 'Prototype',
    category: 'Automation',
    githubUrl: 'https://github.com/advmlabs/business-automation',
    demoUrl: '#',
    caseStudyTitle: 'Streamlining Back-office Operations',
    caseStudySummary: 'A major fintech company deployed ADVMLabs micro-agents to handle customer ticket classification, reducing average resolution time from 14 minutes down to 30 seconds.'
  }
];

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: 'agentic-ai-africa',
    title: 'Multi-Agent Frameworks in Constrained Compute Environments',
    domain: 'Agentic AI',
    authors: ['Mujahid Adam', 'ADVMLabs Research Team'],
    abstract: 'Deploying autonomous AI agents in areas with intermittent connectivity and high bandwidth costs requires localized routing and extreme weight distillation. This paper outlines an event-driven agent model optimized for sub-10B parameter LLMs, achieving 92% function-calling accuracy while reducing API network footprint by 65%.',
    publishedIn: 'ADVMLabs AI Journal',
    date: 'May 2026',
    tags: ['Agentic AI', 'Edge Computing', 'Africa Tech']
  },
  {
    id: 'flood-forecasting-lstm',
    title: 'Satellite SAR Radar & Recurrent Networks for African Hydrological Forecasting',
    domain: 'Climate AI',
    authors: ['Mujahid Adam', 'Dr. S. K. Mensah (Hydrology Advisor)'],
    abstract: 'Existing flood models fail in sub-Saharan Africa due to sparse rain gauge grids. We introduce an ensemble model combining Sentinel-1 Synthetic Aperture Radar (SAR) imagery with telemetry from cheap local IoT streamflow sensors. Our LSTM model achieves high performance, predicting water levels in river basins with a mean absolute error of under 12cm.',
    publishedIn: 'International Climate Informatics Workshop',
    date: 'January 2026',
    tags: ['Climate AI', 'Deep Learning', 'Remote Sensing']
  },
  {
    id: 'skill-taxonomy-nlp',
    title: 'A Self-Updating Multi-lingual NLP Taxonomy for Regional Job Markets',
    domain: 'Data & Career Intelligence',
    authors: ['Mujahid Adam'],
    abstract: 'Standard occupational taxonomies (like O*NET) miss localized skills and regional slang in developing markets. We design a transformer-based NER (Named Entity Recognition) pipeline that dynamically identifies new software skills and maps them into an interconnected hierarchical career graph, updating in real-time.',
    publishedIn: 'ACM Symposium on Computing for Development',
    date: 'October 2025',
    tags: ['NLP', 'Taxonomy Engineering', 'Labor Economics']
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Why Africa Needs Agentic AI Designed for Constrained Environments',
    slug: 'agentic-ai-constrained-environments',
    summary: 'Exploring how lightweight, event-driven autonomous AI agents can bypass connectivity challenges and empower remote communities across the continent.',
    publishedAt: 'June 20, 2026',
    category: 'Artificial Intelligence',
    readTime: '6 min read',
    author: {
      name: 'Mujahid Adam',
      role: 'Founder & AI Engineer'
    },
    content: `### The Infrastructure Challenge

In tech hubs like San Francisco, London, or Tokyo, high-speed fiber and constant low-latency access to multi-billion parameter cloud AI models are taken for granted. However, across large swathes of Africa, computing occurs in **resource-constrained environments**:
* Intermittent cellular coverage (3G and 4G fluctuations)
* High cellular data tariffs relative to local earnings
* Frequent power grid load-shedding

If we simply build AI applications that rely on constant back-and-forth streaming of large tokens from centralized American or European servers, we are designing systems that will fail exactly where they are needed most.

### The ADVMLabs Approach: Event-Driven Agentic Architectures

At ADVMLabs, we are researching **multi-agent architectures** that compile tasks into highly dense, offline-first structures. Instead of constant conversational token streams, our agents follow a "Compile-Transmit-Execute" loop.

1. **Local Distillation**: We run heavily quantized local SLMs (Small Language Models, e.g., 2B to 8B parameters) on mobile devices for basic intent parsing and data validation.
2. **Dense Transaction Bundling**: When communicating with cloud models, data is bundled into structured JSON arrays containing state, memory context, and tools.
3. **Optimized Multi-Agent Routing**: Our server-side agents run a routing algorithm that prioritizes the smallest model capable of performing a task safely.

### Real-World Implications

By reducing network payloads by up to **65%**, we ensure that a student in a rural town can access our *Career Intelligence Platform* using only pennies of mobile data. Businesses can automate logistics workflows even over unstable satellite links.

AI should not be a luxury of the globally connected. It must be accessible, robust, and engineered with the physical realities of the region in mind. This is our core research directive.`
  },
  {
    id: 'blog-2',
    title: 'Building a Satellite-First Flood Prediction Network in West Africa',
    slug: 'satellite-first-flood-prediction',
    summary: 'A deep dive into how ADVMLabs combines SAR radar imagery, open-source hydrological data, and IoT sensor meshes to predict flash floods.',
    publishedAt: 'April 15, 2026',
    category: 'Climate Technology',
    readTime: '8 min read',
    author: {
      name: 'Mujahid Adam',
      role: 'Founder & AI Engineer'
    },
    content: `### The Hydrological Data Gap

Climate change is accelerating precipitation volatility. Flash floods that historically occurred once every fifty years now strike major West African river basins annually. Yet, traditional prediction models rely on dense networks of physical rain gauges and water level sensors—infrastructure that is severely under-funded in regional river basins.

To protect lives and livelihoods, we had to invent a prediction model that doesn't rely on ground-truth sensor density alone.

### The Hybrid Sentinel-IoT Architecture

Our Flood Intelligence Platform operates on a multi-tier data model:

#### 1. Synthetic Aperture Radar (SAR)
Standard optical satellite imagery is blinded by clouds. Since flood-inducing weather systems are inherently overcast, optical imagery is useless for real-time tracking. We ingest **Sentinel-1 SAR radar imagery**, which pierces cloud cover, allowing us to compute water-extent boundaries dynamically.

#### 2. Local IoT Mesh Nodes
We deploy custom, ultra-low-power telemetry sensors along high-risk tributaries. These nodes measure:
* Hydrostatic pressure (river depth)
* Current flow rate
* Ambient soil moisture

The data is transmitted using energy-efficient **MQTT protocols** over standard 2G/3G networks back to our stream-processing ingestion nodes.

#### 3. Spatial Neural Networks
We feed the SAR geometries, soil saturation indexes, and river levels into a spatial LSTM (Long Short-Term Memory) neural network. This model maps historical inundations and runs forward simulations to predict overflow points with **72-hour lead times**.

### Turning Predictions into Community Safety

A prediction is only valuable if it triggers action. In addition to our high-fidelity web dashboard for emergency response personnel, our platform integrates with a **decentralized SMS alert system**.

When a forecast threshold is breached, our system triggers targeted, localized text messages in both English and regional dialects, giving families and businesses the crucial hours they need to relocate families, livestock, and assets to high ground.`
  },
  {
    id: 'blog-3',
    title: 'The Future of Career Placement: Moving Beyond the CV',
    slug: 'future-of-career-placement-beyond-cv',
    summary: 'Why traditional resumes are failing graduates, and how semantic code analysis and skill-demand mapping offer a fairer, more objective career pathway.',
    publishedAt: 'March 02, 2026',
    category: 'Career Development',
    readTime: '5 min read',
    author: {
      name: 'Mujahid Adam',
      role: 'Founder & AI Engineer'
    },
    content: `### The Résumé Paradox

For decades, the standard gateway into professional employment has been a two-page document: the Curriculum Vitae. However, CVs are highly subjective, easily exaggerated, and frequently formatted in ways that fail automated HR parsers (ATS).

More importantly, for millions of talented self-taught developers, bootcamp graduates, and university students across Africa, their CVs lack "institutional brand" prestige. Even if they have outstanding engineering skills, their resumes are frequently discarded because they do not list a premier global institution.

### Introducing Semantic Skill Mapping

At ADVMLabs, we believe your **provable ability** should define your career opportunity, not your credentials. Our *Career Intelligence Platform* approaches resume parsing from a semantic skill angle.

Instead of looking for keywords, our neural models analyze:
1. **GitHub Repository Structure**: We parse raw code, commits, issues, and pull requests to analyze actual software design principles, clean-code habits, and language familiarity.
2. **Employability Score Modeling**: We cross-reference your actual developer footprint with our *Job Market Intelligence Pipeline* (which maps actual tech vacancies in real-time) to detect exact skill gaps.
3. **Hyper-Personalized Curriculums**: Rather than general advice, the platform generates a custom, daily roadmap. For example, *"Your PostgreSQL indexing skills are weak compared to the Junior Backend Engineer roles in Nigeria. Execute this 4-day mini-project on database optimizations to bridge the gap."*

### Democratizing Access

By making talent evaluation objective and actionable, we enable a developer in Accra, Kumasi, or Nairobi to prove their capabilities to global employers on an equal footing. We are shifting hiring from "who you know" and "where you studied" to **what you can build**.`
  }
];

export const FOUNDER_DATA = {
  name: 'Mujahid Adam',
  title: 'AI Engineer | Software Developer | Data Enthusiast',
  bio: 'An AI engineer passionate about building practical intelligent systems that solve real-world problems using data, automation, and responsible AI. Focused on creating impactful technologies for Africa while contributing to the global AI ecosystem.',
  links: {
    linkedin: 'https://linkedin.com/in/mujahid-adam',
    github: 'https://github.com/mujahid-adam',
    email: 'adambansi051@gmail.com'
  }
};

export const FUTURE_ROADMAP = [
  {
    title: 'User Authentication & Profiles',
    description: 'Secure authentication for developers, companies, and researchers to save personalized career roadmaps, job tracks, and risk alerts.',
    status: 'In Design'
  },
  {
    title: 'Client Operations Dashboard',
    description: 'An administrative control center for businesses using our automation models to view pipeline throughput, model latency, and cost savings.',
    status: 'In Design'
  },
  {
    title: 'Interactive AI Playground',
    description: 'A sandbox for testing our multi-agent customer support routers and lightweight language models directly in the web browser.',
    status: 'Planned'
  },
  {
    title: 'Disaster Emergency Alert API',
    description: 'A public API enabling national meteorological departments and mapping agencies to integrate our real-time flood forecasts.',
    status: 'Planned'
  },
  {
    title: 'Research Portal & Publishing Hub',
    description: 'An open-science repository where academic peers can download ADVMLabs datasets, paper drafts, and specialized AI weights.',
    status: 'Design Phase'
  },
  {
    title: 'CMS-Driven Insights Hub',
    description: 'A fully integrated Headless CMS to support seamless publishing, rich content hosting, and team-authored AI tutorials.',
    status: 'Planned'
  }
];
