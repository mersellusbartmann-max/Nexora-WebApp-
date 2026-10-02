import { Opportunity, Resource, UserProfile } from '@/types';

export const demoOpportunities: Opportunity[] = [
  {
    id: 'opp-001',
    title: 'Junior Software Developer',
    organisation: 'TechBridge Solutions',
    category: 'Jobs',
    location: 'Johannesburg, Gauteng',
    closingDate: '2026-10-20',
    description:
      'Join a fast-growing tech company building tools for small businesses. You will work on web applications using modern frameworks, collaborate with a senior team, and receive mentorship to grow your career. This is an entry-level role suitable for recent graduates or self-taught developers with a solid foundation.',
    requirements: [
      'Basic knowledge of JavaScript, HTML, and CSS',
      'Familiarity with at least one framework (React, Vue, or Angular)',
      'Understanding of REST APIs',
      'Good problem-solving skills',
      'Willingness to learn and collaborate',
    ],
    applicationInstructions:
      'Send your CV and a short cover letter to careers@techbridge.example. Include links to any projects you have built.',
    isDemo: true,
    featured: true,
  },
  {
    id: 'opp-002',
    title: 'Data Analytics Learnership',
    organisation: 'FutureSkills Academy',
    category: 'Learnerships',
    location: 'Cape Town, Western Cape',
    closingDate: '2026-10-15',
    description:
      'A 12-month learnership programme combining classroom training and workplace experience. Learn data analysis, SQL, Excel, Power BI, and Python. Upon completion you will receive an NQF Level 5 qualification and a stipend throughout the programme.',
    requirements: [
      'Matric / Grade 12 certificate',
      'Between 18 and 35 years old',
      'Basic computer literacy',
      'Strong interest in data and numbers',
      'Currently unemployed',
    ],
    applicationInstructions:
      'Apply online at futureskills.example/apply. Upload your ID, matric certificate, and a short motivation letter.',
    isDemo: true,
    featured: true,
  },
  {
    id: 'opp-003',
    title: 'Marketing Internship',
    organisation: 'Brightwave Digital',
    category: 'Internships',
    location: 'Durban, KwaZulu-Natal',
    closingDate: '2026-10-10',
    description:
      'A 6-month internship at a digital marketing agency. You will assist with social media management, content creation, email campaigns, and market research. Great opportunity to build a portfolio and gain real-world experience in a creative environment.',
    requirements: [
      'Diploma or degree in Marketing, Communications, or related field',
      'Strong writing skills',
      'Familiarity with social media platforms',
      'Creative and proactive attitude',
    ],
    applicationInstructions:
      'Email your CV and a writing sample to internships@brightwave.example with the subject line "Marketing Internship Application".',
    isDemo: true,
    featured: false,
  },
  {
    id: 'opp-004',
    title: 'Cloud Computing Training Programme',
    organisation: 'CloudSkills Institute',
    category: 'Training',
    location: 'Remote / Online',
    closingDate: '2026-10-30',
    description:
      'A free 8-week online training programme covering cloud fundamentals, AWS core services, storage, networking, and security. Includes hands-on labs and a capstone project. Certificate of completion provided. Perfect for beginners looking to enter the cloud industry.',
    requirements: [
      'Basic computer skills',
      'Reliable internet connection',
      'Commitment to complete all modules',
      'No prior cloud experience required',
    ],
    applicationInstructions:
      'Register at cloudskills.example/register. Spaces are limited to 200 participants.',
    isDemo: true,
    featured: true,
  },
  {
    id: 'opp-005',
    title: 'Customer Service Representative',
    organisation: 'ConnectPlus Call Center',
    category: 'Jobs',
    location: 'Pretoria, Gauteng',
    closingDate: '2026-10-18',
    description:
      'Full-time customer service role at a growing call center. Handle inbound calls, resolve customer queries, and provide product information. Training is provided. Excellent opportunity for first-time job seekers looking to gain corporate experience.',
    requirements: [
      'Matric / Grade 12',
      'Clear communication skills in English',
      'Additional South African language is an advantage',
      'Patience and good listening skills',
      'Available to work shifts',
    ],
    applicationInstructions:
      'Apply in person at ConnectPlus, 123 CBD Street, Pretoria, or email CV to hr@connectplus.example.',
    isDemo: true,
    featured: false,
  },
  {
    id: 'opp-006',
    title: 'Web Development Learnership',
    organisation: 'CodePath Academy',
    category: 'Learnerships',
    location: 'Sandton, Gauteng',
    closingDate: '2026-10-25',
    description:
      'A 6-month intensive learnership focused on full-stack web development. Learn HTML, CSS, JavaScript, React, Node.js, and databases. Build real projects for real clients. Monthly stipend included. Top performers may be offered permanent positions.',
    requirements: [
      'Matric / Grade 12',
      'Basic computer literacy',
      'Logical thinking and attention to detail',
      'Passion for technology',
      'Between 18 and 35 years old',
    ],
    applicationInstructions:
      'Apply at codepath.example/learnership. Complete the online assessment and submit your CV.',
    isDemo: true,
    featured: false,
  },
  {
    id: 'opp-007',
    title: 'Finance Internship',
    organisation: 'Summit Capital',
    category: 'Internships',
    location: 'Sandton, Gauteng',
    closingDate: '2026-10-12',
    description:
      'A 12-month internship in the finance department of an investment firm. Gain exposure to financial analysis, reporting, budgeting, and investment research. Ideal for recent graduates pursuing a career in finance or accounting.',
    requirements: [
      'BCom degree or equivalent in Finance, Accounting, or Economics',
      'Strong Excel skills',
      'Attention to detail',
      'Analytical mindset',
    ],
    applicationInstructions:
      'Send CV and academic transcript to grad@summitcapital.example.',
    isDemo: true,
    featured: false,
  },
  {
    id: 'opp-008',
    title: 'Digital Marketing Training',
    organisation: 'GrowDigital Academy',
    category: 'Training',
    location: 'Remote / Online',
    closingDate: '2026-10-28',
    description:
      'A free 4-week online course covering social media marketing, SEO basics, Google Ads, content strategy, and email marketing. Learn practical skills you can apply immediately. Includes templates and tools. Certificate provided upon completion.',
    requirements: [
      'Basic internet skills',
      'Own laptop or smartphone',
      'Interest in digital marketing',
    ],
    applicationInstructions:
      'Sign up at growdigital.example/free-course. Enrollment is open to anyone.',
    isDemo: true,
    featured: false,
  },
  {
    id: 'opp-009',
    title: 'Administration Clerk',
    organisation: 'MetroLogistics',
    category: 'Jobs',
    location: 'Port Elizabeth, Eastern Cape',
    closingDate: '2026-10-22',
    description:
      'Entry-level administration role at a logistics company. Duties include filing, data capture, answering phones, and supporting the operations team. Great stepping stone into office administration and supply chain careers.',
    requirements: [
      'Matric / Grade 12',
      'Basic MS Office skills',
      'Good organisational skills',
      'Punctual and reliable',
    ],
    applicationInstructions:
      'Email CV to admin@metrologistics.example or drop off at 45 Industrial Road, Port Elizabeth.',
    isDemo: true,
    featured: false,
  },
  {
    id: 'opp-010',
    title: 'Electrical Engineering Learnership',
    organisation: 'PowerTech Industries',
    category: 'Learnerships',
    location: 'Secunda, Mpumalanga',
    closingDate: '2026-11-05',
    description:
      'A 18-month learnership in electrical engineering at a major industrial plant. Gain hands-on experience with electrical systems, maintenance, and safety procedures. NQF Level 4 qualification upon completion. Stipend provided.',
    requirements: [
      'N3 or equivalent in Electrical Engineering',
      'Between 18 and 35 years old',
      'Physically fit',
      'Safety-conscious mindset',
    ],
    applicationInstructions:
      'Apply at powertech.example/careers with your CV, ID, and qualifications.',
    isDemo: true,
    featured: false,
  },
  {
    id: 'opp-011',
    title: 'Graphic Design Internship',
    organisation: 'PixelForge Studio',
    category: 'Internships',
    location: 'Cape Town, Western Cape',
    closingDate: '2026-10-14',
    description:
      '3-month internship at a creative design studio. Work on branding, social media graphics, and web design projects. Build a professional portfolio with real client work. Opportunity for full-time position for outstanding interns.',
    requirements: [
      'Diploma or degree in Graphic Design or similar',
      'Portfolio of design work',
      'Knowledge of Adobe Photoshop and Illustrator',
      'Creative flair',
    ],
    applicationInstructions:
      'Send your portfolio and CV to hello@pixelforge.example.',
    isDemo: true,
    featured: false,
  },
  {
    id: 'opp-012',
    title: 'Entrepreneurship Skills Training',
    organisation: 'RiseUp Foundation',
    category: 'Training',
    location: 'Soweto, Gauteng',
    closingDate: '2026-10-16',
    description:
      'A free weekend workshop series for aspiring entrepreneurs. Learn how to start a business, write a business plan, manage finances, market your product, and pitch to investors. Mentoring provided after completion. Open to all ages.',
    requirements: [
      'A business idea or interest in entrepreneurship',
      'Commitment to attend all weekend sessions',
      'No formal education required',
    ],
    applicationInstructions:
      'Register at riseup.example/workshops or call 0800 000 000.',
    isDemo: true,
    featured: false,
  },
];

