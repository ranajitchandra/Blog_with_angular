import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Testimonial {
    id: number;
    name: string;
    role: string;
    company: string;
    avatar: string;
    initials: string;
    avatarBg: string;
    rating: number;
    category: 'architects' | 'developers' | 'founders';
    quote: string;
    highlight: string;
    metric: string;
    companyBadgeColor: string;
    verified: boolean;
}

@Component({
    selector: 'app-testimonial-marquee',
    standalone: true,
    imports: [CommonModule],
    template: `
    <section id="testimonials" class="relative py-24 bg-slate-950 text-slate-100 overflow-hidden border-t border-slate-900">
      
      <!-- Background Ambient Glows -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div class="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/10 blur-[150px] rounded-full"></div>
        <div class="absolute top-1/3 right-1/4 w-[500px] h-[350px] bg-purple-600/10 blur-[140px] rounded-full"></div>
        <div class="absolute bottom-10 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-pink-600/10 blur-[160px] rounded-full"></div>
        <div class="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        
        <!-- Header Section -->
        <div class="text-center space-y-4 max-w-3xl mx-auto">
          
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold backdrop-blur-md shadow-lg shadow-indigo-500/5">
            <span class="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span class="tracking-wide uppercase text-[11px] font-bold">Trusted by 50,000+ Engineers</span>
          </div>

          <!-- Main Heading -->
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Loved by Developers & <br class="hidden sm:inline" />
            <span class="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              Engineering Teams Worldwide
            </span>
          </h2>

          <!-- Subtitle -->
          <p class="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            See how tech leaders, staff architects, and developers use TechCraft insights to build high-performance web applications.
          </p>

        </div>

        <!-- Controls Toolbar (Filter Pills & Speed Selector) -->
        <div class="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/60 p-2 sm:p-3 rounded-2xl border border-slate-800/80 backdrop-blur-xl">
          
          <!-- Filter Tabs -->
          <div class="flex flex-wrap items-center gap-1.5 w-full md:w-auto justify-center md:justify-start">
            @for (tab of filterTabs; track tab.id) {
              <button
                (click)="selectedCategory.set(tab.id)"
                [class]="selectedCategory() === tab.id
                  ? 'px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md shadow-indigo-500/20 transition-all'
                  : 'px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all'"
              >
                {{ tab.label }}
                <span class="ml-1.5 px-1.5 py-0.5 text-[10px] rounded-full bg-slate-950/40 border border-white/10">
                  {{ tab.count }}
                </span>
              </button>
            }
          </div>

          <!-- Action Controls (Speed & Pause Toggle) -->
          <div class="flex items-center gap-2">
            
            <!-- Speed Selector -->
            <div class="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
              <span class="text-[10px] font-semibold uppercase text-slate-500 px-2">Speed:</span>
              <button 
                (click)="currentSpeed.set('slow')"
                [class]="currentSpeed() === 'slow' ? 'px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-bold' : 'px-2.5 py-1 text-slate-400 hover:text-white'"
              >
                Slow
              </button>
              <button 
                (click)="currentSpeed.set('normal')"
                [class]="currentSpeed() === 'normal' ? 'px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-bold' : 'px-2.5 py-1 text-slate-400 hover:text-white'"
              >
                Normal
              </button>
              <button 
                (click)="currentSpeed.set('fast')"
                [class]="currentSpeed() === 'fast' ? 'px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-bold' : 'px-2.5 py-1 text-slate-400 hover:text-white'"
              >
                Fast
              </button>
            </div>

            <!-- Pause / Play Manual Override Button -->
            <button 
              (click)="isPaused.update(p => !p)" 
              [class]="isPaused() ? 'px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5' : 'px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center gap-1.5'"
            >
              @if (isPaused()) {
                <svg class="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>Paused</span>
              } @else {
                <svg class="w-3.5 h-3.5 text-indigo-400 fill-current" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
                <span>Live Scroll</span>
              }
            </button>

          </div>

        </div>

      </div>

      <!-- Marquee Wrapper with Side Gradient Fades -->
      <div class="relative w-full overflow-hidden py-4 marquee-container group">
        
        <!-- Left Side Fade Overlay -->
        <div class="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-20"></div>
        
        <!-- Right Side Fade Overlay -->
        <div class="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent z-20"></div>

        <!-- ================= ROW 1 (Scrolls Left) ================= -->
        <div class="flex mb-6 overflow-hidden">
          <div 
            [class]="getMarqueeClass('left')"
            [style.animation-play-state]="isPaused() ? 'paused' : 'running'"
          >
            <!-- Original List + Cloned Copy for seamless loop -->
            @for (item of row1DisplayItems(); track $index) {
              <div class="w-[340px] sm:w-[380px] shrink-0 mx-3">
                <div class="h-full bg-slate-900/80 hover:bg-slate-900 border border-slate-800/90 hover:border-indigo-500/50 rounded-2xl p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 flex flex-col justify-between group/card relative overflow-hidden">
                  
                  <!-- Top Hover Gradient Glow inside Card -->
                  <div class="absolute -top-24 -right-24 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover/card:bg-indigo-500/25 transition-all"></div>

                  <div>
                    <!-- Header: Stars & Company Badge -->
                    <div class="flex items-center justify-between mb-4">
                      <!-- Star Rating -->
                      <div class="flex items-center gap-1">
                        @for (star of [1,2,3,4,5]; track star) {
                          <svg class="w-4 h-4 text-amber-400 fill-current drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                        }
                      </div>

                      <!-- Company Badge -->
                      <span [class]="'px-2.5 py-1 rounded-full text-[11px] font-bold border ' + item.companyBadgeColor">
                        {{ item.company }}
                      </span>
                    </div>

                    <!-- Highlight Badge -->
                    <div class="mb-3 inline-block font-semibold text-xs text-indigo-300 bg-indigo-950/60 border border-indigo-500/20 px-2.5 py-0.5 rounded-md">
                      "{{ item.highlight }}"
                    </div>

                    <!-- Quote Text -->
                    <p class="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed mb-6">
                      {{ item.quote }}
                    </p>
                  </div>

                  <!-- Card Footer: User Avatar & Info -->
                  <div class="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <!-- Avatar -->
                      <div class="relative">
                        @if (item.avatar) {
                          <img [src]="item.avatar" [alt]="item.name" class="w-10 h-10 rounded-full object-cover border-2 border-indigo-500/30 group-hover/card:border-indigo-400 transition-colors shadow-md" />
                        } @else {
                          <div [class]="'w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs text-white border-2 border-white/10 shadow-md ' + item.avatarBg">
                            {{ item.initials }}
                          </div>
                        }

                        @if (item.verified) {
                          <span class="absolute -bottom-1 -right-1 w-4 h-4 bg-indigo-600 rounded-full border-2 border-slate-900 flex items-center justify-center" title="Verified Reader">
                            <svg class="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                        }
                      </div>

                      <!-- User Info -->
                      <div class="flex flex-col text-left">
                        <span class="text-xs font-bold text-white group-hover/card:text-indigo-300 transition-colors flex items-center gap-1">
                          {{ item.name }}
                        </span>
                        <span class="text-[11px] font-medium text-slate-400">
                          {{ item.role }}
                        </span>
                      </div>
                    </div>

                    <!-- Key Metric Tag -->
                    <span class="text-[10px] font-bold px-2 py-1 bg-slate-950 border border-slate-800 rounded-lg text-emerald-400">
                      {{ item.metric }}
                    </span>
                  </div>

                </div>
              </div>
            }
          </div>
        </div>

        <!-- ================= ROW 2 (Scrolls Right) ================= -->
        <div class="flex overflow-hidden">
          <div 
            [class]="getMarqueeClass('right')"
            [style.animation-play-state]="isPaused() ? 'paused' : 'running'"
          >
            <!-- Original List + Cloned Copy for reverse seamless loop -->
            @for (item of row2DisplayItems(); track $index) {
              <div class="w-[340px] sm:w-[380px] shrink-0 mx-3">
                <div class="h-full bg-slate-900/80 hover:bg-slate-900 border border-slate-800/90 hover:border-purple-500/50 rounded-2xl p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1 flex flex-col justify-between group/card relative overflow-hidden">
                  
                  <!-- Top Hover Gradient Glow inside Card -->
                  <div class="absolute -top-24 -right-24 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover/card:bg-purple-500/25 transition-all"></div>

                  <div>
                    <!-- Header: Stars & Company Badge -->
                    <div class="flex items-center justify-between mb-4">
                      <!-- Star Rating -->
                      <div class="flex items-center gap-1">
                        @for (star of [1,2,3,4,5]; track star) {
                          <svg class="w-4 h-4 text-amber-400 fill-current drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                        }
                      </div>

                      <!-- Company Badge -->
                      <span [class]="'px-2.5 py-1 rounded-full text-[11px] font-bold border ' + item.companyBadgeColor">
                        {{ item.company }}
                      </span>
                    </div>

                    <!-- Highlight Badge -->
                    <div class="mb-3 inline-block font-semibold text-xs text-purple-300 bg-purple-950/60 border border-purple-500/20 px-2.5 py-0.5 rounded-md">
                      "{{ item.highlight }}"
                    </div>

                    <!-- Quote Text -->
                    <p class="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed mb-6">
                      {{ item.quote }}
                    </p>
                  </div>

                  <!-- Card Footer: User Avatar & Info -->
                  <div class="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <!-- Avatar -->
                      <div class="relative">
                        @if (item.avatar) {
                          <img [src]="item.avatar" [alt]="item.name" class="w-10 h-10 rounded-full object-cover border-2 border-purple-500/30 group-hover/card:border-purple-400 transition-colors shadow-md" />
                        } @else {
                          <div [class]="'w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs text-white border-2 border-white/10 shadow-md ' + item.avatarBg">
                            {{ item.initials }}
                          </div>
                        }

                        @if (item.verified) {
                          <span class="absolute -bottom-1 -right-1 w-4 h-4 bg-purple-600 rounded-full border-2 border-slate-900 flex items-center justify-center" title="Verified Reader">
                            <svg class="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                        }
                      </div>

                      <!-- User Info -->
                      <div class="flex flex-col text-left">
                        <span class="text-xs font-bold text-white group-hover/card:text-purple-300 transition-colors flex items-center gap-1">
                          {{ item.name }}
                        </span>
                        <span class="text-[11px] font-medium text-slate-400">
                          {{ item.role }}
                        </span>
                      </div>
                    </div>

                    <!-- Key Metric Tag -->
                    <span class="text-[10px] font-bold px-2 py-1 bg-slate-950 border border-slate-800 rounded-lg text-indigo-400">
                      {{ item.metric }}
                    </span>
                  </div>

                </div>
              </div>
            }
          </div>
        </div>

      </div>

      <!-- Bottom Interactive Call to Action -->
      <div class="mt-12 text-center">
        <div class="inline-flex flex-col sm:flex-row items-center gap-4 bg-slate-900/90 border border-slate-800 p-4 sm:px-8 sm:py-4 rounded-2xl backdrop-blur-xl shadow-2xl">
          <div class="flex items-center gap-2 text-slate-300 text-xs sm:text-sm font-medium">
            <span class="text-emerald-400 font-bold">✓ 100% Free Developer Articles</span>
            <span>• No paywalls or pushy ads</span>
          </div>
          <button (click)="openFeedbackToast()" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-105">
            Submit Your Feedback
          </button>
        </div>
      </div>

      <!-- Toast Notification -->
      @if (showToast()) {
        <div class="fixed bottom-6 right-6 z-50 bg-slate-900 border border-indigo-500/40 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <div class="w-8 h-8 rounded-xl bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-indigo-300">
            💬
          </div>
          <div>
            <p class="text-xs font-bold text-white">Thank you for your interest!</p>
            <p class="text-[11px] text-slate-400">Feedback submissions are open for TechCraft 2.0 readers.</p>
          </div>
          <button (click)="showToast.set(false)" class="text-slate-400 hover:text-white text-xs ml-2 font-bold">✕</button>
        </div>
      }

    </section>
  `
})
export class TestimonialMarqueeComponent {
    // Signals for state
    selectedCategory = signal<string>('all');
    currentSpeed = signal<'slow' | 'normal' | 'fast'>('normal');
    isPaused = signal<boolean>(false);
    showToast = signal<boolean>(false);

