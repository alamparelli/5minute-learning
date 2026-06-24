export type TrackKey =
  | 'fundamentals'
  | 'patterns'
  | 'algorithms'
  | 'architecture'
  | 'with-ai';

export interface Track {
  label: string;
  tagline: string;
  description: string;
  color: string;
}

// Public-facing track metadata only. The backlog of upcoming lesson topics is
// NOT here and is never shipped to the site: it lives in the loop's private
// memory (see ../../loop/). The site only ever knows about published lessons.
export const tracks: Record<TrackKey, Track> = {
  fundamentals: {
    label: 'Fundamentals',
    tagline: 'The skills that never go out of date.',
    description:
      'Reading code, debugging, naming, abstraction, complexity. The craft underneath every language.',
    color: '#ff5a3c',
  },
  patterns: {
    label: 'Patterns & Principles',
    tagline: 'Reusable answers to recurring design problems.',
    description:
      'SOLID, DRY, the patterns worth knowing, and the discipline to not overuse them.',
    color: '#ff5a3c',
  },
  algorithms: {
    label: 'Algorithms',
    tagline: 'The handful you reach for again and again.',
    description:
      'Complexity you can feel, the core data structures, and the patterns behind most real-world problems.',
    color: '#ff5a3c',
  },
  architecture: {
    label: 'Architecture & System Design',
    tagline: 'Decisions that are expensive to change.',
    description:
      'Boundaries, coupling, dependencies, state, and the tradeoffs that shape a system over years.',
    color: '#ff5a3c',
  },
  'with-ai': {
    label: 'Working With AI',
    tagline: 'The judgment layer is your new job.',
    description:
      'Specs, prompting as decomposition, reviewing generated code, and knowing when to say no.',
    color: '#ff5a3c',
  },
};

export const trackOrder: TrackKey[] = [
  'fundamentals',
  'patterns',
  'algorithms',
  'architecture',
  'with-ai',
];
