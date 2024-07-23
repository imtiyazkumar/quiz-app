import React from 'react';

interface QuestionType {
    id: string;
    text: string;
    options: { id: string, text: string }[]
}

interface AnswerType {
    questionId: string;
    optionId: string;
}

const CorrectAnswers: AnswerType[] = [
    {
        questionId: "q1",
        optionId: "q1o1"
    },
    {
        questionId: "q2",
        optionId: "q2o3"
    },
    {
        questionId: "q3",
        optionId: "q3o1"
    },
    {
        questionId: "q4",
        optionId: "q4o2"
    },
    {
        questionId: "q5",
        optionId: "q5o1"
    },
    {
        questionId: "q6",
        optionId: "q6o2"
    },
    {
        questionId: "q7",
        optionId: "q7o3"
    },
    {
        questionId: "q8",
        optionId: "q8o1"
    },
    {
        questionId: "q9",
        optionId: "q9o2"
    },
    {
        questionId: "q10",
        optionId: "q10o4"
    }
];

const Questions: QuestionType[] = [
    {
        id: "q1",
        text: "What is the capital of France?",
        options: [
            { id: "q1o1", text: "Paris" },
            { id: "q1o2", text: "London" },
            { id: "q1o3", text: "Rome" },
            { id: "q1o4", text: "Berlin" }
        ]
    },
    {
        id: "q2",
        text: "What is the largest planet in our solar system?",
        options: [
            { id: "q2o1", text: "Earth" },
            { id: "q2o2", text: "Mars" },
            { id: "q2o3", text: "Jupiter" },
            { id: "q2o4", text: "Saturn" }
        ]
    },
    {
        id: "q3",
        text: "Who wrote 'Romeo and Juliet'?",
        options: [
            { id: "q3o1", text: "William Shakespeare" },
            { id: "q3o2", text: "Charles Dickens" },
            { id: "q3o3", text: "Mark Twain" },
            { id: "q3o4", text: "Jane Austen" }
        ]
    },
    {
        id: "q4",
        text: "What is the smallest prime number?",
        options: [
            { id: "q4o1", text: "1" },
            { id: "q4o2", text: "2" },
            { id: "q4o3", text: "3" },
            { id: "q4o4", text: "5" }
        ]
    },
    {
        id: "q5",
        text: "What is the chemical symbol for water?",
        options: [
            { id: "q5o1", text: "H2O" },
            { id: "q5o2", text: "O2" },
            { id: "q5o3", text: "CO2" },
            { id: "q5o4", text: "NaCl" }
        ]
    },
    {
        id: "q6",
        text: "What year did the first man land on the moon?",
        options: [
            { id: "q6o1", text: "1965" },
            { id: "q6o2", text: "1969" },
            { id: "q6o3", text: "1971" },
            { id: "q6o4", text: "1975" }
        ]
    },
    {
        id: "q7",
        text: "What is the hardest natural substance on Earth?",
        options: [
            { id: "q7o1", text: "Gold" },
            { id: "q7o2", text: "Iron" },
            { id: "q7o3", text: "Diamond" },
            { id: "q7o4", text: "Platinum" }
        ]
    },
    {
        id: "q8",
        text: "What is the main ingredient in traditional Japanese miso soup?",
        options: [
            { id: "q8o1", text: "Soybeans" },
            { id: "q8o2", text: "Chicken" },
            { id: "q8o3", text: "Beef" },
            { id: "q8o4", text: "Fish" }
        ]
    },
    {
        id: "q9",
        text: "Who was the first President of the United States?",
        options: [
            { id: "q9o1", text: "Thomas Jefferson" },
            { id: "q9o2", text: "George Washington" },
            { id: "q9o3", text: "John Adams" },
            { id: "q9o4", text: "Abraham Lincoln" }
        ]
    },
    {
        id: "q10",
        text: "What is the largest ocean on Earth?",
        options: [
            { id: "q10o1", text: "Atlantic Ocean" },
            { id: "q10o2", text: "Indian Ocean" },
            { id: "q10o3", text: "Arctic Ocean" },
            { id: "q10o4", text: "Pacific Ocean" }
        ]
    }
];


