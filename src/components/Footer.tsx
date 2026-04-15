const Footer = () => {
  return (
    <footer className="bg-accent-red text-foreground">
      <div className="px-5 md:px-20 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div>
            <div className="text-3xl md:text-4xl font-bold italic mb-3 font-sans">
              R. Garg
            </div>
            <p className="text-sm font-serif text-foreground/80 leading-relaxed">
              Education researcher studying youth cultures, new media technologies, and the role of technology in education.
            </p>
          </div>

          <div>
            <h3 className="footer-header">CONNECT</h3>
            <nav className="flex flex-col gap-2">
              <a href="mailto:rgarg@upenn.edu" className="footer-link">EMAIL</a>
              <a href="https://twitter.com/healingfictions" target="_blank" rel="noopener noreferrer" className="footer-link">TWITTER</a>
            </nav>
          </div>

          <div>
            <h3 className="footer-header">AFFILIATIONS</h3>
            <p className="text-sm font-serif text-foreground/80 leading-relaxed">
              University of Pennsylvania<br />
              Graduate School of Education<br />
              Center for Experimental Ethnography
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-foreground/20">
          <p className="text-sm text-center md:text-left uppercase">
            © {new Date().getFullYear()} R. GARG. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
