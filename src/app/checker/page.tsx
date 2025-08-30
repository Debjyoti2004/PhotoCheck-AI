// app/checker/page.tsx
"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

// ICONS
import { FileCheck, RotateCw, Sparkles } from "lucide-react";

// YOUR EXISTING COMPONENTS (Make sure these paths are correct)
import ImageUploader from "@/components/image-uploader";
import CountrySelector from "@/components/country-selector";
import ComplianceResults from "@/components/compliance-results";
import Toast from "@/components/ui/toast";
import ResultsSkeleton from "@/components/results-skeleton"; // Import the skeleton loader

// YOUR ACTIONS & TYPES (Make sure these paths are correct)
import { extractTextFromImage } from "@/lib/ocr-client";
import { analyzePassportWithFacePlusPlus } from "@/actions/index";
import { analyzePassportWithGemini } from "@/actions/Gemini";
import type { ComplianceResult, Country } from "@/types";

type Step = "upload" | "country" | "analyzing" | "results";

interface ToastState {
    message: string;
    type: 'info' | 'warning' | 'error';
    id: number;
}

export default function PassportChecker() {
    const [step, setStep] = useState<Step>("upload");
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [complianceResult, setComplianceResult] = useState<ComplianceResult | null>(null);
    const [toast, setToast] = useState<ToastState | null>(null);

    const showToast = useCallback((message: string, type: 'info' | 'warning' | 'error' = 'info') => {
        setToast({ message, type, id: Date.now() });
    }, []);

    const clearToast = useCallback(() => {
        setToast(null);
    }, []);

    const handleImageUpload = useCallback((imageDataUrl: string | null) => {
        setSelectedImage(imageDataUrl);
        setComplianceResult(null);
        if (imageDataUrl) {
            setStep("country");
        } else {
            setStep("upload");
        }
        clearToast();
    }, [clearToast]);

    const handleCountrySelect = useCallback((country: Country) => {
        setSelectedCountry(country);
    }, []);

    const handleUploaderError = useCallback((message: string, type: 'warning' | 'error') => {
        showToast(message, type);
        setSelectedImage(null);
        setStep("upload");
    }, [showToast]);

    const analyzePhoto = useCallback(async () => {
        if (!selectedImage || !selectedCountry) return;

        setStep("analyzing");
        setComplianceResult(null);
        clearToast();

        try {
            await new Promise(resolve => setTimeout(resolve, 3000));

            const faceAnalysisResult = await analyzePassportWithFacePlusPlus(selectedImage);

            if (typeof faceAnalysisResult === 'object' && faceAnalysisResult !== null && 'error' in faceAnalysisResult && typeof faceAnalysisResult.error === 'string' && faceAnalysisResult.error.includes("Body exceeded 1 MB limit")) {
                showToast("Image is too large. Please reduce its size to under 1MB.", 'error');
                setStep("upload");
                setSelectedImage(null);
                return;
            }

            if ("error" in faceAnalysisResult || !faceAnalysisResult.faceDetection?.faceDetected) {
                showToast("No human face detected. Please upload a clear photo of a person.", 'error');
                setStep("upload");
                setSelectedImage(null);
                return;
            }

            const ocrResult = await extractTextFromImage(selectedImage);
            const analysisData = { "OCR Result:": ocrResult, "Face++ Result:": faceAnalysisResult };
            const geminiResult = await analyzePassportWithGemini(analysisData, selectedCountry);

            if (geminiResult && !("error" in geminiResult)) {
                const resultData: ComplianceResult = {
                    overallScore: geminiResult.overallScore,
                    checks: geminiResult.checks,
                    recommendations: geminiResult.recommendations || [],
                    countrySpecificNotes: geminiResult.countrySpecificNotes || [],
                };
                setComplianceResult(resultData);
                setStep("results");
            } else {
                console.error("Gemini analysis failed:", geminiResult?.error);
                showToast("Analysis failed. Please try again with a different photo.", 'error');
                setStep("country");
            }
        } catch (error: any) {
            console.error("Analysis error:", error);
            if (error instanceof Error && error.message.includes("Body exceeded 1 MB limit")) {
                showToast("Image is too large. Please reduce its size to under 1MB.", 'error');
            } else {
                showToast("An unexpected error occurred during analysis.", 'error');
            }
            setStep("country");
        }
    }, [selectedImage, selectedCountry, showToast, clearToast]);

    const resetChecker = useCallback(() => {
        setSelectedImage(null);
        setSelectedCountry(null);
        setComplianceResult(null);
        setStep("upload");
        clearToast();
    }, [clearToast]);

    const motionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    return (
        <div className="min-h-screen w-full bg-background text-foreground transition-colors duration-300">


            <div className="container mx-auto px-4 py-8 md:py-12">
                <header className="text-center max-w-3xl mx-auto mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-2xl mb-6">
                        <FileCheck className="w-8 h-8 text-blue-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Photo Compliance Checker
                    </h1>
                    <p className="text-lg text-muted-foreground mt-4">
                        Instantly verify your photo against official requirements for any country.
                    </p>
                </header>

                <AnimatePresence mode="wait">
                    {step === "upload" || step === "country" ? (
                        <motion.div
                            key="workflow"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={motionVariants}
                            transition={{ duration: 0.3 }}
                            className="max-w-xl mx-auto bg-card border rounded-2xl shadow-2xl shadow-black/20 p-8 space-y-8"
                        >
                            <div>
                                <h2 className={clsx("text-xl font-semibold mb-4 flex items-center transition-opacity duration-300", step === 'upload' ? 'text-card-foreground' : 'text-muted-foreground')}>
                                    <span className={clsx("text-lg flex items-center justify-center w-7 h-7 rounded-full mr-3 transition-colors duration-300", step === 'upload' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground')}>1</span>
                                    Upload Your Photo
                                </h2>
                                <ImageUploader onImageUpload={handleImageUpload} currentImage={selectedImage} onError={handleUploaderError} />
                            </div>

                            <div>
                                <h2 className={clsx("text-xl font-semibold mb-4 flex items-center transition-opacity duration-300", step === 'country' ? 'text-card-foreground' : 'text-muted-foreground')}>
                                    <span className={clsx("text-lg flex items-center justify-center w-7 h-7 rounded-full mr-3 transition-colors duration-300", step === 'country' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground')}>2</span>
                                    Select Country
                                </h2>
                                <CountrySelector onCountrySelect={handleCountrySelect} selectedCountry={selectedCountry} disabled={!selectedImage || step !== 'country'} />
                            </div>

                            <button
                                onClick={analyzePhoto}
                                disabled={!selectedImage || !selectedCountry || step === 'analyzing'}
                                className="w-full bg-blue-600 text-white font-semibold py-3.5 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/20 disabled:bg-muted disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center text-lg cursor-pointer"
                            >
                                {step === 'analyzing' ? (
                                    <><RotateCw className="w-5 h-5 mr-3 animate-spin" />Analyzing...</>
                                ) : (
                                    <><Sparkles className="w-5 h-5 mr-3" />Check Compliance</>
                                )}
                            </button>
                        </motion.div>
                    ) : step === "analyzing" ? (
                        <motion.div
                            key="results-skeleton"
                            initial="hidden" animate="visible" exit="exit"
                            variants={motionVariants} transition={{ duration: 0.5 }}
                        >
                            <ResultsSkeleton />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="results-dashboard"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={motionVariants}
                            transition={{ duration: 0.5 }}
                            className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
                        >
                            <div className="lg:col-span-1 space-y-6">
                                <div className="sticky top-24 bg-card border rounded-2xl shadow-xl shadow-black/20 p-6"> { }
                                    <h3 className="font-semibold text-lg mb-4 text-card-foreground">Your Photo</h3>
                                    {selectedImage && <img src={selectedImage} alt="Passport photo" className="rounded-lg w-full" />}
                                    <div className="mt-4 text-center text-sm text-muted-foreground">
                                        Analyzed for: <span className="font-medium text-card-foreground">{selectedCountry?.name}</span>
                                    </div>
                                    <button
                                        onClick={resetChecker}
                                        className="mt-6 inline-flex w-full items-center justify-center rounded-lg border border-zinc-700 bg-transparent px-4 py-2.5 font-semibold text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-zinc-100 cursor-pointer"
                                    >
                                        Check another
                                    </button>
                                </div>
                            </div>
                            <div className="lg:col-span-2">
                                {complianceResult && <ComplianceResults result={complianceResult} country={selectedCountry!} onReset={resetChecker} />}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {toast && (
                        <div className="fixed top-20 right-4 z-[9999]">
                            <Toast
                                key={toast.id}
                                message={toast.message}
                                type={toast.type}
                                onClose={clearToast}
                            />
                        </div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}