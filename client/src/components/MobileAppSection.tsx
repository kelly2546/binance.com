export default function MobileAppSection() {
  return (
    <section className="bg-[var(--binance-dark)] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Phone Mockup */}
          <div className="flex justify-center">
            <img 
              src="https://bin.bnbstatic.com/image/julia/new-homepage/download-lite-dark-en.svg" 
              alt="Binance Mobile App" 
              className="max-w-sm w-full"
            />
          </div>
          
          {/* Right - Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Trade on the go. Anywhere, anytime.
            </h2>
            
            {/* QR Code Section */}
            <div className="bg-[var(--binance-card)] rounded-lg p-6 mb-8 max-w-md">
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center">
                  {/* QR Code placeholder */}
                  <div className="w-20 h-20 bg-black rounded grid grid-cols-8 gap-px p-1">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`${Math.random() > 0.5 ? 'bg-white' : 'bg-black'}`}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[var(--binance-gray)] text-sm mb-1">Scan to Download App</p>
                  <p className="font-medium">iOS and Android</p>
                </div>
              </div>
            </div>
            
            {/* Platform Downloads */}
            <div className="grid grid-cols-3 gap-4 max-w-md">
              <div className="text-center">
                <div className="w-16 h-16 bg-[var(--binance-card)] rounded-lg flex items-center justify-center mx-auto mb-2 hover:border-[var(--binance-yellow)] border border-transparent transition-colors cursor-pointer">
                  <i className="fab fa-apple text-2xl"></i>
                </div>
                <p className="text-sm text-[var(--binance-gray)]">macOS</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[var(--binance-card)] rounded-lg flex items-center justify-center mx-auto mb-2 hover:border-[var(--binance-yellow)] border border-transparent transition-colors cursor-pointer">
                  <i className="fab fa-windows text-2xl"></i>
                </div>
                <p className="text-sm text-[var(--binance-gray)]">Windows</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[var(--binance-card)] rounded-lg flex items-center justify-center mx-auto mb-2 hover:border-[var(--binance-yellow)] border border-transparent transition-colors cursor-pointer">
                  <i className="fab fa-linux text-2xl"></i>
                </div>
                <p className="text-sm text-[var(--binance-gray)]">Linux</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
