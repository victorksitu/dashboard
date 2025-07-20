import React, { useState, useEffect, useMemo, useRef } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChevronDown, Check } from 'lucide-react';

const universityData = [
    { id: 1, name: 'University of Toronto', province: 'ON', 
      enrolments: [
        { year: 2020, undergraduate: 74502, graduate: 20188 },
        { year: 2021, undergraduate: 75990, graduate: 21050 },
        { year: 2022, undergraduate: 76815, graduate: 21980 },
        { year: 2023, undergraduate: 77500, graduate: 22500 },
      ],
      scholarships: [
        { year: 2020, averageAmount: 4800 },
        { year: 2021, averageAmount: 4950 },
        { year: 2022, averageAmount: 5100 },
        { year: 2023, averageAmount: 5250 },
      ]
    },
    { id: 2, name: 'University of British Columbia', province: 'BC', 
      enrolments: [
        { year: 2020, undergraduate: 56987, graduate: 11102 },
        { year: 2021, undergraduate: 58590, graduate: 11543 },
        { year: 2022, undergraduate: 59783, graduate: 12011 },
        { year: 2023, undergraduate: 60100, graduate: 12500 },
      ],
      scholarships: [
        { year: 2020, averageAmount: 4500 },
        { year: 2021, averageAmount: 4600 },
        { year: 2022, averageAmount: 4750 },
        { year: 2023, averageAmount: 4900 },
      ]
    },
    { id: 3, name: 'McGill University', province: 'QC', 
      enrolments: [
        { year: 2020, undergraduate: 31560, graduate: 9450 },
        { year: 2021, undergraduate: 32011, graduate: 9876 },
        { year: 2022, undergraduate: 32245, graduate: 10321 },
        { year: 2023, undergraduate: 32500, graduate: 10500 },
      ],
      scholarships: [
        { year: 2020, averageAmount: 5200 },
        { year: 2021, averageAmount: 5300 },
        { year: 2022, averageAmount: 5500 },
        { year: 2023, averageAmount: 5650 },
      ]
    },
    { id: 4, name: 'University of Alberta', province: 'AB', 
      enrolments: [
        { year: 2020, undergraduate: 31050, graduate: 8015 },
        { year: 2021, undergraduate: 31870, graduate: 8230 },
        { year: 2022, undergraduate: 32540, graduate: 8455 },
        { year: 2023, undergraduate: 32800, graduate: 8600 },
      ],
      scholarships: [
        { year: 2020, averageAmount: 4000 },
        { year: 2021, averageAmount: 4150 },
        { year: 2022, averageAmount: 4250 },
        { year: 2023, averageAmount: 4400 },
      ]
    },
    { id: 5, name: 'Université de Montréal', province: 'QC', 
      enrolments: [
        { year: 2020, undergraduate: 34987, graduate: 10012 },
        { year: 2021, undergraduate: 35678, graduate: 10543 },
        { year: 2022, undergraduate: 36123, graduate: 11098 },
        { year: 2023, undergraduate: 36500, graduate: 11500 },
      ],
      scholarships: [
        { year: 2020, averageAmount: 3800 },
        { year: 2021, averageAmount: 3900 },
        { year: 2022, averageAmount: 4050 },
        { year: 2023, averageAmount: 4150 },
      ]
    },
    { id: 6, name: 'McMaster University', province: 'ON', 
      enrolments: [
        { year: 2020, undergraduate: 27890, graduate: 5120 },
        { year: 2021, undergraduate: 28543, graduate: 5345 },
        { year: 2022, undergraduate: 29876, graduate: 5678 },
        { year: 2023, undergraduate: 30100, graduate: 5800 },
      ],
      scholarships: [
        { year: 2020, averageAmount: 3500 },
        { year: 2021, averageAmount: 3650 },
        { year: 2022, averageAmount: 3800 },
        { year: 2023, averageAmount: 4000 },
      ]
    },
    { id: 7, name: 'University of Ottawa', province: 'ON', 
      enrolments: [
        { year: 2020, undergraduate: 35421, graduate: 7012 },
        { year: 2021, undergraduate: 36102, graduate: 7234 },
        { year: 2022, undergraduate: 36890, graduate: 7543 },
        { year: 2023, undergraduate: 37200, graduate: 7800 },
      ],
      scholarships: [
        { year: 2020, averageAmount: 3200 },
        { year: 2021, averageAmount: 3300 },
        { year: 2022, averageAmount: 3500 },
        { year: 2023, averageAmount: 3600 },
      ]
    },
    { id: 8, name: 'Carleton University', province: 'ON', 
      enrolments: [
        { year: 2020, undergraduate: 28104, graduate: 4105 },
        { year: 2021, undergraduate: 28655, graduate: 4210 },
        { year: 2022, undergraduate: 29034, graduate: 4350 },
        { year: 2023, undergraduate: 29550, graduate: 4400 },
      ],
      scholarships: [
        { year: 2020, averageAmount: 3000 },
        { year: 2021, averageAmount: 3150 },
        { year: 2022, averageAmount: 3250 },
        { year: 2023, averageAmount: 3400 },
      ]
    },
];

