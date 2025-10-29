import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar, faCodeFork, faCode, faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

// Add icons to library
library.add(faStar, faCodeFork, faCode, faExternalLink, faGithub);

const FeaturedProjects = () => {
    const projects = [
        {
            title: 'DevStack CLI',
            description: 'A powerful command-line tool for rapid project scaffolding and development workflow automation.',
            tags: ['TypeScript', 'Node.js', 'CLI'],
            stars: '2.1k',
            forks: '340',
            status: 'Active',
        },
        {
            title: 'OpenUI Components',
            description: 'A comprehensive library of accessible, customizable React components for modern web applications.',
            tags: ['React', 'TypeScript', 'Accessibility'],
            stars: '5.7k',
            forks: '890',
            status: 'Featured',
        },
        {
            title: 'CodeLab Platform',
            description: 'Interactive coding environment for learning and experimenting with different programming languages.',
            tags: ['Vue.js', 'Python', 'Docker'],
            stars: '3.2k',
            forks: '520',
            status: 'Active',
        },
        {
            title: 'API Gateway',
            description: 'Lightweight, high-performance API gateway built for microservices and cloud-native applications.',
            tags: ['Go', 'Kubernetes', 'Microservices'],
            stars: '1.8k',
            forks: '280',
            status: 'Beta',
        },
        {
            title: 'ML Toolkit',
            description: 'Open-source machine learning toolkit with pre-trained models and easy-to-use APIs.',
            tags: ['Python', 'TensorFlow', 'ML'],
            stars: '4.3k',
            forks: '670',
            status: 'Active',
        },
        {
            title: 'DevOps Automator',
            description: 'Automation scripts and tools for streamlining CI/CD pipelines and infrastructure management.',
            tags: ['Bash', 'GitHub Actions', 'Docker'],
            stars: '960',
            forks: '150',
            status: 'New',
        },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Featured': 
                return 'bg-cyan-400/20 text-cyan-400 border-cyan-400/30';
            case 'Active': 
                return 'bg-green-400/20 text-green-400 border-green-400/30';
            case 'Beta': 
                return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30';
            case 'New': 
                return 'bg-purple-400/20 text-purple-400 border-purple-400/30';
            default: 
                return 'bg-gray-400/20 text-gray-400 border-gray-400/30';
        }
    };

    return (
        <section id="projects" className="py-20 bg-gray-900/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="text-cyan-400">Featured</span> <span className="text-white">Projects</span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Discover the amazing open-source projects built by our community. From developer tools to machine learning libraries, there's something for every tech enthusiast.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {projects.map((project, index) => (
                        <div
                            key={project.title}
                            className="bg-gray-900/50 border border-cyan-400/20 rounded-2xl p-6 backdrop-blur-sm hover:border-cyan-400/60 transition-all duration-300 group hover:bg-gray-800/70 hover:shadow-xl hover:shadow-cyan-400/10 hover:-translate-y-2 cursor-pointer"
                            style={{ 
                                animationDelay: `${index * 0.1}s`
                            }}
                        >
                            <div className="flex items-start justify-between mb-4 group-hover:mb-6 transition-all duration-300">
                                <span className={`${getStatusColor(project.status)} border px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide group-hover:scale-110 transition-transform duration-300`}>
                                    {project.status}
                                </span>
                                <div className="flex items-center space-x-4 text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                                    <div className="flex items-center gap-1 group-hover:scale-110 transition-transform duration-300">
                                        <FontAwesomeIcon icon={['fas', 'star']} className="w-4 h-4 group-hover:text-yellow-400 transition-colors duration-300" />
                                        <span>{project.stars}</span>
                                    </div>
                                    <div className="flex items-center gap-1 group-hover:scale-110 transition-transform duration-300">
                                        <FontAwesomeIcon icon={['fas', 'code-fork']} className="w-4 h-4 group-hover:text-cyan-400 transition-colors duration-300" />
                                        <span>{project.forks}</span>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-cyan-400 transition-all duration-300 group-hover:text-2xl group-hover:mb-4">
                                {project.title}
                            </h3>

                            <p className="text-gray-300 mb-4 leading-relaxed text-sm group-hover:text-gray-200 group-hover:text-base transition-all duration-300">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-6 group-hover:mb-8 transition-all duration-300">
                                {project.tags.map((tag, tagIndex) => (
                                    <span 
                                        key={tag} 
                                        className="border border-gray-600 text-gray-300 px-2 py-1 rounded text-xs group-hover:border-cyan-400/50 group-hover:text-cyan-300 group-hover:scale-105 transition-all duration-300"
                                        style={{ transitionDelay: `${tagIndex * 50}ms` }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-3 group-hover:gap-4 transition-all duration-300">
                                <button className="flex-1 border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/20 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 group-hover:py-3 group-hover:shadow-lg group-hover:shadow-cyan-400/20">
                                    <FontAwesomeIcon icon={['fab', 'github']} className="w-4 h-4 group-hover:w-5 group-hover:h-5 transition-all duration-300" />
                                    Code
                                </button>
                                <button className="border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/20 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 group-hover:py-3 group-hover:shadow-lg group-hover:shadow-cyan-400/20">
                                    <FontAwesomeIcon icon={['fas', 'external-link']} className="w-4 h-4 group-hover:w-5 group-hover:h-5 transition-all duration-300" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <button className="border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 px-8 py-3 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center gap-2 mx-auto">
                        <FontAwesomeIcon icon={['fab', 'github']} className="w-5 h-5" />
                        View All Projects
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjects;