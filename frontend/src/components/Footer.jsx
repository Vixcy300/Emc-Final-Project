

const Footer = () => {
  return (
    <footer className="bg-neutral-dark text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span className="font-bold text-xl tracking-tight text-brand-red">Pizza Palace</span>
          <p className="text-sm text-gray-400 mt-1">Serving the best pizzas since 2026.</p>
        </div>
        
        <div className="flex flex-col items-center md:items-end">
          <p className="text-sm font-medium">
            Project by Vignesh S
          </p>
          <a 
            href="https://github.com/Vixcy300" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-gray-400 hover:text-white transition-colors mt-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5 0-1.4-.5-2.5-1.5-3.5.1-.3.6-1.6-.1-3.4 0 0-1.2-.4-3.9 1.4a12.3 12.3 0 0 0-7 0C6.1 2.5 4.9 2.9 4.9 2.9c-.7 1.8-.2 3.1-.1 3.4-1 1-1.5 2.1-1.5 3.5 0 5 3 6.2 6 6.5-.8.7-1.1 2-1.1 3.2V22"/>
              <path d="M9 18c-4.5 1.5-5-2.5-7-3"/>
            </svg>
            GitHub Profile
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
