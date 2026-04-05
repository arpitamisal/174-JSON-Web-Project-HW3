// Function to fetch and display trucking companies
function loadTruckingCompanies() {
  const jsonUrl = document.getElementById('jsonUrl').value.trim();
  const errorMessage = document.getElementById('errorMessage');

  // Clear any previous error message
  errorMessage.innerHTML = '';

  // Check if the input box is empty
  if (!jsonUrl) {
    errorMessage.innerHTML = 'Please enter a valid JSON file URL.';
    return;
  }

  // Fetch the JSON file from the server
  fetch(jsonUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Please enter a valid JSON file URL.');
      }
      return response.text();
    })
    .then(text => {
      let data;

      // Use try/catch to detect JSON parsing errors
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error('Invalid JSON format.');
      }

      // Check if the root JSON structure exists
      if (!data.Mainline || !data.Mainline.Table) {
        throw new Error('JSON structure is invalid or missing required fields.');
      }

      // Check if the table header exists and is valid
      if (
        !data.Mainline.Table.Header ||
        !Array.isArray(data.Mainline.Table.Header.Data)
      ) {
        throw new Error('Table header data is missing or invalid.');
      }

      // Check if the row data exists and is an array
      if (!Array.isArray(data.Mainline.Table.Row)) {
        throw new Error('Table row data is missing or invalid.');
      }

      // Check if there are no trucking companies
      if (data.Mainline.Table.Row.length === 0) {
        throw new Error('No trucking companies found in the JSON file.');
      }

      displayTruckingCompanies(data);
    })
    .catch(error => {
      errorMessage.innerHTML = `Error: ${error.message}`;
    });
}

// Function to display trucking companies in a new pop-up window
function displayTruckingCompanies(data) {
  // Create a new window for displaying the table
  const tableWindow = window.open('', '', 'width=1200,height=800,scrollbars=yes');

  // Check if pop-up is blocked
  if (!tableWindow) {
    document.getElementById('errorMessage').innerHTML = 'Error: Popup blocked. Please allow popups for this site.';
    return;
  }

  let tableHTML = `
    <html>
    <head>
      <title>Top Trucking Companies</title>
      <style>
        body {
          font-family: "Times New Roman", serif;
          margin: 20px;
          background-color: white;
          color: black;
        }

        h2 {
          text-align: center;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        table, th, td {
          border: 1px solid black;
        }

        th, td {
          padding: 10px;
        }

        th {
          text-align: center;
        }

        .leftMiddle {
          text-align: left;
          vertical-align: middle;
        }

        .leftTop {
          text-align: left;
          vertical-align: top;
        }

        .centerMiddle {
          text-align: center;
          vertical-align: middle;
        }

        img {
          max-width: 140px;
          max-height: 100px;
          display: block;
          margin: 0 auto;
        }
      </style>
    </head>
    <body>
      <h2>Top Trucking Companies</h2>
      <table>
        <tr>
  `;

  // Create table headers dynamically from the "Header" data
  const headers = data.Mainline.Table.Header.Data;
  headers.forEach(header => {
    tableHTML += `<th>${header}</th>`;
  });

  tableHTML += `</tr>`;

  // Loop through each trucking company and add rows to the table
  data.Mainline.Table.Row.forEach(company => {
    let hubHTML = '';

    // Display HQ / Info as bullet points
    if (company.Hubs && Array.isArray(company.Hubs.Hub)) {
      hubHTML = '<ul>';

      company.Hubs.Hub.forEach((hub, index) => {
        if (index === 0) {
          hubHTML += `<li><b>${hub}</b></li>`;
        } else {
          hubHTML += `<li>${hub}</li>`;
        }
      });

      hubHTML += '</ul>';
    }

    // Check if homepage starts with http:// or https://
    let homePageHTML = 'N/A';
    if (
      company.HomePage &&
      (company.HomePage.startsWith('http://') || company.HomePage.startsWith('https://'))
    ) {
      homePageHTML = `<a href="${company.HomePage}" target="_blank">${company.HomePage}</a>`;
    }

    // Display logo if available, otherwise show fallback text
    let logoHTML = 'No Logo Available';
    if (company.Logo) {
      logoHTML = `<img src="${company.Logo}" alt="${company.Company || 'Company'} Logo" onerror="this.outerHTML='No Logo Available'" />`;
    }

    tableHTML += `
      <tr>
        <td class="leftMiddle">${company.Company || ''}</td>
        <td class="leftMiddle">${company.Services || ''}</td>
        <td class="leftTop">${hubHTML}</td>
        <td class="leftMiddle">${company.Revenue || ''}</td>
        <td class="leftMiddle">${homePageHTML}</td>
        <td class="centerMiddle">${logoHTML}</td>
      </tr>
    `;
  });

  tableHTML += `
      </table>
    </body>
    </html>
  `;

  tableWindow.document.write(tableHTML); // Write the HTML table to the pop-up window
}