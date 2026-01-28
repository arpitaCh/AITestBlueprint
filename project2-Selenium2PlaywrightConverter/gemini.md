# 🧬 Project Constitution - Selenium to Playwright Converter

**Project Name:** Selenium Java to Playwright JavaScript/TypeScript Converter  
**Created:** 2026-01-28  
**Status:** Phase 0 - Initialization

---

## 📋 Project Overview

This document serves as the **Project Constitution** - the single source of truth for:
- Data schemas
- Behavioral rules
- Architectural invariants
- System constraints

**⚠️ This document is LAW. All changes must be documented here.**

---

## 🎯 North Star Goal

To build a high-fidelity, UI-driven converter that transforms Selenium Java (TestNG) code into idiomatic, readable Playwright JavaScript/TypeScript.

---

## 📊 Data Schemas

### Input Schema
```json
{
  "sourceCode": "string", // Raw Selenium Java code
  "languagePreference": "typescript" | "javascript",
  "framework": "testng"
}
```

### Output Schema
```json
{
  "convertedCode": "string", // Playwright JS/TS code
  "fileName": "string",      // Suggested filename
  "logs": [
    {
      "type": "info" | "warning" | "error",
      "message": "string",
      "line": "number"
    }
  ],
  "outputPath": "string"     // Path to the saved file in the new directory
}
```

### Conversion Mapping Schema
**Status:** Not Yet Defined

```json
{
  "description": "Mapping between Selenium commands and Playwright equivalents",
  "structure": "TBD after discovery"
}
```

---

## 🔧 Behavioral Rules

### Conversion Rules
*(To be defined after discovery)*

1. **Rule 1:** TBD
2. **Rule 2:** TBD
3. **Rule 3:** TBD

### "Do Not" Rules
1. **Do Not** produce non-functional or syntactically incorrect code.
2. **Do Not** strictly map Selenium commands if a more idiomatic Playwright approach exists (e.g., use `locator` over `findElement`).
3. **Do Not** ignore TestNG annotations; map them to Playwright hooks (`beforeAll`, `beforeEach`, etc.).
4. **Do Not** write code in `tools/` until the Blueprint is approved.

---

## 🏗️ Architectural Invariants

### Layer 1: Architecture (`architecture/`)
- All SOPs written in Markdown
- Each tool must have corresponding SOP
- SOPs updated BEFORE code changes

### Layer 2: Navigation (Decision Making)
- Agent routes data between SOPs and Tools
- No complex logic in navigation layer
- Call execution tools in correct order

### Layer 3: Tools (`tools/`)
- Deterministic scripts only
- Atomic and testable functions
- All secrets in `.env`
- All temporary files in `.tmp/`

---

## 🔌 Integrations

### External Services
*(To be defined after discovery)*

- **Service 1:** TBD
- **Service 2:** TBD

### API Keys & Credentials
- Stored in `.env` file
- Verified in Phase 2 (Link)

---

## 📁 File Structure

```
project2-Selenium2PlaywrightConverter/
├── gemini.md              # This file - Project Constitution
├── task_plan.md           # Phases, goals, checklists
├── findings.md            # Research, discoveries, constraints
├── progress.md            # Session logs, errors, results
├── .env                   # API Keys/Secrets (Phase 2)
├── architecture/          # Layer 1: SOPs
│   └── (to be created)
├── tools/                 # Layer 3: Conversion Scripts
│   └── (to be created)
└── .tmp/                  # Temporary workbench
    └── (to be created)
```

---

## 🔄 Maintenance Log

### Schema Changes
- **2026-01-28:** Initial schema structure created (empty, awaiting discovery)

### Rule Additions
- **2026-01-28:** Initial behavioral rules placeholder created

### Architecture Modifications
- **2026-01-28:** 3-layer architecture structure defined

---

## 📝 Discovery Questions (Phase 1)

**Status:** ✅ COMPLETED

### 1. North Star
**Q:** What is the singular desired outcome?  
**A:** Developing a Selenium Java to Playwright with Javascript/Typescript converter.

### 2. Integrations
**Q:** Which external services do we need? Are keys ready?  
**A:** Convert the TestNG Selenium Java Test into Playwright JS/TS.

### 3. Source of Truth
**Q:** Where does the primary data live?  
**A:** Using the UI, the user will enter the Selenium Code (Java).

### 4. Delivery Payload
**Q:** How and where should the final result be delivered?  
**A:** Convert into a new directory and show it in the UI as well.

### 5. Behavioral Rules
**Q:** How should the system "act"?  
**A:** Convert everything. Prioritize readability over strict 1:1 mapping.

---

## 🚦 Phase Gates

### Phase 0 → Phase 1
- [x] Project memory files created
- [ ] Discovery questions answered
- [ ] Data schema defined
- [ ] Blueprint approved

### Phase 1 → Phase 2
- [ ] Data schema finalized in this document
- [ ] Research completed
- [ ] Conversion patterns documented

### Phase 2 → Phase 3
- [ ] Development environment verified
- [ ] All dependencies tested
- [ ] File I/O validated

### Phase 3 → Phase 4
- [ ] All tools built and tested
- [ ] Architecture SOPs complete
- [ ] Core conversion working

### Phase 4 → Phase 5
- [ ] Output formatting complete
- [ ] User feedback incorporated
- [ ] Quality standards met

---

## 📌 Notes

- **Last Updated:** 2026-01-28 11:39 IST
- **Current Phase:** Phase 0 - Initialization
- **Next Milestone:** Answer Discovery Questions
