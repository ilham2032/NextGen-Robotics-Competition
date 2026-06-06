# Hardcoded Text Strings Report
**Generated**: 2026-06-06
**Status**: Strings NOT using i18n translation hook

---

## SUMMARY
This report lists all hardcoded text strings found in React components that are NOT wrapped in the `useTranslation()` hook's `t()` function. These strings need to be moved to `i18n.ts` for proper multi-language support.

---

## BUTTONS & ACTION LABELS

### Save/Cancel/Edit
| File | Line | Text | Component |
|------|------|------|-----------|
| `src/mentor/pages/UserDashboard.tsx` | 1041 | "Save" | submit button |
| `src/mentor/pages/UserDashboard.tsx` | 1042 | "Cancel" | button |
| `src/mentor/pages/UserDashboard.tsx` | 1071 | "Edit" | edit button |
| `src/mentor/pages/UserDashboard.tsx` | 1072 | "Remove" | delete button |
| `src/admin/ClearData.tsx` | 32 | "Cancel" | link button |
| `src/admin/pages/AboutEventPage.tsx` | 283 | "Cancel" | button |
| `src/admin/pages/CategoryPage.tsx` | 210 | "Cancel" | button |
| `src/admin/pages/CategoryPage.tsx` | 213 | "Cancel" | button |
| `src/admin/pages/CategoryPage.tsx` | 228 | "Cancel" | button |

### Add/Create
| File | Line | Text | Component |
|------|------|------|-----------|
| `src/admin/pages/CategoryPage.tsx` | 130 | "+ Add Category" | button |
| `src/admin/pages/CategoryPage.tsx` | 222 | "Create Category" | button |
| `src/mentor/pages/UserDashboard.tsx` | 682 | "Add Participant" | heading |

---

## FORM LABELS & PLACEHOLDERS

### Input Fields - Personal Information
| File | Line | Text | Type |
|------|------|------|------|
| `src/admin/pages/AdminLogin.tsx` | 34 | "Username" | label |
| `src/admin/pages/AdminLogin.tsx` | 46 | "Password" | label |
| `src/admin/pages/AdminLogin.tsx` | 40 | "admin" | placeholder |
| `src/admin/pages/AdminLogin.tsx` | 52 | "Enter password" | placeholder |
| `src/mentor/pages/UserAuth.tsx` | 114 | "Name" | label |
| `src/mentor/pages/UserAuth.tsx` | 125 | "Surname" | label |
| `src/mentor/pages/UserAuth.tsx` | 138 | "FIN" | label |
| `src/mentor/pages/UserAuth.tsx` | 152 | "Email" | label |
| `src/mentor/pages/UserAuth.tsx` | 167 | "Date of birth" | label |
| `src/mentor/pages/UserAuth.tsx` | 180 | "Country" | label |
| `src/mentor/pages/UserAuth.tsx` | 199 | "Password" | label |
| `src/mentor/pages/UserAuth.tsx` | 119 | "Name" | placeholder |
| `src/mentor/pages/UserAuth.tsx` | 130 | "Surname" | placeholder |
| `src/mentor/pages/UserAuth.tsx` | 143 | "FIN" | placeholder |
| `src/mentor/pages/UserAuth.tsx` | 158 | "Email address" | placeholder |
| `src/mentor/pages/UserAuth.tsx` | 173 | "dd/mm/yyyy" | placeholder |
| `src/mentor/pages/UserAuth.tsx` | 187 | "Select country" | option |

### Input Fields - Contact & Location
| File | Line | Text | Type |
|------|------|------|------|
| `src/pages/Contact.tsx` | 102 | "Your Name" | placeholder |
| `src/pages/Contact.tsx` | 118 | "Your Email" | placeholder |
| `src/pages/Contact.tsx` | 133 | "Your Message" | placeholder |
| `src/mentor/pages/UserDashboard.tsx` | 705 | "Enter first name" | placeholder |
| `src/mentor/pages/UserDashboard.tsx` | 717 | "Enter last name" | placeholder |
| `src/mentor/pages/UserDashboard.tsx` | 732 | "mm/dd/yyyy" | placeholder |
| `src/mentor/pages/UserDashboard.tsx` | 750 | "e.g., ABC123456" | placeholder |
| `src/mentor/pages/UserDashboard.tsx` | 762 | "Enter phone" | placeholder |
| `src/mentor/pages/UserDashboard.tsx` | 776 | "member@example.com" | placeholder |

