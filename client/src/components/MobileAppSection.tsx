import phoneImage from "@assets/image_1750071666454.png";

export default function MobileAppSection() {
  return (
    <section className="bg-[var(--binance-dark)] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Phone Mockup */}
          <div className="flex justify-center">
            <div className="relative max-w-sm">
              <img 
                src={phoneImage} 
                alt="Binance Mobile App" 
                className="w-full h-auto rounded-3xl shadow-2xl"
              />
            </div>
          </div>
          
          {/* Right - Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Trade on the go. Anywhere, anytime.
            </h2>
            
            {/* QR Code Section */}
            <div className="bg-[var(--binance-card)] rounded-lg p-6 mb-8 max-w-md">
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center p-2">
                  <img 
                    src="https://bnb-prod-mbx-forum-uploads.s3.dualstack.ap-northeast-1.amazonaws.com/original/2X/0/0e442411b062e790c86bc9718463d4d045b882b4.png" 
                    alt="QR Code"
                    className="w-full h-full object-cover rounded"
                  />
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
                <div className="w-16 h-16 bg-[var(--binance-card)] rounded-lg flex items-center justify-center mx-auto mb-2 hover:border-[var(--binance-yellow)] border border-transparent transition-colors cursor-pointer p-4">
                  <img src="https://www.svgrepo.com/show/303125/apple-logo.svg" alt="Apple" className="w-full h-full" />
                </div>
                <p className="text-sm text-[var(--binance-gray)]">macOS</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[var(--binance-card)] rounded-lg flex items-center justify-center mx-auto mb-2 hover:border-[var(--binance-yellow)] border border-transparent transition-colors cursor-pointer p-4">
                  <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M0 12l1.608-1.608L12 20.784l10.392-10.392L24 12 12 24 0 12z"/>
                    <path d="M0 0l1.608 1.608L12 12l10.392-10.392L24 0 12 12 0 0z"/>
                  </svg>
                </div>
                <p className="text-sm text-[var(--binance-gray)]">Windows</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[var(--binance-card)] rounded-lg flex items-center justify-center mx-auto mb-2 hover:border-[var(--binance-yellow)] border border-transparent transition-colors cursor-pointer p-4">
                  <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
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