const translations = {
    en: {
        title: "Canadian University Enrolment Dashboard",
        description: "Select up to three universities to compare their enrolment and scholarship statistics.",
        selectPlaceholder: "Select universities...",
        maxSelectionError: "You can select a maximum of 3 universities.",
        barChartTitle: "Total Enrolment Comparison",
        lineChartTitle: "Average Scholarship & Bursary Trends",
        totalEnrolment: "Total Enrolment",
        year: "Year",
        enrolment: "Enrolment",
        scholarshipAmount: "Average Amount ($)",
        noData: "Please select a university to see the data.",
        footerText: "Data used in the charts are based off statistics from Universities Canada and synthetically generated using AI.",
        language: "Français",
        startYear: "From",
        endYear: "To",
    },
    fr: {
        title: "Tableau de Bord des Inscriptions Universitaires Canadiennes",
        description: "Sélectionnez jusqu'à trois universités pour comparer leurs statistiques d'inscription et de bourses.",
        selectPlaceholder: "Sélectionnez des universités...",
        maxSelectionError: "Vous pouvez sélectionner un maximum de 3 universités.",
        barChartTitle: "Comparaison des Inscriptions Totales",
        lineChartTitle: "Tendances des Bourses d'Études Moyennes",
        totalEnrolment: "Inscriptions Totales",
        year: "Année",
        enrolment: "Inscriptions",
        scholarshipAmount: "Montant Moyen ($)",
        noData: "Veuillez sélectionner une université pour voir les données.",
        footerText: "Les données utilisées dans les graphiques sont basées sur des statistiques d’Universités Canada et générées synthétiquement à l’aide de l’IA.",
        language: "English",
        startYear: "De",
        endYear: "À",
    }
};

const AlertModal = ({ message, onClose }) => {
    if (!message) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
                <p className="mb-4 text-gray-700">{message}</p>
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    OK
                </button>
            </div>
        </div>
    );
};

