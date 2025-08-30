# PhotoCheck AI - Passport Photo Compliance Checker

An intelligent web application that instantly verifies if a passport photo meets the official compliance standards for any country. Built with Next.js, this tool leverages AI to provide detailed feedback and actionable suggestions, helping users avoid photo rejections and application delays.

## Home Page View:

![](/public/home.png)

### Live Link: [photocheck.debjyoti.co.in](https://photocheck.debjyoti.co.in)

## ✨ Key Features

- **AI-Powered Analysis**: Utilizes Face++ for detailed facial attribute detection and Google Gemini for comprehensive compliance analysis.

- **Global Standards**: Check photos against the specific requirements for a large, alphabetized list of countries.

- **nstant Feedback**: Receive a detailed report with a compliance score, warnings, failures, and actionable suggestions.

- **Smart Validation**: Automatically detects non-human images and checks for file size limits before processing.

- **Privacy First**: All image processing is done ephemerally; photos are never stored on the server.

- **Modern UI/UX**: A sleek, responsive design with a professional dark mode, smooth animations, and a skeleton loader for a great user experience.

- **Landing Page**: A professional homepage to build user trust and explain the tool's features.

## 🚀 Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- Node.js (v18 or later)
- npm, yarn, or pnpm

### Clone the Repository

```sh
git clone https://github.com/Debjyoti2004/PhotoCheck-AI.git
cd PhotoCheck-AI
```

### Install Dependencies

```sh
npm install
```

### Set Up Environment Variables

You need to create a file named .env.local in the root of your project and add your API keys.

```sh
# .env.local

# Face++ API Credentials
FACEPP_API_KEY=<Your Face++ API Key>
FACEPP_API_SECRET=<Your Face++ API Secret>

# Google Gemini API Key
GEMINI_API_KEY=<Your Google Gemini API Key>
```

### Run the Development Server

```sh
npm run dev
```

Open `http://localhost:3000` with your browser to see the result.

### 🛠️ Tech Stack

- **Framework**: `Next.js`14 (App Router)

- **Language**: `TypeScript`

- **Styling**: `Tailwind CSS`

- **UI Components**: `Shadcn/UI`

- **Animation**: `Framer Motion`

- **Icons**: `Lucide React`

- **Themeing**: `next-themes`

- **APIs**:

  - `Face++` for face detection and attribute analysis.

  - `Google Gemini` for compliance logic and suggestions.

## 👨‍💻 Author

This project was made with ♥ by Debjyoti Shit.

- Check out my portfolio at [debjyoti.co.in](https://www.debjyoti.co.in).
- Check out my LinkedIn at [debjyotishit](https://www.linkedin.com/in/debjyotishit/).

## 📄 License

This project is licensed under the `MIT License`. See the LICENSE file for details.
