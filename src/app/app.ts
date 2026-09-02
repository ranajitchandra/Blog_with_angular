import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TechCraft Blog');
  
  // Interactive UI state
  protected readonly isMobileMenuOpen = signal(false);
  protected readonly searchQuery = signal('');
  
  // Navigation Links
  protected readonly navLinks = [
    { name: 'Home', href: '#', active: true },
    { name: 'Articles', href: '#articles', badge: '120+' },
    { name: 'Categories', href: '#categories' },
    { name: 'Tutorials', href: '#tutorials' },
    { name: 'About Us', href: '#about' }
  ];

  // Quick categories
  protected readonly categories = [
    { name: 'Angular 19', color: 'from-red-500 to-pink-500' },
    { name: 'Tailwind CSS', color: 'from-cyan-500 to-blue-500' },
    { name: 'TypeScript', color: 'from-blue-600 to-indigo-600' },
    { name: 'AI & Web3', color: 'from-purple-500 to-violet-500' },
    { name: 'System Design', color: 'from-amber-500 to-orange-500' }
  ];

  // Stats for Hero Banner
  protected readonly stats = [
    { value: '50K+', label: 'Monthly Readers', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
    { value: '180+', label: 'In-Depth Guides', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { value: '25+', label: 'Expert Authors', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' }
  ];

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(open => !open);
  }
}