const UniversitySelector = ({ options, selected, onChange, texts, max = 3 }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const wrapperRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    const handleSelect = (option) => {
        const isSelected = selected.some(s => s.id === option.id);
        if (isSelected) {
            onChange(selected.filter(s => s.id !== option.id));
        } else {
            if (selected.length < max) {
                onChange([...selected, option]);
            } else {
                setAlertMessage(texts.maxSelectionError);
            }
        }
    };

    return (
        <>
            <AlertModal message={alertMessage} onClose={() => setAlertMessage('')} />
            <div className="relative w-full max-w-md" ref={wrapperRef}>
                <button
                    type="button"
                    className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="flex items-center truncate">
                        {selected.length > 0 
                            ? selected.map(s => s.name).join(', ') 
                            : <span className="text-gray-500">{texts.selectPlaceholder}</span>
                        }
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                </button>

                {isOpen && (
                    <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {options.map(option => (
                            <li
                                key={option.id}
                                className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
                                onClick={() => handleSelect(option)}
                            >
                                <div className="flex items-center">
                                    <span className={`font-normal ml-3 block truncate ${selected.some(s => s.id === option.id) ? 'font-semibold' : ''}`}>
                                        {option.name}
                                    </span>
                                </div>
                                {selected.some(s => s.id === option.id) && (
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                                        <Check className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

const YearRangeSelector = ({ idPrefix, years, startYear, endYear, onStartYearChange, onEndYearChange, texts }) => {
    return (
        <div className="flex items-center justify-center gap-4 my-4">
            <div className="flex items-center gap-2">
                <label htmlFor={`${idPrefix}-start-year`} className="text-sm font-medium text-gray-700">{texts.startYear}:</label>
                <select
                    id={`${idPrefix}-start-year`}
                    value={startYear}
                    onChange={(e) => onStartYearChange(parseInt(e.target.value))}
                    className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                    {years.map(year => (
                        <option key={year} value={year} disabled={year > endYear}>{year}</option>
                    ))}
                </select>
            </div>
            <div className="flex items-center gap-2">
                <label htmlFor={`${idPrefix}-end-year`} className="text-sm font-medium text-gray-700">{texts.endYear}:</label>
                <select
                    id={`${idPrefix}-end-year`}
                    value={endYear}
                    onChange={(e) => onEndYearChange(parseInt(e.target.value))}
                    className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                    {years.map(year => (
                        <option key={year} value={year} disabled={year < startYear}>{year}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

const EnrolmentBarChart = ({ data, startYear, endYear }) => {
    const chartData = useMemo(() => {
        if (!data || data.length === 0) return [];
        const yearsInRange = [...new Set(data.flatMap(u => u.enrolments.map(e => e.year)))]
            .filter(year => year >= startYear && year <= endYear)
            .sort();

        return yearsInRange.map(year => {
            const yearData = { year };
            data.forEach(uni => {
                const enrolmentForYear = uni.enrolments.find(e => e.year === year);
                yearData[uni.name] = enrolmentForYear ? enrolmentForYear.undergraduate + enrolmentForYear.graduate : null;
            });
            return yearData;
        });
    }, [data, startYear, endYear]);

    const colors = ["#4f46e5", "#10b981", "#ef4444"];

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" />
                {data.map((uni, index) => (
                    <Bar key={uni.id} dataKey={uni.name} fill={colors[index % colors.length]} />
                ))}
            </BarChart>
        </ResponsiveContainer>
    );
};

const ScholarshipLineChart = ({ data, texts, startYear, endYear }) => {
    const chartData = useMemo(() => {
        if (!data || data.length === 0) return [];
        const allYears = [...new Set(data.flatMap(u => u.scholarships.map(e => e.year)))]
            .filter(year => year >= startYear && year <= endYear)
            .sort();
        
        return allYears.map(year => {
            const yearData = { year };
            data.forEach(uni => {
                const scholarshipForYear = uni.scholarships.find(e => e.year === year);
                yearData[uni.name] = scholarshipForYear ? scholarshipForYear.averageAmount : null;
            });
            return yearData;
        });
    }, [data, startYear, endYear]);

    const colors = ["#4f46e5", "#10b981", "#ef4444"];

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis label={{ value: texts.scholarshipAmount, angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)} />
                <Legend verticalAlign="top" />
                {data.map((uni, index) => (
                    <Line key={uni.id} type="monotone" dataKey={uni.name} stroke={colors[index % colors.length]} strokeWidth={2} activeDot={{ r: 8 }} />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
};

export default function App() {
    const [language, setLanguage] = useState('en');
    const [selectedUniversities, setSelectedUniversities] = useState([]);
    
    const allYears = useMemo(() => [...new Set(universityData.flatMap(u => u.enrolments.map(e => e.year)))].sort(), []);
    
    const [barStartYear, setBarStartYear] = useState(allYears[0]);
    const [barEndYear, setBarEndYear] = useState(allYears[allYears.length - 1]);
    
    const [scholarshipStartYear, setScholarshipStartYear] = useState(allYears[0]);
    const [scholarshipEndYear, setScholarshipEndYear] = useState(allYears[allYears.length - 1]);

    const texts = translations[language];

    const toggleLanguage = () => {
        setLanguage(lang => lang === 'en' ? 'fr' : 'en');
    };
    
    useEffect(() => {
        if(barStartYear > barEndYear) setBarStartYear(barEndYear);
    }, [barEndYear]);

    useEffect(() => {
        if(barEndYear < barStartYear) setBarEndYear(barStartYear);
    }, [barStartYear]);
    
    useEffect(() => {
        if(scholarshipStartYear > scholarshipEndYear) setScholarshipStartYear(scholarshipEndYear);
    }, [scholarshipEndYear]);

    useEffect(() => {
        if(scholarshipEndYear < scholarshipStartYear) setScholarshipEndYear(scholarshipStartYear);
    }, [scholarshipStartYear]);


    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{texts.title}</h1>
                        <p className="mt-1 text-sm text-gray-600">{texts.description}</p>
                    </div>
                    <button
                        onClick={toggleLanguage}
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                        {texts.language}
                    </button>
                </header>

                <div className="flex flex-col items-center gap-6 mb-8">
                    <UniversitySelector 
                        options={universityData}
                        selected={selectedUniversities}
                        onChange={setSelectedUniversities}
                        texts={texts}
                    />
                </div>

                {selectedUniversities.length > 0 ? (
                    <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-2 text-gray-800 text-center">{texts.barChartTitle}</h2>
                            <YearRangeSelector
                                idPrefix="bar"
                                years={allYears}
                                startYear={barStartYear}
                                endYear={barEndYear}
                                onStartYearChange={setBarStartYear}
                                onEndYearChange={setBarEndYear}
                                texts={texts}
                            />
                            <EnrolmentBarChart data={selectedUniversities} startYear={barStartYear} endYear={barEndYear} />
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-2 text-gray-800 text-center">{texts.lineChartTitle}</h2>
                             <YearRangeSelector
                                idPrefix="scholarship"
                                years={allYears}
                                startYear={scholarshipStartYear}
                                endYear={scholarshipEndYear}
                                onStartYearChange={setScholarshipStartYear}
                                onEndYearChange={setScholarshipEndYear}
                                texts={texts}
                            />
                            <ScholarshipLineChart data={selectedUniversities} texts={texts} startYear={scholarshipStartYear} endYear={scholarshipEndYear} />
                        </div>
                    </main>
                ) : (
                    <div className="text-center py-20 bg-white rounded-lg shadow-md">
                        <p className="text-gray-500">{texts.noData}</p>
                    </div>
                )}
                
                <footer className="text-center mt-12 text-xs text-gray-500">
                    <p>{texts.footerText}</p>
                </footer>
            </div>
        </div>
    );
}
