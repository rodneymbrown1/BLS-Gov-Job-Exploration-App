import React from 'react';

const AboutSection = () => {
  return (
    <section className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900">
            About Our App
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Our app leverages data from BLS.gov and employs OpenAI&apos;s natural language processing models to provide AI-driven insights about your desired occupational field. We also generate historical graphs to visualize relevant information.
          </p>
          <p className="mt-4 text-lg text-gray-600">
            Our dedicated team is constantly working on adding new features and improving the app to provide you with the best experience. Join our email list to stay updated on the latest developments.
          </p>
          <div className="mt-8">
            <a href="#" className="text-lg font-medium text-indigo-600 hover:text-indigo-500">
              Join the Email List
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