    // Filter tab metadata
    readonly filterTabs = [
        { id: 'all', label: 'All Reviews', count: 8 },
        { id: 'architects', label: 'Architects & Leads', count: 3 },
        { id: 'developers', label: 'Senior Engineers', count: 3 },
        { id: 'founders', label: 'CTOs & Founders', count: 2 }
    ];

    // Raw list of testimonials
    readonly testimonials: Testimonial[] = [
        {
            id: 1,
            name: 'Elena Rostova',
            role: 'Staff Systems Architect',
            company: 'Vercel',
            avatar: '/avatars/avatar1.jpg',
            initials: 'ER',
            avatarBg: 'bg-gradient-to-tr from-indigo-500 to-purple-500',
            rating: 5,
            category: 'architects',
            highlight: 'Must-read for modern web scaling',
            quote: 'TechCraft consistently delivers deep-dive architectural breakdowns that actually translate to production velocity. The signals & state management guides saved our team weeks of debugging.',
            metric: '⚡ 4x Dev Speed',
            companyBadgeColor: 'bg-slate-950 text-white border-slate-700',
            verified: true
        },
        {
            id: 2,
            name: 'Devon Vance',
            role: 'Lead Frontend Engineer',
            company: 'Stripe',
            avatar: '/avatars/avatar2.jpg',
            initials: 'DV',
            avatarBg: 'bg-gradient-to-tr from-blue-500 to-cyan-500',
            rating: 5,
            category: 'developers',
            highlight: 'Unmatched Angular 19 insights',
            quote: 'Finding high-signal technical content on Angular v19 and Tailwind v4 used to take hours. TechCraft packages code patterns into super practical, battle-tested tutorials.',
            metric: '📦 40% Smaller Bundle',
            companyBadgeColor: 'bg-indigo-950/80 text-indigo-300 border-indigo-500/30',
            verified: true
        },
        {
            id: 3,
            name: 'Maya Lin',
            role: 'VP of Product Design',
            company: 'Figma',
            avatar: '/avatars/avatar3.jpg',
            initials: 'ML',
            avatarBg: 'bg-gradient-to-tr from-pink-500 to-rose-500',
            rating: 5,
            category: 'founders',
            highlight: 'Craftsmanship at its highest level',
            quote: 'The UX polish and component architecture breakdowns on TechCraft set the standard. It has become required reading for all senior engineers on our team.',
            metric: '🎨 100 UX Polish',
            companyBadgeColor: 'bg-purple-950/80 text-purple-300 border-purple-500/30',
            verified: true
        },
        {
            id: 4,
            name: 'Marcus Thorne',
            role: 'Co-Founder & CTO',
            company: 'Supabase',
            avatar: '',
            initials: 'MT',
            avatarBg: 'bg-gradient-to-tr from-emerald-500 to-teal-500',
            rating: 5,
            category: 'founders',
            highlight: 'High signal, zero fluff',
            quote: 'TechCraft cuts through technical noise. Their deep dives into micro-frontends and reactive state patterns changed how we architect our enterprise dashboards.',
            metric: '🚀 99.99% Reliability',
            companyBadgeColor: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30',
            verified: true
        },
        {
            id: 5,
            name: 'Sophia Al-Mansoor',
            role: 'Principal Engineer',
            company: 'Cloudflare',
            avatar: '',
            initials: 'SA',
            avatarBg: 'bg-gradient-to-tr from-amber-500 to-orange-500',
            rating: 5,
            category: 'architects',
            highlight: 'Instant bookmark for our team',
            quote: 'Every article feels like a masterclass written by engineers who actually deploy code to millions of users daily. Sensational clarity and code samples!',
            metric: '🔒 Zero Edge Overhead',
            companyBadgeColor: 'bg-amber-950/80 text-amber-300 border-amber-500/30',
            verified: true
        },
        {
            id: 6,
            name: 'Lucas Dupont',
            role: 'Senior Fullstack Dev',
            company: 'Datadog',
            avatar: '',
            initials: 'LD',
            avatarBg: 'bg-gradient-to-tr from-violet-600 to-indigo-600',
            rating: 5,
            category: 'developers',
            highlight: 'Game-changer for performance',
            quote: 'Implementing TechCraft’s hydration and bundle optimization tricks reduced our main thread blocking time by over 60%. Absolutely essential reading.',
            metric: '⚡ 60% Faster TTI',
            companyBadgeColor: 'bg-violet-950/80 text-violet-300 border-violet-500/30',
            verified: true
        },
        {
            id: 7,
            name: 'Amara Okafor',
            role: 'Tech Lead Engineer',
            company: 'GitHub',
            avatar: '',
            initials: 'AO',
            avatarBg: 'bg-gradient-to-tr from-cyan-600 to-blue-600',
            rating: 5,
            category: 'architects',
            highlight: 'Gold standard tech publishing',
            quote: 'The level of rigor in code examples and performance benchmarks is rare to find today. TechCraft is a beacon of excellence in dev media.',
            metric: '💡 100/100 Lighthouse',
            companyBadgeColor: 'bg-slate-900 text-slate-300 border-slate-700',
            verified: true
        },
        {
            id: 8,
            name: 'Kaito Tanaka',
            role: 'Staff UI Engineer',
            company: 'Sony Interactive',
            avatar: '',
            initials: 'KT',
            avatarBg: 'bg-gradient-to-tr from-red-500 to-pink-600',
            rating: 5,
            category: 'developers',
            highlight: 'Cleanest CSS & Signals breakdown',
            quote: 'The Tailwind v4 integration guide was spot on. Transitioning our design token pipeline took half the estimated time thanks to TechCraft articles.',
            metric: '🚀 50% Time Saved',
            companyBadgeColor: 'bg-rose-950/80 text-rose-300 border-rose-500/30',
            verified: true
        }
    ];