### Select/Dropdown Options
| File | Line | Text | Type |
|------|------|------|------|
| `src/mentor/pages/UserDashboard.tsx` | 880 | "Select Category" | option |
| `src/mentor/pages/UserDashboard.tsx` | 1166 | "Select category" | option |
| `src/teamszone/registration/TeamRegistration.tsx` | 283 | "Select a category..." | option |
| `src/referee/pages/RefereeDashboard.tsx` | 367 | "Choose a category..." | option |
| `src/referee/pages/RefereeDashboard.tsx` | 439 | "Unassigned" | option |
| `src/referee/pages/RefereeDashboard.tsx` | 562 | "Select Team 1..." | option |
| `src/referee/pages/RefereeDashboard.tsx` | 577 | "Select Team 2..." | option |

---

## HEADINGS & SECTION TITLES

### Page Headers
| File | Line | Text | Type |
|------|------|------|------|
| `src/teamszone/teamszone.tsx` | 29 | "Teams Zone" | h1 |
| `src/admin/pages/AdminDashboard.tsx` | 291 | "Admin Dashboard" | h1 |
| `src/admin/pages/AdminLogin.tsx` | 29 | "Admin Login" | h1 |
| `src/mentor/pages/UserDashboard.tsx` | 586 | "NextGen Robotics Mentor Portal" | text |
| `src/pages/PartnershipInquiries.tsx` | 11 | "Partnership Inquiries" | h1 |

### Section Headers
| File | Line | Text | Type |
|------|------|------|------|
| `src/teamszone/teamszone.tsx` | 58 | "Competition Categories" | h2 |
| `src/mentor/pages/UserDashboard.tsx` | 637 | "Navigation" | h2 |
| `src/mentor/pages/UserDashboard.tsx` | 682 | "Add Participant" | h2 |
| `src/mentor/pages/UserDashboard.tsx` | 825 | "Create Team" | h2 |
| `src/mentor/pages/UserDashboard.tsx` | 826 | "Form a team with selected members" | description |
| `src/mentor/pages/UserDashboard.tsx` | 996 | "Participants" | h2 |
| `src/mentor/pages/UserDashboard.tsx` | 1096 | "Registered Teams" | h2 |
| `src/mentor/pages/UserDashboard.tsx` | 1117 | "No teams have been created yet" | h3 |
| `src/mentor/pages/UserDashboard.tsx` | 1253 | "Event Schedule" | h2 |
| `src/mentor/pages/UserDashboard.tsx` | 1287 | "Mentor Profile" | h2 |
| `src/admin/pages/RefereesPage.tsx` | 100 | "Create Referee" | h2 |
| `src/admin/pages/RefereesPage.tsx` | 88 | "Referee Accounts" | h1 |
| `src/admin/pages/CategoryPage.tsx` | 121 | "Category Management" | h2 |
| `src/admin/pages/CategoryPage.tsx` | 122 | "Create, edit, and manage competition categories" | description |
| `src/admin/pages/UsersPage.tsx` | 152 | "User Center" | h1 |
| `src/admin/pages/UsersPage.tsx` | 180 | "Mentor registrations" | h2 |
| `src/admin/pages/UsersPage.tsx` | 203 | "No mentor registrations yet" | p |
| `src/admin/pages/AboutEventPage.tsx` | 173 | "Edit Event Details" | h3 |

### Subsection Titles
| File | Line | Text | Type |
|------|------|------|------|
| `src/teamszone/teamszone.tsx` | 102 | "Mentor Portal" | h3 |
| `src/teamszone/teamszone.tsx` | 115 | "Referee Portal" | h3 |
| `src/mentor/pages/UserDashboard.tsx` | 615 | "Participants" | text |
| `src/mentor/pages/UserDashboard.tsx` | 620 | "Teams" | text |
| `src/mentor/pages/UserDashboard.tsx` | 625 | "Categories" | text |
| `src/mentor/pages/UserDashboard.tsx` | 636 | "Mentor toolkit" | text |
| `src/admin/pages/SettingsPage.tsx` | 16 | "Event settings" | h2 |

---

## TABLE & LIST COLUMN HEADERS

| File | Lines | Text | Component |
|------|-------|------|-----------|
| `src/mentor/pages/UserDashboard.tsx` | 1013-1018 | "Name", "Age", "Contact", "Email", "Actions" | table headers |
| `src/admin/pages/UsersPage.tsx` | 428-433 | "Name", "Age", "Contact", "Email", "Actions" | table headers |

---

## STATUS & INFORMATION MESSAGES

### Loading/Processing
| File | Line | Text | Type |
|------|------|------|------|
| `src/admin/pages/AboutEventPage.tsx` | 112 | "Loading event information..." | message |
| `src/Components/TeamPaymentPanel.tsx` | 189 | "Loading secure card form..." | message |
| `src/referee/components/TrackScoringPanel.tsx` | 203 | "Saved: {formatTrackTime(saved.finishTime)}" | status |

