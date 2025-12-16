# Implementation Plan

## Completed Tasks

- [x] 1. Initialize Next.js project with core dependencies
  - Created Next.js 15 project with TypeScript, Tailwind CSS, and App Router
  - Installed and configured Shadcn UI with required components (Button, Card, Input, Sheet, Label)
  - Set up project directory structure as defined in design document
  - Configured `globals.css` with Tailwind and Shadcn CSS variables
  - _Requirements: 6.1, 6.2, 6.3_

- [x] 2. Implement site configuration and i18n foundation
  - [x] 2.1 Create site configuration file
    - Created `lib/config/site.ts` with site name "健身AI工具站", description, URL, and keywords
    - Created `lib/config/navigation.ts` with navigation items array
    - _Requirements: 1.1, 8.1_
  - [x] 2.2 Create i18n text strings file
    - Created `lib/i18n/zh.ts` with all user-facing text strings organized by section
    - Added heroSubtitle, whyTitle, keywordsTitle for enhanced homepage
    - _Requirements: 8.1, 8.2_

- [x] 3. Implement global layout and SEO infrastructure
  - [x] 3.1 Create root layout with metadata
    - Created `app/layout.tsx` with dynamic Metadata (title template, description, Open Graph, keywords)
    - Added semantic HTML structure with proper heading hierarchy
    - _Requirements: 1.1, 1.4, 1.5, 1.6_
  - [x] 3.2 Create sitemap and robots files
    - Created `app/sitemap.ts` exporting all public routes
    - Created `app/robots.ts` allowing search engine indexing
    - _Requirements: 1.2, 1.3_
  - [x] 3.3 Create error boundary
    - Created `app/error.tsx` client component for global error handling
    - _Requirements: 4.11_

- [x] 4. Implement responsive SiteHeader component
  - [x] 4.1 Create desktop navigation
    - Created `components/layout/site-header.tsx` with horizontal nav links for md+ screens
    - Implemented active route highlighting using `usePathname()`
    - Include site logo/brand "健身AI工具站" linking to homepage
    - _Requirements: 2.1, 2.4, 2.5_
  - [x] 4.2 Create mobile navigation
    - Created `components/layout/mobile-nav.tsx` using Shadcn Sheet component
    - Implemented hamburger menu icon trigger for <md screens
    - _Requirements: 2.2, 2.3_

- [x] 5. Implement homepage (Landing Page)
  - [x] 5.1 Create Hero section component
    - Created `components/home/hero-section.tsx` with gradient background, h1 heading, subtitle, dual CTA buttons
    - Added badge, user count statistics
    - _Requirements: 3.1, 5.1, 5.3_
  - [x] 5.2 Create Feature Grid component
    - Created `components/home/feature-grid.tsx` displaying tool cards with icons
    - Implemented click navigation to tool pages
    - _Requirements: 3.2, 3.6_
  - [x] 5.3 Create Why Choose Us component
    - Created `components/home/why-choose-us.tsx` with 6 advantages (免费、在线、AI驱动等)
    - _Requirements: 3.3_
  - [x] 5.4 Create Use Cases component
    - Created `components/home/use-cases.tsx` with 6 target user groups and SEO keywords
    - Added hot search keywords section
    - _Requirements: 3.4_
  - [x] 5.5 Create homepage page component
    - Created `app/page.tsx` composing all homepage sections
    - Added JSON-LD structured data (WebSite, Organization schemas)
    - Added hidden SEO keywords with sr-only class
    - _Requirements: 3.5, 3.7, 3.8_

