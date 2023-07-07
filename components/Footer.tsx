

export default function Footer() {
  
  return (
    <footer className="bg-gray-900 text-white py-8 p-4">

<div className="w-full sm:w-1/2 md:w-1/4">
          <h3 className="text-lg font-bold mb-4">Navigation</h3>
          <ul className="text-sm">
            <li>
              <a href="/">Home</a>
                    </li>
          </ul>
        </div>
        <br/>
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full sm:w-1/2 md:w-1/4">
          <h3 className="text-lg font-bold mb-4">About</h3>
          <p className="text-sm">
           Ai Driven Occupation Insights
          </p>
          <br/>
        </div>
       
        <div className="w-full sm:w-1/2 md:w-1/4">
          <h3 className="text-lg font-bold mb-4">Contact</h3>
          <p className="text-sm">Email: rodney.m.brown1@outlook.com</p>
          
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4">
          <h3 className="text-lg font-bold mb-4">Connect</h3>
          <ul className="text-sm">
            <li>
              <a href="https://www.linkedin.com/in/rodney-brown-9319221a6/" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            {/* <li>
              <a href="https://twitter.com/jobtrendspro" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            </li> */}
            {/* <li>
              <a href="https://facebook.com/jobtrendspro" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li> */}
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-4">
        <div className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Job Trends Pro. All rights reserved.
        </div>
        <div className="text-sm text-gray-500">
          <a href="/privacy">Privacy Policy</a> | <a href="/terms">By DevPro</a>
        </div>
      </div>
    </footer>
  );
}