    // Filtered Items computed signal
    filteredItems = computed(() => {
        const cat = this.selectedCategory();
        if (cat === 'all') return this.testimonials;
        return this.testimonials.filter(t => t.category === cat);
    });

    // Split into Row 1 & Row 2 for dual direction scrolling
    row1Items = computed(() => {
        const list = this.filteredItems();
        return list.slice(0, Math.ceil(list.length / 2));
    });

    row2Items = computed(() => {
        const list = this.filteredItems();
        return list.slice(Math.ceil(list.length / 2));
    });

    // Duplicated list arrays to guarantee infinite uninterrupted marquee width
    row1DisplayItems = computed(() => {
        const r1 = this.row1Items();
        return [...r1, ...r1, ...r1, ...r1];
    });

    row2DisplayItems = computed(() => {
        const r2 = this.row2Items();
        return [...r2, ...r2, ...r2, ...r2];
    });

    // Dynamic class getter for marquee animation and speed
    getMarqueeClass(direction: 'left' | 'right'): string {
        const speed = this.currentSpeed();
        const baseDir = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right';
        const speedClass = speed === 'slow' ? 'marquee-speed-slow' : speed === 'fast' ? 'marquee-speed-fast' : '';
        return `${baseDir} ${speedClass}`;
    }

    openFeedbackToast() {
        this.showToast.set(true);
        setTimeout(() => {
            this.showToast.set(false);
        }, 4000);
    }
}