### Empty States
| File | Line | Text | Type |
|------|------|------|------|
| `src/mentor/pages/UserDashboard.tsx` | 1117 | "No teams have been created yet" | heading |
| `src/teamszone/components/TrackCategoryView.tsx` | 104 | "No Teams Registered Yet" | heading |
| `src/teamszone/components/TrackCategoryView.tsx` | 129 | "Awaiting track time" | message |
| `src/admin/pages/UsersPage.tsx` | 203 | "No mentor registrations yet" | heading |

### Statistics & Counters
| File | Line | Text | Type |
|------|------|------|------|
| `src/teamszone/teamszone.tsx` | 39 | "Total Teams" | label |
| `src/teamszone/teamszone.tsx` | 45 | "Participants" | label |
| `src/teamszone/teamszone.tsx` | 49 | "Categories" | label |
| `src/teamszone/teamszone.tsx` | 53 | "Battles Played" | label |
| `src/admin/pages/AdminDashboard.tsx` | 299 | "Total Teams" | label |
| `src/admin/pages/AdminDashboard.tsx` | 303 | "Checked In" | label |
| `src/admin/pages/AdminDashboard.tsx` | 307 | "Pending Matches" | label |

### Error/Validation Messages
| File | Line | Text | Type |
|------|------|------|------|
| `src/Components/TeamPaymentPanel.tsx` | 183 | "Card payments are not active yet" | message |
| `src/mentor/pages/UserDashboard.tsx` | 743 | "Personal Identification Number - 7-12 alphanumeric characters" | title (tooltip) |

---

## NAVIGATION & LINKS

### Footer Links
| File | Lines | Text | Type |
|------|-------|------|------|
| `src/Components/Footer.tsx` | 52 | "Quick Links" | heading |
| `src/Components/Footer.tsx` | 90 | "Contact & Support" | heading |
| `src/Components/Footer.tsx` | 23 | "NextGen Robotics" | heading |
| `src/Components/Footer.tsx` | 24 | "Competition 2026" | text |

### Breadcrumb/Intro Text
| File | Line | Text | Type |
|------|------|------|------|
| `src/teamszone/teamszone.tsx` | 28 | "Live Competition Hub" | breadcrumb |
| `src/admin/pages/RefereesPage.tsx` | 87 | "Teams Zone" | breadcrumb |
| `src/admin/pages/CreateTeamPage.tsx` | 72 | "Create team" | breadcrumb |
| `src/admin/pages/SettingsPage.tsx` | 20 | "Dark mode" | label |

---

## COUNTDOWN DISPLAY

| File | Line | Text | Type |
|------|------|------|------|
| `src/Components/Countdown.tsx` | 49 | "Days" | label |
| `src/Components/Countdown.tsx` | 54 | "Hours" | label |
| `src/Components/Countdown.tsx` | 59 | "Minutes" | label |
| `src/Components/Countdown.tsx` | 64 | "Seconds" | label |

---

## CATEGORY/SPORT NAMES IN COMPONENTS

### Hardcoded Category Lists
| File | Line | Examples | Note |
|------|------|----------|------|
| `src/news/nextgenaze1st.tsx` | 8-16 | "Mega Sumo", "Mini Sumo", "Mini Sumo Kids", "1kg Lego Sumo", "3kg Lego Sumo", "Lego Line", "Line Follower", "Start Up (senior)" | Event categories |

---

## ARIA LABELS & ACCESSIBILITY

| File | Line | Text | Type |
|------|------|------|------|
| `src/mentor/pages/UserDashboard.tsx` | 690 | "Close participant form" | aria-label |
| `src/admin/components/AdminNav.tsx` | 50 | "Expand"/"Collapse" | title attribute |

---

## RECOMMENDATIONS

### Priority 1: User-Facing Text (HIGH)
These should be translated immediately as they're visible to users:
- Button labels (Save, Edit, Delete, Cancel, etc.)
- Section headings
- Form labels and placeholders
- Error messages
- Status messages

### Priority 2: Navigation & UI Elements (MEDIUM)
These appear in navigation and UI:
- Navigation labels
- Table headers
- Dashboard sections

### Priority 3: Informational Text (MEDIUM)
- Descriptive text
- Help messages
- Tooltips

---

## NEXT STEPS

1. **Add to i18n.ts**: Create English and Azerbaijani translations for all identified strings
2. **Update Components**: Wrap each hardcoded string with `t()` function
3. **Test**: Verify all pages display correctly in both languages
4. **Quality Assurance**: Check for any missed strings in edge cases

---

## Files with Most Hardcoded Strings
1. `src/mentor/pages/UserDashboard.tsx` - 30+ strings
2. `src/admin/pages/` - 25+ strings (various files)
3. `src/teamszone/teamszone.tsx` - 12+ strings
4. `src/Components/Footer.tsx` - 8+ strings

