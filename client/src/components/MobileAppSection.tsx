import phoneImage from "@assets/image_1750071666454.png";

export default function MobileAppSection() {
  return (
    <section className="bg-[#181A20] py-20">
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
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-[#EAECEF]">
              Trade on the go. Anywhere, anytime.
            </h2>
            
            {/* QR Code Section */}
            <div className="bg-transparent border border-[#2b3139] rounded-lg p-6 mb-8 max-w-md">
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center p-2">
                  <img 
                    src="https://bnb-prod-mbx-forum-uploads.s3.dualstack.ap-northeast-1.amazonaws.com/original/2X/0/0e442411b062e790c86bc9718463d4d045b882b4.png" 
                    alt="QR Code"
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div>
                  <p className="text-[#848e9c] text-sm mb-1">Scan to Download App</p>
                  <p className="font-medium text-[#EAECEF]">iOS and Android</p>
                </div>
              </div>
            </div>
            
            {/* Platform Downloads */}
            <div className="grid grid-cols-3 gap-4 max-w-md">
              <div className="text-center">
                <div className="w-16 h-16 bg-transparent border border-[#2b3139] rounded-lg flex items-center justify-center mx-auto mb-2 hover:border-[#FCD535] transition-colors cursor-pointer p-4">
                  <img src="https://www.svgrepo.com/show/303125/apple-logo.svg" alt="Apple" className="w-full h-full" />
                </div>
                <p className="text-sm text-[#848e9c]">macOS</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-transparent border border-[#2b3139] rounded-lg flex items-center justify-center mx-auto mb-2 hover:border-[#FCD535] transition-colors cursor-pointer p-4">
                  <svg className="w-full h-full text-[#EAECEF]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.351"/>
                  </svg>
                </div>
                <p className="text-sm text-[#848e9c]">Windows</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-transparent border border-[#2b3139] rounded-lg flex items-center justify-center mx-auto mb-2 hover:border-[#FCD535] transition-colors cursor-pointer p-4">
                  <img src="https://www.svgrepo.com/show/372898/linux.svg" alt="Linux" className="w-full h-full" />
                </div>
                <p className="text-sm text-[#848e9c]">Linux</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
