"use client";

import { useState } from "react";
import { ClipboardList, Clock, Users, CheckCircle, Circle, CheckCircle2 } from "lucide-react";
import { BaseCard } from "./BaseCard";
import { Modal } from "./Modal";

interface SurveyCardProps {
  title: string;
  questions: Array<{
    question: string;
    options: string[];
  }>;
  estimatedTime: string;
  participantCount: number;
  featured?: boolean;
}

export function SurveyCard({
  title,
  questions,
  estimatedTime,
  participantCount,
  featured
}: SurveyCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleOptionSelect = (questionIndex: number, optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Survey answers:', selectedAnswers);
    setIsModalOpen(false);
    setSelectedAnswers({});
    setCurrentQuestion(0);
  };

  return (
    <>
      <div onClick={() => setIsModalOpen(true)} className="cursor-pointer h-full">
        <BaseCard featured={featured}>
          <div className="flex flex-col h-full">
            {/* Header - Fixed height */}
            <div className="h-[88px]">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">{title}</h2>
                {featured && (
                  <span className="px-3 py-1 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-full text-sm flex-shrink-0 ml-2">
                    Featured
                  </span>
                )}
              </div>
              <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  <span>{estimatedTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 flex-shrink-0" />
                  <span>{participantCount} participants</span>
                </div>
              </div>
            </div>

            {/* Questions - Fixed height */}
            <div className="flex-1 min-h-[160px] space-y-3 mb-4">
              {questions.slice(0, 2).map((question, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <ClipboardList className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-2">{question.question}</p>
                </div>
              ))}
              {questions.length > 2 && (
                <p className="text-sm text-gray-400 text-center py-2">
                  +{questions.length - 2} more questions
                </p>
              )}
            </div>

            {/* Footer - Fixed height */}
            <div className="h-[44px]">
              <button 
                className="w-full py-2.5 px-4 bg-teal-500 hover:bg-teal-600  text-white rounded-lg transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Take Survey
              </button>
            </div>
          </div>
        </BaseCard>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6 space-y-6">
          {/* Modal Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              {featured && (
                <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                  Featured
                </span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{estimatedTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{participantCount} participants</span>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </div>
            </div>
          </div>

          {/* Survey Question */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {questions[currentQuestion].question}
              </h3>
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, optionIndex) => (
                  <button
                    key={optionIndex}
                    onClick={() => handleOptionSelect(currentQuestion, optionIndex)}
                    className={`w-full flex items-start gap-3 p-4 rounded-lg transition-colors
                      ${selectedAnswers[currentQuestion] === optionIndex 
                        ? 'bg-green-50 border-2 border-green-500 text-green-700' 
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-600'}`}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {selectedAnswers[currentQuestion] === optionIndex ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <p className="text-left">{option}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex gap-3 justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={`px-6 py-3 rounded-lg transition-colors
                  ${currentQuestion === 0 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              >
                Previous
              </button>
              {currentQuestion < questions.length - 1 ? (
                <button
                  onClick={handleNext}
                  disabled={!selectedAnswers[currentQuestion]}
                  className={`flex-1 py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2
                    ${selectedAnswers[currentQuestion] 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                >
                  Next Question
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!selectedAnswers[currentQuestion]}
                  className={`flex-1 py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2
                    ${selectedAnswers[currentQuestion] 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                >
                  <CheckCircle className="w-5 h-5" />
                  Submit Survey
                </button>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}