export const demoResources: Resource[] = [
  {
    id: 'res-001',
    title: 'Writing a CV That Gets Noticed',
    category: 'CV Tips',
    description: 'Learn how to structure your CV, what to include, and how to make it stand out to employers.',
    icon: 'FileText',
    readTime: '5 min read',
    content: [
      {
        heading: 'Keep It Clear and Structured',
        body: 'Your CV should be easy to scan in 30 seconds. Use clear headings, bullet points, and a clean font. Keep it to 1-2 pages maximum unless you have extensive experience.',
        tips: [
          'Use a professional font like Arial, Calibri, or Inter at size 11-12',
          'Put your most relevant experience first',
          'Use bullet points instead of long paragraphs',
          'Save and send your CV as a PDF to preserve formatting',
        ],
      },
      {
        heading: 'Include the Right Sections',
        body: 'Every CV should have: contact information, personal summary, work experience, education, and skills. Tailor the content to the specific job you are applying for.',
        tips: [
          'Write a 2-3 line personal summary at the top',
          'List experience in reverse chronological order',
          'Include measurable achievements, not just duties',
          'Add a skills section with both technical and soft skills',
        ],
      },
      {
        heading: 'Tailor It for Each Application',
        body: 'Generic CVs get ignored. Read the job description and mirror the key words and requirements in your CV. This also helps you get past automated screening systems.',
        tips: [
          'Match keywords from the job posting',
          'Highlight the most relevant experience first',
          'Adjust your personal summary for each role',
        ],
      },
    ],
  },
  {
    id: 'res-002',
    title: 'Interview Preparation Guide',
    category: 'Interview Prep',
    description: 'Everything you need to know before, during, and after a job interview.',
    icon: 'MessageSquare',
    readTime: '7 min read',
    content: [
      {
        heading: 'Before the Interview',
        body: 'Research the company, understand the role, and prepare your answers. Practice common interview questions out loud. Prepare 2-3 questions to ask the interviewer.',
        tips: [
          'Visit the company website and read their About page',
          'Prepare answers for "Tell me about yourself" and "Why do you want this job?"',
          'Dress appropriately for the company culture',
          'Arrive 10-15 minutes early',
        ],
      },
      {
        heading: 'During the Interview',
        body: 'Listen carefully, answer clearly, and provide examples. Use the STAR method (Situation, Task, Action, Result) to structure your answers to behavioural questions.',
        tips: [
          'Maintain eye contact and sit up straight',
          'Take a moment to think before answering',
          'Use the STAR method for behavioural questions',
          'Ask thoughtful questions at the end',
        ],
      },
      {
        heading: 'After the Interview',
        body: 'Send a thank-you email within 24 hours. Reflect on what went well and what you can improve. Follow up if you have not heard back after a week.',
        tips: [
          'Send a short thank-you email referencing something from the interview',
          'Note down questions you found difficult for future practice',
          'Follow up politely after 5-7 days if no response',
        ],
      },
    ],
  },
  {
    id: 'res-003',
    title: 'Effective Job Search Strategies',
    category: 'Job Search',
    description: 'How to search for jobs strategically and stay motivated during your search.',
    icon: 'Search',
    readTime: '6 min read',
    content: [
      {
        heading: 'Set a Routine',
        body: 'Treat your job search like a job. Set daily goals for applications, networking, and skill-building. A consistent routine keeps you productive and motivated.',
        tips: [
          'Dedicate 2-3 hours daily to job searching',
          'Track every application in a spreadsheet or app',
          'Set weekly goals for number of applications',
          'Take breaks to avoid burnout',
        ],
      },
      {
        heading: 'Use Multiple Channels',
        body: 'Do not rely on one job board. Use online platforms, company websites, LinkedIn, community boards, and your personal network. Many jobs are never advertised publicly.',
        tips: [
          'Set up job alerts on multiple platforms',
          'Tell friends and family you are looking',
          'Check company career pages directly',
          'Attend job fairs and networking events',
        ],
      },
    ],
  },
  {
    id: 'res-004',
    title: 'Essential Workplace Skills',
    category: 'Workplace Skills',
    description: 'Develop the soft skills that every employer values in the workplace.',
    icon: 'Briefcase',
    readTime: '5 min read',
    content: [
      {
        heading: 'Communication',
        body: 'Being able to communicate clearly, both in writing and in person, is the most valued skill in any workplace. Practice active listening and clear, concise expression.',
        tips: [
          'Proofread emails before sending',
          'Listen actively without interrupting',
          'Ask questions when you are unsure',
          'Be respectful and professional in all communication',
        ],
      },
      {
        heading: 'Time Management',
        body: 'Learn to prioritise tasks, meet deadlines, and manage your workload efficiently. Use tools like to-do lists and calendar reminders.',
        tips: [
          'Start each day by listing your top 3 priorities',
          'Break large tasks into smaller steps',
          'Set realistic deadlines for yourself',
          'Avoid multitasking - focus on one thing at a time',
        ],
      },
      {
        heading: 'Teamwork',
        body: 'Most jobs require working with others. Be reliable, support your colleagues, and contribute positively to team discussions.',
        tips: [
          'Be dependable - do what you say you will do',
          'Give credit to others when deserved',
          'Handle disagreements professionally',
          'Offer help to teammates when you can',
        ],
      },
    ],
  },
  {
    id: 'res-005',
    title: 'Digital Skills for Everyone',
    category: 'Digital Skills',
    description: 'Build the digital skills that are essential in the modern workplace.',
    icon: 'Laptop',
    readTime: '6 min read',
    content: [
      {
        heading: 'Master the Basics',
        body: 'Word processing, spreadsheets, and email are used in almost every job. Make sure you are comfortable with MS Office or Google Workspace.',
        tips: [
          'Learn basic Excel formulas and formatting',
          'Practice writing professional emails',
          'Learn to create documents and presentations',
          'Get familiar with cloud storage like Google Drive',
        ],
      },
      {
        heading: 'Learn Online Collaboration',
        body: 'Many teams work remotely using collaboration tools. Familiarise yourself with tools like Slack, Zoom, and Google Docs.',
        tips: [
          'Learn how to join and host video calls',
          'Practice sharing screens and documents',
          'Use shared documents for collaboration',
          'Understand basic online etiquette',
        ],
      },
    ],
  },
  {
    id: 'res-006',
    title: 'Introduction to AI Skills',
    category: 'AI Skills',
    description: 'Understand how AI is changing work and how you can start learning AI skills.',
    icon: 'Sparkles',
    readTime: '7 min read',
    content: [
      {
        heading: 'Understand What AI Is',
        body: 'Artificial Intelligence is technology that can learn, reason, and make decisions. It is being used in healthcare, finance, marketing, and almost every industry. Understanding the basics gives you an advantage.',
        tips: [
          'Learn what machine learning and AI mean in simple terms',
          'Explore free courses on AI fundamentals',
          'Follow AI news to understand trends',
        ],
      },
      {
        heading: 'Use AI Tools Productively',
        body: 'AI tools like chatbots and writing assistants can help you write emails, prepare for interviews, and learn faster. Learn to use them as productivity boosters.',
        tips: [
          'Use AI to help draft and improve your CV',
          'Practice interview questions with AI assistants',
          'Use AI to research companies and roles',
          'Always verify AI-generated information',
        ],
      },
      {
        heading: 'Start Learning AI Skills',
        body: 'If you want to go deeper, start with Python programming, then explore machine learning concepts. Many free resources are available online.',
        tips: [
          'Start with a free Python course on Coursera or freeCodeCamp',
          'Learn basic data analysis with Pandas',
          'Explore "Machine Learning for Beginners" on Kaggle',
          'Build small projects to practice',
        ],
      },
    ],
  },
  {
    id: 'res-007',
    title: 'Financial Basics for Job Seekers',
    category: 'Financial Basics',
    description: 'Manage your money wisely while job hunting and when you start earning.',
    icon: 'Wallet',
    readTime: '5 min read',
    content: [
      {
        heading: 'Budgeting While Job Hunting',
        body: 'Job hunting can be financially stressful. Create a simple budget, cut non-essential spending, and look for free resources to support your search.',
        tips: [
          'List all monthly expenses and prioritise essentials',
          'Use free resources like public libraries and free WiFi spots',
          'Set aside a small amount for transport to interviews',
          'Avoid taking on new debt during your search',
        ],
      },
      {
        heading: 'When You Start Earning',
        body: 'Once you get a job, build good financial habits early. Save a portion of your income, avoid unnecessary debt, and plan for the future.',
        tips: [
          'Save at least 10% of your income if possible',
          'Build an emergency fund covering 3 months of expenses',
          'Understand your payslip and deductions',
          'Avoid lifestyle inflation - do not overspend just because you earn more',
        ],
      },
    ],
  },
  {
    id: 'res-008',
    title: 'Writing Professional Emails',
    category: 'Communication',
    description: 'Learn to write clear, professional emails for job applications and the workplace.',
    icon: 'Mail',
    readTime: '4 min read',
    content: [
      {
        heading: 'Structure Your Email',
        body: 'A professional email has a clear subject line, a greeting, a concise body, and a professional sign-off. Keep it short and focused on one topic.',
        tips: [
          'Use a descriptive subject line (e.g., "Application: Junior Developer role")',
          'Start with "Dear [Name]" or "Good morning/afternoon"',
          'Keep the body to 3-5 short paragraphs maximum',
          'End with "Kind regards" or "Best regards" followed by your name',
        ],
      },
      {
        heading: 'Proofread Before Sending',
        body: 'Spelling and grammar mistakes create a poor impression. Always read your email out loud before sending, and use a spell-checker.',
        tips: [
          'Read the email out loud to catch errors',
          'Check that names are spelled correctly',
          'Verify you have attached any documents you mention',
          'Double-check the recipient email address',
        ],
      },
    ],
  },
];

export const defaultProfile: UserProfile = {
  name: '',
  email: '',
  location: '',
  educationLevel: '',
  skills: '',
  areasOfInterest: '',
};
