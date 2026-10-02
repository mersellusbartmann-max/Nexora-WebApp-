export type OpportunityCategory = 'Jobs' | 'Learnerships' | 'Internships' | 'Training';

export interface Opportunity {
  id: string;
  title: string;
  organisation: string;
  category: OpportunityCategory;
  location: string;
  closingDate: string;
  description: string;
  requirements: string[];
  applicationInstructions: string;
  isDemo: boolean;
  featured: boolean;
}

export type ApplicationStatus = 'Interested' | 'Applied' | 'Interview' | 'Successful' | 'Unsuccessful';

export interface TrackedApplication {
  id: string;
  opportunityId: string;
  title: string;
  organisation: string;
  category: OpportunityCategory;
  location: string;
  closingDate: string;
  status: ApplicationStatus;
  addedAt: string;
}

export interface Resource {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  readTime: string;
  content: ResourceSection[];
}

export interface ResourceSection {
  heading: string;
  body: string;
  tips?: string[];
}

export interface UserProfile {
  name: string;
  email: string;
  location: string;
  educationLevel: string;
  skills: string;
  areasOfInterest: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: number;
}
