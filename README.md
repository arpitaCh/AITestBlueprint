# ⚡ Selenium to Playwright Converter

A high-fidelity, UI-driven automation converter designed to transform legacy Selenium Java (TestNG) code into modern, idiomatic Playwright JavaScript or TypeScript.

![Project Status](https://img.shields.io/badge/status-Phase%203%20Complete-success)
![Node Version](https://img.shields.io/badge/node-%3E%3D22.14.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🌟 Features

- **TestNG Integration**: Automatically maps TestNG annotations (`@Test`, `@BeforeMethod`, etc.) to Playwright hooks.
- **Smart API Mapping**: Converts standard Selenium commands (`driver.get`, `findElement`) into high-performance Playwright locators.
- **Async/Await Support**: Handles the transition from Selenium's synchronous paradigm to Playwright's asynchronous nature.
- **Modern UI**: A premium, dark-mode web interface for easy code conversion and immediate preview.
- **Persistence**: Automatically saves converted tests into a dedicated directory for easy project integration.

---

## 🏗️ Architecture (B.L.A.S.T. Protocol)

This project follows the **B.L.A.S.T.** methodology and the **A.N.T.** 3-layer architecture:

- **Layer 1: Architecture (`architecture/`)**: Deterministic Standard Operating Procedures (SOPs).
- **Layer 2: Navigation**: Logic routing between core tools and user input.
- **Layer 3: Tools (`tools/`)**: Modular, testable Node.js scripts for conversion and server operations.

---

## 🛠️ Tech Stack

- **Frontend**: Vanilla HTML5, CSS3 (Glassmorphism), and JavaScript.
- **Backend**: Node.js & Express.js.
- **Logic**: Custom Pattern-Matching Engine (Regex & State Machine).
- **Styling**: Outfit & JetBrains Mono typography.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v22.14.0 or higher recommended)
- `npm` (v10.9.2 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/arpitaCh/AITestBlueprint.git
   cd AITestBlueprint/project2-Selenium2PlaywrightConverter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

Start the conversion server:
```bash
node tools/ui_server.js
```

Once started, open your browser and navigate to:
**[http://localhost:3000](http://localhost:3000)**

---

## 📂 Project Structure

```text
├── architecture/          # Technical SOPs (Layer 1)
├── tools/                 # Core logic & server (Layer 3)
│   ├── converter.js       # The conversion engine
│   └── ui_server.js       # Express server
├── public/                # Web UI assets
│   └── index.html         # Main dashboard
├── converted_tests/       # Output directory for saved tests
├── gemini.md              # Project Constitution & State
├── task_plan.md           # Progress & Roadmap
└── package.json           # Dependencies
```

---

## 🗺️ Roadmap

- [x] **Phase 0-1**: Discovery & Pattern Research
- [x] **Phase 2**: Link & Environment Setup
- [x] **Phase 3**: Core Engine & UI Build
- [ ] **Phase 4**: Stylize (Advanced UI Highlights & Polish)
- [ ] **Phase 5**: Trigger (Cloud Deployment & CLI packaging)

---

## 🤝 Contributing

This project is part of the **A.I. Test Blueprint** series. Contributions and feedback are welcome!

---

## 📄 License

Distributed under the MIT License.
