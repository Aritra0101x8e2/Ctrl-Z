import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faClock, faPerson, faComputer, faLink } from '@fortawesome/free-solid-svg-icons';

library.add(faCalendar, faClock, faPerson, faComputer, faLink);

const UpcomingEvents = () => {
    return (
        <section id="upcoming-events" className="py-12 md:py-16 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Title */}
                <div className="text-center mb-10 md:mb-12">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                        <span className="text-white">Upcoming</span>{" "}
                        <span className="text-cyan-400">Events</span>
                    </h2>
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* EVENT 1 */}
                    <div className="bg-gray-900/50 border border-cyan-400/30 rounded-2xl p-5 sm:p-8 backdrop-blur-sm hover:border-cyan-400/60 transition-all duration-300 group hover:bg-gray-800/70 hover:shadow-xl hover:shadow-cyan-400/10 hover:-translate-y-2 cursor-pointer">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 group-hover:mb-8 transition-all duration-300">
                            <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-400 transition-all duration-300">
                                Inauguration Event
                            </h3>
                            <span className="bg-cyan-400 text-black px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wide mt-3 sm:mt-0 group-hover:scale-110 transition-all duration-300">
                                upcoming
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 mb-6">
                            {/* Event Poster */}
                            <div className="w-full sm:w-44 h-52 rounded-xl overflow-hidden flex-shrink-0 shadow-lg group-hover:shadow-2xl group-hover:shadow-cyan-400/20 group-hover:scale-105 transition-all duration-300">
                                <img
                                    src="/src/Images/inauguration-event-poster.jpg"
                                    alt="Inauguration Event Poster"
                                    className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                                />
                            </div>

                            {/* Event Details */}
                            <div className="flex-1 space-y-4 sm:space-y-5 pt-2">
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2">
                                        <FontAwesomeIcon icon={['far', 'calendar']} className="text-cyan-400 text-base sm:text-lg" />
                                        <span className="text-gray-200 text-sm sm:text-lg font-medium">24.10.25</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FontAwesomeIcon icon={['fas', 'clock']} className="text-cyan-400 text-base sm:text-lg" />
                                        <span className="text-gray-200 text-sm sm:text-lg font-medium">7:00 PM</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <FontAwesomeIcon icon={['fas', 'computer']} className="text-cyan-400 text-base sm:text-lg" />
                                    <span className="text-gray-200 text-sm sm:text-lg font-medium">Online - Microsoft Teams</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <FontAwesomeIcon icon={['fas', 'person']} className="text-cyan-400 text-base sm:text-lg" />
                                    <span className="text-gray-200 text-sm sm:text-lg font-medium">CtrlZ Team</span>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                                Join us for the official inauguration of CtrlZ community. Get to know our mission, meet the team, and learn about upcoming opportunities.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-cyan-400 hover:bg-cyan-300 text-black px-6 py-2 sm:px-8 sm:py-3 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl group-hover:shadow-2xl group-hover:shadow-cyan-400/30">
                                <FontAwesomeIcon icon={['fas', 'link']} /> Register Now
                            </button>
                            <button className="border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 px-6 py-2 sm:px-8 sm:py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:border-cyan-400">
                                Learn More
                            </button>
                        </div>
                    </div>

                    {/* EVENT 2 */}
                    <div className="bg-gray-900/50 border border-cyan-400/30 rounded-2xl p-5 sm:p-6 backdrop-blur-sm hover:border-cyan-400/60 transition-all duration-300 group hover:bg-gray-800/70 hover:shadow-xl hover:shadow-cyan-400/10 hover:-translate-y-2 cursor-pointer">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                            <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-400 transition-all duration-300">
                                Introduction to Frontend Development
                            </h3>
                            <span className="bg-cyan-400 text-black px-3 py-1 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wide mt-2 sm:mt-0 group-hover:scale-110 transition-all duration-300">
                                upcoming
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-4">
                            {/* Poster */}
                            <div className="w-full sm:w-40 h-48 rounded-xl overflow-hidden">
                                <img
                                    src="/src/Images/frontend-event-poster.jpg"
                                    alt="Frontend Development Event Poster"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="flex-1 space-y-3 sm:space-y-4">
                                <div className="flex flex-wrap gap-3">
                                    <FontAwesomeIcon icon={['far', 'calendar']} className="text-gray-400 text-base sm:text-lg" />
                                    <span className="text-gray-300 text-sm sm:text-lg">26.10.25</span>
                                    <FontAwesomeIcon icon={['fas', 'clock']} className="text-gray-400 text-base sm:text-lg ml-2" />
                                    <span className="text-gray-300 text-sm sm:text-lg">7:30 PM</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <FontAwesomeIcon icon={['fas', 'computer']} className="text-gray-400 text-base sm:text-lg" />
                                    <span className="text-gray-300 text-sm sm:text-lg">Online</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <FontAwesomeIcon icon={['fas', 'person']} className="text-gray-400 text-base sm:text-lg" />
                                    <span className="text-gray-300 text-sm sm:text-lg">Arpan Chowdhury</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-gray-400 text-xs sm:text-sm mb-2 italic">
                            4th year CSE, Lead of NOOBUILD, President of G.N.X
                        </p>

                        <p className="text-gray-300 mb-6 text-sm sm:text-base leading-relaxed">
                            Learn the fundamentals of frontend development with Arpan Chowdhury. Perfect for beginners who want to start their coding journey.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <a
                                href="https://docs.google.com/forms/d/e/1FAIpQLScUFPNkXmlNb_E6HF0l2HMPFdrLT-tKJzaWk9F3LUcCUO15xA/viewform?usp=dialog"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-cyan-400 hover:bg-cyan-300 text-black px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                <FontAwesomeIcon icon={['fas', 'link']} /> Register Now
                            </a>
                            <button className="border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-200">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UpcomingEvents;