- [x] 6. Implement FFMI Calculator tool
  - [x] 6.1 Create FFMI calculation utility
    - Created `lib/utils/ffmi.ts` with `calculateFFMI()` function
    - Implemented formula: FFMI = FFM / height² + 6.1 × (1.8 - height)
    - Defined category thresholds and interpretation strings
    - _Requirements: 7.3_
  - [x] 6.2 Create FFMI form component
    - Created `components/ffmi-calculator/ffmi-form.tsx` with height, weight, body fat, gender inputs
    - Implemented input validation with error messages
    - Added unit labels and styled gender selection buttons
    - _Requirements: 7.2, 7.9_
  - [x] 6.3 Create FFMI result component
    - Created `components/ffmi-calculator/ffmi-result.tsx` with visual body composition display
    - Added progress bar, stats grid, category badge
    - _Requirements: 7.4_
  - [x] 6.4 Create FFMI reference component
    - Created `components/ffmi-calculator/ffmi-reference.tsx` with male/female reference table
    - _Requirements: 7.5_
  - [x] 6.5 Create FFMI chart component
    - Created `components/ffmi-calculator/ffmi-chart.tsx` with age-based bar chart
    - Shows current FFMI line overlay
    - _Requirements: 7.6_
  - [x] 6.6 Create FFMI explanation component
    - Created `components/ffmi-calculator/ffmi-explanation.tsx` with principles, advantages, formula
    - _Requirements: 7.7_
  - [x] 6.7 Create FFMI Calculator page
    - Created `app/tools/ffmi-calculator/page.tsx` composing all components
    - Added page-specific metadata with targeted keywords
    - Added JSON-LD SoftwareApplication + FAQPage schemas
    - _Requirements: 7.1, 7.8_

- [x] 7. Implement Pose Scorer tool (健美造型评分器)
  - [x] 7.1 Create pose types and MediaPipe integration
    - Created `types/pose.ts` with PoseLandmark, PoseResult, LandmarkIndex
    - Created `lib/mediapipe/pose-detector.ts` with dynamic import for MediaPipe
    - _Requirements: 4.4_
  - [x] 7.2 Create angle calculator utility
    - Created `lib/utils/angle-calculator.ts` with angle calculation and scoring logic
    - _Requirements: 4.5_
  - [x] 7.3 Create image upload component
    - Created `components/pose-comparator/image-upload.tsx` with click and drag-drop support
    - Implemented image preview and file validation
    - _Requirements: 4.3, 5.4_
  - [x] 7.4 Create pose visualization components
    - Created `components/pose-comparator/pose-canvas.tsx` for skeleton rendering
    - Created `components/pose-comparator/score-display.tsx` for score visualization
    - Created `components/pose-comparator/angle-analysis.tsx` for angle breakdown
    - _Requirements: 4.5, 4.6_
  - [x] 7.5 Create pose categories component
    - Created `components/pose-comparator/pose-categories.tsx` explaining 古典健美、传统健美、健体、比基尼健身
    - _Requirements: 4.7_
  - [x] 7.6 Create scoring explanation component
    - Created `components/pose-comparator/scoring-explanation.tsx` with AI detection principles and scoring criteria
    - _Requirements: 4.8_
  - [x] 7.7 Create limitations component
    - Created `components/pose-comparator/limitations.tsx` with warnings and best practices
    - _Requirements: 4.9_
  - [x] 7.8 Create Pose Scorer page
    - Created `app/tools/pose-comparator/page.tsx` as client component
    - Renamed from "姿势对比器" to "健美造型评分器"
    - Integrated all explanation components
    - Added JSON-LD SoftwareApplication + FAQPage schemas
    - _Requirements: 4.1, 4.2, 4.10, 4.11_

- [x] 8. Implement Footer component
  - [x] 8.1 Create footer with contact information
    - Created `components/layout/footer.tsx` with three-column layout
    - Added brand description, quick links, contact email
    - Contact: quanquanyiyi520@gmail.com (合作/广告)
    - Reserved space for future blog, privacy policy, terms links
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

## Optional Tasks

- [ ]* 9. Testing and validation
  - [ ]* 9.1 Write unit tests for FFMI calculation
    - Test `calculateFFMI()` with various input values and edge cases
    - _Requirements: 7.3_
  - [ ]* 9.2 Write unit tests for angle calculation
    - Test angle calculation and scoring logic
    - _Requirements: 4.5_
  - [ ]* 9.3 Validate SEO implementation
    - Run Lighthouse SEO audit
    - Verify sitemap.xml generation
    - Validate JSON-LD with Google Rich Results Test
    - _Requirements: 1.1, 1.2, 1.5, 1.6_

## Future Enhancements (Not in Current Scope)

- [ ] Add blog section for SEO content marketing
- [ ] Add privacy policy and terms of service pages
- [ ] Implement multi-language support (English)
- [ ] Add more fitness calculators (BMI, TDEE, macro calculator)
- [ ] Add user accounts and progress tracking
