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
                    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.351"/>
                  </svg>
                </div>
                <p className="text-sm text-[var(--binance-gray)]">Windows</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[var(--binance-card)] rounded-lg flex items-center justify-center mx-auto mb-2 hover:border-[var(--binance-yellow)] border border-transparent transition-colors cursor-pointer p-4">
                  <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.504 0C5.623 0-.026 5.649-.026 12.5c0 6.851 5.649 12.5 12.53 12.5 6.851 0 12.5-5.649 12.5-12.5C24.504 5.649 18.855 0 12.504 0zm-.633 1.62c1.951 0 3.735.64 5.178 1.716l-2.99 2.99c-.873-.456-1.868-.716-2.925-.716-3.654 0-6.618 2.964-6.618 6.618 0 1.057.26 2.052.716 2.925l-2.99 2.99C1.516 16.103.87 14.319.87 12.368c0-5.649 4.603-10.252 10.252-10.252l.75.504zm6.618 3.712c1.076 1.443 1.716 3.227 1.716 5.178 0 5.649-5.103 10.252-10.752 10.252-1.951 0-3.735-.64-5.178-1.716l2.99-2.99c.873.456 1.868.716 2.925.716 3.654 0 6.618-2.964 6.618-6.618 0-1.057-.26-2.052-.716-2.925l2.99-2.99-.593-.897z"/>
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
