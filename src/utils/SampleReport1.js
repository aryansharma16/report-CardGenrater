export const SampleReport1AF = () => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>About Page</title>
      <style>
          /* General styles */
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              line-height: 1.6;
              display: flex;
              flex-direction: column;
              min-height: 100vh;
              background-color: #e6f7ff; /* Light blue background */
              color: #333;
          }
  
          header, footer {
              background-color: #005f99; /* Dark blue */
              color: #fff;
              text-align: center;
              padding: 1em 0;
          }
  
          header h1, footer p {
              margin: 0;
          }
  
          /* Main content styles */
          main {
              flex: 1;
              padding: 2em;
              max-width: 1200px;
              margin: 0 auto;
          }
  
          .section {
              margin-bottom: 2em;
              padding: 1em;
              background: #fff;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              border-radius: 8px;
          }
  
          h2 {
              color: #005f99; /* Dark blue */
              border-bottom: 2px solid #005f99; /* Dark blue */
              padding-bottom: 0.5em;
              margin-bottom: 1em;
          }
  
          p {
              margin-bottom: 1em;
          }
  
          .team-section img {
              width: 100%;
              max-width: 150px;
              border-radius: 50%;
              margin-right: 1em;
          }
  
          .team-section {
              display: flex;
              align-items: center;
          }
  
          .team-section .info {
              flex: 1;
          }
  
          /* Responsive styles */
          @media (max-width: 768px) {
              main {
                  padding: 1em;
              }
  
              .section {
                  margin-bottom: 1.5em;
              }
  
              .team-section {
                  flex-direction: column;
                  align-items: flex-start;
              }
  
              .team-section img {
                  margin: 0 0 1em 0;
              }
          }
  
          @media (max-width: 480px) {
              h2 {
                  font-size: 1.5em;
              }
  
              p {
                  font-size: 1em;
              }
          }
      </style>
  </head>
  <body>
      <header>
          <h1>Master's Union</h1>
      </header>
      <main>
          <section class="section about-section">
              <h2>Report Card Builder</h2>
              <p>It is Very Simple to Use this Builder </p>
              <p>-> You Just Have to Give the Information About The Report Card And Paste Your HTML CSS code here in the Code Editor.</p>
              <p>-> Cut All the Sample Code From Here and Paste Main Report Card HTML CSS Code Here .</p>
          </section>
          <section class="section mission-section">
              <h2>How To Use</h2>
              <p>Save The Report Card Then Your Latest Created Report Card Will Appear at the top.</p>
              <p>Then Simply Create The Report Card Check it And if every thing is Okay then dispatch it to Students .</p>
              <p>Select The Report Card That You Created or you want and then select the CSV of the Students .</p>
          </section>
      </main>
      <footer>
          <p>&copy; 2024 Master's union. All rights reserved.</p>
      </footer>
  </body>
  </html>
  
    
      `;
};
