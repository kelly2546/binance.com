// Mobile Responsiveness Testing Utilities
export interface MobileTestResult {
  testName: string;
  passed: boolean;
  details: string;
  recommendation?: string;
}

export class MobileResponsivenessAuditor {
  private results: MobileTestResult[] = [];

  // Test touch target sizes (minimum 44px)
  testTouchTargets(): MobileTestResult {
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea, [role="button"]');
    const smallTargets: Element[] = [];

    interactiveElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      if (rect.width < 44 || rect.height < 44) {
        smallTargets.push(element);
      }
    });

    return {
      testName: 'Touch Target Size',
      passed: smallTargets.length === 0,
      details: `Found ${smallTargets.length} elements smaller than 44px`,
      recommendation: smallTargets.length > 0 ? 'Increase size of touch targets to at least 44px' : undefined
    };
  }

  // Test for horizontal scrolling
  testHorizontalScrolling(): MobileTestResult {
    const hasHorizontalScroll = document.documentElement.scrollWidth > document.documentElement.clientWidth;
    
    return {
      testName: 'Horizontal Scrolling',
      passed: !hasHorizontalScroll,
      details: hasHorizontalScroll ? 'Page has horizontal scrolling' : 'No horizontal scrolling detected',
      recommendation: hasHorizontalScroll ? 'Fix overflow issues and ensure content fits viewport width' : undefined
    };
  }

  // Test viewport meta tag
  testViewportMeta(): MobileTestResult {
    const viewport = document.querySelector('meta[name="viewport"]');
    const hasViewport = viewport !== null;
    const content = viewport?.getAttribute('content') || '';
    const hasCorrectContent = content.includes('width=device-width') && content.includes('initial-scale=1');

    return {
      testName: 'Viewport Meta Tag',
      passed: hasViewport && hasCorrectContent,
      details: hasViewport ? `Viewport meta tag found: ${content}` : 'No viewport meta tag found',
      recommendation: !hasViewport || !hasCorrectContent ? 'Add proper viewport meta tag with width=device-width and initial-scale=1' : undefined
    };
  }

  // Test font sizes for readability
  testFontSizes(): MobileTestResult {
    const textElements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6, a, button, label');
    const smallFonts: Element[] = [];

    textElements.forEach(element => {
      const computedStyle = window.getComputedStyle(element);
      const fontSize = parseFloat(computedStyle.fontSize);
      if (fontSize < 16 && element.textContent?.trim()) {
        smallFonts.push(element);
      }
    });

    return {
      testName: 'Font Size Readability',
      passed: smallFonts.length < textElements.length * 0.1, // Allow up to 10% small fonts
      details: `Found ${smallFonts.length} elements with font size < 16px out of ${textElements.length} total`,
      recommendation: smallFonts.length > textElements.length * 0.1 ? 'Consider increasing font sizes for better mobile readability' : undefined
    };
  }

  // Test image optimization
  testImageOptimization(): MobileTestResult {
    const images = document.querySelectorAll('img');
    const unoptimizedImages: Element[] = [];

    images.forEach(img => {
      const imgElement = img as HTMLImageElement;
      if (!imgElement.loading || imgElement.loading !== 'lazy') {
        unoptimizedImages.push(img);
      }
    });

    return {
      testName: 'Image Optimization',
      passed: unoptimizedImages.length === 0,
      details: `Found ${unoptimizedImages.length} images without lazy loading out of ${images.length} total`,
      recommendation: unoptimizedImages.length > 0 ? 'Add loading="lazy" attribute to images for better performance' : undefined
    };
  }

  // Run all tests
  runAllTests(): MobileTestResult[] {
    this.results = [
      this.testTouchTargets(),
      this.testHorizontalScrolling(),
      this.testViewportMeta(),
      this.testFontSizes(),
      this.testImageOptimization()
    ];

    return this.results;
  }

  // Get summary report
  getSummaryReport(): { passedTests: number; totalTests: number; score: number } {
    const passedTests = this.results.filter(result => result.passed).length;
    const totalTests = this.results.length;
    const score = Math.round((passedTests / totalTests) * 100);

    return { passedTests, totalTests, score };
  }

  // Log results to console
  logResults(): void {
    console.group('Mobile Responsiveness Audit Results');
    
    this.results.forEach(result => {
      const emoji = result.passed ? '✅' : '❌';
      console.log(`${emoji} ${result.testName}: ${result.details}`);
      if (result.recommendation) {
        console.log(`   Recommendation: ${result.recommendation}`);
      }
    });

    const summary = this.getSummaryReport();
    console.log(`\nOverall Score: ${summary.score}% (${summary.passedTests}/${summary.totalTests} tests passed)`);
    
    console.groupEnd();
  }
}

// Performance monitoring utilities
export class MobilePerformanceMonitor {
  static measurePageLoad(): Promise<PerformanceEntry[]> {
    return new Promise((resolve) => {
      if (document.readyState === 'complete') {
        resolve(performance.getEntriesByType('navigation'));
      } else {
        window.addEventListener('load', () => {
          resolve(performance.getEntriesByType('navigation'));
        });
      }
    });
  }

  static measureLCP(): Promise<number> {
    return new Promise((resolve) => {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        resolve(lastEntry.startTime);
      }).observe({ entryTypes: ['largest-contentful-paint'] });
    });
  }

  static measureCLS(): Promise<number> {
    return new Promise((resolve) => {
      let clsValue = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        resolve(clsValue);
      }).observe({ entryTypes: ['layout-shift'] });

      // Resolve after 5 seconds if no layout shifts
      setTimeout(() => resolve(clsValue), 5000);
    });
  }

  static async getVitals() {
    const [lcp, cls] = await Promise.all([
      this.measureLCP().catch(() => 0),
      this.measureCLS().catch(() => 0)
    ]);

    return {
      lcp: Math.round(lcp),
      cls: Math.round(cls * 1000) / 1000,
      lcpScore: lcp < 2500 ? 'good' : lcp < 4000 ? 'needs-improvement' : 'poor',
      clsScore: cls < 0.1 ? 'good' : cls < 0.25 ? 'needs-improvement' : 'poor'
    };
  }
}

// Utility to check if device is mobile
export const isMobileDevice = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Utility to get screen size category
export const getScreenCategory = (): 'mobile' | 'tablet' | 'desktop' => {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

// Debug helper for mobile testing
export const enableMobileDebugging = (): void => {
  if (process.env.NODE_ENV === 'development') {
    // Add mobile debugging overlay
    const debugOverlay = document.createElement('div');
    debugOverlay.id = 'mobile-debug-overlay';
    debugOverlay.style.cssText = `
      position: fixed;
      top: 0;
      right: 0;
      background: rgba(0,0,0,0.8);
      color: white;
      padding: 10px;
      font-size: 12px;
      z-index: 10000;
      max-width: 200px;
    `;
    
    const updateDebugInfo = () => {
      const info = {
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        devicePixelRatio: window.devicePixelRatio,
        orientation: screen.orientation?.type || 'unknown',
        screenCategory: getScreenCategory(),
        isMobile: isMobileDevice()
      };
      
      debugOverlay.innerHTML = Object.entries(info)
        .map(([key, value]) => `${key}: ${value}`)
        .join('<br>');
    };
    
    updateDebugInfo();
    window.addEventListener('resize', updateDebugInfo);
    window.addEventListener('orientationchange', updateDebugInfo);
    
    document.body.appendChild(debugOverlay);
  }
};