function App() {
    enum Status {
        start = "Start",
        inProgress = "InProgress",
        finish = "Finish",
        review = "Review",
    }

    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [reviewIndex, setReviewIndex] = React.useState(0);

    const [status, setStatus] = React.useState<Status>(Status.start);
    const [finalScore, setFinalScore] = React.useState(0);


    const [givenAnswers, setGivenAnswers] = React.useState<AnswerType[]>([]);

    const calculateScore = (givenAnswers: AnswerType[]) => {
        let score = 0;
        givenAnswers.forEach(answer => {
            const correctAnswer = CorrectAnswers.find(ans => ans.questionId === answer.questionId && ans.optionId === answer.optionId);

            if (correctAnswer) {
                score += 1;
            } else {
                score += 0;
            }
        });

        return score;
    };

    const handleClick = (answer: AnswerType) => {
        setGivenAnswers(prevAnswers => {
            const existingAnswerIndex = prevAnswers.findIndex(a => JSON.stringify(a) == JSON.stringify(answer));
            if (existingAnswerIndex !== -1) {
                // If answer fully matches, remove it
                return prevAnswers.filter((_, index) => index !== existingAnswerIndex);
            } else {
                const existingQuestionIndex = prevAnswers.findIndex(a => a.questionId === answer.questionId);
                if (existingQuestionIndex !== -1) {
                    // If answer does not fully match but question matches, update it
                    const updatedAnswers = [...prevAnswers];
                    updatedAnswers[existingQuestionIndex] = answer;
                    return updatedAnswers;
                } else {
                    // Otherwise, add the new answer
                    return [...prevAnswers, answer];
                }
            }
        });
    };

    const handle = () => {
        if (currentIndex < Questions.length - 2) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setStatus(Status.finish);
            setFinalScore(calculateScore(givenAnswers));
        }
    }

    const isOptionSelected = (answer: AnswerType) => {
        const q = givenAnswers.find((ans) => ans.questionId === answer.questionId);
        if (q?.optionId === answer.optionId) return true;
        return false;
    };

    const optionResult = (selected: AnswerType) => {
        const g = givenAnswers.find((ans) => ans.questionId === selected.questionId);
        const c = CorrectAnswers.find((ans) => ans.questionId === selected.questionId);
        if ((c?.optionId == g?.optionId && selected.optionId == g?.optionId) || selected.optionId == c?.optionId) return "bg-green-300";
        if (c?.optionId != g?.optionId && selected.optionId == g?.optionId) return "bg-red-300";
        if (!g) return "bg-white"
    };

    const backTOHome = () => {
        setGivenAnswers([])
        setCurrentIndex(0);
        setReviewIndex(0);
        setStatus(Status.start);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-blue-100">
            <div className="w-full max-w-[700px] p-6 bg-white rounded-lg shadow-lg">
                {status === Status.start &&
                    <div className='flex flex-col gap-4'>
                        <span className='text-3xl font-semibold'>Ready for the quiz?</span>
                        <button
                            className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onClick={() => setStatus(Status.inProgress)}
                        >Start
                        </button>
                    </div>
                }
                {status === Status.inProgress &&
                    <div>
                        <h1 className="h-16 mb-4 text-2xl font-bold text-gray-800">
                            {Questions[currentIndex].text}
                        </h1>
                        <div className="mb-4 bg-gree">
                            {Questions[currentIndex].options.map((option, index) => (
                                <button
                                    onClick={() => handleClick({ questionId: Questions[currentIndex].id, optionId: option.id })}
                                    key={index}
                                    className={`block w-full px-4 py-2 text-left mb-2 border-gray-300 rounded-lg border ${isOptionSelected({ questionId: Questions[currentIndex].id, optionId: option.id }) ? "bg-green-300" : "bg-gray-100 hover:bg-gray-200 "}`}
                                >
                                    {option.text}
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-between mt-4">
                            <button
                                className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onClick={() => setCurrentIndex(currentIndex - 1)}
                                disabled={currentIndex == 0}
                            >
                                Prev Question
                            </button>
                            <button
                                className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onClick={handle}
                                disabled={currentIndex >= Questions.length - 1}
                            >
                                {currentIndex >= Questions.length - 1 ? "Finish" : "Next Question"}
                            </button>
                        </div>
                    </div>
                }
                {status === Status.finish &&
                    <div>
                        <span className='text-3xl font-semibold'>your score is {finalScore}/{Questions.length}</span><br></br>
                        <span className='text-2xl'>your performance is <span className={`${finalScore / Questions.length > 0.6 ? "text-green-600" : "text-red-600"}`}> {finalScore / Questions.length > 0.6 ? "good" : "poor"}</span></span>

                        <div className="flex justify-between mt-4">
                            <button
                                className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onClick={() => { setCurrentIndex(0); setStatus(Status.review) }}
                                disabled={currentIndex == 0}
                            >
                                View Answers
                            </button>
                            <button
                                className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onClick={() => { setCurrentIndex(0); setStatus(Status.inProgress) }}
                                disabled={currentIndex >= Questions.length - 1}
                            >
                                Re attempt
                            </button>
                        </div>
                    </div>
                }
                {status === Status.review &&
                    <div>
                        {<div>
                            <h1 className="h-16 mb-4 text-2xl font-bold text-gray-800">
                                {Questions[reviewIndex].text}
                            </h1>
                            <div className="mb-4 bg-gree">
                                {Questions[reviewIndex].options.map((option, index) => (
                                    <div
                                        key={index}
                                        className={`block w-full px-4 py-2 text-left mb-2 border-gray-300 rounded-lg border ${optionResult({ questionId: Questions[reviewIndex].id, optionId: option.id })}`}
                                    >
                                        {option.text}
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-4">
                                <button
                                    className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    onClick={() => setReviewIndex(reviewIndex - 1)}
                                    disabled={reviewIndex == 0}
                                >
                                    Prev Question
                                </button>
                                <button
                                    className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    onClick={() => { reviewIndex >= Questions.length - 1 ? backTOHome() : setReviewIndex(reviewIndex + 1) }}
                                >
                                    {reviewIndex >= Questions.length - 1 ? "Back to Home" : "Next Question"}
                                </button>
                            </div>
                        </div>}
                    </div>
                }
            </div>
        </div>
    );
}

export default App;
