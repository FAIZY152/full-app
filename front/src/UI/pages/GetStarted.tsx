const GetStarted = () => {
  return (
    <div className="bg-[#E91E63] text-white">
      <div className="container  px-4 py-7 rounded-lg mx-3 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 space-y-6 mb-8 lg:mb-0">
          <div className="bg-[#F06292] rounded-2xl p-6 space-y-4">
            <h3 className="text-2xl lg:text-3xl font-semibold">
              Download the food and groceries you love
            </h3>
            <div className="flex items-start gap-4">
              <div className="bg-white p-2 rounded-lg w-24 h-24 flex-shrink-0">
                <img
                  src="./images/qr.jfif"
                  alt="QR Code"
                  width={80}
                  height={80}
                  className="w-full h-full rounded-md"
                />
              </div>
              <p className="text-sm lg:text-base">
                It's all at your fingertips – the restaurants and shops you
                love. Find the right food and groceries to suit your mood, and
                make the first bite last. Go ahead, download us.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <img
                src="./images/play-s.png"
                alt="Download on the App Store"
                width={135}
                height={40}
                className="h-10 w-auto cursor-pointer rounded-lg border hover:scale-110 hover:duration-300"
              />
              <img
                src="./images/as-f.png"
                alt="Get it on Google Play"
                width={200}
                height={50}
                className="h-10 w-auto cursor-pointer border rounded-md border-gray-200  hover:scale-110 hover:duration-300"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button className="bg-gray-900 hover:bg-[#8d6777] text-white   font-semibold py-3 px-6 rounded">
              {" "}
              Get Started
            </button>
          </div>
        </div>
        <div className="lg:w-1/2 relative">
          <img
            src="./images/home-foodpanda-apps.webp"
            alt="Food delivery app interface"
            width={800}
            height={600}
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
